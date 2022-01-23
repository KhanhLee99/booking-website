<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRegisterRequest;
use App\User;
use Illuminate\Support\Facades\Hash;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public $success_code = 200;
    public $response = [
        'status' => 'fail'
    ];
    private $dir = 'images/';

    public function __construct()
    {
    }

    //
    public function register(Request $request)
    {
        try {
            $rules = array(
                'name' => 'required|max:255',
                'email' => 'required|email|unique:users|max:255',
                'password' => 'required|min:6',
            );
            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                $this->response = [
                    'errorMessage' => $validator->errors(),
                    'status' => 'fail'
                ];
                return response()->json($this->response, 400);
            }
            $user = new User;
            $user->fill($request->all());
            $user->password = Hash::make($request->password);

            if ($user->save()) {
                $user->sendEmailVerificationNotification();
                $this->response = [
                    'status' => 'success',
                    'message' => 'Please Verify Your Email.',
                    'data' => $user,
                ];
                return response()->json($this->response, $this->success_code);
            }
            $this->response['status'] = 'fail';
            return response()->json($this->response, 400);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function new_password(Request $q)
    {
        $input = $q->all();
        $user_login = $q->user('api');
        $rules = array(
            'old_password' => 'required',
            'new_password' => 'required|min:6',
            'confirm_password' => 'required|same:new_password',
        );
        $validator = Validator::make($input, $rules);
        if ($validator->fails()) {
            $arr = array("status" => 400, "message" => $validator->errors()->first(), "data" => array());
        } else {
            try {
                if ((Hash::check(request('old_password'), $user_login->password)) == false) {
                    $arr = array("status" => 400, "message" => "Check your old password.", "data" => array());
                } else if ((Hash::check(request('new_password'), $user_login->password)) == true) {
                    $arr = array("status" => 400, "message" => "Please enter a password which is not similar then current password.", "data" => array());
                } else {
                    User::where('id', $user_login->id)->update(['password' => Hash::make($input['new_password'])]);
                    $arr = array("status" => 200, "message" => "Password updated successfully.", "data" => array());
                }
            } catch (\Exception $ex) {
                if (isset($ex->errorInfo[2])) {
                    $msg = $ex->errorInfo[2];
                } else {
                    $msg = $ex->getMessage();
                }
                $arr = array("status" => 400, "message" => $msg, "data" => array());
            }
        }
        return response()->json($arr);
    }

    public function update_avatar(Request $request)
    {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'file' => 'required|mimes:png,jpg,jpeg,gift|max:2048',
                ]
            );

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 401);
            }

            if ($response = cloudinary()->upload($request->file('file')->getRealPath())->getSecurePath()) {
                // re file name if exists and upload file
                // $file_name = $file->getClientOriginalName();
                // $re_file_name = $this->upload_image($file, $file_name);

                // update user avatar image
                $user = $request->user('api');
                // $avatar_url = $user->avatar_url;
                if ($user->update(['avatar_url' => $response])) {
                    // if (file_exists($this->dir . $avatar_url)) {
                    //     // delete old avatar image
                    //     $this->delete_image($this->dir . $avatar_url);
                    // }
                    return response()->json([
                        "success" => true,
                        "message" => "File successfully uploaded",
                        "data" => $user
                    ]);
                }
                return response()->json($this->response, 400);
            }
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    private function delete_image($path)
    {
        unlink($path);
    }

    public function upload_multiple_images(Request $request)
    {
        try {
            $images = $request->file('image');
            foreach ($images as $image) {
                $file_name = $image->getClientOriginalName();
                $this->upload_image($image, $file_name);
            }
            $this->response['status'] = 'success';
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    private function upload_image($file, $file_name)
    {
        $re_file_name = preg_replace('/\s+/', '-', trim($file_name));
        while (file_exists($this->dir . $re_file_name)) {
            $re_file_name = time() . '-' . $re_file_name;
        }
        $file->move($this->dir, $re_file_name);
        return $re_file_name;
    }

    public function add_device_token(Request $request)
    {
        try {
            $current_user = $request->user('api');
            // return $current_user;
            if ($current_user->update(['device_token' => $request->device_token])) {
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function delete_device_token(Request $request)
    {
        try {
            $current_user = $request->user('api');
            if ($current_user->update([
                'device_token' => null
            ])) {
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function send_notification(Request $request)
    {
        // $deviceToken = User::whereNotNull('device_key')->pluck('device_key')->all();
        $deviceToken = User::where('id', $request->user_id)->whereNotNull('device_token')->pluck('device_token');

        $dataEndCode = json_encode([
            "registration_ids" => $deviceToken,
            "notification" => [
                "title" => $request->title,
                "body" => $request->body,
            ]
        ]);

        $headerRequest = [
            'Authorization: key=' . env('FIRE_BASE_FCM_KEY'),
            'Content-Type: application/json'
        ];
        // FIRE_BASE_FCM_KEY mình có note ở phần 2.setting firebase nhé

        // CURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, env('FIRE_BASE_URL'));
        //FIRE_BASE_URL = https://fcm.googleapis.com/fcm/send
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headerRequest);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataEndCode);
        // Mục đích mình đưa các tham số kia vào env để tùy biến nhé
        $output = curl_exec($ch);
        if ($output === FALSE) {
            log('Curl error: ' . curl_error($ch));
        }
        curl_close($ch);

        return response()->json($output);
    }

    public function edit(Request $request)
    {
        try {
            $user_login = $request->user('api');
            if ($user_login) {
                if ($user_login->update($request->all())) {
                    $this->response = [
                        'status' => 'success',
                        'data' => $user_login
                    ];
                    return response()->json($this->response, $this->success_code);
                }
                return response()->json($this->response, 400);
            }
            return response()->json(['error' => 'Unauthorized'], 401);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

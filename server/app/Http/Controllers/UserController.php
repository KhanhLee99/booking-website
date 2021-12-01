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
    private $response = [
        'status' => 'fail'
    ];
    private $dir = 'images/';

    public function __construct()
    {
    }

    //
    public function register(UserRegisterRequest $q)
    {
        $user = new User;
        $user->fill($q->all());
        $user->password = Hash::make($q->password);
        $user->save();
        $user->sendEmailVerificationNotification();
        
        return response()->json($user);
    }

    public function new_password(Request $q)
    {
        // $user_login = Auth::guard()->user();
        $user_login = $q->user('api');
        if ($user_login) {
            $user_login->password = Hash::make($q->password);
            $user_login->save();
            return response()->json(['message' => 'Success'], $this->success_code);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
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
            if ($file = $request->file('file')) {
                // re file name if exists and upload file
                $file_name = $file->getClientOriginalName();
                $re_file_name = $this->upload_image($file, $file_name);

                // update user avatar image
                $user = $request->user('api');
                $avatar_url = $user->avatar_url;
                $user->avatar_url = $re_file_name;
                if ($user->save()) {
                    if (file_exists($this->dir . $avatar_url)) {
                        // delete old avatar image
                        $this->delete_image($this->dir . $avatar_url);
                    }
                    return response()->json([
                        "success" => true,
                        "message" => "File successfully uploaded"
                    ]);
                }
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
            if ($current_user->update(['device_token' => $request->device_token])) {
                $this->response['status'] = 'success';
                return $this->response()->json($this->response, $this->success_code);
            }
            return $this->response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function send_notification(Request $request)
    {
        // $deviceToken = User::whereNotNull('device_key')->pluck('device_key')->all();
        $deviceToken = User::whereNotNull('device_token')->pluck('device_token')->all();

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
}

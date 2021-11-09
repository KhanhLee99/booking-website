<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Social_Provider;
use App\Http\Requests\SocialProviderRequest;
use Exception;

class SocialProviderController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    public function index() {
        try {
            $social_providers = Social_Provider::orderBy('id', 'desc')->get();
            if($social_providers) {
                $this->response = [
                    'status' => 'success',
                    'data' => $social_providers
                ];
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function add(Request $request) {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    "name" => "required|unique:social_providers",
                ],
                [
                    'required' => ':attribute không để trống',
                    'unique' => ':attribute không trùng nhau'
                ],
                [
                    'name' => 'Tên mạng xã hội'
                ]
            );

            if ($validator->fails()) {
                $this->response['errorMessage'] = $validator->errors();
                return response()->json($this->response);
            }

            if (Social_Provider::create($request->all())) {
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function delete($id) {
        try {
            $social_provider = Social_Provider::find($id);
            if ($social_provider) {
                $social_provider->delete();
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            $this->response['errorMessage'] = "Record có id = $id không tồn tại";
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function edit(Request $request, $id) {
        try {
            $social_provider = Social_Provider::find($id);
            if ($social_provider) {
                $validator = Validator::make(
                    $request->all(),
                    [
                        "name" => "required|unique:social_providers",
                    ],
                    [
                        'required' => ':attribute không để trống',
                        'unique' => ':attribute không trùng nhau'
                    ],
                    [
                        'name' => 'Tên mạng xã hội'
                    ]
                );
    
                if ($validator->fails()) {
                    $this->response['errorMessage'] = $validator->errors();
                    return response()->json($this->response);
                }
                $data = $request->all();
                $social_provider->update($data);
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            $this->response['errorMessage'] = "Record có id = $id không tồn tại";
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

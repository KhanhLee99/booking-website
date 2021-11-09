<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Role;
use Exception;

class RoleController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    public function index() {
        try {
            $roles = Role::orderBy('id', 'desc')->get();
            if($roles) {
                $this->response = [
                    'status' => 'success',
                    'data' => $roles
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
                    "name" => "required|unique:role",
                ],
                [
                    'required' => ':attribute không để trống',
                    'unique' => ':attribute không trùng nhau'
                ],
                [
                    'name' => 'Tên role'
                ]
            );

            if ($validator->fails()) {
                $this->response['errorMessage'] = $validator->errors();
                return response()->json($this->response);
            }

            if (Role::create($request->all())) {
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
            $role = Role::find($id);
            if ($role) {
                $role->delete();
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
            $role = Role::find($id);
            if ($role) {
                $validator = Validator::make(
                    $request->all(),
                    [
                        "name" => "required|unique:role",
                    ],
                    [
                        'required' => ':attribute không để trống',
                        'unique' => ':attribute không trùng nhau'
                    ],
                    [
                        'name' => 'Tên role'
                    ]
                );
    
                if ($validator->fails()) {
                    $this->response['errorMessage'] = $validator->errors();
                    return response()->json($this->response);
                }
                $data = $request->all();
                $role->update($data);
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

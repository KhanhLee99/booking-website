<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Bed_Type;
use Exception;

class BedTypeController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    public function index() {
        try {
            $bed_types = Bed_Type::orderBy('id', 'desc')->get();
            if($bed_types) {
                $this->response = [
                    'status' => 'success',
                    'data' => $bed_types
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
                    "name" => "required|unique:bed_type",
                ],
                [
                    'required' => ':attribute không để trống',
                    'unique' => ':attribute không trùng nhau'
                ],
                [
                    'name' => 'Tên loại giường'
                ]
            );

            if ($validator->fails()) {
                $this->response['errorMessage'] = $validator->errors();
                return response()->json($this->response);
            }

            if (Bed_Type::create($request->all())) {
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
            $bed_type = Bed_Type::find($id);
            if ($bed_type) {
                $bed_type->delete();
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
            $bed_type = Bed_Type::find($id);
            if ($bed_type) {
                $validator = Validator::make(
                    $request->all(),
                    [
                        "name" => "required|unique:bed_type",
                    ],
                    [
                        'required' => ':attribute không để trống',
                        'unique' => ':attribute không trùng nhau'
                    ],
                    [
                        'name' => 'Tên loại giường'
                    ]
                );
                if ($validator->fails()) {
                    $this->response['errorMessage'] = $validator->errors();
                    return response()->json($this->response);
                }
                $data = $request->all();
                $bed_type->update($data);
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

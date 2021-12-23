<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Amenity;
use App\Amenity_Type;
use Exception;
use Illuminate\Support\Facades\DB;

class AmenityController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    public function index() {
        try {
            $amenities = Amenity::get();
            if($amenities) {
                $this->response = [
                    'status' => 'success',
                    'data' => $amenities
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
            if (Amenity_Type::find($request->amenity_type_id)) {
                $validator = Validator::make(
                    $request->all(),
                    [
                        "name" => "required|unique:amenities",
                    ],
                    [
                        'required' => ':attribute không để trống',
                        'unique' => ':attribute không trùng nhau'
                    ],
                    [
                        'name' => 'Tên tiện ích'
                    ]
                );
    
                if ($validator->fails()) {
                    $this->response['errorMessage'] = $validator->errors();
                    return response()->json($this->response);
                }
    
                if (Amenity::create($request->all())) {
                    $this->response['status'] = 'success';
                    return response()->json($this->response, $this->success_code);
                }
                return response()->json($this->response);
            }
            $this->response['errorMessage'] = "Không tìm thấy thể loại tiện ích có id = $request->amenity_type_id";
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function delete($id) {
        try {
            $amenity = Amenity::find($id);
            if ($amenity) {
                $amenity->delete();
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
            $amenity = Amenity::find($id);
            if ($amenity) {
                $validator = Validator::make(
                    $request->all(),
                    [
                        "name" => "required|unique:amenities",
                    ],
                    [
                        'required' => ':attribute không để trống',
                        'unique' => ':attribute không trùng nhau'
                    ],
                    [
                        'name' => 'Tên tiện ích'
                    ]
                );
                if ($validator->fails()) {
                    $this->response['errorMessage'] = $validator->errors();
                    return response()->json($this->response);
                }
                $data = $request->all();
                $amenity->update($data);
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

    public function get_by_array_id($array_id) {
        return DB::table('amenities')->whereIn('id', $array_id)->select('name', 'icon_url')->get();
    }
}

<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Favorite;
use App\User;
use Exception;

class FavoriteController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    public function index(Request $request) {
        try {
            $result = $request->user('api')->Favorite;
            $this->response = [
                'status' => 'success',
                'data' => $result
            ];
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
                    "listing_id" => "required",
                ]
            );

            if ($validator->fails()) {
                $this->response['errorMessage'] = $validator->errors();
                return response()->json($this->response);
            }
            if ($listing_id = $request->listing_id) {
                $user_login = $request->user('api');
                $data = [
                    "user_id" => $user_login->id,
                    "listing_id" => $listing_id
                ];
                if (Favorite::create($data)) {
                    $this->response['status'] = 'success';
                    return response()->json($this->response, $this->success_code);
                }
                return response()->json($this->response);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function delete($id) {
        try {
            $favorite = Favorite::find($id);
            if ($favorite) {
                $favorite->delete();
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

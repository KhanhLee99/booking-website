<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use App\Promo_Code;

class PromoCodeController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];
    
    public function add(Request $request) {
        try {
            if (Promo_Code::create($request->all())) {
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function index($id) {
        try {   
            $result = Promo_Code::where('listing_id', '=', $id)->get();
            $this->response = [
                'status' => 'success',
                'data' => $result
            ];
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function edit(Request $request, $id) {
        try {
            $promo_code = Promo_Code::find($id);
            if ($promo_code) {
                $promo_code->update($request->all());
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
            $promo_code = Promo_Code::find($id);
            if ($promo_code) {
                $promo_code->delete();
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

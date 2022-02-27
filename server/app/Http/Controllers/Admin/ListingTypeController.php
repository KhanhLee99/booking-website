<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use App\Listing_Type;

class ListingTypeController extends Controller
{
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    function add(Request $request)
    {
        try {
            if (Listing_Type::create($request->all())) {
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function index()
    {
        try {
            $listing_types = Listing_Type::get();
            if ($listing_types) {
                $this->response['status'] = 'success';
                $this->response['data'] = $listing_types;
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response, 400);
        }
    }

    public function get_option_listing_type()
    {
        try {
            $listing_types = Listing_Type::select('id as value', 'name as label')->get();
            if ($listing_types) {
                $this->response['status'] = 'success';
                $this->response['data'] = $listing_types;
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response, 400);
        }
    }
}

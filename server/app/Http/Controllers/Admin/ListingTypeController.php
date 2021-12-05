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
}

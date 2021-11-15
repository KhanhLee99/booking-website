<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Listing_Price_Special;
use Exception;
use Illuminate\Support\Carbon;

class ListingPriceSpecialController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    function index($id) {
        try {
            $result = Listing_Price_Special::where([
                ['listing_id', '=', $id],
                ['end_date', '>', Carbon::today()]
            ])->get();
            if ($result) {
                $this->response = [
                    'status' => 'success',
                    'data' => $result
                ];
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    function add(Request $request) {
        try {
            if (Listing_Price_Special::create($request->all())) {
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    function edit(Request $request, $id) {
        try {
            $special_price = Listing_Price_Special::find($id);
            if ($special_price) {
                $special_price->update($request->all());
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

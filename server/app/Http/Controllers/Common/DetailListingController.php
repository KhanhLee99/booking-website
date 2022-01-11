<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Listing;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;

class DetailListingController extends Controller
{
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    public function get_litings_location(Request $request)
    {
        try {
            $data = DB::table('listing')
                ->where('city_id', $request->city_id)
                ->join('listing_type', 'listing.listing_type_id', '=', 'listing_type.id')
                ->select('listing.id as listing_id', 'listing.name', 'listing.street_address', 'listing.avatar_url as listing_img', 'listing.bedroom_count', 'listing.price_per_night_base as price_per_night', 'listing.rating', 'listing_type.name as listing_type')
                ->paginate($request->limit);
            // ->get();
            $this->response = [
                'status' => 'success',
                'data' => $data
            ];
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

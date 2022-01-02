<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Listing_Amenities;

class ListingAmenitiesController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => false
    ];

    function add($data)
    {
        Listing_Amenities::create($data);
    }

    function get_listing_amenities_id($id)
    {

        $data = Listing_Amenities::where('listing_id', $id)->pluck('amenity_id');
        $this->response['data'] = $data;
        $this->response['status'] = true;

        return response()->json($this->response, $this->success_code);
    }
}

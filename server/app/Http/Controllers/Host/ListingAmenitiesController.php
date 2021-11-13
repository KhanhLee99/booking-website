<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Listing_Amenities;

class ListingAmenitiesController extends Controller
{
    //
    function add($data) {
        Listing_Amenities::create($data);
    }
}

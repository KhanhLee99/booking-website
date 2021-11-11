<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Room_Bed_Type;

class RoomBedTypeController extends Controller
{
    //  
    function add($data) {
        Room_Bed_Type::create($data);
    }
}

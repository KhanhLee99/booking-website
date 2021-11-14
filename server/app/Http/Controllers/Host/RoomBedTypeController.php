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

    function get_by_room_id($room_id) {
        return Room_Bed_Type::where('room_id', $room_id)->select('id', 'bed_type_id', 'bed_count')->get();
    }
}

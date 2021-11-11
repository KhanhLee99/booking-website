<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Room;

class RoomController extends Controller
{
    //
    function add($data) {
        Room::create($data);
    }
}

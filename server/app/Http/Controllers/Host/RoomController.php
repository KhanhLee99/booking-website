<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Room;

class RoomController extends Controller
{
    //

    function list() {
        return response()->json(Room::orderBy('id', 'desc')->get());
    }

    function add($data) {
        Room::create($data);
    }

    function delete($id) {
        $room = Room::find($id);
        if ($room) {
            $room->delete();
        }
    }
}

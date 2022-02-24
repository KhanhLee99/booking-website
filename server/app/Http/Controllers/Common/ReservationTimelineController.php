<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Models\Reservation_Timeline;
use Illuminate\Http\Request;

class ReservationTimelineController extends Controller
{
    //
    function add($reservation_id, $reservation_status_id, $user_id)
    {
        Reservation_Timeline::create([
            'reservation_id' => $reservation_id,
            'reservation_status_id' => $reservation_status_id,
            'user_id' => $user_id,
        ]);
    }
}

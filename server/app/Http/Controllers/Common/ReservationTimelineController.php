<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Models\Reservation_Timeline;
use Exception;
use Illuminate\Http\Request;

class ReservationTimelineController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => false
    ];
    function add($reservation_id, $reservation_status_id, $user_id)
    {
        Reservation_Timeline::create([
            'reservation_id' => $reservation_id,
            'reservation_status_id' => $reservation_status_id,
            'user_id' => $user_id,
        ]);
    }

    public function get_timeline_by_reservation_id(Request $request, $id)
    {
        try {
            $user_login = $request->user('api');
            $timeline = Reservation_Timeline::where('reservation_id', $id)
                ->join('users', 'users.id', 'timeline_reservation.user_id')
                ->join('reservation', 'reservation.id', 'timeline_reservation.reservation_id')
                ->join('listing', 'listing.id', 'reservation.listing_id')
                ->select('users.name as cardTitle', 'timeline_reservation.reservation_status_id', 'timeline_reservation.created_at as title')
                ->selectRaw('(CASE WHEN users.id = ' . $user_login->id . ' THEN 1 ELSE 0 END) AS is_me')
                ->selectRaw('(CASE WHEN listing.user_id = timeline_reservation.user_id THEN 1 ELSE 0 END) AS is_host')
                ->get();
            $this->response = [
                'status' => true,
                'data' => $timeline,
            ];
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

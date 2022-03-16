<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Reservation;
use Exception;
use Illuminate\Http\Request;

class AdminBookingController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => false
    ];

    public function index(Request $request)
    {
        try {
            $query = Reservation::join('listing', 'listing.id', '=', 'reservation.listing_id')
                ->join('users', 'users.id', '=', 'reservation.guest_id')
                ->orderBy('reservation.id', 'desc')
                ->select('reservation.*', 'listing.name as listing_name', 'listing.avatar_url as listing_thumb', 'listing.id as listing_id', 'listing.street_address', 'users.name as user_name', 'users.email as user_email', 'users.avatar_url as user_avatar', 'users.id as user_id');

            if ($id = $request->id) {
                $query->where('reservation.id', $id);
            }
            $data = $query->paginate($request->limit);
            $this->response = [
                'status' => true,
                'data' => $data,
            ];
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

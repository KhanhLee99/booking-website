<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use App\Reservation;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    public function get_reservation_by_user_id($id)
    {
        try {
            $result = Reservation::where('guest_id', '=', $id)->get();
            if ($result) {
                $this->response = [
                    'status' => 'success',
                    'data' => $result
                ];
                return response()->json($this->response);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function get_reservation_listing_in_month($id, Request $request)
    {
        try {
            $result = DB::table('reservation')
                ->where([
                    ['listing_id', '=', $id],
                    ['checkin_date', '>', $request->month]
                ])
                ->join('users', 'users.id', '=', 'reservation.guest_id')
                ->select('reservation.*', 'users.name as username')
                ->get();
            // $result = Reservation::where([
            //     ['listing_id', '=', $id],
            //     ['checkin_date', '>', $request->month]
            // ])->get();
            if ($result) {
                $this->response = [
                    'status' => 'success',
                    'data' => $result
                ];
                return response()->json($this->response);
            }
            return response()->json($this->response, 401);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function index()
    {
        try {
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function add(Request $request)
    {
        try {
            if (Reservation::create($request->all())) {
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function edit(Request $request, $id)
    {
        try {
            $reservation = Reservation::find($id);
            if ($reservation) {
                $reservation->update($request->all());
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function delete($id)
    {
        try {
            $reservation = Reservation::find($id);
            if ($reservation) {
                $reservation->delete();
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            $this->response['errorMessage'] = "Record có id = $id không tồn tại";
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function get_host_booking($host_id)
    {
        try {
            $data = DB::table('reservation')
                ->join('users', 'users.id', '=', 'reservation.guest_id')
                ->join('listing', 'listing.id', '=', 'reservation.listing_id')
                ->where('listing.user_id', $host_id)
                ->orderBy('reservation.id', 'desc')
                ->select('reservation.id as reservation_id', 'reservation.total_price', 'listing.name as listing_name', 'users.name as user_name', 'reservation.created_at as created_at')
                ->get();
            if ($data) {
                $this->response = [
                    'status' => 'success',
                    'data' => $data
                ];
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 401);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

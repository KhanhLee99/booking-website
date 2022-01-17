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

    public function get_host_booking(Request $request, $host_id)
    {
        try {
            $filter = $request->filter;
            switch ($filter) {
                case 'request':
                    $data = DB::table('reservation')
                        ->join('users', 'users.id', '=', 'reservation.guest_id')
                        ->join('listing', 'listing.id', '=', 'reservation.listing_id')
                        ->where('listing.user_id', $host_id)
                        ->where('reservation_status_id', 1)
                        ->orderBy('reservation.id', 'desc')
                        ->join('reservation_status', 'reservation_status.id', '=', 'reservation.reservation_status_id')
                        ->select('reservation.*', 'listing.name as listing_name', 'listing.street_address', 'listing.avatar_url as thumb_img', 'users.name as user_name', 'users.avatar_url as user_avatar_url', 'reservation_status.name as status')
                        ->paginate($request->limit);
                    break;
                case 'upcoming':
                    break;
                case 'today':
                    break;
                default:
                    $data = DB::table('reservation')
                        ->join('users', 'users.id', '=', 'reservation.guest_id')
                        ->join('listing', 'listing.id', '=', 'reservation.listing_id')
                        ->where('listing.user_id', $host_id)
                        ->orderBy('reservation.id', 'desc')
                        ->join('reservation_status', 'reservation_status.id', '=', 'reservation.reservation_status_id')
                        ->select('reservation.*', 'listing.name as listing_name', 'listing.street_address', 'listing.avatar_url as thumb_img', 'users.name as user_name', 'users.avatar_url as user_avatar_url', 'reservation_status.name as status')
                        ->paginate($request->limit);
                    break;
            }

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

    public function get_my_reservation(Request $request)
    {
        $user_login = $request->user('api');
        $data = DB::table('reservation')
            ->where('guest_id', $user_login->id)
            ->join('listing', 'listing.id', '=', 'reservation.listing_id')
            ->orderBy('reservation.id', 'desc')
            ->join('reservation_status', 'reservation_status.id', '=', 'reservation.reservation_status_id')
            ->select('reservation.*', 'listing.name as listing_name', 'listing.avatar_url as thumb_img',  'listing.street_address', 'reservation_status.name as status')
            ->get();
        if ($data) {
            $this->response = [
                'status' => 'success',
                'data' => $data
            ];
            return response()->json($this->response);
        }
        return response()->json($this->response, 400);
    }

    public function get_reservation_by_user_id($id)
    {
        try {
            $data = DB::table('reservation')
                ->where('guest_id', $id)
                ->join('users', 'users.id', '=', 'reservation.guest_id')
                ->join('listing', 'listing.id', '=', 'reservation.listing_id')
                ->orderBy('reservation.id', 'desc')
                ->select('reservation.id as reservation_id', 'reservation.total_price', 'listing.name as listing_name', 'users.name as user_name', 'reservation.created_at as created_at')
                ->get();
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

    public function get_detail_reservation($id)
    {
        try {
            $data = DB::table('reservation')
                ->join('users', 'users.id', '=', 'reservation.guest_id')
                ->where('reservation.id', $id)
                ->join('listing', 'listing.id', '=', 'reservation.listing_id')
                ->orderBy('reservation.id', 'desc')
                ->join('reservation_status', 'reservation_status.id', '=', 'reservation.reservation_status_id')
                ->select('reservation.*', 'listing.name as listing_name', 'listing.street_address', 'listing.avatar_url as thumb_img', 'users.name as user_name', 'users.avatar_url as user_avatar_url', 'reservation_status.name as status')
                ->get();
            if ($data) {
                $this->response = [
                    'status' => 'success',
                    'data' => $data[0]
                ];
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function edit_status(Request $request, $id)
    {
        try {
            $reservation = Reservation::find($id);
            if ($reservation) {
                $reservation->update(['reservation_status_id' => $request->reservation_status_id]);
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

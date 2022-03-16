<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Website_Infomation;
use App\Reservation;
use Exception;
use Illuminate\Http\Request;

class AdminPaymentController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => false
    ];
    public function add(Request $request)
    {
        try {
            $reservation_id = $request->reservation_id;
            if ($reservation_id) {
                $reservation = Reservation::find($reservation_id);
            } else {
                $reservation = Reservation::where([
                    ['checkin_date', $request->checkin_date],
                    ['checkout_date', $request->checkout_date],
                    ['guest_id', $request->guest_id],
                    ['listing_id', $request->listing_id],
                    ['reservation_status_id', $request->reservation_status_id],
                ])->first();
            }

            $webInfo = Website_Infomation::first();
            $fee_percent = $webInfo->usage_fee_percentage;
            $total_price = $reservation->total_price;
            $host_recive = $total_price * (100 - $fee_percent) / 100;
            $web_recive = $total_price * $fee_percent / 100;
            $data = [
                'total_price' => $total_price,
                'host_recive' => $host_recive,
                'web_recive' => $web_recive,
                'reservation_id' => $reservation_id,
            ];

            if (Payment::create($data)) {
                $this->response = [
                    'status' => true,
                ];
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public  function index(Request $request)
    {
        try {

            $query = Payment::join('reservation', 'reservation.id', '=', 'payment.reservation_id')
                ->join('users', 'users.id', '=', 'reservation.guest_id')
                ->orderBy('payment.created_at', 'desc')
                ->select('payment.*', 'users.name as user_name', 'users.email as user_email', 'users.avatar_url as user_avatar');
            if ($id = $request->id) {
                $query->where('payment.reservation_id', $id);
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

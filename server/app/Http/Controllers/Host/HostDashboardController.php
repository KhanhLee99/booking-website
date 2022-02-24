<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use App\Listing;
use App\Models\Payment;
use App\Reservation;
use App\Review_Listing;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HostDashboardController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => false
    ];

    public function overview(Request $request)
    {
        try {
            $user_id = $request->user('api')->id;
            $total_listing = $this->get_total_host_listing($user_id);
            $total_reservation = $this->get_total_reservation($user_id);
            $total_review = $this->get_total_review($user_id);
            $total_revenue = $this->get_total_revenue($user_id);
            $this->response = [
                'status' => true,
                'data' => [
                    'total_listing' => $total_listing,
                    'total_reservation' => $total_reservation,
                    'total_review' => $total_review,
                    'total_revenue' => $total_revenue,
                ]
            ];
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function get_total_host_listing($user_id)
    {
        $listing_count = Listing::whereNull('deleted_at')
            ->where('status', '!=', 'block_activity')
            ->where('user_id', '=', $user_id)
            ->count();
        return $listing_count;
    }

    public function get_total_reservation($user_id)
    {
        $total_reservation = Reservation::join('listing', 'reservation.listing_id', '=', 'listing.id')
            ->where('listing.user_id', $user_id)->count();
        return $total_reservation;
    }

    public function get_total_review($user_id)
    {
        $total_review = Review_Listing::join('listing', 'review_listing.listing_id', '=', 'listing.id')
            ->where('listing.user_id', $user_id)->count();
        return $total_review;
    }

    public function get_total_revenue($user_id)
    {
        $revenue = Payment::select(DB::raw('sum(host_recive) as total'))
            ->join('reservation', 'reservation.id', '=', 'payment.reservation_id')
            ->join('listing', 'listing.id', '=', 'reservation.listing_id')
            ->where('listing.user_id', '=', $user_id)
            ->first();
        return $revenue->total;
    }
}

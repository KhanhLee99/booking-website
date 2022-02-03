<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Listing;
use App\Models\Notification;
use Exception;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => false
    ];

    // user booking - send to host
    public function send_notify_user_booking($guest_id, $listing_id)
    {
        $listing = Listing::find($listing_id);
        try {
            Notification::create([
                'title' => 'New reservation',
                'message' => 'New reservation at' . $listing->name,
                'receiver_id' => $listing->user_id,
            ]);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    // user booking - send to user booking success
    public function send_notify_booking_success($guest_id, $listing_id)
    {
        $listing = Listing::find($listing_id);
        try {
            Notification::create([
                'title' => 'Booking success',
                'message' => "Your reservation at <a href='#'>" . $listing->name . "</a> success",
                'receiver_id' => $guest_id,
            ]);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function send_notify_edit_status($status, $reservation)
    {
        try {
            $listing_id = $reservation->listing_id;
            $listing = Listing::find($listing_id);
            $title_host = $message_host = $title_user = $message_user = '';

            switch ($status) {
                case 1: // Request
                    $title_host = '';
                    $message_host = '';
                    $title_user = '';
                    $message_user = '';
                    break;
                case 2: // Accept
                    $title_host = 'Accept Reservation';
                    $message_host = "Reservation at <a href='#'>" . $listing->name . "</a> accepted";
                    $title_user = 'Accept Reservation';
                    $message_user = "Reservation at <a href='#'>" . $listing->name . "</a> accepted";

                    break;
                case 3: // Paid
                    $title_host = '';
                    $message_host = '';
                    $title_user = '';
                    $message_user = '';
                    break;
                case 4: // Cancel
                    $title_host = 'Cancel Reservation';
                    $message_host = "Reservation at <a href='#'>" . $listing->name . "</a> cancelled";
                    $title_user = 'Cancel Reservation';
                    $message_user = "Reservation at <a href='#'>" . $listing->name . "</a> cancelled";
                    break;
                case 5: //  Checkin
                    $title_host = '';
                    $message_host = '';
                    $title_user = '';
                    $message_user = '';
                    break;
                case 6: // Checkout
                    $title_host = '';
                    $message_host = '';
                    $title_user = '';
                    $message_user = '';
                    break;
                case 7: // Decline
                    $title_host = 'Decline Reservation';
                    $message_host = "Reservation at <a href='#'>" . $listing->name . "</a> declined";
                    $title_user = 'Decline Reservation';
                    $message_user = "Reservation at <a href='#'>" . $listing->name . "</a> declined";
                    break;
                default:
                    break;
            }

            if (strlen($title_host) > 0 && strlen($message_host) > 0) {
                Notification::create([
                    'title' => $title_host,
                    'message' => $message_host,
                    'receiver_id' => $listing->user_id,
                ]);
            }

            if (strlen($title_user) > 0 && strlen($message_user) > 0) {
                Notification::create([
                    'title' => $title_user,
                    'message' => $message_user,
                    'receiver_id' => $reservation->guest_id,
                ]);
            }
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    // admin active listing - send to host
    public function send_notify_active_listing($listing_id)
    {
        try {
            $listing = Listing::find($listing_id);
            Notification::create([
                'title' => 'Active Listing',
                'message' => "Listing <a href='#'>" . $listing->name . "actived",
                'receiver_id' => $listing->user_id,
            ]);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    // user add review - send to host
    public function send_notify_add_review($listing_id)
    {
        try {
            $listing = Listing::find($listing_id);
            Notification::create([
                'title' => 'New Review',
                'message' => "Listing <a href='#'>" . $listing->name . "has new review",
                'receiver_id' => $listing->user_id,
            ]);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    // get user notification
    public function get_user_notify(Request $request)
    {
        try {
            $current_user = $request->user('api');
            if ($current_user) {
                $notifications = Notification::where('receiver_id', $current_user->id)
                    ->orderBy('id', 'desc')
                    ->get();
                $this->response = [
                    'status' => true,
                    'data' => $notifications,
                ];
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }



    public function get_total_noti_unread(Request $request)
    {
        try {
            $current_user = $request->user('api');
            if ($current_user) {
                $total_unread = Notification::where([
                    ['receiver_id', $current_user->id],
                    ['is_read', 0]
                ])->count();
                $this->response = [
                    'status' => true,
                    'total_unread' => $total_unread
                ];
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 401);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function seen_notifications(Request $request)
    {
        try {
            $current_user = $request->user('api');
            if ($current_user) {
                if (Notification::where([
                    ['receiver_id', $current_user->id],
                    ['is_read', 0]
                ])->update(['is_read' => 1])) {
                    $this->response['status'] = true;
                    return response()->json($this->response, $this->success_code);
                }
                return response()->json($this->response, 400);
            }
            return response()->json($this->response, 401);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Common\NotificationController;
use App\Http\Controllers\Common\ReservationTimelineController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Helper\TotalDateController;
use App\Listing;
use App\Models\Payment;
use App\Models\Reservation_Timeline;
use App\Models\Website_Infomation;
use Illuminate\Http\Request;
use Exception;
use App\Reservation;
use Carbon\Carbon;
use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    public function __construct()
    {
        $this->totalDateController = new TotalDateController();
        $this->notificationController = new NotificationController();
        $this->reservationTimelineController = new ReservationTimelineController();
    }

    public function get_host_booking(Request $request, $host_id)
    {
        try {
            $filter = $request->filter;
            $query = $data = DB::table('reservation')
                ->join('users', 'users.id', '=', 'reservation.guest_id')
                ->join('listing', 'listing.id', '=', 'reservation.listing_id')
                ->where('listing.user_id', $host_id)
                ->orderBy('reservation.id', 'desc')
                ->join('reservation_status', 'reservation_status.id', '=', 'reservation.reservation_status_id')
                ->select('reservation.*', 'listing.name as listing_name', 'listing.street_address', 'listing.avatar_url as thumb_img', 'users.name as user_name', 'users.avatar_url as user_avatar_url', 'users.email as user_email', 'users.phone_number as user_phone', 'reservation_status.name as status');
            switch ($filter) {
                case 'request':
                    $query->where('reservation.reservation_status_id', 1);
                    break;
                case 'upcoming':
                    $query->where('reservation.reservation_status_id', 3)
                        ->whereBetween('reservation.checkin_date', [Carbon::now()->addDay(), Carbon::now()->addDays(7)]);
                    break;
                case 'checkin':
                    $query->where('reservation.reservation_status_id', 3)
                        ->where('reservation.checkin_date', '<=', Carbon::now())
                        ->where('reservation.checkout_date', '>=', Carbon::now());
                    break;
                default:
                    break;
            }

            $data = $query->paginate($request->limit);

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
            ->join('users', 'listing.user_id', '=', 'users.id')
            ->select('reservation.*', 'listing.name as listing_name', 'listing.avatar_url as thumb_img',  'listing.street_address', 'reservation_status.name as status', 'users.name as host_name', 'users.avatar_url as host_avatar', 'users.id as host_id')
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
            $dateS = Carbon::createFromFormat('Y-m-d', $request->month)->startOfMonth();
            $dateE = Carbon::createFromFormat('Y-m-d', $request->month)->startOfMonth()->addMonth(12);

            $result = DB::table('reservation')
                ->where('listing_id', '=', $id)
                ->where(function ($query) use ($dateS, $dateE) {
                    $query->where(function ($q) use ($dateS, $dateE) {
                        $q->whereBetween('checkin_date', [$dateS, $dateE])
                            ->whereBetween('checkout_date', [$dateS, $dateE]);
                    })
                        ->orWhere(function ($q) use ($dateS, $dateE) {
                            $q->where('checkin_date', '<', $dateS)
                                ->whereBetween('checkout_date', [$dateS, $dateE]);
                        })
                        ->orWhere(function ($q) use ($dateS, $dateE) {
                            $q->where('checkin_date', '<', $dateS)
                                ->where('checkout_date', '>=', $dateE);
                        })
                        ->orWhere(function ($q) use ($dateS, $dateE) {
                            $q->whereBetween('checkin_date', [$dateS, $dateE])
                                ->where('checkout_date', '>', $dateE);
                        });
                })
                ->join('users', 'users.id', '=', 'reservation.guest_id')
                ->select('reservation.*', 'users.name as username')
                ->get();
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

    public function get_reservation_by_id($id)
    {
        try {
            $reservation = Reservation::find($id);
            if ($reservation) {
                $this->response = [
                    'status' => 'success',
                    'data' => $reservation,
                ];
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function add(Request $request)
    {
        try {
            if (Reservation::create($request->all())) {
                // Reservation_Timeline
                $this->notificationController->send_notify_user_booking($request->guest_id, $request->listing_id);
                $this->notificationController->send_notify_booking_success($request->guest_id, $request->listing_id);
                $last = Reservation::where('guest_id', $request->user('api')->id)->orderBy('id', 'desc')->first();
                if ($last) {
                    Reservation_Timeline::create([
                        'reservation_id' => $last->id,
                        'reservation_status_id' => $last->reservation_status_id,
                        'user_id' =>  $request->user('api')->id,
                    ]);
                }
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
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
                $this->reservationTimelineController->add();
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
                ->join('listing_type', 'listing_type.id', '=', 'listing.listing_type_id')
                ->join('users as hosts', 'hosts.id', '=', 'listing.user_id')
                ->orderBy('reservation.id', 'desc')
                ->join('reservation_status', 'reservation_status.id', '=', 'reservation.reservation_status_id')
                ->select(
                    'reservation.*',
                    'listing.name as listing_name',
                    'listing.street_address',
                    'listing.avatar_url as thumb_img',
                    'listing.price_per_night_base',
                    'users.name as user_name',
                    'users.avatar_url as user_avatar_url',
                    'users.email as user_email',
                    'users.phone_number as user_phone_number',
                    'reservation_status.name as status',
                    'hosts.name as host_name',
                    'hosts.id as host_id',
                    'hosts.avatar_url as host_avatar_url',
                    'hosts.phone_number as host_phone_number',
                    'hosts.email as host_email',
                    'listing_type.name as listing_type',
                    'listing.price_per_night_base'
                )
                ->get();



            if ($data) {
                $this->response = [
                    'status' => 'success',
                    'data' => $data[0],
                    'detail_price' => $this->count_total_price_2(explode(" ", $data[0]->checkin_date)[0], explode(" ", $data[0]->checkout_date)[0], $data[0]->listing_id),
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
            $user_current = $request->user('api');
            $reservation = Reservation::find($id);
            if ($reservation) {
                $reservation->update(['reservation_status_id' => $request->reservation_status_id]);
                Reservation_Timeline::create([
                    'reservation_id' => $id,
                    'reservation_status_id' => $request->reservation_status_id,
                    'user_id' => $user_current->id,
                ]);
                $this->notificationController->send_notify_edit_status($request->reservation_status_id, $reservation);
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function count_total_price(Request $request)
    {
        try {
            $data = $this->count_total_price_2($request->checkin, $request->checkout, $request->listing_id);
            if ($data) {
                $this->response = [
                    'status' => 'success',
                    'data' => $data
                ];
                return response()->json($this->response, 200);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function count_total_price_2($checkin, $checkout, $listing_id)
    {
        try {
            $total_week = $this->week_between_two_dates($checkin, $checkout);
            $total_month = $this->month_between_two_dates($checkin, $checkout);
            $listing = Listing::where('id', $listing_id)->first();


            if ($listing) {

                $price_base = $listing->price_per_night_base;
                $price_weekend = $listing->price_per_night_weekend;
                $discount_weekly = $listing->discount_weekly;
                $discount_monthly = $listing->discount_monthly;
                $discount = 0;

                $number_normal_days = $this->totalDateController->number_of_working_days($checkin, $checkout);
                $number_weekend_days = $this->totalDateController->number_of_weekend_days($checkin, $checkout);
                in_array(date("N", strtotime($checkout)), [6, 7]) ? $number_weekend_days -= 1 : $number_normal_days -= 1;

                $total_price = $number_normal_days * $price_base + $number_weekend_days * $price_weekend;

                $web_info = Website_Infomation::first();
                $fee_percent = 0;
                if ($web_info) {
                    $fee_percent = $web_info->usage_fee_percentage;
                }
                $fee = $total_price * $fee_percent / 100;

                $data = [
                    'nights' => $number_weekend_days + $number_normal_days,
                    'rental_price' => $total_price,
                    'discount' => $discount,
                    'total_price' => $total_price,
                    'discount_mothly' => false,
                    'discount_weekly' => false,
                    'fee' => $fee,
                    'host_receive' => $total_price - $fee,
                ];


                if ($total_month > 0) {
                    $discount = $total_price * $discount_monthly / 100;
                    $fee = ($total_price - $discount) * $fee_percent / 100;
                    if ($discount > 0) {
                        $data['discount'] = $discount;
                        $data['total_price'] = $total_price - $discount;
                        $data['discount_mothly'] = true;
                        $data['fee'] = $fee;
                        $data['host_receive'] = $total_price - $discount - $fee;
                    }
                } else if ($total_week > 0) {
                    $discount = $total_price * $discount_weekly / 100;
                    $fee = ($total_price - $discount) * $fee_percent / 100;

                    if ($discount > 0) {
                        $data['discount'] = $discount;
                        $data['total_price'] = $total_price - $discount;
                        $data['discount_weekly'] = true;
                        $data['fee'] = $fee;
                        $data['host_receive'] = $total_price - $discount - $fee;
                    }
                }

                return $data;

                // $this->response = [
                //     'status' => 'success',
                //     'data' => $data
                // ];
                // return response()->json($this->response, 200);
            }
            // return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    function week_between_two_dates($date1, $date2)
    {
        $first = DateTime::createFromFormat('Y/m/d', str_replace('-', '/', $date1));
        $second = DateTime::createFromFormat('Y/m/d', str_replace('-', '/', $date2));
        if ($date1 > $date2) return $this->week_between_two_dates($date2, $date1);
        return floor($first->diff($second)->days / 7);
    }

    function month_between_two_dates($date1, $date2)
    {
        $ts1 = strtotime($date1);
        $ts2 = strtotime($date2);

        $year1 = date('Y', $ts1);
        $year2 = date('Y', $ts2);

        $month1 = date('m', $ts1);
        $month2 = date('m', $ts2);

        $diff = (($year2 - $year1) * 12) + ($month2 - $month1);
        return $diff;
    }

    public function check_reservation_free(Request $request)
    {
        try {
            $list = Reservation::where([
                ['listing_id', '=', $request->listing_id],
                ['checkin_date', '<', $request->checkout_date],
                ['checkout_date', '>', $request->checkin_date],
                ['checkout_date', '>', Carbon::now()],
            ])->get();

            if (count($list) > 0) {
                return response()->json($this->response, 400);
            }
            $this->response['status'] = 'success';
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response, 400);
        }
    }

    public function check_payment(Request $request, $id)
    {
        try {
            $user = $request->user('api');
            $reservation = Reservation::find($id);
            if ($reservation && $reservation->reservation_status_id == 2 && $reservation->guest_id == $user->id) {
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response, 400);
        }
    }
}

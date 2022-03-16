<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Common\NotificationController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Host\ListingController;
use Illuminate\Http\Request;
use App\Review_Listing;
use Exception;
use Illuminate\Support\Facades\DB;

class ReviewListingController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    function __construct()
    {
        $this->notificationController = new NotificationController();
        $this->listingController = new ListingController();
    }

    function index($id)
    {
        try {
            $reviews = DB::table('review_listing')
                ->where('listing_id', '=', $id)
                ->join('users', 'users.id', '=', 'review_listing.guest_id')
                ->orderBy('review_listing.id', 'DESC')
                ->select('review_listing.id', 'review_listing.note', 'review_listing.rating', 'review_listing.created_at', 'users.name', 'users.avatar_url')
                ->get();
            $this->response = [
                'status' => 'success',
                'data' => $reviews
            ];
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    function add(Request $request, $id)
    {
        try {
            $user_login = $request->user('api');
            $data = $request->all();
            $data['guest_id'] = $user_login->id;
            $data['listing_id'] = $id;
            if (Review_Listing::create($data)) {
                $this->notificationController->send_notify_add_review($id);
                $this->listingController->update_rating_listing($id);
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function get_review_by_host_id(Request $request)
    {
        try {
            $user_login = $request->user('api');
            if ($user_login) {
                $data = DB::table('review_listing')
                    ->join('listing', 'review_listing.listing_id', '=', 'listing.id')
                    ->join('users', 'review_listing.guest_id', '=', 'users.id')
                    ->where('listing.user_id', $user_login->id)
                    ->orderBy('review_listing.id', 'DESC')
                    ->select('review_listing.note as content', 'review_listing.rating', 'review_listing.created_at', 'listing.name as listing_name', 'users.name as user_name', 'users.avatar_url as user_avatar')
                    ->paginate($request->limit);
                if ($data) {
                    $this->response = [
                        'status' => 'success',
                        'data' => $data
                    ];
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

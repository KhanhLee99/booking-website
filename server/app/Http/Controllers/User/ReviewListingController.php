<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
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

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Listing;
use App\Review_Listing;
use App\User;
use Exception;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => false
    ];

    public function index()
    {
        try {
            $listing_count = Listing::count();
            $host_count = User::where('role_id', 2)->count();
            $review_count = Review_Listing::count();
            $this->response = [
                'status' => true,
                'data' => [
                    'listing_count' => $listing_count,
                    'host_count' => $host_count,
                    'review_count' => $review_count
                ]
            ];
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

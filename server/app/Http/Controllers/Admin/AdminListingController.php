<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Listing;
use Exception;
use Illuminate\Http\Request;

class AdminListingController extends Controller
{
    private $success_code = 200;
    private $response = [
        'status' => false
    ];

    public function get_listing_pending()
    {
        try {
            $listing_pending = Listing::where('is_verified', 0)->orderBy('id', 'desc')->get();
            if ($listing_pending) {
                $this->response = [
                    'status' => true,
                    'data' => $listing_pending
                ];
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function get_listing_active()
    {
        try {
            $listing_active = Listing::where('is_verified', 1)->orderBy('id', 'desc')->get();
            if ($listing_active) {
                $this->response = [
                    'status' => true,
                    'data' => $listing_active
                ];
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function active_listing($id)
    {
        try {
            if (Listing::find($id)->update([
                'is_verified' => true
            ])) {
                $this->response['status'] = true;
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function lock_listing($id)
    {
        try {
            if (Listing::find($id)->update([
                'is_public' => false
            ])) {
                $this->response['status'] = true;
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

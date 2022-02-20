<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Common\NotificationController;
use App\Http\Controllers\Controller;
use App\Listing;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminListingController extends Controller
{
    private $success_code = 200;
    private $response = [
        'status' => false
    ];

    public function __construct()
    {
        $this->notificationController = new NotificationController();
    }

    public function get_listing_pending(Request $request)
    {
        try {
            $listing_pending = Listing::where('is_verified', 0)->orderBy('id', 'desc')->paginate($request->limit);
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

    public function get_listing_active(Request $request)
    {
        try {
            $listing_active = Listing::where('is_verified', 1)->orderBy('id', 'desc')->paginate($request->limit);
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
                $this->notificationController->send_notify_active_listing($id);
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

    public function cout_listing_filter()
    {
        // public function monthlyRegisteredUsers()
        // {
        //     $counts = User::select(DB::raw('MONTH(created_at) month, count(*) as count'))
        //         ->whereYear('created_at', Carbon::now()->format('Y'))
        //         ->groupBy(DB::raw('MONTH(created_at)'))
        //         ->pluck('count', 'month')
        //         ->toArray();
        //     return array_map(function ($month) use ($counts) {
        //         return Arr::get($counts, $month, 0);
        //     }, range(1, 12));
        // }
        try {
            $counts = Listing::select('is_verified', DB::raw('count(*) as total'))->groupBy('is_verified')
                ->get();
            $data = [];
            foreach ($counts as $item) {
                if ($item->is_verified == 0) {
                    $data['total_pending'] = $item->total;
                }
                if ($item->is_verified == 1) {
                    $data['total_active'] = $item->total;
                }
            }
            return $data;
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

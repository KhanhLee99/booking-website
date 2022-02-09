<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Listing;
use App\Models\Payment;
use App\Reservation;
use App\Review_Listing;
use App\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

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

    public function get_chart_data()
    {

        // earning
        $earnings_data = Payment::select(DB::raw('MONTH(created_at) month, YEAR(created_at) year, sum(web_recive) as total'))
            ->whereBetween('created_at', [Carbon::now()->subYear()->addMonth(), Carbon::now()])
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->groupBy(DB::raw('MONTH(created_at), YEAR(created_at)'))
            ->get();

        $chart_earnings_data = [];

        foreach ($earnings_data as $key => $item) {
            $chart_earnings_data['milestones'][$key] = date("M Y", strtotime($item->year . '-' . sprintf("%'.02d", $item->month)));
            $chart_earnings_data['total'][$key] = $item->total;
        }

        // reservation
        $reservations_data = Reservation::select(DB::raw('MONTH(checkin_date) month, YEAR(checkin_date) year, count(*) as count'))
            ->whereBetween('checkin_date', [Carbon::now()->subMonths(5), Carbon::now()])
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->groupBy(DB::raw('MONTH(checkin_date), YEAR(checkin_date)'))
            ->get();

        $chart_reservations_data = [];

        foreach ($reservations_data as $key => $item) {
            $chart_reservations_data['milestones'][$key] = date("M", strtotime($item->year . '-' . sprintf("%'.02d", $item->month)));
            $chart_reservations_data['count'][$key] = $item->count;
        }

        // user
        $users_data = User::select(DB::raw('MONTH(created_at) month, YEAR(created_at) year, count(*) as count'))
            ->whereBetween('created_at', [Carbon::now()->subYear()->addMonth(), Carbon::now()])
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->groupBy(DB::raw('MONTH(created_at), YEAR(created_at)'))
            ->get();

        $chart_users_data = [];

        foreach ($users_data as $key => $item) {
            $chart_users_data['milestones'][$key] = date("M Y", strtotime($item->year . '-' . sprintf("%'.02d", $item->month)));
            $chart_users_data['count'][$key] = $item->count;
        }

        //host
        $hosts_data = User::select(DB::raw('MONTH(created_at) month, YEAR(created_at) year, count(*) as count'))
            ->where('role_id', 2)
            ->whereBetween('created_at', [Carbon::now()->subYear()->addMonth(), Carbon::now()])
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->groupBy(DB::raw('MONTH(created_at), YEAR(created_at)'))
            ->get();

        $chart_hosts_data = [];

        foreach ($hosts_data as $key => $item) {
            $chart_hosts_data['milestones'][$key] = date("M Y", strtotime($item->year . '-' . sprintf("%'.02d", $item->month)));
            $chart_hosts_data['count'][$key] = $item->count;
        }

        $this->response = [
            'status' => true,
            'data' => [
                'chart_users_data' => $chart_users_data,
                'chart_hosts_data' => $chart_hosts_data,
                'chart_earnings_data' => $chart_earnings_data,
                'chart_reservations_data' => $chart_reservations_data
            ]
        ];
        return response()->json($this->response, $this->success_code);
    }

    public function get_chart_earnings_system_data()
    {
        $total = Payment::select(DB::raw('MONTH(created_at) month, YEAR(created_at) year, sum(web_recive) as total'))
            ->whereYear('created_at', Carbon::now()->subYear()->format('Y'))
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->pluck('total', 'month')
            ->toArray();
        return $total;
    }

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

    // public function monthlyRegisteredUsers()
    // {
    //     return array_map(function ($month) {
    //         return User::whereMonth('created_at', $month)->whereYear('created_at', Carbon::now()->format('Y'))->count();
    //     }, range(1, 12));
    // }
}

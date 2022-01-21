<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Block_Booking;
use Exception;
use Illuminate\Support\Carbon;

class BlockBookingController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    function add(Request $request)
    {
        try {
            if (Block_Booking::create($request->all())) {
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    function index($id)
    {
        try {
            $result = Block_Booking::where([
                ['listing_id', '=', $id],
                ['end_date', '>', Carbon::today()]
            ])->get();
            if ($result) {
                $this->response = [
                    'status' => 'success',
                    'data' => $result
                ];
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    function edit(Request $request, $id)
    {
        try {
            $block_booking = Block_Booking::find($id);
            if ($block_booking) {
                $block_booking->update($request->all());
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function get_block_date_in_month($id, Request $request)
    {
        try {
            $dateS = Carbon::createFromFormat('Y-m-d', $request->month)->startOfMonth();
            $dateE = Carbon::createFromFormat('Y-m-d', $request->month)->startOfMonth()->addMonth(12);
            // $result = Block_Booking::where('listing_id', $id)
            //     ->whereBetween('start_date', [Carbon::createFromFormat('d-m-Y',  $request->month), Carbon::now()->addMonth()])
            //     ->orWhereBetween('end_date', [Carbon::createFromFormat('d-m-Y',  $request->month), Carbon::now()->addMonth()])
            //     ->get();
            $result = Block_Booking::where('listing_id', $id)
                ->where(function ($query) use ($dateS, $dateE) {
                    $query->where(function ($q) use ($dateS, $dateE) {
                        $q->whereBetween('start_date', [$dateS, $dateE])
                            ->whereBetween('end_date', [$dateS, $dateE]);
                    })
                        ->orWhere(function ($q) use ($dateS, $dateE) {
                            $q->where('start_date', '<', $dateS)
                                ->whereBetween('end_date', [$dateS, $dateE]);
                        })
                        ->orWhere(function ($q) use ($dateS, $dateE) {
                            $q->where('start_date', '<', $dateS)
                                ->where('end_date', '>=', $dateE);
                        })
                        ->orWhere(function ($q) use ($dateS, $dateE) {
                            $q->whereBetween('start_date', [$dateS, $dateE])
                                ->where('end_date', '>', $dateE);
                        });
                })
                ->get();
            if ($result) {
                $this->response = [
                    'status' => 'success',
                    'data' => $result
                ];
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    
}

<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Listing;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;

class DetailListingController extends Controller
{
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    public function get_litings_location(Request $request)
    {
        try {
            $data = DB::table('listing')
                ->where('city_id', $request->city_id)
                ->join('listing_type', 'listing.listing_type_id', '=', 'listing_type.id')
                ->select('listing.id as listing_id', 'listing.name', 'listing.street_address', 'listing.avatar_url as listing_img', 'listing.bedroom_count', 'listing.price_per_night_base as price_per_night', 'listing.rating', 'listing_type.name as listing_type')
                ->paginate($request->limit);
            // ->get();
            $this->response = [
                'status' => 'success',
                'data' => $data
            ];
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function filter_by_listing_type(Request $request)
    {
        try {
            $data = DB::table('listing')
                ->where('city_id', $request->city_id)
                ->whereIn('listing_type_id', $request->list_type_id)
                ->join('listing_type', 'listing.listing_type_id', '=', 'listing_type.id')
                ->select('listing.id as listing_id', 'listing.name', 'listing.street_address', 'listing.avatar_url as listing_img', 'listing.bedroom_count', 'listing.price_per_night_base as price_per_night', 'listing.rating', 'listing_type.name as listing_type')
                ->paginate($request->limit);
            $this->response = [
                'status' => 'success',
                'data' => $data
            ];
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function filter_by_star(Request $request)
    {
        try {
            $rate = $request->rate;
            switch (count($rate)) {
                case 1:
                    $data = DB::table('listing')
                        ->where('city_id', $request->city_id)
                        ->whereBetween('rating', [$rate[0] - 0.5, $rate[0] + 0.5])
                        ->join('listing_type', 'listing.listing_type_id', '=', 'listing_type.id')
                        ->select('listing.id as listing_id', 'listing.name', 'listing.street_address', 'listing.avatar_url as listing_img', 'listing.bedroom_count', 'listing.price_per_night_base as price_per_night', 'listing.rating', 'listing_type.name as listing_type')
                        ->paginate($request->limit);
                    break;
                case 2:
                    $data = DB::table('listing')
                        ->where([
                            ['city_id', $request->city_id],
                            ['rating', '>=', $rate[0] - 0.5],
                            ['rating', '<=', $rate[0] + 0.5],
                        ])
                        ->orWhere([
                            ['city_id', $request->city_id],
                            ['rating', '>=', $rate[1] - 0.5],
                            ['rating', '<=', $rate[1] + 0.5],
                        ])
                        ->join('listing_type', 'listing.listing_type_id', '=', 'listing_type.id')
                        ->select('listing.id as listing_id', 'listing.name', 'listing.street_address', 'listing.avatar_url as listing_img', 'listing.bedroom_count', 'listing.price_per_night_base as price_per_night', 'listing.rating', 'listing_type.name as listing_type')
                        ->paginate($request->limit);
                    break;
                case 3:
                    $data = DB::table('listing')
                        ->where([
                            ['city_id', $request->city_id],
                            ['rating', '>=', $rate[0] - 0.5],
                            ['rating', '<=', $rate[0] + 0.5],
                        ])
                        ->orWhere([
                            ['city_id', $request->city_id],
                            ['rating', '>=', $rate[1] - 0.5],
                            ['rating', '<=', $rate[1] + 0.5],
                        ])
                        ->orWhere([
                            ['city_id', $request->city_id],
                            ['rating', '>=', $rate[2] - 0.5],
                            ['rating', '<=', $rate[2] + 0.5],
                        ])
                        ->join('listing_type', 'listing.listing_type_id', '=', 'listing_type.id')
                        ->select('listing.id as listing_id', 'listing.name', 'listing.street_address', 'listing.avatar_url as listing_img', 'listing.bedroom_count', 'listing.price_per_night_base as price_per_night', 'listing.rating', 'listing_type.name as listing_type')
                        ->paginate($request->limit);
                    break;
                case 4:
                    $data = DB::table('listing')
                        ->where([
                            ['city_id', $request->city_id],
                            ['rating', '>=', $rate[0] - 0.5],
                            ['rating', '<=', $rate[0] + 0.5],
                        ])
                        ->orWhere([
                            ['city_id', $request->city_id],
                            ['rating', '>=', $rate[1] - 0.5],
                            ['rating', '<=', $rate[1] + 0.5],
                        ])
                        ->orWhere([
                            ['city_id', $request->city_id],
                            ['rating', '>=', $rate[2] - 0.5],
                            ['rating', '<=', $rate[2] + 0.5],
                        ])
                        ->orWhere([
                            ['city_id', $request->city_id],
                            ['rating', '>=', $rate[3] - 0.5],
                            ['rating', '<=', $rate[3] + 0.5],
                        ])
                        ->join('listing_type', 'listing.listing_type_id', '=', 'listing_type.id')
                        ->select('listing.id as listing_id', 'listing.name', 'listing.street_address', 'listing.avatar_url as listing_img', 'listing.bedroom_count', 'listing.price_per_night_base as price_per_night', 'listing.rating', 'listing_type.name as listing_type')
                        ->paginate($request->limit);
                    break;

                case 5:
                    $data = DB::table('listing')
                        ->where([
                            ['city_id', $request->city_id],
                            ['rating', '>=', $rate[0] - 0.5],
                            ['rating', '<=', $rate[0] + 0.5],
                        ])
                        ->orWhere([
                            ['city_id', $request->city_id],
                            ['rating', '>=', $rate[1] - 0.5],
                            ['rating', '<=', $rate[1] + 0.5],
                        ])
                        ->orWhere([
                            ['city_id', $request->city_id],
                            ['rating', '>=', $rate[2] - 0.5],
                            ['rating', '<=', $rate[2] + 0.5],
                        ])
                        ->orWhere([
                            ['city_id', $request->city_id],
                            ['rating', '>=', $rate[3] - 0.5],
                            ['rating', '<=', $rate[3] + 0.5],
                        ])
                        ->orWhere([
                            ['city_id', $request->city_id],
                            ['rating', '>=', $rate[4] - 0.5],
                            ['rating', '<=', $rate[4] + 0.5],
                        ])
                        ->join('listing_type', 'listing.listing_type_id', '=', 'listing_type.id')
                        ->select('listing.id as listing_id', 'listing.name', 'listing.street_address', 'listing.avatar_url as listing_img', 'listing.bedroom_count', 'listing.price_per_night_base as price_per_night', 'listing.rating', 'listing_type.name as listing_type')
                        ->paginate($request->limit);
                    break;
                default:
                    break;
            }
            $this->response = [
                'status' => 'success',
                'data' => $data
            ];
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

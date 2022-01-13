<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Favorite;
use App\User;
use Exception;
use Illuminate\Support\Facades\DB;

class FavoriteController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    public function index(Request $request)
    {
        try {
            $user_id = $request->user('api')->id;
            $data = DB::table('favorite')
                ->where('favorite.user_id', '=', $user_id)
                ->join('listing', 'favorite.listing_id', '=', 'listing.id')
                ->join('listing_type', 'listing.listing_type_id', '=', 'listing_type.id')
                ->select('listing.id as listing_id', 'listing.name', 'listing.street_address', 'listing.avatar_url as listing_img', 'listing.bedroom_count', 'listing.price_per_night_base as price_per_night', 'listing.rating', 'listing_type.name as listing_type')
                // ->paginate($request->limit);
                ->get();
            // $result = $request->user('api')->Favorite;
            $this->response = [
                'status' => 'success',
                'data' => $data
            ];
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function add(Request $request)
    {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    "listing_id" => "required",
                ]
            );

            if ($validator->fails()) {
                $this->response['errorMessage'] = $validator->errors();
                return response()->json($this->response);
            }
            if ($listing_id = $request->listing_id) {
                $user_login = $request->user('api');

                if ($favorite = Favorite::where([
                    ["user_id", $user_login->id],
                    ["listing_id", $listing_id]
                ])->get()) {
                    if ($favorite->each->delete()) {
                        $this->response['status'] = 'success';
                        return response()->json($this->response, $this->success_code);
                    }
                } else {
                    $data = [
                        "user_id" => $user_login->id,
                        "listing_id" => $listing_id
                    ];

                    if (Favorite::create($data)) {
                        $this->response['status'] = 'success';
                        return response()->json($this->response, $this->success_code);
                    }
                }

                return response()->json($this->response);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

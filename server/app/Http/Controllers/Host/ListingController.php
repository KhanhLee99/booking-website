<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Listing;
use App\User;
use App\Http\Controllers\Host\RoomController;
use App\Http\Controllers\Host\RoomBedTypeController;
use Exception;

class ListingController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    public function index() {
        try {
            $listings = Listing::orderBy('id', 'desc')->get();
            if($listings) {
                $this->response = [
                    'status' => 'success',
                    'data' => $listings
                ];
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        } 
    }

    public function add(Request $request) {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    "name" => "required",
                ],
                [
                    'required' => ':attribute không để trống'
                ],
                [
                    'name' => 'Tên listing'
                ]
            );
            if ($validator->fails()) {
                $this->response['errorMessage'] = $validator->errors();
                return response()->json($this->response);
            }
            $data = $request->all();
            $data['user_id'] = $request->user('api')->id;
            if (Listing::create($data)) {
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function delete($id) {
        try {
            $listing = Listing::find($id);
            if ($listing) {
                $listing->delete();
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

    public function edit(Request $request, $id) {
        try {
            $listing = Listing::find($id);
            if ($listing) {
                $validator = Validator::make(
                    $request->all(),
                    [
                        "name" => "required",
                    ],
                    [
                        'required' => ':attribute không để trống'
                    ],
                    [
                        'name' => 'Tên listing'
                    ]
                );
                if ($validator->fails()) {
                    $this->response['errorMessage'] = $validator->errors();
                    return response()->json($this->response);
                }
                
                $data = $request->all();
                $listing->update($data);
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

    public function getListingsByUserId($user_id) {
        try {
            $listings = User::find($user_id)->Listings;
            $listings->makeHidden(['user_id']);
            $user = User::find($user_id);
            foreach ($listings as $listing) {
                $listing['user'] = $user;
            }
            $this->response = [
                'status' => 'success',
                'data' => $listings
            ];
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    function edit_bed_room(Request $request, $id) {
        try {
            $listing = Listing::find($id);
            if ($listing) {
                $room_controller = new RoomController;
                $room_bed_type_controller = new RoomBedTypeController;
                if ($bedroom_count = $request->bedroom_count) {
                    for ($i = 1; $i <= $bedroom_count; $i++) {
                        $room_controller->add([
                            'name' => 'Phòng '.$i,
                            'listing_id' => $id
                        ]);
                    }
                    
                    if ($rooms = $request->rooms) {
                        $rooms_count = count($rooms);
                        if ($rooms_count > 0) {
                            $rooms_by_listing_id = $listing->Rooms;
                            for ($i = 0; $i < $rooms_count; $i++) {
                                $bed_type_arr = $rooms[$i]['bed_type'];
                                $rooms_by_listing_id[$i]->update([
                                    'bed_count' => count($bed_type_arr)
                                ]);
                                foreach ($bed_type_arr as $bed_type) {
                                    $room_bed_type_controller->add([
                                        'room_id' => $rooms_by_listing_id[$i]['id'],
                                        'bed_type_id' => $bed_type
                                    ]);
                                }
                            }
                        }
                    }
                }

            }
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

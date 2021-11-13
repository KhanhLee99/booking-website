<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Listing;
use App\User;
use App\Room;
use App\Room_Bed_Type;
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

    public function __construct()
    {
        $this->room_controller = new RoomController;
        $this->room_bed_type_controller = new RoomBedTypeController;
    }

    public function index()
    {
        try {
            $listings = Listing::orderBy('id', 'desc')->get();
            if ($listings) {
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

    public function add(Request $request)
    {
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

    public function delete($id)
    {
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

    public function edit(Request $request, $id)
    {
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

    public function getListingsByUserId($user_id)
    {
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

    function edit_bed_room(Request $request, $id)
    {
        try {
            $listing = Listing::find($id);
            if ($listing) {
                // check input bedroom_count
                if ($bedroom_count = $request->bedroom_count) {
                    if ($bedroom_count > 0) {
                        // get list room by listing id
                        $rooms_by_listing_id = Room::where('listing_id','=',$id)->get();
                        $rooms_listing_count = count($rooms_by_listing_id);

                        // check rooms_count = 0 => add room
                        if ($rooms_listing_count == 0) {
                            $this->add_room($bedroom_count, $id);
                            if ($rooms = $request->rooms) {
                                $rooms_count = count($rooms);
                                if ($rooms_count > 0 && $rooms_count <= $bedroom_count) {
                                    $rooms_by_listing_id = $listing->Rooms;
                                    // return $rooms_by_listing_id;
                                    for ($i = 0; $i < $rooms_count; $i++) {
                                        $bed_type_arr = $rooms[$i]['bed_type'];
                                        $rooms_by_listing_id[$i]->update([
                                            'bed_count' => count($bed_type_arr)
                                        ]);
                                        foreach ($bed_type_arr as $bed_type) {
                                            $this->room_bed_type_controller->add([
                                                'room_id' => $rooms_by_listing_id[$i]['id'],
                                                'bed_type_id' => $bed_type
                                            ]);
                                        }
                                    }
                                }
                            }
                        } else if ($rooms_listing_count == $bedroom_count) { // check bed room type, bed count per room
                            if ($rooms = $request->rooms) {
                                $rooms_count = count($rooms);
                                if ($rooms_count > 0 && $rooms_count <= $bedroom_count) {
                                    for ($i = 0; $i < $rooms_count; $i++) {
                                        $bed_type_arr = $rooms[$i]['bed_type'];
                                        $this->edit_room_bed_type($rooms_by_listing_id[$i]['id'], $bed_type_arr);
                                    }
                                }
                            }
                        } else if ($rooms_listing_count < $bedroom_count) {
                            $this->add_room($bedroom_count - $rooms_listing_count, $id);
                            if ($rooms = $request->rooms) {
                                $rooms_count = count($rooms);
                                if ($rooms_count > 0 && $rooms_count <= $bedroom_count) {
                                    $rooms_by_listing_id = $listing->Rooms;
                                    for ($i = 0; $i < $rooms_count; $i++) {
                                        $bed_type_arr = $rooms[$i]['bed_type'];
                                        $this->edit_room_bed_type($rooms_by_listing_id[$i]['id'], $bed_type_arr);
                                    }
                                }
                            }
                        } else if ($rooms_listing_count > $bedroom_count) {
                            $rooms_delete_length = $rooms_listing_count - $bedroom_count;
                            for ($i = $rooms_listing_count - 1; $i >= $rooms_listing_count - $rooms_delete_length; $i--) {
                                $this->delete_room($rooms_by_listing_id[$i]['id']);
                            }
                            if ($rooms = $request->rooms) {
                                $rooms_count = count($rooms);
                                if ($rooms_count > 0 && $rooms_count <= $bedroom_count) {
                                    $rooms_by_listing_id = $listing->Rooms;
                                    for ($i = 0; $i < $rooms_count; $i++) {
                                        $bed_type_arr = $rooms[$i]['bed_type'];
                                        $this->edit_room_bed_type($rooms_by_listing_id[$i]['id'], $bed_type_arr);
                                    }
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

    private function add_room($room_count, $id)
    {
        for ($i = 1; $i <= $room_count; $i++) {
            $this->room_controller->add([
                'listing_id' => $id
            ]);
        }
    }

    private function delete_room($id)
    {
        $this->room_controller->delete($id);
    }

    public function edit_room_bed_type($room_id, $bed_types_array)
    {
        $bed_types_by_room_id = Room::find($room_id)->Bed_Types;
        $arr_bed_type_id = array();
        foreach ($bed_types_by_room_id as $item) {
            $arr_bed_type_id[] = $item['id'];
        }
        $bed_types_delete = array_values(array_diff($arr_bed_type_id, $bed_types_array));
        $bed_types_add = array_values(array_diff($bed_types_array, $arr_bed_type_id));
        if (count($bed_types_delete) > 0) {
            foreach ($bed_types_delete as $type) {
                Room_Bed_Type::where([
                    ['room_id', '=', $room_id],
                    ['bed_type_id', '=', $type]
                ])->delete();
            }
        }

        if (count($bed_types_add)) {
            foreach ($bed_types_add as $type) {
                $this->room_bed_type_controller->add([
                    'room_id' => $room_id,
                    'bed_type_id' => $type
                ]);
            }
        }
    }

    function test()
    {
        $bed_types_by_room_id = Room::find(17)->Bed_Types;
        $arr_bed_type_id = array();
        foreach ($bed_types_by_room_id as $item) {
            $arr_bed_type_id[] = $item['id'];
        }
        return $arr_bed_type_id;
    }
}

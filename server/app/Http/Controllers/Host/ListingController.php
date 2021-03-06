<?php

namespace App\Http\Controllers\Host;

use App\Favorite;
use App\Http\Controllers\Admin\AmenityController;
use App\Http\Controllers\Admin\AmenityTypeController;
use App\Http\Controllers\Common\NotificationController;
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
use App\Listing_Amenities;
use App\Photo_Listing;
use App\Reservation;
use App\Review_Listing;
use Carbon\Carbon;
use Exception;
use PhpParser\Node\Expr\List_;

class ListingController extends Controller
{
    //

    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];
    private $dir = 'images/';

    public function __construct()
    {
        $this->room_controller = new RoomController;
        $this->room_bed_type_controller = new RoomBedTypeController;
        $this->listing_amenities_controller = new ListingAmenitiesController;
        $this->amenity_controller = new AmenityController;
        $this->amenity_type_controller = new AmenityTypeController;
        $this->notificationController = new NotificationController();
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
            // $validator = Validator::make(
            //     $request->all(),
            //     [
            //         "name" => "required",
            //     ],
            //     [
            //         'required' => ':attribute kh??ng ????? tr???ng'
            //     ],
            //     [
            //         'name' => 'T??n listing'
            //     ]
            // );
            // if ($validator->fails()) {
            //     $this->response['errorMessage'] = $validator->errors();
            //     return response()->json($this->response);
            // }
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
            $this->response['errorMessage'] = "Record c?? id = $id kh??ng t???n t???i";
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
                // $validator = Validator::make(
                //     $request->all(),
                //     [
                //         "name" => "required",
                //     ],
                //     [
                //         'required' => ':attribute kh??ng ????? tr???ng'
                //     ],
                //     [
                //         'name' => 'T??n listing'
                //     ]
                // );
                // if ($validator->fails()) {
                //     $this->response['errorMessage'] = $validator->errors();
                //     return response()->json($this->response);
                // }

                $data = $request->all();
                if ($listing->update($data)) {
                    $this->response['status'] = 'success';
                    return response()->json($this->response, $this->success_code);
                }
                return response()->json($this->response);
            }
            $this->response['errorMessage'] = "Record c?? id = $id kh??ng t???n t???i";
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function getListingsByUserId(Request $request)
    {
        try {
            $user = $request->user('api');
            $status = $request->status;
            $query = DB::table('listing')
                ->whereNull('deleted_at')
                ->join('listing_type', 'listing.listing_type_id', '=', 'listing_type.id')->where('listing.user_id', $user->id)
                // ->where('status', '!=', 'block_activity')
            ;
            // $query = User::find($user->id)->Listings();
            switch ($status) {
                case 'all':
                    break;
                case 'unverified':
                    $query->where('listing.is_verified', 0);
                    break;
                case 'active':
                    $query->where('listing.is_verified', 1);
                    break;
                    // default:
                    //     $query->where('listing.status', $status);
                    //     break;
            }
            if ($request->listing_id) {
                $query->where('listing.id', $request->listing_id);
            }
            $listings = $query->orderBy('listing.id', 'desc')
                ->select('listing.*', 'listing_type.name as type')
                ->paginate($request->limit);
            // $listings->makeHidden(['user_id']);
            $this->response = [
                'status' => 'success',
                'data' => $listings,
                'user' => $user
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
                        $rooms_by_listing_id = Room::where('listing_id', '=', $id)->get();
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
                                        $key = 'bed_count';
                                        $rooms_by_listing_id[$i]->update([
                                            'bed_count' => array_sum(array_column($bed_type_arr, $key))
                                        ]);
                                        foreach ($bed_type_arr as $bed_type) {
                                            $this->room_bed_type_controller->add([
                                                'room_id' => $rooms_by_listing_id[$i]['id'],
                                                'bed_type_id' => $bed_type['bed_type_id'],
                                                'bed_count' => $bed_type['bed_count']
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
        $bed_types_by_room_id = $this->room_bed_type_controller->get_by_room_id($room_id);
        $bed_types_delete = array_udiff($bed_types_by_room_id->toArray(), $bed_types_array, function ($obj_a, $obj_b) {
            return $obj_a['bed_type_id'] - $obj_b['bed_type_id'];
        });
        $bed_types_add = array_udiff($bed_types_array, $bed_types_by_room_id->toArray(), function ($obj_a, $obj_b) {
            return $obj_a['bed_type_id'] - $obj_b['bed_type_id'];
        });
        $bed_types_edit = array_uintersect($bed_types_array, $bed_types_by_room_id->toArray(), function ($obj_a, $obj_b) {
            return ($obj_a['bed_type_id'] - $obj_b['bed_type_id']);
        });

        if (count($bed_types_edit) > 0) {
            foreach ($bed_types_edit as $type) {
                $key = array_search($type['bed_type_id'], array_column($bed_types_by_room_id->toArray(), 'bed_type_id'));
                if ($type['bed_count'] != $bed_types_by_room_id[$key]['bed_count']) {
                    $bed_types_by_room_id[$key]->update([
                        'bed_count' => $type['bed_count']
                    ]);
                }
            }
        }

        if (count($bed_types_delete) > 0) {
            foreach ($bed_types_delete as $type) {
                Room_Bed_Type::where([
                    ['room_id', '=', $room_id],
                    ['bed_type_id', '=', $type['bed_type_id']]
                ])->delete();
            }
        }

        if (count($bed_types_add)) {
            foreach ($bed_types_add as $type) {
                $this->room_bed_type_controller->add([
                    'room_id' => $room_id,
                    'bed_type_id' => $type['bed_type_id'],
                    'bed_count' => $type['bed_count']
                ]);
            }
        }
    }

    function test()
    {
        return $this->room_bed_type_controller->get_by_room_id(1);
    }

    function add_listing_amenities(Request $request, $id)
    {
        try {
            $listing = Listing::find($id);
            if ($listing) {
                if ($amenities = $request->amenities) {
                    $amenities_count = count($amenities);
                    if ($amenities_count > 0) {
                        $listing_amenities = $listing->Amenities;
                        if (count($listing_amenities) == 0) {
                            foreach ($amenities as $amenity) {
                                $this->listing_amenities_controller->add([
                                    'listing_id' => $id,
                                    'amenity_id' => $amenity
                                ]);
                            }
                        } else {
                            // edit
                            $arr_listing_amenities_id = array();
                            foreach ($listing_amenities as $item) {
                                $arr_listing_amenities_id[] = $item['id'];
                            }
                            $listing_amenities_delete = array_values(array_diff($arr_listing_amenities_id, $amenities));
                            $listing_amenities_add = array_values(array_diff($amenities, $arr_listing_amenities_id));
                            if (count($listing_amenities_delete) > 0) {
                                foreach ($listing_amenities_delete as $amenity) {
                                    Listing_Amenities::where([
                                        ['listing_id', '=', $id],
                                        ['amenity_id', '=', $amenity]
                                    ])->delete();
                                }
                            }

                            if (count($listing_amenities_add)) {
                                foreach ($listing_amenities_add as $amenity) {
                                    $this->listing_amenities_controller->add([
                                        'listing_id' => $id,
                                        'amenity_id' => $amenity
                                    ]);
                                }
                            }
                        }
                    }
                    $this->response['status'] = 'success';
                    return response()->json($this->response, 200);
                }
            }
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    function get_listing_by_id(Request $request, $id)
    {
        try {
            $listing = Listing::find($id);
            // $listing = DB::table('listing')->where('id', 12598)->get();
            // return $listing;
            if ($listing) {
                $amenities = $listing->Amenities;
                $tmp = array();
                foreach ($amenities as $amenity) {
                    $tmp[$amenity['amenity_type_id']][] = $amenity['id'];
                }
                $output = array();
                $output['listing'] = $listing;
                $output['host'] = User::find($listing->user_id);
                ksort($tmp);
                foreach ($tmp as $amenity_type_id => $ids) {
                    $output['amenities'][] = array(
                        'amenity_type_id' => $amenity_type_id,
                        'amenity_type' => $this->amenity_type_controller->get_by_id($amenity_type_id)->name,
                        'amenities' => $this->amenity_controller->get_by_array_id($ids)
                    );
                }

                $output['photos'] = Photo_Listing::where('listing_id', '=', $id)->get();
                $output['reviews'] = DB::table('review_listing')
                    ->where('listing_id', '=', $id)
                    ->join('users', 'users.id', '=', 'review_listing.guest_id')
                    ->orderBy('review_listing.id', 'DESC')
                    ->select('review_listing.id', 'review_listing.note', 'review_listing.rating', 'review_listing.created_at', 'users.name', 'users.avatar_url')
                    ->get();

                $rating = Review_Listing::where('listing_id', $id)->selectRaw('SUM(rating)/COUNT(guest_id) AS avg_rating')->first()->avg_rating;
                $output['rating'] = round($rating, 1);

                if ($user_login = $request->user('api')) {
                    $favorite = Favorite::where([
                        ["user_id", $user_login->id],
                        ["listing_id", $id]
                    ])->first();

                    $output['saved'] = $favorite ? true : false;
                } else {
                    $output['saved'] = false;
                }

                $this->response = [
                    'status' => 'success',
                    'data' => $output
                ];

                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function update_rating_listing($id)
    {
        $rating = Review_Listing::where('listing_id', $id)->selectRaw('SUM(rating)/COUNT(guest_id) AS avg_rating')->first()->avg_rating;
        Listing::find($id)->update(['rating' => round($rating, 2)]);
    }

    public function get_listing_preview(Request $request, $id)
    {
        try {
            $listing = Listing::find($id);
            if ($listing) {
                $amenities = $listing->Amenities;
                $tmp = array();
                foreach ($amenities as $amenity) {
                    $tmp[$amenity['amenity_type_id']][] = $amenity['id'];
                }
                $output = array();
                $output['listing'] = $listing;
                ksort($tmp);
                foreach ($tmp as $amenity_type_id => $ids) {
                    $output['amenities'][] = array(
                        'amenity_type' => $this->amenity_type_controller->get_by_id($amenity_type_id)->name,
                        'amenities' => $this->amenity_controller->get_by_array_id($ids)
                    );
                }
                $output['photos'] = Photo_Listing::where('listing_id', '=', $id)->get();

                $this->response = [
                    'status' => 'success',
                    'data' => $output
                ];

                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    function get_listing_by_city_id($id)
    {
        try {
            $result = Listing::where('city_id', '=', $id)->get();
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

    public function get_last_listing(Request $request)
    {
        try {
            $user_id = $request->user('api')->id;
            $last_listing = Listing::where('user_id', $user_id)->orderBy('id', 'desc')->first();
            if ($last_listing) {
                $this->response = [
                    'status' => 'success',
                    'data' => $last_listing
                ];
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function get_base_infomation_listing($id)
    {
        try {
            if ($result = Listing::find($id)) {
                $this->response = [
                    'status' => 'success',
                    'data' => $result
                ];
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function send_listing($id)
    {
        try {
            if (Listing::where('id', $id)->update(['is_public' => 1])) {
                $this->notificationController->send_notify_add_listing($id);
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function get_beds_listing($id)
    {
        try {
            $data = array();
            $rooms = Room::where('listing_id', $id)->get();
            foreach ($rooms as $key1 => $room) {
                $data[$key1]['room_id'] = $room->id;
                $beds = Room_Bed_Type::where('room_id', $room->id)->get();
                foreach ($beds as $key2 => $bed) {
                    $data[$key1]['beds'][$key2] = [
                        'bed_type_id' => $bed->bed_type_id,
                        'bed_count' => $bed->bed_count
                    ];
                }
            }
            return $data;
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function search_listing(Request $request)
    {
        try {
            $city_id = $request->city_id;
            $checkin_date = $request->checkin_date;
            $checkout_date = $request->checkout_date;

            // Listing TB => city_id
            // Reservation => -----today ---|--- checkin -----|---- checkout ---|--- after checkout ----|---
            //                           checkin1        checkout1
            //                                           checkin1           checkout1
            //                           checkin2                           checkout2
            //                      checkin1-checkout1                                ===> OK
            //                                                          checkin1-checkout1 ===> OK
            // ===> today  < (checkout1) <= checkin_date
            // ===> (checkin1) >= checkout_date
            // vi pham: checkin1 <= checkin < checkout1 <= checkout

            // where not: (StartDate1 <= EndDate2) and (StartDate2 <= EndDate1)

            $data = DB::table('listing')
                ->join('reservation', 'listing.id', '=', 'reservation.listing_id')
                ->whereNot([
                    ['checkin_date', '<=', $checkout_date],
                    [$checkin_date, '<=', 'checkout_date']
                ])
                ->select(DB::raw('listing.id, listing.name, count(*) as count'))
                ->groupBy('listing.id')
                ->get();
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function check_listing_verify($id)
    {
        try {
            $listing = Listing::find($id);
            if ($listing && $listing->is_verified == 1 && $listing->is_public == 1) {
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response, 400);
        }
    }
}

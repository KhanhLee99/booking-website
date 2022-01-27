<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Listing;
use App\Models\City;
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
            $sort = $request->sort;
            $user_login = $request->user('api');
            $query = DB::table('listing')
                ->where('city_id', $request->city_id)
                ->join('listing_type', 'listing.listing_type_id', '=', 'listing_type.id')
                ->select(
                    'listing.id as listing_id',
                    'listing.name',
                    'listing.street_address',
                    'listing.avatar_url as listing_img',
                    'listing.bedroom_count',
                    'listing.price_per_night_base as price_per_night',
                    'listing.rating',
                    'listing_type.name as listing_type',
                );
            if ($sort) {
                $query->orderBy('listing.price_per_night_base', $sort == 'desc' ? 'desc' : 'asc');
            }
            if ($user_login) {
                $query->leftJoin('favorite', function ($leftJoin) use ($user_login) {
                    $leftJoin->on('listing.id', '=', 'favorite.listing_id')
                        ->where('favorite.user_id', $user_login->id);
                })
                    ->selectRaw('(CASE WHEN favorite.user_id = ' . $user_login->id . ' THEN 1 ELSE 0 END) AS saved');
                // DB::raw('(CASE WHEN favorite.user_id = ' . $user_login->id . ' AND favorite.listing_id = listing.id THEN 1 ELSE 0 END) AS saved')
            }
            $data = $query->paginate($request->limit);

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
            $sort = $request->sort;
            $user_login = $request->user('api');
            $query = DB::table('listing')
                ->where('city_id', $request->city_id)
                ->whereIn('listing_type_id', $request->list_type_id)
                ->join('listing_type', 'listing.listing_type_id', '=', 'listing_type.id')
                ->select('listing.id as listing_id', 'listing.name', 'listing.street_address', 'listing.avatar_url as listing_img', 'listing.bedroom_count', 'listing.price_per_night_base as price_per_night', 'listing.rating', 'listing_type.name as listing_type');
            if ($sort) {
                $query->orderBy('listing.price_per_night_base', $sort == 'desc' ? 'desc' : 'asc');
            }
            if ($user_login) {
                $query->leftJoin('favorite', function ($leftJoin) use ($user_login) {
                    $leftJoin->on('listing.id', '=', 'favorite.listing_id')
                        ->where('favorite.user_id', $user_login->id);
                })
                    ->selectRaw('(CASE WHEN favorite.user_id = ' . $user_login->id . ' THEN 1 ELSE 0 END) AS saved');
            }
            $data = $query->paginate($request->limit);

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
            $sort = $request->sort;
            $user_login = $request->user('api');
            $query = DB::table('listing')
                ->where('city_id', $request->city_id)
                ->join('listing_type', 'listing.listing_type_id', '=', 'listing_type.id')
                ->select('listing.id as listing_id', 'listing.name', 'listing.street_address', 'listing.avatar_url as listing_img', 'listing.bedroom_count', 'listing.price_per_night_base as price_per_night', 'listing.rating', 'listing_type.name as listing_type');
            switch (count($rate)) {
                case 1:
                    $query->whereBetween('rating', [$rate[0] - 0.5, $rate[0] + 0.5]);

                    break;
                case 2:
                    $query->where(function ($query) use ($rate) {
                        $query->where([
                            ['rating', '>=', $rate[0] - 0.5],
                            ['rating', '<=', $rate[0] + 0.5],
                        ])
                            ->orWhere([
                                ['rating', '>=', $rate[1] - 0.5],
                                ['rating', '<=', $rate[1] + 0.5],
                            ]);
                    });

                    break;
                case 3:
                    $query->where(function ($query) use ($rate) {
                        $query->where([
                            ['rating', '>=', $rate[0] - 0.5],
                            ['rating', '<=', $rate[0] + 0.5],
                        ])
                            ->orWhere([
                                ['rating', '>=', $rate[1] - 0.5],
                                ['rating', '<=', $rate[1] + 0.5],
                            ])
                            ->orWhere([
                                ['rating', '>=', $rate[2] - 0.5],
                                ['rating', '<=', $rate[2] + 0.5],
                            ]);
                    });
                    break;
                case 4:
                    $query->where(function ($query) use ($rate) {
                        $query->where([
                            ['rating', '>=', $rate[0] - 0.5],
                            ['rating', '<=', $rate[0] + 0.5],
                        ])
                            ->orWhere([
                                ['rating', '>=', $rate[1] - 0.5],
                                ['rating', '<=', $rate[1] + 0.5],
                            ])
                            ->orWhere([
                                ['rating', '>=', $rate[2] - 0.5],
                                ['rating', '<=', $rate[2] + 0.5],
                            ])
                            ->orWhere([
                                ['rating', '>=', $rate[3] - 0.5],
                                ['rating', '<=', $rate[3] + 0.5],
                            ]);
                    });
                    break;

                case 5:
                    $query->where(function ($query) use ($rate) {
                        $query->where([
                            ['rating', '>=', $rate[0] - 0.5],
                            ['rating', '<=', $rate[0] + 0.5],
                        ])
                            ->orWhere([
                                ['rating', '>=', $rate[1] - 0.5],
                                ['rating', '<=', $rate[1] + 0.5],
                            ])
                            ->orWhere([
                                ['rating', '>=', $rate[2] - 0.5],
                                ['rating', '<=', $rate[2] + 0.5],
                            ])
                            ->orWhere([
                                ['rating', '>=', $rate[3] - 0.5],
                                ['rating', '<=', $rate[3] + 0.5],
                            ])
                            ->orWhere([
                                ['rating', '>=', $rate[4] - 0.5],
                                ['rating', '<=', $rate[4] + 0.5],
                            ]);
                    });
                    break;
                default:
                    break;
            }

            if ($sort) {
                $query->orderBy('listing.price_per_night_base', $sort == 'desc' ? 'desc' : 'asc');
            }

            if ($user_login) {
                $query->leftJoin('favorite', function ($leftJoin) use ($user_login) {
                    $leftJoin->on('listing.id', '=', 'favorite.listing_id')
                        ->where('favorite.user_id', $user_login->id);
                })
                    ->selectRaw('(CASE WHEN favorite.user_id = ' . $user_login->id . ' THEN 1 ELSE 0 END) AS saved');
            }

            $data = $query->paginate($request->limit);

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

    public function filter_listing(Request $request)
    {
        try {
            $rate = $request->rate;
            $list_type_id = $request->list_type_id;
            $sort = $request->sort;
            $user_login = $request->user('api');
            // if (count($rate) > 0 && count($list_type_id) == 0) {
            //     return $this->filter_by_star($request);
            // } else if (count($rate) == 0 && count($list_type_id) > 0) {
            //     return $this->filter_by_listing_type($request);
            // } else if (count($rate) == 0 && count($list_type_id) == 0) {
            //     return $this->get_litings_location($request);
            // } else {
            // }

            $query = DB::table('listing')
                ->where('city_id', $request->city_id)
                ->join('listing_type', 'listing.listing_type_id', '=', 'listing_type.id')
                ->select('listing.id as listing_id', 'listing.name', 'listing.street_address', 'listing.avatar_url as listing_img', 'listing.bedroom_count', 'listing.price_per_night_base as price_per_night', 'listing.rating', 'listing_type.name as listing_type');

            if ($rate) {
                switch (count($rate)) {
                    case 1:
                        $query->whereBetween('rating', [$rate[0] - 0.5, $rate[0] + 0.5]);

                        break;
                    case 2:
                        $query->where(function ($query) use ($rate) {
                            $query->where([
                                ['rating', '>=', $rate[0] - 0.5],
                                ['rating', '<=', $rate[0] + 0.5],
                            ])
                                ->orWhere([
                                    ['rating', '>=', $rate[1] - 0.5],
                                    ['rating', '<=', $rate[1] + 0.5],
                                ]);
                        });

                        break;
                    case 3:
                        $query->where(function ($query) use ($rate) {
                            $query->where([
                                ['rating', '>=', $rate[0] - 0.5],
                                ['rating', '<=', $rate[0] + 0.5],
                            ])
                                ->orWhere([
                                    ['rating', '>=', $rate[1] - 0.5],
                                    ['rating', '<=', $rate[1] + 0.5],
                                ])
                                ->orWhere([
                                    ['rating', '>=', $rate[2] - 0.5],
                                    ['rating', '<=', $rate[2] + 0.5],
                                ]);
                        });
                        break;
                    case 4:
                        $query->where(function ($query) use ($rate) {
                            $query->where([
                                ['rating', '>=', $rate[0] - 0.5],
                                ['rating', '<=', $rate[0] + 0.5],
                            ])
                                ->orWhere([
                                    ['rating', '>=', $rate[1] - 0.5],
                                    ['rating', '<=', $rate[1] + 0.5],
                                ])
                                ->orWhere([
                                    ['rating', '>=', $rate[2] - 0.5],
                                    ['rating', '<=', $rate[2] + 0.5],
                                ])
                                ->orWhere([
                                    ['rating', '>=', $rate[3] - 0.5],
                                    ['rating', '<=', $rate[3] + 0.5],
                                ]);
                        });
                        break;

                    case 5:
                        $query->where(function ($query) use ($rate) {
                            $query->where([
                                ['rating', '>=', $rate[0] - 0.5],
                                ['rating', '<=', $rate[0] + 0.5],
                            ])
                                ->orWhere([
                                    ['rating', '>=', $rate[1] - 0.5],
                                    ['rating', '<=', $rate[1] + 0.5],
                                ])
                                ->orWhere([
                                    ['rating', '>=', $rate[2] - 0.5],
                                    ['rating', '<=', $rate[2] + 0.5],
                                ])
                                ->orWhere([
                                    ['rating', '>=', $rate[3] - 0.5],
                                    ['rating', '<=', $rate[3] + 0.5],
                                ])
                                ->orWhere([
                                    ['rating', '>=', $rate[4] - 0.5],
                                    ['rating', '<=', $rate[4] + 0.5],
                                ]);
                        });
                        break;
                    default:
                        break;
                }
            }

            if ($list_type_id) {
                $query->whereIn('listing_type_id', $list_type_id);
            }

            if ($sort) {
                $query->orderBy('listing.price_per_night_base', $sort == 'desc' ? 'desc' : 'asc');
            }

            if ($user_login) {
                $query->leftJoin('favorite', function ($leftJoin) use ($user_login) {
                    $leftJoin->on('listing.id', '=', 'favorite.listing_id')
                        ->where('favorite.user_id', $user_login->id);
                })
                    ->selectRaw('(CASE WHEN favorite.user_id = ' . $user_login->id . ' THEN 1 ELSE 0 END) AS saved');
            }

            $data = $query->paginate($request->limit);

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

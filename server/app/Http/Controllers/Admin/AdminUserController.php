<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Listing;
use App\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminUserController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => false
    ];

    public function get_all_user(Request $request)
    {
        try {
            $data = User::where('role_id', '!=', 1)
                ->orderBy('created_at', 'desc')
                ->paginate($request->limit);
            $this->response = [
                'status' => true,
                'data' => $data,
            ];
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function get_all_host(Request $request)
    {
        try {

            $data = DB::table('listing')
                ->join('users', 'users.id', '=', 'listing.user_id')
                ->groupBy('listing.user_id')
                ->select('users.*', DB::raw('count(users.id) as total_listing'))
                ->paginate($request->limit);

            $this->response = [
                'status' => true,
                'data' => $data,
            ];
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

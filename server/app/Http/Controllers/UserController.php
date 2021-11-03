<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRegisterRequest;
use App\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public $successStatus = 200;

    public function __construct() {

    }

    //
    public function register(UserRegisterRequest $q) {
        $user = new User;
        $user->fill($q->all());
        $user->password = Hash::make($q->password);
        $user->save();
        return response()->json($user);
    }

    public function new_password(Request $q) {
        $user_login = Auth::guard()->user();
        if ($user_login) {
            $user_login->password = Hash::make($q->password);
            if ($user_login->save()) {
                return response()->json(['message' => 'Success'], $this->successStatus);
            }
            return response()->json(['error' => 'Error'], 401);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}

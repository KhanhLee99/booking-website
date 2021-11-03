<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRegisterRequest;
use App\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    public function register(UserRegisterRequest $q) {
        $user = new User;
        $user->fill($q->all());
        $user->password = Hash::make($q->password);
        $user->save();
        return response()->json($user);
    }
}

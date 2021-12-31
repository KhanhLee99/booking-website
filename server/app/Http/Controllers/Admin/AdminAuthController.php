<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        if (Auth::attempt([
            'email' => $request->email,
            'password' => $request->password,
        ])) {
            $user = User::whereEmail($request->email)->first();
            if ($user->role_id == 1) {
                $user->token = $user->createToken('Admin Personal Access Token')->accessToken;
                return response()->json($user, 200);
            }
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
        return response()->json(['message' => 'Unauthenticated'], 401);
    }
}

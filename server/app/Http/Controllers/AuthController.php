<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use App\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Str;
use Firebase\Auth\Token\Exception\InvalidToken;

class AuthController extends Controller
{
    public $successStatus = 200;

    public function __construct()
    {
        $this->client = new Client();
        $this->auth = app('firebase.auth');
        // $this->middleware('auth:api', ['except' => ['login', 'login_google', 'login_facebook']]);
    }

    public function login(Request $q)
    {
        if (Auth::attempt([
            'email' => $q->email,
            'password' => $q->password
        ])) {
            $user = User::whereEmail($q->email)->first();
            if ($user->hasVerifiedEmail()) {
                $user->token = $user->createToken('Personal Access Token')->accessToken;
                return response()->json($user, 200);
            }
            return response()->json(['message' => 'Unauthenticated. Please Verify Your Email.'], 401);
        }
        return response()->json(['message' => 'Unauthenticated'], 401);
    }

    public function me(Request $q)
    {
        return response()->json($q->user('api'));
        // return response()->json(Auth::guard('api')->user()->token());
    }

    public function login_google(Request $request)
    {
        return $this->check_google($request->social_token, $request->role);
    }

    public function login_facebook(Request $request)
    {
        return $this->checkFacebook($request->social_token, $request->role);
    }

    public function check_google($social_token, $role)
    {
        try {
            $verifiedIdToken = $this->auth->verifyIdToken($social_token);
            $uid = $verifiedIdToken->getClaim('sub');
            return $this->check_user_UID($uid, $role);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function checkFacebook($social_token, $role)
    {
        try {
            $verifiedIdToken = $this->auth->verifyIdToken($social_token);
            $uid = $verifiedIdToken->getClaim('sub');
            return $this->check_user_UID($uid, $role);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    private function check_user_UID($uid, $role)
    {
        $user = User::where('firebaseUID', $uid)->first();
        if (!$user) {
            $user_information = $this->auth->getUser($uid);
            // dd($user_information);
            if (!$this->is_exists_email($user_information->email)) {
                $user = User::create([
                    'name' => $user_information->displayName,
                    'email' => $user_information->email,
                    'signin_method' => $user_information->providerData[0]->providerId,
                    'phone_number' => $user_information->phoneNumber,
                    'firebaseUID' => $user_information->uid,
                    'avatar_url' => $user_information->photoUrl,
                    'role_id' => $role,
                ]);
            } else {
                return response()->json(['message' => 'Email already exists'], 401);
            }
        }
        if ($user->role_id == 3) {
            $user->role_id = 2;
            $user->save();
        }
        $token = $user->createToken('Personal Access Client')->accessToken;
        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    private function is_exists_email($email)
    {
        $user = User::where('email', $email)->first();
        if ($user) return true;
        return false;
    }

    public function admin_login(Request $request)
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

    public function host_login(Request $request)
    {
        if (Auth::attempt([
            'email' => $request->email,
            'password' => $request->password,
        ])) {
            $user = User::whereEmail($request->email)->first();
            if ($user->role_id == 3) {
                $user->role_id = 2;
                $user->save();
            }
            $user->token = $user->createToken('Admin Personal Access Token')->accessToken;
            return response()->json($user, 200);
        }
        return response()->json(['message' => 'Unauthenticated'], 401);
    }
}

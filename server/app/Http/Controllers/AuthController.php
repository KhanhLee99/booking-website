<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use App\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public $successStatus = 200;

    public function __construct()
    {
        $this->client = new Client();
        // $this->middleware('auth:api', ['except' => ['login', 'login_google', 'login_facebook']]);
    }

    public function login(AuthRequest $q) {
        if(Auth::attempt([
            'email' => $q->email,
            'password' => $q->password
        ])) {
            $user = User::whereEmail($q->email)->first();
            $user->token = $user->createToken('ok')->accessToken;
            return response()->json($user, 200);
        }
        return response()->json(['message' => 'Unauthenticated'], 401);
    }

    public function me(Request $q) {
        return response()->json($q->user('api'));
        // return response()->json(Auth::guard('api')->user()->token());
    }

    public function login_google() {
        return $this->check_google();
    }

    public function login_facebook() {
        return $this->checkFacebook();
    }

    public function check_google() {
        try {
            $social_token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg1ODI4YzU5Mjg0YTY5YjU0YjI3NDgzZTQ4N2MzYmQ0NmNkMmEyYjMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODE5OTI2NTY4Mjk3LXBwMjBjOWI5bzRuMG50N2dtYThjdnNqbm5zYXBvOWxrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODE5OTI2NTY4Mjk3LXBwMjBjOWI5bzRuMG50N2dtYThjdnNqbm5zYXBvOWxrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MTc2ODUxNzA2OTUxMDczMjE3IiwiZW1haWwiOiJsZXZpZXRraGFuaDk5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiaDRvd1FuTjZxTXJwZDM1RDFRYkVKZyIsIm5hbWUiOiJLaMOhbmggTMOqIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdoOFVjSXBONzV0YVY0MVJwZzA4b0VFVndIdkhaeGRZVlFmQzctdEVBPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Iktow6FuaCIsImZhbWlseV9uYW1lIjoiTMOqIiwibG9jYWxlIjoidmkiLCJpYXQiOjE2MzU4NjAxODcsImV4cCI6MTYzNTg2Mzc4NywianRpIjoiZGNlODNlMmNhZTBhMzM5ZTA5NmIwYzQ1MjcyZGQ5OTY0ZGNmOThjMyJ9.ZJs0kSPG_l2M0dGDU13Ll-W_1psmc9NmoaQJ4TTHIpVzYsBUaDTnC3HEDtwiomFRV-2wGbK6RQKA-P3InCXZv8cW2DUaxqmoCYvFPRqiK810RBJNtL8QwOcvie7KjWbE55kpWRtOQAmuyrinOg5-urBWQ58tvniWaWJ5p_CtPa30wHRwVb1OrA3eR4LFsxL9YVhWIWcPYEjpf3oQYrcwtsk1jqSbhjHT669F9w_o-UZBER_3gLq4wPFHr27ohi-gPxUBhXDeRwrTgZzcS_rxOEPtyNQzuz-5dAf4wyTa_kAHykLkNx6JrVgxjEi3OpIDMwgxxxnDQ1JDY0e5rpUcOw";
            $checkToken = $this->client->get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=$social_token");
            $responseGoogle = json_decode($checkToken->getBody()->getContents(), true);
            return $this->checkUserByEmail($responseGoogle);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function checkFacebook()
    {
        try {
            $social_token = "EAAF3ch9q5oUBAOks08LZAJ2D9gt9NBkTkjUoCrDuIiV6lkhQqlfDKWjBXwXFo3LKQN4ILsgaNesJXLbGS0282oUiRD4gZAocHGeASUov5stZA4IeZBYGd0rYECKm1bsUOrehfg8j6jS1FCCLaqhtRxmyE6nsNUtI4E7mQSByMyTzWmzYpfMk6i5xyyyZCDbL0uKk2qkLMf7Tn6bdZCVh5n";
            $checkToken = $this->client->get("https://graph.facebook.com/v3.1/me?fields=id,name,email&access_token=$social_token");
            $responseFacebook = json_decode($checkToken->getBody()->getContents(), true);

            return $this->checkUserByEmail($responseFacebook);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function checkUserByEmail($profile)
    {
        $user = User::where('email', $profile['email'])->first();
        if (!$user) {
            $user = User::create([
                'name' => $profile['name'],
                'email' => $profile['email'],
                'password' => bcrypt(Str::random(8)),
            ]);
        }
        $user->token = $user->createToken('Personal Access Client')->accessToken;

        return response()->json([
            'access_token' => $user->token,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::now()->addMonth()->toDateTimeString()
        ]);
    }
}

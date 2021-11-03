<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Auth;
use Closure;
use App\User;
use Carbon\Carbon;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }

    public function handle($request, Closure $next) {
        if ($this->tokenExpired()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $next($request);
    }

    private function tokenExpired()
    {
        if ($this->verifyToken()) {
            if (Carbon::parse(Auth::guard('api')->user()->token()->expires_at) < Carbon::now()) {
                return true;
            }
            return false;
        }
        return true;
    }

    private function verifyToken() {
        if (Auth::guard('api')->check()) {
            return true;
        } 
        return false;
    }
}

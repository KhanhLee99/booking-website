<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('register', 'UserController@register');
Route::post('login', 'AuthController@login');
Route::post('login_google', 'AuthController@login_google');
Route::post('login_facebook', 'AuthController@login_facebook');
Route::get('me', 'AuthController@me')->middleware('auth:api');
Route::get('new-password', 'UserController@new_password')->middleware('auth:api');

// Social Provider
Route::post('social-provider/add', 'Admin\SocialProviderController@add');
Route::get('social-provider', 'Admin\SocialProviderController@index');
Route::delete('social-provider/{id}', 'Admin\SocialProviderController@delete');
Route::put('social-provider/{id}', 'Admin\SocialProviderController@edit');

// Role
Route::post('role/add', 'Admin\RoleController@add');
Route::get('role', 'Admin\RoleController@index');
Route::delete('role/{id}', 'Admin\RoleController@delete');
Route::put('role/{id}', 'Admin\RoleController@edit');
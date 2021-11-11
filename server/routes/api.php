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

Route::middleware('auth:api')->group(function () {

// User upload_multiple_images
Route::post('update-avatar', 'UserController@update_avatar');
Route::post('upload-multiple-images', 'UserController@upload_multiple_images');

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

// Amenity Type
Route::post('amenity-type/add', 'Admin\AmenityTypeController@add');
Route::get('amenity-type', 'Admin\AmenityTypeController@index');
Route::delete('amenity-type/{id}', 'Admin\AmenityTypeController@delete');
Route::put('amenity-type/{id}', 'Admin\AmenityTypeController@edit');

// Amenity
Route::post('amenity/add', 'Admin\AmenityController@add');
Route::get('amenity', 'Admin\AmenityController@index');
Route::delete('amenity/{id}', 'Admin\AmenityController@delete');
Route::put('amenity/{id}', 'Admin\AmenityController@edit');

// Bed Type
Route::post('bed-type/add', 'Admin\BedTypeController@add');
Route::get('bed-type', 'Admin\BedTypeController@index');
Route::delete('bed-type/{id}', 'Admin\BedTypeController@delete');
Route::put('bed-type/{id}', 'Admin\BedTypeController@edit');

// Listing
Route::post('listing/add', 'Host\ListingController@add');
Route::get('listing', 'Host\ListingController@index');
Route::delete('listing/{id}', 'Host\ListingController@delete');
Route::put('listing/{id}', 'Host\ListingController@edit');
Route::get('listing/user/{user_id}', 'Host\ListingController@getListingsByUserId');

// Room 
Route::put('listing/edit-bedroom/{id}', 'Host\ListingController@edit_bed_room');
});
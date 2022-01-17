<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

Auth::routes(['verify' => true]);

Route::get('email/verify/{id}', 'VerificationController@verify')->name('verification.verify'); // Make sure to keep this as your route name
// Route::get('email/resend', 'VerificationController@resend')->name('verification.resend');

Route::post('register', 'UserController@register');
Route::post('login', 'AuthController@login');
Route::post('login_google', 'AuthController@login_google');
Route::post('login_facebook', 'AuthController@login_facebook');
Route::get('me', 'AuthController@me')->middleware('auth:api');
Route::put('new-password', 'UserController@new_password')->middleware('auth:api');
Route::put('user/edit-profile', 'UserController@edit')->middleware('auth:api');
// Auth Admin
Route::post('admin/login', 'AuthController@admin_login');
Route::post('host/login', 'AuthController@host_login');

// Route::middleware('auth:api')->group(function () {

// User upload_multiple_images
Route::post('update-avatar', 'UserController@update_avatar');
Route::post('upload-multiple-images', 'UserController@upload_multiple_images');

Route::put('update-device-token', 'UserController@add_device_token');
Route::put('delete-device-token', 'UserController@delete_device_token');
Route::post('send-notifications', 'UserController@send_notification');

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
Route::put('listing/update-thumbnail/{id}', 'Host\ListingController@update_thumbnail');
Route::get('listing/user', 'Host\ListingController@getListingsByUserId');
Route::post('listing/amenities/{id}', 'Host\ListingController@add_listing_amenities');
Route::get('listing/city/{id}', 'Host\ListingController@get_listing_by_city_id');
Route::get('listing/newest', 'Host\ListingController@get_last_listing');
Route::get('listing/{id}/base-infomation', 'Host\ListingController@get_base_infomation_listing');

// Room 
Route::put('listing/edit-bedroom/{id}', 'Host\ListingController@edit_bed_room');

// City
Route::get('city', 'Admin\CityController@index');
Route::post('city/add', 'Admin\CityController@add');
Route::delete('city/{id}', 'Admin\CityController@delete');
Route::put('city/{id}', 'Admin\CityController@edit');

// Reservation Status
Route::post('reservation-status/add', 'Admin\ReservationStatusController@add');
Route::get('reservation-status', 'Admin\ReservationStatusController@index');
Route::delete('reservation-status/{id}', 'Admin\ReservationStatusController@delete');
Route::put('reservation-status/{id}', 'Admin\ReservationStatusController@edit');

// Favorite
Route::post('favorite/add', 'User\FavoriteController@add');
Route::get('favorite', 'User\FavoriteController@index');

// Price Special
Route::get('price-special/{id}', 'Host\ListingPriceSpecialController@index');
Route::post('price-special/add', 'Host\ListingPriceSpecialController@add');
Route::put('price-special/{id}', 'Host\ListingPriceSpecialController@edit');

// Photo Listing
Route::post('photo-listing/upload/{id}', 'Host\PhotoListingController@upload');
Route::delete('photo-listing/{id}', 'Host\PhotoListingController@delete');
Route::delete('photo-listing/all/{id}', 'Host\PhotoListingController@delete_all_photo_listing');

// Review Listing
Route::post('review-listing/{id}', 'User\ReviewListingController@add');
Route::get('review-listing/{id}', 'User\ReviewListingController@index');
Route::get('host/review-listing', 'User\ReviewListingController@get_review_by_host_id');

// Block booking
Route::post('block-booking/add', 'Host\BlockBookingController@add');
Route::put('block-booking/{id}', 'Host\BlockBookingController@edit');
Route::get('block-booking/{id}', 'Host\BlockBookingController@index');
Route::get('block-booking/{id}/month', 'Host\BlockBookingController@get_block_date_in_month');

// Promo code
Route::post('promo-code/add', 'PromoCodeController@add');
Route::put('promo-code/{id}', 'PromoCodeController@edit');
Route::get('promo-code/listing/{id}', 'PromoCodeController@index');
Route::delete('promo-code/{id}', 'PromoCodeController@delete');

// Reservation
Route::post('reservation/add', 'Host\ReservationController@add');
Route::get('reservation/user/{id}', 'Host\ReservationController@get_reservation_by_user_id');
Route::get('reservation/listing/{id}/month', 'Host\ReservationController@get_reservation_listing_in_month');
Route::get('reservation/host/{host_id}', 'Host\ReservationController@get_host_booking');
Route::put('reservation/{id}', 'Host\ReservationController@edit');
Route::delete('reservation/{id}', 'Host\ReservationController@delete');
Route::get('reservation/me', 'Host\ReservationController@get_my_reservation');
Route::get('reservation/{id}', 'Host\ReservationController@get_detail_reservation');
Route::put('reservation/edit-status/{id}', 'Host\ReservationController@edit_status');


// Conversation
Route::post('conversation/add', 'Common\ConversationController@create_conversation');
Route::get('conversation', 'Common\ConversationController@get_conversations');


// Messages
Route::post('send-message', 'Common\MessageController@send_message');
Route::put('seen-message', 'Common\MessageController@seen_message');
Route::get('messages/{conversation_id}', 'Common\MessageController@get_messages');

// Listing Type
Route::post('listing-type/add', 'Admin\ListingTypeController@add');
Route::get('listing-type', 'Admin\ListingTypeController@index');

// });

Route::get('send-mail-auth', 'Mails\MailAuthController@send_mail');

// Detail Listing
Route::get('listing-location', 'Common\DetailListingController@get_litings_location');
Route::post('listing-type/filter', 'Common\DetailListingController@filter_by_listing_type');
Route::post('listing-rating/filter', 'Common\DetailListingController@filter_by_star');

Route::get('listing/{id}', 'Host\ListingController@get_listing_by_id');

Route::get('/greeting', function () {
    return DB::table('users')->get();
});


Route::post('/upload-file', 'FileUploadController@upload');

// Admin Listing
Route::get('admin/listing/pending', 'Admin\AdminListingController@get_listing_pending');
Route::get('admin/listing/active', 'Admin\AdminListingController@get_listing_active');
Route::put('admin/listing/{id}/active', 'Admin\AdminListingController@active_listing');
Route::put('admin/listing/{id}/lock', 'Admin\AdminListingController@lock_listing');


// Notification
Route::post('notification/add', 'Admin\AdminNotificationController@add');



// Listing Amenities
Route::get('listing/{id}/amenities', 'Host\ListingAmenitiesController@get_listing_amenities_id');

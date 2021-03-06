<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    // protected $fillable = [
    //     'name', 'email', 'password',
    // ];

    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    function Listings() {
        return $this->hasMany('App\Listing');
    }

    function Favorite() {
        return $this->belongsToMany('App\Listing', 'favorite', 'user_id', 'listing_id');
    }

    function Messages() {
        return $this->hasMany('App\Models\Message', 'sender_id');
    }

    function Conversations() {
        return $this->belongsToMany('App\Models\Conversation', 'user_conversation', 'user_id', 'conversation_id');
    }
}

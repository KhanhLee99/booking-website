<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    //
    protected $table = 'listing';
    protected $guarded = [];

    function User() {
        return $this->belongsTo('App\User');
    }

    function Rooms() {
        return $this->hasMany('App\Room');
    }
}

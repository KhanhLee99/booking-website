<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Listing extends Model
{
    //
    use SoftDeletes;
    protected $table = 'listing';
    protected $guarded = [];

    function User() {
        return $this->belongsTo('App\User');
    }

    function Rooms() {
        return $this->hasMany('App\Room');
    }

    function Amenities() {
        return $this->belongsToMany('App\Amenity', 'listing_amenities', 'listing_id', 'amenity_id');
    }
}

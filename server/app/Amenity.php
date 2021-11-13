<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    //
    protected $table = 'amenities';
    protected $fillable = [
        'name',  'icon_url', 'amenity_type_id',
    ];

    function Listings() {
        return $this->belongsToMany('App\Listing', 'listing_amenities', 'amenity_id', 'listing_id');
    }
}

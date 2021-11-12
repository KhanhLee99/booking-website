<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    //
    protected $table = 'room';
    protected $guarded = [];

    // function Listing() {
    //     return $this->belongsTo('App\Listing');
    // }

    function Bed_Types() {
        return $this->belongsToMany('App\Bed_Type', 'room_bed_type', 'room_id', 'bed_type_id');
    }
}

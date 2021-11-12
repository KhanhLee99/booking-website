<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bed_Type extends Model
{
    //
    protected $table = 'bed_type';
    protected $fillable = [
        'name', 'description'
    ];

    function Rooms() {
        return $this->belongsToMany('App\Room', 'room_bed_type', 'bed_type_id', 'room_id');
    }
}

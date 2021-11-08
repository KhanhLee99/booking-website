<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Amenity_Type extends Model
{
    //
    protected $table = 'amenity_type';
    protected $fillable = [
        'name'
    ];
}

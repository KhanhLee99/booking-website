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
}

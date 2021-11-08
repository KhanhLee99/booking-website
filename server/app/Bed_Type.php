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
}

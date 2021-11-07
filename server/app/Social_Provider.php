<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Social_Provider extends Model
{
    //
    protected $table = 'social_providers';
    protected $fillable = [
        'name'
    ];
}

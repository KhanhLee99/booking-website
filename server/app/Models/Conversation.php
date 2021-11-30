<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $table = 'conversation';
    protected $guarded = [];

    function Users() {
        return $this->belongsToMany('App\User', 'user_conversation', 'conversation_id', 'user_id');
    }

    function Messages() {
        return $this->hasMany('App\Models\Message');
    }
}

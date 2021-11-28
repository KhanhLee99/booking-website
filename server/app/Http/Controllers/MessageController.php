<?php

namespace App\Http\Controllers;

use App\Events\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    //
    public function chat(Request $request)
    {
        event(new Message($request->message, $request->username));
    }
}

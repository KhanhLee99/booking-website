<?php

namespace App\Http\Controllers\Mails;

use App\Http\Controllers\Controller;
use App\Mail\AuthMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailAuthController extends Controller
{
    public function send_mail(Request $request) {
        Mail::to('vkhang542@gmail.com')->send(new AuthMail);
    }
}

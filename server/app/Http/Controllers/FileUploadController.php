<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    //
    public function upload(Request $request)
    {
        if ($file = $request->file('file')) {
            $file_name = $file->getClientOriginalName();
            $response = cloudinary()->upload($request->file('file')->getRealPath())->getSecurePath();
            dd($response);
        }
    }
}

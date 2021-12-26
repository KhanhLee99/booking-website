<?php

namespace App\Http\Controllers\Helper;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    //
    private $dir = 'images/';

    public function upload_image($file, $file_name) {
        $re_file_name = preg_replace('/\s+/', '-', trim($file_name));
        while(file_exists($this->dir.$re_file_name)) {
            $re_file_name = time().'-'.$re_file_name;
        }
        $file->move($this->dir, $re_file_name);
        // $response = cloudinary()->upload($request->file('file')->getRealPath())->getSecurePath();
        return $re_file_name;
    }
}

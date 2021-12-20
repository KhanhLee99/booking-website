<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Photo_Listing;
use Exception;
use App\Http\Controllers\Helper\UploadController;

class PhotoListingController extends Controller
{
    //
    public $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    public function __construct()
    {
        $this->upload_controller = new UploadController;
    }

    function index($id)
    {
        try {

            $photos = Photo_Listing::where('listing_id', '=', $id)->get();
            $this->response = [
                'status' => 'success',
                'data' => $photos
            ];
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    function upload(Request $request, $id)
    {
        try {
            $images = $request->file('image');
            // $descriptions = $request->descriptions;
            if (count($images) > 0) {
                foreach ($images as $index => $image) {
                    $file_name = $image->getClientOriginalName();
                    if ($re_file_name = $this->upload_controller->upload_image($image, $file_name)) {
                        $data = [
                            'photo_url' => $re_file_name,
                            // 'description' => $descriptions[$index],
                            'listing_id' => $id
                        ];
                        $this->add($data);
                    }
                }
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    function delete($id)
    {
        try {
            $photo = Photo_Listing::find($id);
            if ($photo) {
                $photo->delete();
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            $this->response['errorMessage'] = "Record có id = $id không tồn tại";
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    private function add($data)
    {
        Photo_Listing::create($data);
    }
}

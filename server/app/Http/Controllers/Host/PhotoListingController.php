<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Photo_Listing;
use Exception;
use App\Http\Controllers\Helper\UploadController;
use App\Listing;

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
        // $response = cloudinary()->upload($request->file('file')->getRealPath())->getSecurePath();
        try {
            $images = $request->file('image');
            // $descriptions = $request->descriptions;
            if (count($images) > 0) {
                foreach ($images as $index => $image) {
                    // $file_name = $image->getClientOriginalName();
                    // if ($re_file_name = $this->upload_controller->upload_image($image, $file_name)) {
                    if ($response = cloudinary()->upload($image->getRealPath())->getSecurePath()) {
                        $data = [
                            'photo_url' => $response,
                            'listing_id' => $id
                        ];
                        $this->add($data);
                        if ($index == 0) {
                            $listing = Listing::find($id);
                            if (is_null($listing->avatar_url)) {
                                $listing->avatar_url = $response;
                                $listing->save();
                            }
                        }
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

    public function upload_photo(Request $request, $id)
    {
        try {
            if ($response = cloudinary()->upload($request->file('file')->getRealPath())->getSecurePath()) {
                $data = [
                    'photo_url' => $response,
                    'listing_id' => $id
                ];
                $this->add($data);
            }
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

    function delete_all_photo_listing($id)
    {
        Photo_Listing::where('listing_id', $id)->delete();
    }

    function delete_multiple_photo_listing($ids)
    {
        Photo_Listing::destroy($ids);
    }

    function update_images_listing(Request $request, $id)
    {
        try {
            $photos = $request->photos;
            if (count($photos) > 0) {
                $this->delete_all_photo_listing($id);
                foreach ($photos as $photo) {
                    Photo_Listing::create([
                        'photo_url' => $photo->photo_url,
                        'listing_id' => $id,
                    ]);
                }
            }
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function add($data)
    {
        Photo_Listing::create($data);
    }

    public function add_photo_listing(Request $request)
    {
        Photo_Listing::create($request->all());
    }

    public function update_photo_url_thumbnail(Request $request, $id)
    {
        try {
            if (Listing::where('id', $id)->update(['avatar_url' => $request->avatar_url])) {
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function upload_photo_thumbnail(Request $request, $id)
    {
        try {
            if ($res = cloudinary()->upload($request->file('file')->getRealPath())->getSecurePath()) {
                if (Listing::where('id', $id)->update(['avatar_url' => $res])) {
                    $this->response['status'] = 'success';
                    return response()->json($this->response, $this->success_code);
                }
                return response()->json($this->response, 400);
            }
            return response()->json($this->response, 400);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

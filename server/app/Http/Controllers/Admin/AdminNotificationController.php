<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Exception;
use Illuminate\Http\Request;

class AdminNotificationController extends Controller
{
    private $success_code = 200;
    private $response = [
        'status' => false
    ];

    public function add(Request $request)
    {
        try {
            $data = $request->all();
            if (Notification::create($data)) {
                $this->response['status'] = true;
                return $this->response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    // public function 
}

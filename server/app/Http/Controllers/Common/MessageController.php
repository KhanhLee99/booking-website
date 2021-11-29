<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Events\Message;
use App\Models\Conversation;
use App\User;
use Illuminate\Http\Request;
use Exception;

class MessageController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];
    
    public function get_message(Request $request, $conversation_id) {

    }

    public function send_message(Request $request)
    {
        try {   
            $user = $request->user('api');
            $conversation_id = $request->conversation_id;

            if ($user->Conversations->contains($conversation_id)) {
                $new_message = $user->Messages()->create([
                    'message' => $request->message,
                    'conversation_id' => $conversation_id
                ]);
                if ($new_message) {
                    $this->response['status'] = 'success';
                    return response()->json($this->response, $this->success_code);
                }
            }

            $this->response['errorMessage'] = "User ko thuoc this conversation";
            return response()->json($this->response);
        // event(new Message($request->message, $request->username));

        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

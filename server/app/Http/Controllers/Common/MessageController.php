<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Events\Message;
use App\Models\Conversation;
use App\Models\Message as ModelsMessage;
use App\User;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    //
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    public function get_messages($conversation_id)
    {
        return DB::table('messages')
            ->where('conversation_id', $conversation_id)
            ->join('users', 'users.id', '=', 'messages.sender_id')
            ->select('users.name', 'users.avatar_url as avatar', 'messages.message', 'messages.created_at as time')
            ->get();
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

    public function seen_message(Request $request)
    {
        try {
            $user = $request->user('api');
            $last_message = ModelsMessage::orderBy('id', 'desc')->where('conversation_id', $request->conversation_id)->first();
            if ($last_message && $last_message['sender_id'] != $user->id) {
                $last_message->update([
                    'is_read' => 1
                ]);
            }
            $this->response['status'] = 'success';
            return response()->json($this->response, $this->success_code);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

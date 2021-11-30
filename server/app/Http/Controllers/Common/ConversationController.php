<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Message;
use Exception;
use Illuminate\Support\Facades\DB;

class ConversationController extends Controller
{
    private $success_code = 200;
    private $response = [
        'status' => 'fail'
    ];

    public function create_conversation(Request $request)
    {
        try {
            $sender = $request->user('api')->id;
            $receiver = $request->receiver;

            $conversation_is_found = Conversation::whereHas('Users', function ($q) use ($sender) {
                $q->where('user_id', $sender);
            })->whereHas('Users', function ($q) use ($receiver) {
                $q->where('user_id', $receiver);
            })->first();

            if ($conversation_is_found) {
                return $conversation_is_found;
            }
            
            $conversation = Conversation::create([
                'name' => $request->name,
                'creator_id' => $sender
            ]);
            $conversation->Users()->attach($sender);
            $conversation->Users()->attach($receiver);
            
            if ($conversation) {
                $this->response['status'] = 'success';
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function get_conversations(Request $request) {
        try {
            $user = $request->user('api');
            
            $conversations = Conversation::with(["users" => function ($query) use ($user) {
                $query->where("user_id", "!=", $user->id); 
            }])
            ->whereHas('users', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->get();

            

            $data = array();

            foreach ($conversations as $conversation) {
                $last_message = Message::orderBy('id', 'desc')->where('conversation_id', $conversation->id)->first();
                
                $data[] = [
                    'conversation_id' => $conversation->id,
                    'receiver' => [
                        'name' => $conversation->users[0]->name,
                        'avatar' => $conversation->users[0]->avatar_url
                    ],
                    'message' => $last_message['message'],
                    'time' => $last_message['created_at'],
                    'is_read' => $last_message['sender_id'] === $user->id ? 0 : $last_message['is_read']
                ];
            }
            if ($data) {
                $this->response['status'] = 'success';
                $this->response['data'] = $data;
                return response()->json($this->response, $this->success_code);
            }
            return response()->json($this->response);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

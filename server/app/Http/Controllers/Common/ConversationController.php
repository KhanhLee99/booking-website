<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;
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
            $user = $request->user('api')->id;
            $friends = Conversation::with(["Users" => function ($query) use ($user) {
                // Removes user data object from the users array that 
                // matches the id in $sender 
                $query->where("user_id", "!=", $user); 
            }])->whereHas('Users', function ($q) use ($user) {
                // Only returns the channels that $sender has participated in
                $q->where('user_id', $user);
            })->get();

            return $friends;
    
            // return DB::table('user_conversation')
            // ->where('user_id', $user->id)
            // ->join('users', 'users.id', '=', 'user_conversation.user_id')
            // ->select('users.name')
            // ->get();
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

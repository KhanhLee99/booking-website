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

    public function __construct()
    {
        $this->notificationController = new NotificationController();
    }

    public function get_conversation_two_person(Request $request)
    {
        try {
            $current_user_id = $request->user('api')->id;
            $host_id = $request->host_id;

            $conversation_is_found = Conversation::whereHas('Users', function ($q) use ($current_user_id) {
                $q->where('user_id', $current_user_id);
            })->whereHas('Users', function ($q) use ($host_id) {
                $q->where('user_id', $host_id);
            })->first();

            if (!$conversation_is_found) {
                $conversation = Conversation::create([
                    'name' => $request->name,
                    'creator_id' => $current_user_id
                ]);
                $conversation->Users()->attach($current_user_id);
                $conversation->Users()->attach($host_id);

                $conversation_is_found = Conversation::whereHas('Users', function ($q) use ($current_user_id) {
                    $q->where('user_id', $current_user_id);
                })->whereHas('Users', function ($q) use ($host_id) {
                    $q->where('user_id', $host_id);
                })->first();
            }
            $conversation_id = $conversation_is_found->id;
            return $this->get_messages($request, $conversation_id);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }

    public function get_messages(Request $request, $conversation_id)
    {
        $user_current_id = $request->user('api')->id;
        $data['conversation_id'] = $conversation_id;
        $data['conversation'] = DB::table('messages')
            ->where('conversation_id', $conversation_id)
            ->join('users', 'users.id', '=', 'messages.sender_id')
            ->select('users.id', 'users.name', 'users.avatar_url as avatar', 'messages.message', 'messages.created_at as time')
            ->selectRaw('(CASE WHEN users.id = ' . $user_current_id . ' THEN 1 ELSE 0 END) AS isMe')
            ->get();

        return $data;
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
                    $arr_user_id = Conversation::find($conversation_id)->Users->pluck('id')->toArray();
                    if (count($arr_user_id) > 0) {
                        foreach ($arr_user_id as $id) {
                            if ($id != $user->id) {
                                $this->notificationController->push_notification('New Message', 'New Message', $id);
                            }
                        }
                    }
                    $this->response['status'] = 'success';
                    return response()->json($this->response, $this->success_code);
                }
            }

            $this->response['errorMessage'] = "User ko thuoc cuoc tro chuyen";
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
            $last_message = ModelsMessage::orderBy('id', 'desc')
                ->where('conversation_id', $request->conversation_id)->first();
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

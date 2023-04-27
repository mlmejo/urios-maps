<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index(User $user)
    {
        return Inertia::render('Messages/Index');
    }

    public function create(Request $request, User $user)
    {
        return Inertia::render('Messages/Index', [
            't' => User::with('image:imageable_id,url')
                ->find($user->id),
            'messages' => Message::with('receiver.image', 'sender.image')
                ->where('receiver_id', $request->user()->id)
                ->orWhere('receiver_id', $user->id)
                ->orWhere('sender_id', $request->user()->id)
                ->orWhere('sender_id', $user->id)->get(),
        ]);
    }

    public function store(Request $request, User $user)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $request->user()->outbox()->create([
            'content' => $request->content,
            'receiver_id' => $user->id,
        ]);

        return redirect()->route('messages.create', $user->id);
    }
}

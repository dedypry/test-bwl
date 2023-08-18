<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    use Response;
    public function login(Request $request)
    {
        $credential = $request->validate([
            "email" => ["required", "email"],
            "password" => ["required"]
        ]);

        if (Auth::attempt($credential)) {
            return $this->success([
                'user' => User::find(Auth::user()->id),
                'token' => Auth::user()->createToken('API Token')->plainTextToken
            ], 'berhasil login');
        }

        return $this->error('credential not match', 404);
    }
}

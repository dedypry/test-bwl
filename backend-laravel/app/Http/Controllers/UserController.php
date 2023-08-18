<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    use Response;
    public function index()
    {

        $user = User::select(
            'id',
            'email',
            'code',
            DB::raw("concat(LEFT(code,3),'***',RIGHT(code,3)) as masking"),
            DB::raw("REGEXP_REPLACE(code,'[^a-zA-Z]','') as codex"),

        )->get();

        return $this->success($user);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|email|unique:users,email,$request->id",
            "password" => "required",
            "name" => "required"
        ]);

        if ($validator->fails()) {
            return $this->error($validator->messages());
        }



        $user = User::updateOrCreate([
            "id" => $request->id
        ], [
            "name" => $request->name,
            "email" => $request->email,
            "password" => bcrypt($request->password),
            "code" => self::generateRandomString(10)
        ]);

        return $this->success($user);
    }
    public function show(User $user)
    {
        return $this->success($user);
    }
    public function destroy(User $user)
    {
        if (Auth::user()->id == $user->id) return $this->error('user sedang login');

        return $this->success($user->id);
        $user->delete();
    }

    function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';

        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $randomString;
    }
}

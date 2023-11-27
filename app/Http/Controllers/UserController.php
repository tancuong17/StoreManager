<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class UserController extends Controller
{
    public function loginCheck(Request $request)
    {
        $data = [
            'username' => $request->username,
            'password' => $request->password,
        ];
        if (Auth::attempt($data)) {
            return Redirect::to('/');
        } else {
            return Redirect::to('/login');
        }
    }
    public function loggedCheck()
    {
        if (Auth::check()) {
            echo json_encode(array( 
                                    "id" => Auth::user()->id,
                                    "name" => Auth::user()->name,
                                    "image" => Auth::user()->image,
                                    "position" => Auth::user()->position,
                                ));
        } else {
            echo json_encode(0);
        }
    }
    public function logout()
    {
        Auth::logout();
        return Redirect::to('/login');
    }
}

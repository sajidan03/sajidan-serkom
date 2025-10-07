<?php

namespace App\Http\Controllers;

use App\Models\Profil_sekolah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    //
    public function loginShow (){
        $data['profil'] = Profil_sekolah::all()->first();
        return Inertia::render('login', $data);
    }
     public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        // if (Auth::attempt($credentials)) {
        //     $request->session()->regenerate();

        //     return redirect()->intended('/dashboard');
        // }

        return back()->withErrors([
            'username' => 'Username atau password salah.',
        ]);
    }
}

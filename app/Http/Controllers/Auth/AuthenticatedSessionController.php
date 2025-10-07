<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Profil_sekolah;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        $data['profil'] = Profil_sekolah::first();
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
            'profil' => $data['profil'],
        ]);
    }

    public function store(LoginRequest $request)
{
    try {
        $request->authenticate();
        $request->session()->regenerate();

        $user = Auth::user();

        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard')
                ->with('success', 'Login berhasil! Selamat datang Administrator.');
        } elseif ($user->role === 'operator') {
            return redirect()->route('operator.dashboard')
                ->with('success', 'Login berhasil! Selamat datang Operator.');
        }

        return redirect()->intended('/')
            ->with('success', 'Login berhasil! Selamat datang.');

    } catch (\Illuminate\Validation\ValidationException $e) {
        return back()
            ->withInput($request->only('username'))
            ->withErrors([
                'username' => 'Username atau password yang Anda masukkan salah.',
            ])
            ->with('error', 'Login gagal. Periksa kembali username dan password Anda.');
    } catch (\Illuminate\Auth\AuthenticationException $e) {
        return back()
            ->withInput($request->only('username'))
            ->withErrors([
                'username' => 'Username atau password yang Anda masukkan salah.',
            ])
            ->with('error', 'Login gagal. Periksa kembali username dan password Anda.');
    }
}


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}

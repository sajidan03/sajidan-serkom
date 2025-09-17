<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Member;
use App\Models\User;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::with(['user', 'category'])->get();
        
        $members->each(function($member) {
            $member->encrypted_id = Crypt::encryptString($member->id);
        });

        return Inertia::render('Admin/Member/index', [
            'members' => $members
        ]);
    }

    public function memberTambahView()
    {
        $users = User::where('role', 'warga')->get();
        $categories = Category::all();
        return Inertia::render('Admin/Member/tambah', compact('users', 'categories'));
    }

    public function memberTambah(Request $request)
    {
        $request->validate([
            'id_user' => 'required|exists:users,id',
            'id_category' => 'required|exists:categories,id',
        ]);

        Member::create($request->all());
        return redirect()->route('memberView')->with('success', 'Anggota iuran berhasil ditambahkan.');
    }

public function memberEditView($id)
{
    try {
        $id = Crypt::decryptString($id);
    } catch (DecryptException $e) {
        abort(404);
    }

    $member = Member::with(['user', 'category'])->findOrFail($id);
    $users = User::where('role', 'warga')->get();
    $categories = Category::all();

    $member->encrypted_id = Crypt::encryptString($member->id);

    return Inertia::render('Admin/Member/edit', [
        'member' => $member,
        'users' => $users,
        'categories' => $categories
    ]);
}

    public function memberEdit(Request $request, $id)
    {
        try {
            $id = Crypt::decryptString($id);
        } catch (DecryptException $e) {
            abort(404);
        }

        $member = Member::findOrFail($id);

        $request->validate([
            'id_user' => 'required|exists:users,id',
            'id_category' => 'required|exists:categories,id',
        ]);

        $member->update($request->all());

        return redirect()->route('memberView')->with('success', 'Data anggota iuran berhasil diperbarui.');
    }

    public function memberHapus($id)
    {
        try {
            $id = Crypt::decryptString($id);
        } catch (DecryptException $e) {
            abort(404);
        }

        $member = Member::findOrFail($id);
        $member->delete();

        return redirect()->route('memberView')->with('success', 'Data berhasil dihapus.');
    }
}
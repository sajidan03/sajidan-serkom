<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Member;
use App\Models\Payment;
use App\Models\Category;
use App\Models\Profil_sekolah;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(){
        $data['profil'] = Profil_sekolah::first();
        return Inertia::render('dashboard', $data);
    }
}

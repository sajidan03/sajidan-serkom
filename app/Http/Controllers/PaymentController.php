<?php

namespace App\Http\Controllers;

use App\Exports\PaymentsExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class PaymentController extends Controller
{
    //
        public function index(){
        return Inertia::render('Admin/Payment/index', []);
    }

}

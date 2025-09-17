<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LaporanKas;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PemasukanKas;
use App\Http\Controllers\PengeluaranKas;
use App\Http\Controllers\PetugasController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WargaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        //
        Route::get('user', [UserController::class, 'index'])->name('userView');
        Route::get('petugas', [PetugasController::class, 'index'])->name('petugasView');
        Route::get('payment', [PaymentController::class, 'index'])->name('paymentView');
        Route::get('warga', [WargaController::class, 'index'])->name('wargaAdminView');
        Route::get('member', [MemberController::class, 'index'])->name('memberView');
        Route::get('category', [CategoryController::class, 'index'])->name('categoryView');
        Route::get('kas/laporan', [LaporanKas::class, 'index'])->name('laporanKasView');
        //
        Route::get('user/export', [UserController::class, 'export'])->name('userExport');
        //
        Route::get('kas/pemasukan', [PemasukanKas::class, 'pemasukanView'])->name('pemasukanView');
        Route::post('kas/pemasukan', [PemasukanKas::class, 'pemasukanTambah'])->name('pemasukanTambah');
        //
        Route::post('kas/pengeluaran', [PengeluaranKas::class, 'pengeluaranTambah'])->name('pengeluaranTambah');
        Route::get('kas/pengeluaran', [PengeluaranKas::class, 'pengeluaranView'])->name('pengeluaranView');
        //
        Route::get('user/tambah', [UserController::class, 'tambahView'])->name('userTambahView');
        Route::post('user/tambah', [UserController::class, 'simpan'])->name('userTambah');
        Route::get('user/edit/{id}', [UserController::class, 'userEditView'])->name('userEditView');
        Route::put('user/edit/{id}', [UserController::class, 'editUser'])->name('userEdit');
        Route::delete('user/hapus/{id}', [UserController::class, 'hapusUser'])->name('userHapus');
        //
        Route::get('petugas/tambah', [PetugasController::class, 'petugasTambahView'])->name('petugasTambahView');
        Route::post('petugas/tambah', [PetugasController::class, 'petugasTambah'])->name('petugasTambah');
        Route::delete('petugas/hapus/{id}', [PetugasController::class, 'petugasHapus'])->name('petugasHapus');
        //
        Route::get('member/tambah', [MemberController::class, 'memberTambahView'])->name('memberTambahView');
        Route::post('member/tambah', [MemberController::class, 'memberTambah'])->name('memberTambah');
        Route::get('member/edit/{id}', [MemberController::class, 'memberEditView'])->name('memberEditView');
        Route::put('member/edit/{id}', [MemberController::class, 'memberEdit'])->name('memberEditView');
        Route::delete('member/hapus/{id}', [MemberController::class, 'memberHapus'])->name('memberHapus');
        //
        Route::get('category/tambah', [CategoryController::class, 'categoryTambahView'])->name('categoryTambahView');
        Route::post('category/tambah', [CategoryController::class, 'categoryTambah'])->name('categoryTambah');
        Route::get('category/edit/{id}', [CategoryController::class, 'categoryEditView'])->name('categoryEditView');
        Route::put('category/edit/{id}', [CategoryController::class, 'categoryEdit'])->name('categoryEdit');
        Route::delete('category/hapus/{id}', [CategoryController::class, 'categoryHapus'])->name('categoryHapus');
        //
        Route::delete('warga/hapus/{id}', [WargaController::class, 'wargaHapus'])->name('wargaHapus');
    });

Route::middleware(['auth', 'verified'])
    ->prefix('warga')
    ->group(function () {
        Route::get('export', [WargaController::class, 'export'])->name('paymentExport');
        Route::get('export/{id}', [WargaController::class, 'exportWarga'])->name('paymentExport');
        Route::get('dashboard', [WargaController::class, 'wargaView'])->name('wargaView');
    });


    // Route::resource('members', MemberController::class);
    // Route::resource('payments', PaymentController::class);


Route::middleware(['auth', 'verified'])
    ->prefix('petugas')
    ->group(function () {
        Route::get('dashboard', [PetugasController::class, 'petugasView'])->name('petugas.dashboard');
        Route::get('payment', [PetugasController::class, 'payment'])->name('petugas.payment');
        Route::post('payment/{id}', [PetugasController::class, 'paymentDetail'])->name('petugasPaymentDetailPost');
        Route::get('payment/{id}', [PetugasController::class, 'paymentDetail'])->name('petugasPaymentDetailGet');
        Route::post('bayar/{member}', [PetugasController::class, 'bayar'])->name('officer.bayar');
    });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

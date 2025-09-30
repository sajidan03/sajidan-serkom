<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EkskulController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\OperatorController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use App\Models\Ekstrakulikuler;
use Illuminate\Support\Facades\Route;

Route::get('/', [WelcomeController::class, 'index'])->name('home');


Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        //
        Route::get('user', [UserController::class, 'index'])->name('userView');
        Route::get('petugas', [OperatorController::class, 'index'])->name('petugasView');
        Route::get('warga', [SiswaController::class, 'index'])->name('wargaAdminView');
        Route::get('siswa', [SiswaController::class, 'index'])->name('siswaView');
        Route::get('guru', [GuruController::class, 'index'])->name('guruView');
        Route::get('berita', [BeritaController::class, 'index'])->name('beritaView');
        Route::get('galeri', [GaleriController::class, 'index'])->name('galeriView');
        Route::get('ekstrakulikuler', [EkskulController::class, 'index'])->name('ekskulView');
        //
        Route::get('guru/export', [GuruController::class, 'export'])->name('guruExport');
        Route::get('user/export', [UserController::class, 'export'])->name('userExport');
        //
        Route::get('galeri/tambah', [GaleriController::class, 'tambahView'])->name('galeriTambahView');
        Route::post('galeri/tambah', [GaleriController::class, 'galeriTambah'])->name('galeriTambah');
        Route::get('galeri/edit/{id}', [GaleriController::class, 'galeriEditView'])->name('galeriEditView');
        Route::post('galeri/edit/{id}', [GaleriController::class, 'galeriEdit'])->name('galeriEdit');
        Route::delete('galeri/hapus/{id}', [GaleriController::class, 'galeriHapus'])->name('galeriHapus');
        //
        Route::get('guru/tambah', [GuruController::class, 'tambahView'])->name('guruTambahView');
        Route::post('guru/simpan', [GuruController::class, 'simpan'])->name('guruSimpan');
        Route::get('guru/edit/{id}', [GuruController::class, 'guruEditView'])->name('guruEditView');
        Route::post('guru/edit/{id}', [GuruController::class, 'guruEdit'])->name('guruEdit');
        Route::delete('guru/hapus/{id}', [GuruController::class, 'guruHapus'])->name('guruHapus');
        //
        Route::get('user/tambah', [UserController::class, 'tambahView'])->name('userTambahView');
        Route::post('user/simpan', [UserController::class, 'simpan'])->name('userSimpan');
        Route::get('user/edit/{id}', [UserController::class, 'userEditView'])->name('userEditView');
        Route::post('user/edit/{id}', [UserController::class, 'editUser'])->name('userEdit');
        Route::delete('user/hapus/{id}', [UserController::class, 'hapusUser'])->name('userHapus');
        //
        Route::get('siswa/tambah', [SiswaController::class, 'tambahView'])->name('siswaTambahView');
        Route::post('siswa/simpan', [SiswaController::class, 'simpan'])->name('siswaSimpan');
        Route::get('siswa/edit/{id}', [SiswaController::class, 'siswaEditView'])->name('siswaEditView');
        Route::post('siswa/edit/{id}', [SiswaController::class, 'siswaEdit'])->name('siswaEdit');
        Route::delete('siswa/hapus/{id}', [SiswaController::class, 'hapusSiswa'])->name('siswaHapus');
        //
        Route::get('berita/tambah', [BeritaController::class, 'beritaTambahView'])->name('beritaTambahView');
        Route::post('berita/tambah', [BeritaController::class, 'beritaTambah'])->name('beritaTambah');
        Route::get('berita/edit/{id}', [BeritaController::class, 'beritaEditView'])->name('beritaEditView');
        Route::post('berita/edit/{id}', [BeritaController::class, 'beritaEdit'])->name('beritaEdit');
        Route::delete('berita/hapus/{id}', [BeritaController::class, 'beritaHapus'])->name('beritaHapus');
        //
         Route::get('ekstrakulikuler/tambah', [EkskulController::class, 'ekskulTambahView'])->name('beritaTambahView');
        Route::post('ekstrakulikuler/tambah', [EkskulController::class, 'ekskulTambah'])->name('ekskulTambah');
        Route::get('ekstrakulikuler/edit/{id}', [EkskulController::class, 'ekskulEditView'])->name('ekskulEditView');
        Route::post('ekstrakulikuler/edit/{id}', [EkskulController::class, 'ekskulEdit'])->name('ekskulEdit');
        Route::delete('ekstrakulikuler/hapus/{id}', [EkskulController::class, 'ekskulHapus'])->name('ekskulHapus');
    });

Route::middleware(['auth', 'verified'])
    ->prefix('siswa')
    ->group(function () {
        Route::get('export', [SiswaController::class, 'export'])->name('paymentExport');
        Route::get('export/{id}', [SiswaController::class, 'exportWarga'])->name('paymentExport');
        Route::get('dashboard', [SiswaController::class, 'wargaView'])->name('SiswaView');
    });

Route::middleware(['auth', 'verified'])
    ->prefix('petugas')
    ->group(function () {
        Route::get('dashboard', [OperatorController::class, 'petugasView'])->name('operator.dashboard');
        Route::get('payment', [OperatorController::class, 'payment'])->name('petugas.payment');
        Route::post('payment/{id}', [OperatorController::class, 'paymentDetail'])->name('petugasPaymentDetailPost');
        Route::get('payment/{id}', [OperatorController::class, 'paymentDetail'])->name('petugasPaymentDetailGet');
        Route::post('bayar/{member}', [OperatorController::class, 'bayar'])->name('officer.bayar');
    });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

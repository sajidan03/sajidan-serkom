<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EkskulController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\OperatorBerita;
use App\Http\Controllers\OperatorController;
use App\Http\Controllers\OperatorEskul;
use App\Http\Controllers\OperatorGaleri;
use App\Http\Controllers\OperatorGuru;
use App\Http\Controllers\OperatorProfilSekolah;
use App\Http\Controllers\OperatorSiswa;
use App\Http\Controllers\ProfilSekolahController;
use App\Http\Controllers\MapelController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use App\Models\Ekstrakulikuler;
use Illuminate\Support\Facades\Route;

Route::get('/', [WelcomeController::class, 'index'])->name('home');
//berita
Route::get('/berita', [WelcomeController::class,'daftarBerita'])->name('daftarBerita');
Route::get('/berita/{id}', [WelcomeController::class,'detailBerita'])->name('detailBerita');
//galeri
Route::get('/galeri', [WelcomeController::class, 'daftarGaleri'])->name('daftarGaleri');
Route::get('/galeri/{id}', [WelcomeController::class, 'detailGaleri'])->name('detailGaleri');
//ekstrakulikuler
Route::get('ekstrakulikuler', [WelcomeController::class, 'daftarEskul'])->name('daftarEskul');
Route::get('ekstrakulikuler/{id}', [WelcomeController::class, 'detailEskul'])->name('daftarEskul');

Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        //view
        Route::get('user', [UserController::class, 'index'])->name('userView');
        Route::get('guru', [GuruController::class, 'index'])->name('guruView');
        Route::get('berita', [BeritaController::class, 'index'])->name('beritaView');
        Route::get('galeri', [GaleriController::class, 'index'])->name('galeriView');
        Route::get('ekstrakulikuler', [EkskulController::class, 'index'])->name('ekskulView');
        Route::get('profil-sekolah', [ProfilSekolahController::class, 'index'])->name('profilView');
        Route::get('mapel', [MapelController::class, 'index'])->name('mapelView');
        Route::get('siswa', [SiswaController::class, 'index'])->name('siswaView');
        //export
        Route::get('guru/export', [GuruController::class, 'export'])->name('guruExport');
        Route::get('user/export', [UserController::class, 'export'])->name('userExport');
        Route::get('siswa/export', [SiswaController::class, 'export'])->name('siswaExport');
        //kelola-galeri
        Route::get('galeri/tambah', [GaleriController::class, 'galeriTambahView'])->name('galeriTambahView');
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
        //
        Route::get('profil-sekolah/tambah', [ProfilSekolahController::class, 'tambahView'])->name('profilTambahView');
        Route::post('profil-sekolah/tambah', [ProfilSekolahController::class, 'profilTambah'])->name('profilSimpan');
        Route::get('profil-sekolah/edit/{id}', [ProfilSekolahController::class, 'profilEditView'])->name('profilEditView');
        Route::post('profil-sekolah/edit/{id}', [ProfilSekolahController::class, 'profilEdit'])->name('profilEdit');
        Route::delete('profil-sekolah/hapus/{id}', [ProfilSekolahController::class, 'hapusProfil'])->name('profilHapus');
        //
        Route::get('mapel/tambah', [MapelController::class, 'mapelTambahView'])->name('mapelTambahView');
        Route::post('mapel/tambah', [MapelController::class, 'mapelTambah'])->name('mapelSimpan');
        Route::get('mapel/edit/{id}', [MapelController::class, 'mapelEditView'])->name('mapelEditView');
        Route::post('mapel/edit/{id}', [MapelController::class, 'mapelEdit'])->name('mapelEdit');
        Route::delete('mapel/hapus/{id}', [MapelController::class, 'mapelHapus'])->name('mapelHapus');
    });

Route::middleware(['auth', 'verified'])
    ->prefix('operator')
    ->group(function () {
        Route::get('dashboard', [OperatorController::class, 'index'])->name('operator.dashboard');
        //tampilan-awal
        Route::get('guru', [OperatorGuru::class, 'index'])->name('operatorGuruView');
        Route::get('berita', [OperatorBerita::class, 'index'])->name('operatorBeritaView');
        Route::get('galeri', [OperatorGaleri::class, 'index'])->name('operatorGaleriView');
        Route::get('ekstrakulikuler', [OperatorEskul::class, 'index'])->name('operatorEkskulView');
        Route::get('profil-sekolah', [OperatorProfilSekolah::class, 'index'])->name('operatorProfilView');
        Route::get('siswa', [OperatorSiswa::class, 'index'])->name('operatorSiswaView');
        //export
        Route::get('guru/export', [OperatorGuru::class, 'export'])->name('guruExport');

        //kelola-galeri
        Route::get('galeri/tambah', [OperatorGaleri::class, 'galeriTambahView'])->name('galeriTambahView');
        Route::post('galeri/tambah', [OperatorGaleri::class, 'galeriTambah'])->name('galeriTambah');
        Route::get('galeri/edit/{id}', [OperatorGaleri::class, 'galeriEditView'])->name('galeriEditView');
        Route::post('galeri/edit/{id}', [OperatorGaleri::class, 'galeriEdit'])->name('galeriEdit');
        Route::delete('galeri/hapus/{id}', [OperatorGaleri::class, 'galeriHapus'])->name('galeriHapus');

        //kelola-guru
        Route::get('guru/tambah', [OperatorGuru::class, 'tambahView'])->name('guruTambahView');
        Route::post('guru/simpan', [OperatorGuru::class, 'simpan'])->name('guruSimpan');
        Route::get('guru/edit/{id}', [OperatorGuru::class, 'guruEditView'])->name('guruEditView');
        Route::post('guru/edit/{id}', [OperatorGuru::class, 'guruEdit'])->name('guruEdit');
        Route::delete('guru/hapus/{id}', [OperatorGuru::class, 'guruHapus'])->name('guruHapus');

        //kelola-siswa
        Route::get('siswa/tambah', [OperatorSiswa::class, 'tambahView'])->name('siswaTambahView');
        Route::post('siswa/simpan', [OperatorSiswa::class, 'simpan'])->name('siswaSimpan');
        Route::get('siswa/edit/{id}', [OperatorSiswa::class, 'siswaEditView'])->name('siswaEditView');
        Route::post('siswa/edit/{id}', [OperatorSiswa::class, 'siswaEdit'])->name('siswaEdit');
        Route::delete('siswa/hapus/{id}', [OperatorSiswa::class, 'hapusSiswa'])->name('siswaHapus');

        //kelola-berita
        Route::get('berita/tambah', [OperatorBerita::class, 'beritaTambahView'])->name('beritaTambahView');
        Route::post('berita/tambah', [OperatorBerita::class, 'beritaTambah'])->name('beritaTambah');
        Route::get('berita/edit/{id}', [OperatorBerita::class, 'beritaEditView'])->name('beritaEditView');
        Route::post('berita/edit/{id}', [OperatorBerita::class, 'beritaEdit'])->name('beritaEdit');
        Route::delete('berita/hapus/{id}', [OperatorBerita::class, 'beritaHapus'])->name('beritaHapus');

        //kelola-eskul
        Route::get('ekstrakulikuler/tambah', [OperatorEskul::class, 'ekskulTambahView'])->name('ekskulTambahView');
        Route::post('ekstrakulikuler/tambah', [OperatorEskul::class, 'ekskulTambah'])->name('ekskulTambah');
        Route::get('ekstrakulikuler/edit/{id}', [OperatorEskul::class, 'ekskulEditView'])->name('ekskulEditView');
        Route::post('ekstrakulikuler/edit/{id}', [OperatorEskul::class, 'ekskulEdit'])->name('ekskulEdit');
        Route::delete('ekstrakulikuler/hapus/{id}', [OperatorEskul::class, 'ekskulHapus'])->name('ekskulHapus');

        //kelola-profil
        Route::get('profil-sekolah/tambah', [OperatorProfilSekolah::class, 'tambahView'])->name('profilTambahView');
        Route::post('profil-sekolah/tambah', [OperatorProfilSekolah::class, 'profilTambah'])->name('profilSimpan');
        Route::get('profil-sekolah/edit/{id}', [OperatorProfilSekolah::class, 'profilEditView'])->name('profilEditView');
        Route::post('profil-sekolah/edit/{id}', [OperatorProfilSekolah::class, 'profilEdit'])->name('profilEdit');
        Route::delete('profil-sekolah/hapus/{id}', [OperatorProfilSekolah::class, 'hapusProfil'])->name('profilHapus');
        //kelola-mapel
        Route::get('mapel/tambah', [OperatorMapel::class, 'mapelTambahView'])->name('mapelTambahView');
        Route::post('mapel/tambah', [OperatorMapel::class, 'mapelTambah'])->name('mapelSimpan');
        Route::get('mapel/edit/{id}', [OperatorMapel::class, 'mapelEditView'])->name('mapelEditView');
        Route::post('mapel/edit/{id}', [OperatorBerita::class, 'mapelEdit'])->name('mapelEdit');
        Route::delete('mapel/hapus/{id}', [OperatorBerita::class, 'mapelHapus'])->name('mapelHapus');
        });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

<?php

namespace Database\Seeders;

use App\Models\Berita;
use App\Models\Petugas;
use App\Models\Payment;
use App\Models\User;
use App\Models\Member;
use App\Models\Category;
use App\Models\Galeri;
use App\Models\Guru;
use App\Models\Pemasukan;
use App\Models\Pengeluaran;
use App\Models\Ekstrakulikuler;
use App\Models\Profil_sekolah;
use App\Models\Siswa;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Sajidan',
            'username' => 'sajidan',
            'password' => bcrypt('123'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Dhiya',
            'username' => 'diya',
            'password' => bcrypt('123'),
            'role' => 'operator',
        ]);
        User::create([
            'name' => 'Rahman',
            'username' => 'rahman',
            'password' => bcrypt('123'),
            'role' => 'operator',
        ]);
        User::create([
            'name' => 'Danis',
            'username' => 'danis',
            'password' => bcrypt('123'),
            'role' => 'operator',
        ]);
        User::create([
            'name' => 'Hamdi',
            'username' => 'hamdi',
            'password' => bcrypt('123'),
            'role' => 'operator',
        ]);
         User::create([
            'name' => 'Riki',
            'username' => 'riki',
            'password' => bcrypt('123'),
            'role' => 'operator',
        ]);
        Siswa::create([
            'nisn' => '0088630322',
            'nama_siswa' => 'Muhammad Sajidan Rifansyah',
            'jenis_kelamin' => 'Laki-laki',
            'tahun_masuk' => 2023,
        ]);
        Siswa::create([
            'nisn' => '1233332221',
            'nama_siswa' => 'Rifat abdul manaf',
            'jenis_kelamin' => 'Laki-laki',
            'tahun_masuk' => 2023,
        ]);Siswa::create([
            'nisn' => '9288809129',
            'nama_siswa' => 'Ami aprilia maulani akbar',
            'jenis_kelamin' => 'Perempuan',
            'tahun_masuk' => 2023,
        ]);
        //
        Guru::create([
            'nama_guru' => 'Fatin shidqia lubis',
            'nip' => '0987654321',
            'mapel' => 'Matematika',
            'foto' => 'fatin.jpeg',
        ]);
         Guru::create([
            'nama_guru' => 'Fatin shidqia lubis',
            'nip' => '0987654321',
            'mapel' => 'Matematika',
            'foto' => 'fatin.jpeg',
        ]);
         Guru::create([
            'nama_guru' => 'Fatin shidqia lubis',
            'nip' => '0987654321',
            'mapel' => 'Matematika',
            'foto' => 'fatin.jpeg',
        ]);
        //
        Profil_sekolah::create([
            'nama_sekolah' => 'SMK YPC Tasikmalaya',
            'kepala_sekolah' => 'Drs. H. Ujang sanusi, M.M.',
            'foto' => 'foto.jpg',
            'logo' => 'logo.png',
            'npsn' => '1234567890',
            'alamat' => 'Jl. Garut-Tasikmalaya',
            'kontak' => '08123456789',
            'visi_misi' => 'Mewujudkan Lulusan yang Beriman, Bertaqwa, Unggul, dan Kompetitif di Bidang Teknologi Informasi dan Komunikasi',
            'tahun_berdiri' => '2005',
            'deskripsi' => 'SMK YPC Tasikmalaya adalah sekolah menengah kejuruan yang berfokus pada pengembangan keterampilan di bidang teknologi informasi dan komunikasi. Dengan fasilitas modern dan tenaga pengajar yang berpengalaman, kami berkomitmen untuk mencetak lulusan yang siap bersaing di dunia kerja.',
        ]);
        //
        Galeri::create([
            'judul' => 'Kita sama sama tahu',
            'keterangan' => 'Kita sama sama tahu',
            'file' => 'berita.mp4',
            'kategori' => 'video',
            'tanggal' => '2023-10-01',
        ]);
        Galeri::create([
            'judul' => 'Kita sama sama tahu',
            'keterangan' => 'Kita sama sama tahu',
            'file' => 'berita.mp4',
            'kategori' => 'video',
            'tanggal' => '2023-10-01',
        ]);Galeri::create([
            'judul' => 'Kita sama sama tahu',
            'keterangan' => 'Kita sama sama tahu',
            'file' => 'berita.mp4',
            'kategori' => 'video',
            'tanggal' => '2023-10-01',
        ]);
        //
        Ekstrakulikuler::create([
            'nama_eskul' => 'Pramuka',
            'jadwal_latihan' => 'Setiap Jumat, 15.00 - 17.00',
            'deskripsi' => 'Ekstrakulikuler pramuka bertujuan untuk membentuk karakter siswa melalui kegiatan kepramukaan yang menyenangkan dan edukatif.',
            'gambar' => 'pramuka.png',
            'id_guru' => 1
        ]);
        Ekstrakulikuler::create([
            'nama_eskul' => 'Pramuka',
            'jadwal_latihan' => 'Setiap Jumat, 15.00 - 17.00',
            'deskripsi' => 'Ekstrakulikuler pramuka bertujuan untuk membentuk karakter siswa melalui kegiatan kepramukaan yang menyenangkan dan edukatif.',
            'gambar' => 'pramuka.png',
            'id_guru' => 1
        ]);Ekstrakulikuler::create([
            'nama_eskul' => 'Pramuka',
            'jadwal_latihan' => 'Setiap Jumat, 15.00 - 17.00',
            'deskripsi' => 'Ekstrakulikuler pramuka bertujuan untuk membentuk karakter siswa melalui kegiatan kepramukaan yang menyenangkan dan edukatif.',
            'gambar' => 'pramuka.png',
            'id_guru' => 1
        ]);
        //
        Berita::create([
            'judul' => 'Manggung keliling Band SMK YPC',
            'isi' => 'Kita sama sama tahu',
            'gambar' => 'seni.jpg',
            'tanggal' => '2023-11-15',
            'id_user' => 1,
        ]);
        Berita::create([
            'judul' => 'Manggung keliling Band SMK YPC',
            'isi' => 'Kita sama sama tahu',
            'gambar' => 'seni.jpg',
            'tanggal' => '2023-11-15',
            'id_user' => 1,
        ]);
        Berita::create([
            'judul' => 'Manggung keliling Band SMK YPC',
            'isi' => 'Kita sama sama tahu',
            'gambar' => 'seni.jpg',
            'tanggal' => '2023-11-15',
            'id_user' => 1,
        ]);
    }
}

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
            'nisn' => '1234567890',
            'nama_siswa' => 'Dhiya',
            'jenis_kelamin' => 'Laki-laki',
            'tahun_masuk' => 2023,
        ]);
        Guru::create([
            'nama_guru' => 'Ujang',
            'nip' => '0987654321',
            'mapel' => 'Matematika',
            'foto' => 'guru.png',
        ]);
        Profil_sekolah::create([
            'nama_sekolah' => 'SMK YPC Tasikmalaya',
            'kepala_sekolah' => 'Drs. H. Ujang sanusi, M.M.',
            'foto' => 'sekolah.png',
            'logo' => 'logo.png',
            'npsn' => '1234567890',
            'alamat' => 'Jl. Garut-Tasikmalaya',
            'kontak' => '08123456789',
            'visi_misi' => 'Mewujudkan Lulusan yang Beriman, Bertaqwa, Unggul, dan Kompetitif di Bidang Teknologi Informasi dan Komunikasi',
            'tahun_berdiri' => '2005',
            'deskripsi' => 'SMK YPC Tasikmalaya adalah sekolah menengah kejuruan yang berfokus pada pengembangan keterampilan di bidang teknologi informasi dan komunikasi. Dengan fasilitas modern dan tenaga pengajar yang berpengalaman, kami berkomitmen untuk mencetak lulusan yang siap bersaing di dunia kerja.',
        ]);
        Galeri::create([
            'judul' => 'Kegiatan Pramuka',
            'keterangan' => 'Kegiatan pramuka diikuti oleh seluruh siswa kelas X',
            'file' => 'pramuka.jpg',
            'kategori' => 'foto',
            'tanggal' => '2023-10-01',
        ]);
        Ekstrakulikuler::create([
            'nama_eskul' => 'Pramuka',
            // 'pembina' => 'Ujang',
            'jadwal_latihan' => 'Setiap Jumat, 15.00 - 17.00',
            'deskripsi' => 'Ekstrakulikuler pramuka bertujuan untuk membentuk karakter siswa melalui kegiatan kepramukaan yang menyenangkan dan edukatif.',
            'gambar' => 'pramuka.png',
            'id_guru' => 1
        ]);
        Berita::create([
            'judul' => 'Penerimaan Siswa Baru 2024',
            'isi' => 'Penerimaan siswa baru untuk tahun ajaran 2024/2025 telah dibuka. Silakan kunjungi website resmi kami untuk informasi lebih lanjut.',
            'gambar' => 'psb2024.jpg',
            'tanggal' => '2023-11-15',
            'id_user' => 1,
        ]);
    }
}

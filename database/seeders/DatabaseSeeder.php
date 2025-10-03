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
            'nip' => '2987654321',
            'mapel' => 'Matematika',
            'foto' => 'fatin.jpeg',
        ]);
         Guru::create([
            'nama_guru' => 'Kim ji won',
            'nip' => '3987654321',
            'mapel' => 'Biologi',
            'foto' => 'kimjiwon.png',
        ]);
        Guru::create([
            'nama_guru' => 'Cho yi hyun',
            'nip' => '3987654321',
            'mapel' => 'Kimia',
            'foto' => 'co.jpg',
        ]);
        //
        Profil_sekolah::create([
            'nama_sekolah' => 'SMK YPC Tasikmalaya',
            'kepala_sekolah' => 'Drs. H. Ujang sanusi, M.M.',
            'foto_kepsek' => 'kepala.jpg',
            'foto' => 'foto.jpg',
            'logo' => 'logo.png',
            'npsn' => '1234567890',
            'alamat' => 'Jl. Garut-Tasikmalaya',
            'kontak' => '08123456789',
            'email' => 'smkypctasikmalaya@sch.id',
            'instagram' => 'https://instagram.com/officialsmkypc/',
            'facebook' => 'https://www.facebook.com/smkypc/?locale=id_ID',
            'youtube' => 'https://www.youtube.com/@smkypctasikmalaya/featured',
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
            'judul' => 'Ruang praktik siswa',
            'keterangan' => 'Ruang praktik siswa',
            'file' => 'rps.jpg',
            'kategori' => 'foto',
            'tanggal' => '2023-10-01',
        ]);
        Galeri::create([
            'judul' => 'Lapangan upacara',
            'keterangan' => 'Lapangan upacara',
            'file' => 'lapangan.jpg',
            'kategori' => 'foto',
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
            'nama_eskul' => 'Badminton',
            'jadwal_latihan' => 'Setiap Selasa & Sabtu, 15.00 - 17.00',
            'deskripsi' => 'Eskul badminton bertujuan untuk melatih dan menjadikan siswa atlet yang kompeten',
            'gambar' => 'badminton.jpg',
            'id_guru' => 1
        ]);
        Ekstrakulikuler::create([
            'nama_eskul' => 'Taekwondo',
            'jadwal_latihan' => 'Setiap Jumat, 15.00 - 17.00',
            'deskripsi' => 'Eskul taekwondo bertujuan untuk mengembangkan dan melatih potensi pada tiap siswa/siswi',
            'gambar' => 'taekwondo.jpg',
            'id_guru' => 1
        ]);
        //
        Berita::create([
            'judul' => 'Juara 2 LKS Tingkat Nasional Maulana ridwan',
            'isi' => 'Juara 2 LKS Tingkat Nasional Maulana ridwan, bidang lomba Kabel jaringan dan komputer informasi',
            'gambar' => 'ridwan.jpeg',
            'tanggal' => '2024-11-15',
            'id_user' => 2,
        ]);
        Berita::create([
            'judul' => 'Kejuaraan Lomba LKS',
            'isi' => 'Kejuaraan Lomba LKS Tingkat Nasional & Provinsi
                Ridwan Juara 2 bidang lomba kabel jaringan,
                Haikal Juara 1 bidang lomba Industrial Control,
                Januardi Juara 2 bidang lomba Cloud Computing,
                Alfa Juara 2 Automobile Technology',
            'gambar' => 'kejuaraan-lks.jpeg',
            'tanggal' => '2024-11-15',
            'id_user' => 2,
        ]);
        Berita::create([
            'judul' => 'Peserta Lomba LKS Tahun 2025',
            'isi' => 'Peserta lomba LKS Tahun 2025
            Muhammad Sajidan Rifansyah bidang Lomba iT Software Solutions for bussiness
            Rifat Abdul Manaf bidang lomba Cyber Security
            Raja Malika Ghaliyah bidang lomba Cyber Security
            Ayrin putri wahyudi bidang lomba Graphics design
            Hilman agustian bidang lomba Web dev

            Semangat yaa buat kalian yang belum dapat hasil yang memuaskan!!.. Tetap semangat jangan menyerah!! <3
            ',
            'gambar' => 'peserta-lks.jpeg',
            'tanggal' => '2023-11-15',
            'id_user' => 2,
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Petugas;
use App\Models\Payment;
use App\Models\User;
use App\Models\Member;
use App\Models\Category;
use App\Models\Pemasukan;
use App\Models\Pengeluaran;
use App\Models\Profil_sekolah;
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
            'role' => 'siswa',
        ]);
        User::create([
            'name' => 'Rahman',
            'username' => 'rahman',
            'password' => bcrypt('123'),
            'role' => 'siswa',
        ]);
        User::create([
            'name' => 'Danis',
            'username' => 'danis',
            'password' => bcrypt('123'),
            'role' => 'siswa',
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
            'role' => 'siswa',
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
    //    Petugas::create([
    //          'id_user' => '3',
    //     ]);
    //     Category::create([
    //         'name' => 'Umrah',
    //         'period' => 'Mingguan',
    //         'nominal' => 10000,
    //         'status' => 'active',
    //     ]);
    //     Category::create([
    //         'name' => 'Kurban',
    //         'period' => 'Bulanan',
    //         'nominal' => 20000,
    //         'status' => 'active',
    //     ]);Category::create([
    //         'name' => 'Agustusan',
    //         'period' => 'Tahunan',
    //         'nominal' => 10000,
    //         'status' => 'active',
    //     ]);
    //     Member::create([
    //         'id_user' => 2,
    //         'id_category' => 1,
    //     ]);
    //      Member::create([
    //         'id_user' => 4,
    //         'id_category' => 2,
    //     ]);
    //      Member::create([
    //         'id_user' => 5,
    //         'id_category' => 3,
    //     ]);
    //     Member::create([
    //         'id_user' => 6,
    //         'id_category' => 2,
    //     ]);
    //     Payment::create([
    //         'id_user' => 2,
    //         'period' => 'mingguan',
    //         'nominal' => 10000,
    //         'id_petugas' => 3,
    //         'id_member' => 2,
    //     ]);
    //     Payment::create([
    //         'id_user' => 4,
    //         'period' => 'bulan',
    //         'nominal' => 10000,
    //         'id_petugas' => 3,
    //         'id_member' => 2,
    //     ]);
    //     Payment::create([
    //         'id_user' => 5,
    //         'period' => 'tahunan',
    //         'nominal' => 10000,
    //         'id_petugas' => 3,
    //         'id_member' => 2,
    //     ]);
    //     Payment::create([
    //         'id_user' => 6,
    //         'created_at' => '2025-10-01 12:00:00',
    //         'period' => 'bulan',
    //         'nominal' => 10000,
    //         'id_petugas' => 3,
    //         'id_member' => 2,
    //     ]);
    //     Pemasukan::create([
    //         'sumber' => 'Infaq',
    //         'nominal' => 10000,
    //         'tanggal' => '2025-05-01',
    //         'keterangan' => 'Infaq Bulanan',
    //     ]);
    //     Pengeluaran::create([
    //         'sumber' => 'Belanja',
    //         'nominal' => 5000,
    //         'tanggal' => '2025-05-01',
    //         'keterangan' => 'Belanja Bulanan',
    //     ]);
    }
}

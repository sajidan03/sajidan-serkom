<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('siswas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nisn', 10);
            $table->string('nama_siswa', 40);
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']);
            $table->string('jurusan', 100)->default('Siswa')->nullable()    ;
            $table->year('tahun_masuk', 4)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswas');
    }
};

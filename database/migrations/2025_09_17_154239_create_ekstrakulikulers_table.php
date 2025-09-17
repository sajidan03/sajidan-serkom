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
        Schema::create('ekstrakulikulers', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nama_eskul', 40);
            $table->string('pembina',40);
            $table->string('jadwal_latihan',40);
            $table->text('deskripsi');
            $table->string('gambar', 100);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ekstrakulikulers');
    }
};

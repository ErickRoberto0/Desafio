<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    //Cria a tabela cidades.

    public function up(): void {
        Schema::create('cidades', function (Blueprint $table) {
            $table->id('cod');
            $table->string('nome')->unique();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('cidades');
    }
};

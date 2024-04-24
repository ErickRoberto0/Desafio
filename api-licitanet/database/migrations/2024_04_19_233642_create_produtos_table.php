<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    //Cria a Tabela produtos

    public function up(): void {
        Schema::create('produtos', function (Blueprint $table) {
            $table->id('cod');
            $table->string('nome') ->unique();
            $table->float('valor');
            $table->float('estoque');
            $table->unsignedBigInteger('codMarca'); // utilizando unsignedBigInteger para que não aconteça incompatibilidade na criação da FK
            $table->unsignedBigInteger('codCidade');
            $table->timestamps();
        });

        //Cria as chaves estrangeiras 

        Schema::table('produtos', function (Blueprint $table) {
            $table->foreign('codMarca')->references('cod')->on('marcas');
            $table->foreign('codCidade')->references('cod')->on('cidades');
        });
    }

    public function down(): void {
        Schema::dropIfExists('produtos');
    }
};

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marca extends Model {
    use HasFactory;
    protected $table = 'marcas';
    protected $primaryKey = 'cod';
    protected $filellable = ['cod', 'nome', 'fabricante'];

    public function produtos() {
        return $this->hasMany(Produto::class, 'codMarca');
    }
}

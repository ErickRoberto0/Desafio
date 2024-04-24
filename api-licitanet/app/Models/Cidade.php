<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cidade extends Model {
    use HasFactory;
    protected $table = 'cidades';
    protected $primaryKey = 'cod';
    protected $filellable = ['cod', 'nome'];

    public function produtos() {
        return $this->hasMany(Produto::class, 'codCidade');
    }
}

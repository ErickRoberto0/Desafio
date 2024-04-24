<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produto extends Model {
    use HasFactory;
    protected $table = 'produtos'; 
    protected $primaryKey = 'cod'; 
    protected $fillable = ['cod', 'nome', 'valor', 'estoque','codMarca','codCidade'];

    public function marca() {
        return $this->belongsTo(Marca::class, 'codMarca');
    }

    public function cidade() {
        return $this->belongsTo(Cidade::class, 'codCidade');
    }

}

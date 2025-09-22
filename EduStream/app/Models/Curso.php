<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// IMPORTAR MODELO Inscripcion
use App\Models\Inscripcion;
use App\Models\Usuario;

class Curso extends Model
{
    use HasFactory;

    protected $table = 'cursos';

    protected $fillable = [
        'nombre',
        'descripcion',
        'img_url',
        'admin_id',
    ];

    public function admin()
    {
        return $this->belongsTo(Usuario::class, 'admin_id');
    }

    public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class, 'curso_id');
    }
}

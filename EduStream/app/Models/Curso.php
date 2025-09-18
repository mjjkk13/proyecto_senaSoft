<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    use HasFactory;

    // Nombre de la tabla (opcional si sigue la convención en plural)
    protected $table = 'cursos';

    // Campos que se pueden asignar de manera masiva
    protected $fillable = [
        'nombre',
        'descripcion',
        'admin_id',
    ];

    /**
     * Relación: un curso pertenece a un usuario (admin).
     */
    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    /**
     * Relación: un curso puede tener muchas inscripciones.
     */
    public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class, 'curso_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'usuarios'; 

    protected $fillable = [
        'nombre',
        'email',
        'password',
        'rol_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Relaciones
    public function rol()
    {
        return $this->belongsTo(Rol::class);
    }

    public function cursos()
    {
        return $this->hasMany(Curso::class, 'admin_id');
    }

    public function inscripciones()
    {
        return $this->hasMany(Inscripcion::class);
    }
}

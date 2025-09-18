<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Notifications\ResetPassword as ResetPasswordNotification;


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
    // public function rol()
    // {
    //     return $this->belongsTo(Rol::class);
    // }

    public function cursos()
    {
        return $this->hasMany(Curso::class, 'admin_id');
    }

    // public function inscripciones()
    // {
    //     return $this->hasMany(Inscripcion::class);
    // }

    /**
     * Sobrescribe la notificación de restablecimiento de contraseña
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}

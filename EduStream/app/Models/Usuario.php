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

    // Para que se incluya automáticamente en JSON
    protected $appends = ['rol_nombre'];

    // Relaciones
    public function rol()
    {
        return $this->belongsTo(Roles::class, 'rol_id');
    }

    public function cursos()
    {
        return $this->hasMany(Curso::class, 'admin_id');
    }

    // public function inscripciones()
    // {
    //     return $this->hasMany(Inscripcion::class);
    // }

    /**
     * Accesor para exponer el nombre del rol
     */
    public function getRolNombreAttribute()
    {
        return $this->rol->nombre ?? 'Sin rol';
    }

    /**
     * Sobrescribe la notificación de restablecimiento de contraseña
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}

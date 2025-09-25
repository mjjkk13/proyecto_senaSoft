<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Roles extends Model
{
   protected $table = 'roles';

    protected $fillable = ['id','nombre'];

    public function usuarios(): HasMany
    {
        return $this->hasMany(Usuario::class, 'rol_id');
    }
}

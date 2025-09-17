<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener IDs de roles por nombre
        $roles = DB::table('roles')->pluck('id', 'nombre');

        // Admin
        DB::table('usuarios')->updateOrInsert(
            ['email' => 'admin@edustream.local'],
            [
                'nombre' => 'Admin',
                'password' => Hash::make('password'),
                'rol_id' => $roles['Administrador'] ?? null,
            ]
        );

        // Estudiante
        DB::table('usuarios')->updateOrInsert(
            ['email' => 'estudiante@edustream.local'],
            [
                'nombre' => 'Estudiante Demo',
                'password' => Hash::make('password'),
                'rol_id' => $roles['Estudiante'] ?? null,
            ]
        );
    }
}

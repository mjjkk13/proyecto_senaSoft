<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminId = DB::table('usuarios')->where('email', 'admin@edustream.local')->value('id');

        DB::table('cursos')->updateOrInsert(
            ['nombre' => 'Introducción a PHP'],
            [
                'descripcion' => 'Conceptos básicos del lenguaje PHP.',
                'admin_id' => $adminId,
            ]
        );

        DB::table('cursos')->updateOrInsert(
            ['nombre' => 'Laravel desde Cero'],
            [
                'descripcion' => 'Framework Laravel: rutas, controladores, Eloquent.',
                'admin_id' => $adminId,
            ]
        );
    }
}

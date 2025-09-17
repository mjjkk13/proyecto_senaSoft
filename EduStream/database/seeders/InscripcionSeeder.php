<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InscripcionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $estudianteId = DB::table('usuarios')->where('email', 'estudiante@edustream.local')->value('id');
        $cursoId = DB::table('cursos')->where('nombre', 'Laravel desde Cero')->value('id');

        if ($estudianteId && $cursoId) {
            DB::table('inscripciones')->updateOrInsert(
                ['usuario_id' => $estudianteId, 'curso_id' => $cursoId],
                ['fecha_inscripcion' => now()]
            );
        }
    }
}

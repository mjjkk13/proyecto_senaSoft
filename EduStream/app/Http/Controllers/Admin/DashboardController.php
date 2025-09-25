<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class DashboardController extends Controller
{
    public function index()
    {
         $cursos = DB::table('cursos')
            ->leftJoin('inscripciones', 'inscripciones.curso_id', '=', 'cursos.id')
            ->select(
                'cursos.id',
                'cursos.nombre as title',
                'cursos.img_url as img_url',
                DB::raw('COUNT(inscripciones.id) as students_count')
            )
            ->groupBy('cursos.id', 'cursos.nombre', 'cursos.img_url')
            ->get()
            ->map(function ($curso) {
                $curso->img_url = $curso->img_url 
                    ? asset('storage/' . $curso->img_url) 
                    : asset('storage/img/default-course.png');
                return $curso;
            });

        $usuarios = DB::table('usuarios')->get();
        $totalUsuarios = $usuarios->count();

        $stats = [
            'totalCursos' => DB::table('cursos')->count(),
            'totalInscritos' => DB::table('inscripciones')->count(),
            'totalUsuarios' => $totalUsuarios,
        ];

        return Inertia::render('admin/dashboard', [
            'cursos' => $cursos,
            'usuarios' => $usuarios,
            'stats' => $stats,
        ]);
    }
}

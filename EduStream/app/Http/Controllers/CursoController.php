<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Curso;

class CursoController extends Controller
{
    public function index()
    {
        $cursos = Curso::withCount('inscripciones')->get();
        $stats = [
            'totalCursos' => $cursos->count(),
        'totalInscritos' => $cursos->sum('inscripciones_count'),
    ];

    return Inertia::render('Dashboard', [
        'cursos' => $cursos,
        'stats' => $stats,
    ]);
    }
}
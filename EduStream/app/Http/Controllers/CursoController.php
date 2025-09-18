<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Curso;
use Illuminate\Http\Request;

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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:150',
            'descripcion' => 'nullable|string',
            'admin_id' => 'nullable|exists:usuarios,id',
        ]);

        $curso = Curso::create($validated);

        return response()->json([
            'message' => 'Curso creado exitosamente',
            'curso'   => $curso,
        ], 201);
    }
}

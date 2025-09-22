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

    public function create()
    {
        return Inertia::render('Cursos/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:150',
            'descripcion' => 'nullable|string',
            'admin_id' => 'nullable|exists:usuarios,id',
        ]);

        Curso::create($validated);

        return redirect()->route('cursos.index')->with('success', 'Curso creado exitosamente.');
    }

    public function edit(Curso $curso)
    {
        return Inertia::render('Cursos/Edit', [
            'curso' => $curso,
        ]);
    }

    public function update(Request $request, Curso $curso)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:150',
            'descripcion' => 'nullable|string',
            'admin_id' => 'nullable|exists:usuarios,id',
        ]);

        $curso->update($validated);

        return redirect()->route('cursos.index')->with('success', 'Curso actualizado correctamente.');
    }

    public function destroy(Curso $curso)
    {
        $curso->delete();

        return redirect()->route('cursos.index')->with('success', 'Curso eliminado.');
    }
}

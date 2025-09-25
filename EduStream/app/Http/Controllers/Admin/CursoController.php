<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Curso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class CursoController extends Controller
{
       
    public function create()
    {
        return Inertia::render('Cursos/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre'      => ['required','string','max:150'],
            'descripcion' => ['nullable','string'],
            'imagen'      => ['nullable','image','mimes:jpeg,png,jpg,gif','max:2048'],
            'admin_id'    => ['nullable','exists:usuarios,id'],
        ]);

        if ($request->hasFile('imagen')) {
            $folderName = 'cursos/' . str_replace(' ', '_', strtolower($request->nombre));
            $path = $request->file('imagen')->store($folderName, 'public');
            $validated['img_url'] = $path;
        }

        Curso::create($validated);

        return redirect()->route('admin/dashboard')->with('success', 'Curso creado exitosamente.');
    }

    public function edit(Curso $curso)
    {
        return Inertia::render('Cursos/Edit', [
            'curso' => [
                'id'          => $curso->id,
                'nombre'      => $curso->nombre,
                'descripcion' => $curso->descripcion,
                'img_url'     => $curso->img_url ? Storage::url($curso->img_url) : null,
            ],
        ]);
    }

    public function update(Request $request, Curso $curso)
    {
        $validated = $request->validate([
            'nombre'      => ['required','string','max:150'],
            'descripcion' => ['nullable','string'],
            'imagen'      => ['nullable','image','mimes:jpeg,png,jpg,gif','max:2048'],
            'admin_id'    => ['nullable','exists:usuarios,id'],
        ]);



        if ($request->hasFile('imagen')) {
            $folderName = 'cursos/' . str_replace(' ', '_', strtolower($request->nombre));
            $path = $request->file('imagen')->store($folderName, 'public');
            $validated['img_url'] = $path;

            if (!empty($curso->img_url)) {
                Storage::disk('public')->delete($curso->img_url);
            }
        }

        $curso->update($validated);

        

        return redirect()->route('admin/dashboard')->with('success', 'Curso actualizado correctamente.');
    }

    public function destroy(Curso $curso)
    {
        if (!empty($curso->img_url)) {
            Storage::disk('public')->delete($curso->img_url);
        }

        $curso->delete();

        return redirect()->route('admin/dashboard')->with('success', 'Curso eliminado.');
    }
}
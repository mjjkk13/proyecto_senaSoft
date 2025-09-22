<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Inertia\Inertia;

class UsuarioController extends Controller
{
    // Mostrar listado de usuarios con total
    public function index()
    {
        $usuarios = Usuario::all(); // Trae todos los usuarios
        $totalUsuarios = $usuarios->count(); // Cantidad total

        return Inertia::render('Admin/Usuarios/Index', [
            'usuarios' => $usuarios,
            'totalUsuarios' => $totalUsuarios,
        ]);
    }

    // Mostrar formulario para editar un usuario
    public function edit(Usuario $usuario)
    {
        return Inertia::render('Admin/Usuarios/Edit', [
            'usuario' => $usuario
        ]);
    }

    // Actualizar usuario
    public function update(Request $request, Usuario $usuario)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:150',
            'email' => 'required|email|max:150|unique:usuarios,email,' . $usuario->id,
        ]);

        $usuario->update($validated);

        return redirect()->route('admin.usuarios.index')->with('success', 'Usuario actualizado correctamente');
    }

    // Eliminar usuario
    public function destroy(Usuario $usuario)
    {
        $usuario->delete();

        return redirect()->route('admin.usuarios.index')->with('success', 'Usuario eliminado correctamente');
    }
}

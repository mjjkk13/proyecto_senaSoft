<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Models\Roles;
use Inertia\Inertia;

class UsuarioController extends Controller
{
    // Mostrar listado de usuarios con total y roles
    public function index()
    {
        $usuarios = Usuario::with('rol')->get()->map(function($usuario) {
            return [
                'id' => $usuario->id,
                'nombre' => $usuario->nombre,
                'email' => $usuario->email ?? '',
                'rol_id' => $usuario->rol_id,
                'rol' => $usuario->rol
                    ? [
                        'id' => $usuario->rol->id,
                        'nombre' => $usuario->rol->nombre,
                    ]
                    : null,
                'created_at' => $usuario->created_at?->toDateTimeString(),
                'updated_at' => $usuario->updated_at?->toDateTimeString(),
            ];
        });

        $roles = Roles::all(['id', 'nombre']); // lista para los selects

        return Inertia::render('admin/usuarios', [
            'usuarios' => $usuarios,
            'roles' => $roles,
            'stats' => [
                'totalUsuarios' => $usuarios->count(),
            ],
        ]);
    }


    // Mostrar formulario para editar un usuario
    public function edit(Usuario $usuario)
    {
        $usuario->load('rol');

        $roles = Roles::all(['id', 'nombre']); // lista también aquí

        return Inertia::render('admin/usuarios/edit', [
            'usuario' => [
                'id' => $usuario->id,
                'nombre' => $usuario->nombre,
                'email' => $usuario->email ?? '',
                'rol_id' => $usuario->rol_id,
                'rol' => $usuario->rol
                    ? [
                        'id' => $usuario->rol->id,
                        'nombre' => $usuario->rol->nombre,
                    ]
                    : null,
            ],
            'roles' => $roles,
        ]);
    }

    // Crear usuario (si usas formulario aparte)
    public function create()
    {
        $roles = Roles::all(['id', 'nombre']);

        return Inertia::render('admin/usuarios/create', [
            'roles' => $roles,
        ]);
    }

    // Guardar usuario nuevo
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:150',
            'email' => 'nullable|email|max:150|unique:usuarios,email',
            'password' => 'required|string|min:6',
            'rol_id' => 'required|exists:roles,id',
        ]);

        $validated['password'] = bcrypt($validated['password']);

        Usuario::create($validated);

        return redirect()->route('admin.usuarios.index')->with('success', 'Usuario creado correctamente');
    }

    // Actualizar usuario
    public function update(Request $request, Usuario $usuario)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:150',
            'email' => 'nullable|email|max:150|unique:usuarios,email,' . $usuario->id,
            'rol_id' => 'required|exists:roles,id',
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

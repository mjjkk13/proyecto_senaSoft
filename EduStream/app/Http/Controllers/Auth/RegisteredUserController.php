<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:usuarios,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = Usuario::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        // Verificar si el usuario es admin antes de redirigir
        if ($user->role === 'admin') { // Ajusta según el campo real que uses para roles
            return redirect()->intended(route('admin.dashboard', absolute: false));
        }

        // Si no es admin, redirigir a otra ruta (por ejemplo home o perfil)
        return redirect()->route('user.home'); 
    }

}

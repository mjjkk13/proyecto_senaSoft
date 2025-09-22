<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

// Controladores Admin
use App\Http\Controllers\Admin\CursoController;
use App\Http\Controllers\Admin\UsuarioController;
use App\Http\Controllers\Admin\InscripcionController;
use App\Http\Controllers\Admin\StatsController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard de administrador
    Route::get('/admin/dashboard', function () {
        // Traer cursos con cantidad de inscritos y la imagen real
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
        $curso->img_url = $curso->img_url ? asset('storage/' . $curso->img_url) : '/img/default-course.png';
        return $curso;
    });


        // Traer todos los usuarios
        $usuarios = DB::table('usuarios')->get();
        $totalUsuarios = $usuarios->count();

        // Estadísticas rápidas
        $stats = [
            'totalCursos' => DB::table('cursos')->count(),
            'totalInscritos' => DB::table('inscripciones')->count(),
            'totalUsuarios' => $totalUsuarios,
        ];

        return Inertia::render('admin/dashboard', [
            'cursos' => $cursos,
            'usuarios' => $usuarios,
            'stats'  => $stats,
        ]);
    })->middleware('Administrador')->name('dashboard');

    // CRUD de Cursos y Usuarios
    Route::prefix('admin')->name('admin.')->middleware('Administrador')->group(function () {
        Route::resource('cursos', CursoController::class);

        // CRUD de Usuarios (sin create)
        Route::get('usuarios', [UsuarioController::class, 'index'])->name('usuarios.index');
        Route::get('usuarios/{usuario}/edit', [UsuarioController::class, 'edit'])->name('usuarios.edit');
        Route::put('usuarios/{usuario}', [UsuarioController::class, 'update'])->name('usuarios.update');
        Route::delete('usuarios/{usuario}', [UsuarioController::class, 'destroy'])->name('usuarios.destroy');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

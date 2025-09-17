<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\MailTestController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\StatsController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Ruta de prueba para envío de correos
Route::get('/test-mail', [MailTestController::class, 'send']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $cursos = DB::table('cursos')
            ->leftJoin('inscripciones', 'inscripciones.curso_id', '=', 'cursos.id')
            ->select('cursos.id', DB::raw('cursos.nombre as title'), DB::raw('COUNT(inscripciones.id) as students_count'))
            ->groupBy('cursos.id', 'cursos.nombre')
            ->get()
            ->map(function ($curso) {
                $curso->img_url = 'https://picsum.photos/seed/' . $curso->id . '/400/200';
                return $curso;
            });

        $stats = [
            'totalCursos' => DB::table('cursos')->count(),
            'totalInscritos' => DB::table('inscripciones')->count(),
        ];

        return Inertia::render('dashboard', [
            'cursos' => $cursos,
            'stats' => $stats,
        ]);
    })->middleware('Administrador')->name('dashboard');
    Route::resource('cursos', CursoController::class);
    Route::resource('inscripciones', InscripcionController::class)->only(['index','destroy']);
    Route::get('stats', [StatsController::class, 'index'])->name('stats.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

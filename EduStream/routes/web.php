<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\CursoController;
use App\Http\Controllers\Admin\UsuarioController;
use App\Http\Controllers\Admin\InscripcionController;
use App\Http\Controllers\Admin\StatsController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Admin\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard Admin
    Route::get('/amin/dashboard', [DashboardController::class, 'index'])
        ->middleware('Administrador')
        ->name('admin.dashboard');

    // Área usuarios normales
   // Route::get('/user/home', [UsuarioController::class, 'home'])
    //    ->name('user.home');

    // CRUD Admin
    Route::prefix('admin')->name('admin.')->middleware('Administrador')->group(function () {
        Route::resource('cursos', CursoController::class);
        Route::resource('usuarios', UsuarioController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';


<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    // Redirigir /ajustes a /ajustes/perfil
    Route::redirect('ajustes', '/ajustes/perfil')->name('ajustes.index');

    // Ajustes de perfil
    Route::get('ajustes/perfil', [ProfileController::class, 'edit'])->name('ajustes.perfil.edit');
    Route::patch('ajustes/perfil', [ProfileController::class, 'update'])->name('ajustes.perfil.update');
    Route::delete('ajustes/perfil', [ProfileController::class, 'destroy'])->name('ajustes.perfil.destroy');

    // Ajustes de contraseña
    Route::get('ajustes/contraseña', [PasswordController::class, 'edit'])->name('ajustes.contraseña.edit');
    Route::put('ajustes/contraseña', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('ajustes.contraseña.update');

    // Ajustes de apariencia
    Route::get('ajustes/apariencia', function () {
        return Inertia::render('settings/ProfileSettings');
    })->name('ajustes.apariencia.edit');
});

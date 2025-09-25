<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {
        return Inertia::render('user/home', [
            'message' => 'Bienvenido a tu página principal'
        ]);
    }
}

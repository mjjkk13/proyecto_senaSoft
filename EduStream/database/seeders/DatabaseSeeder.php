<?php

namespace Database\Seeders;

use App\Models\Usuario;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
	{
		$this->call([
			RoleSeeder::class,
			UsuarioSeeder::class,
			CursoSeeder::class,
			InscripcionSeeder::class,
		]);
	}
}

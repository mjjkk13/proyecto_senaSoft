<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->updateOrInsert(['nombre' => 'Administrador'], ['nombre' => 'Administrador']);
        DB::table('roles')->updateOrInsert(['nombre' => 'Estudiante'], ['nombre' => 'Estudiante']);
    }
}

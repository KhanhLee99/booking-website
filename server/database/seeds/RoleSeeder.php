<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $list_role = ['Admin', 'Host', 'User'];
        foreach ($list_role as $role) {
            DB::table('role')->insert([
                'name' => $role
            ]);
        }
    }
}

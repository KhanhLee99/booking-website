<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        // $faker = Faker\Factory::create();

        // $limit = 10;

        // for ($i = 0; $i < $limit; $i++) {
        //     DB::table('users')->insert([
        //         'name' => $faker->name,
        //         'email' => $faker->unique()->email,
        //         'phone_number' => $faker->phoneNumber,
        //     ]);
        // }

        $list_user = [
            [
                'name' => 'khanh',
                'email' => 'khanh@gmail.com',
                'password' => Hash::make('khanh'),
                'role_id' => 2
            ],

            [
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('admin'),
                'role_id' => 1
            ],
        ];
        foreach ($list_user as $user) {
            DB::table('users')->insert([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => $user['password'],
                'role_id' => $user['role_id'],
            ]);
        }
    }
}

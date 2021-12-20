<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // city
        $city = ['Hà Nội', 'TP.Hồ Chí Minh', 'Vũng Tàu', 'Đà Lạt', 'Đà Nẵng', 'Nha Trang', 'Quảng Ninh', 'Hội An'];

        foreach ($city as $item) {
            DB::table('city')->insert([
                'name' => $item
            ]);
        }
    }
}

<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AmenityTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $list_amenity_type = ['Chung', 'Phòng ngủ', 'Phòng tắm', 'Phòng bếp', 'Thiết bị an toàn', 'Tiện nghi đặc biệt', 'Cảnh quan'];
        foreach ($list_amenity_type as $item) {
            DB::table('amenity_type')->insert([
                'name' => $item
            ]);
        }
    }
}

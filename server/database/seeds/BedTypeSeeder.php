<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BedTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // bed_type
        $bed_types = ['Double', 'Queen', 'Single', 'Sofa bed'];
        foreach ($bed_types as $item) {
            DB::table('bed_type')->insert([
                'name' => $item
            ]);
        }
    }
}

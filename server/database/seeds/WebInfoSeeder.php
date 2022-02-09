<?php

use App\Models\Website_Infomation;
use Illuminate\Database\Seeder;

class WebInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Website_Infomation::create([
            'usage_fee_percentage' => 3,
        ]);
    }
}

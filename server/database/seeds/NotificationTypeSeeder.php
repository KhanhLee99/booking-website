<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NotificationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // notification_type
        $list = ['New Listing'];
        foreach($list as $item) {
            DB::table('notification_type')->insert([
                'name' => $item
            ]);
        }
    }
}

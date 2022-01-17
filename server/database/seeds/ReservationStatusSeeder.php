<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReservationStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // reservation_status
        $list_reservation_status = ['Chờ xác nhận', 'Đã xác nhận', 'Đã thanh toán', 'Đã huỷ', 'Checkin', 'Checkout'];
        foreach ($list_reservation_status as $status) {
            DB::table('reservation_status')->insert([
                'name' => $status
            ]);
        }
    }
}

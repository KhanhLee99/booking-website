<?php

use App\Models\Payment;
use App\Models\Website_Infomation;
use App\Reservation;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $webInfo = Website_Infomation::first();
        $fee_percent = $webInfo->usage_fee_percentage;
        $reservations = Reservation::get();
        foreach ($reservations as $reservation) {
            $this->add($reservation->id, $fee_percent, $reservation->checkin_date);
        }
    }

    public function add($reservation_id, $fee_percent, $checkin_date)
    {
        try {
            $reservation = Reservation::find($reservation_id);
            $total_price = $reservation->total_price;
            $host_recive = $total_price * (100 - $fee_percent) / 100;
            $web_recive = $total_price * $fee_percent / 100;
            $data = [
                'total_price' => $total_price,
                'host_recive' => $host_recive,
                'web_recive' => $web_recive,
                'reservation_id' => $reservation_id,
                'created_at' => $checkin_date,
            ];
            Payment::create($data);
        } catch (Exception $e) {
            $this->response['errorMessage'] = $e->getMessage();
            return response()->json($this->response);
        }
    }
}

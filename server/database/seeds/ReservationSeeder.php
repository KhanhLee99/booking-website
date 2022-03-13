<?php

use App\Http\Controllers\Helper\TotalDateController;
use App\Listing;
use App\Models\Reservation_Timeline;
use App\Reservation;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */


    public function __construct()
    {
        $this->totalDateController = new TotalDateController();
    }

    public function run()
    {
        $faker = Faker\Factory::create();
        $limit = 8000;
        //
        for ($i = 0; $i < $limit; $i++) {
            if ($i > 7300) {
                $checkin_date = $faker->dateTimeBetween($startDate = 'now', $endDate = '+1 months', $timezone = null)->format('Y-m-d H:i:s');
            } else {
                $checkin_date = $faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now', $timezone = null)->format('Y-m-d H:i:s');
            }
            $nights = rand(2, 10);
            $checkout_date = Carbon::createFromFormat('Y-m-d H:i:s', $checkin_date)->addDays($nights);
            $listing_id = rand(1, 12000);
            $total_price = $this->count_total_price($checkin_date, $checkout_date, $listing_id);
            $created_at = Carbon::createFromFormat('Y-m-d H:i:s', $checkin_date)->subDays($nights);
            $guest_id = rand(3, 20);
            Reservation::create([
                'checkin_date' => $checkin_date,
                'checkout_date' => $checkout_date,
                'total_price' => $total_price,
                'adult_count' => rand(1, 4),
                'child_count' => rand(1, 2),
                'reservation_status_id' => 3, // 3: Paid
                'guest_id' => $guest_id,
                'listing_id' => $listing_id,
                'created_at' => $created_at,
            ]);
            $last = Reservation::where('guest_id', $guest_id)->orderBy('id', 'desc')->first();
            if ($last) {
                Reservation_Timeline::create([
                    'reservation_id' => $last->id,
                    'reservation_status_id' => $last->reservation_status_id,
                    'user_id' =>  $guest_id,
                ]);
            }
        }
    }

    private function count_total_price($checkin, $checkout, $listing_id)
    {
        try {
            $listing = Listing::where('id', $listing_id)->first();
            if ($listing) {
                $price_base = $listing->price_per_night_base;
                $price_weekend = $listing->price_per_night_weekend;

                $number_normal_days = $this->totalDateController->number_of_working_days($checkin, $checkout);
                $number_weekend_days = $this->totalDateController->number_of_weekend_days($checkin, $checkout);
                in_array(date("N", strtotime($checkout)), [6, 7]) ? $number_weekend_days -= 1 : $number_normal_days -= 1;

                $total_price = $number_normal_days * $price_base + $number_weekend_days * $price_weekend;
                return $total_price;
            }
        } catch (Exception $e) {
            return  $e->getMessage();
        }
    }
}

<?php

use App\Listing;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // listing

        $faker = Faker\Factory::create();

        $limit = 100;

        for ($i = 1; $i <= 63; $i++) {
            $this->create_listing($faker, $limit, $i);
        }
    }

    function create_listing($faker, $limit, $city_id)
    {
        for ($i = 0; $i < $limit; $i++) {
            $verified = rand(0, 1);
            $discount_weekly = $faker->randomFloat($nbMaxDecimals = 1, $min = 1, $max = 3);
            $discount_monthly = $discount_weekly + 0.5;
            DB::table('listing')->insert([
                'name' => $faker->text($maxNbChars = 60),
                'description' => $faker->text($maxNbChars = 1500),
                'street_address' => $faker->streetAddress,
                'standard_guest_count' => $faker->numberBetween($min = 2, $max = 10),
                'listing_type_id' => $faker->numberBetween($min = 1, $max = 7),
                'city_id' => $city_id,
                'user_id' => rand(210, 500),
                'bedroom_count' => $faker->numberBetween($min = 1, $max = 5),
                'bed_count' => $faker->numberBetween($min = 1, $max = 5),
                'bathroom_count' => $faker->numberBetween($min = 1, $max = 5),
                'price_per_night_base' => $faker->randomFloat($nbMaxDecimals = NULL, $min = 350000, $max = 500000),
                'price_per_night_weekend' => $faker->randomFloat($nbMaxDecimals = NULL, $min = 500000, $max = 1000000),
                'avatar_url' => "https://picsum.photos/id/" . rand(1, 1000) . "/400/300",
                'rental_form' => $faker->randomElement(['entire_place', 'private_room', 'shared_room']),
                'reservation_form' => $faker->randomElement(['quick', 'request']),
                'is_verified' => $verified,
                'is_public' => $verified == 1 ? 1 : NULL,
                'status' => $faker->randomElement(['active', 'stop_public', 'block_activity']),
                'rating' => $faker->randomFloat($nbMaxDecimals = 1, $min = 1, $max = 5),
                'discount_weekly' => $discount_weekly,
                'discount_monthly' => $discount_monthly,
            ]);

            $last_listing = Listing::orderBy('id', 'desc')->first();

            for ($j = 0; $j < $limit * 2; $j++) {
                DB::table('listing_amenities')->insert([
                    'listing_id' => $last_listing->id,
                    'amenity_id' => $faker->unique(true)->numberBetween($min = 1, $max = 63)
                ]);
            }

            for ($u = 0; $u < 10; $u++) {
                DB::table('photo_listing')->insert([
                    'listing_id' => $last_listing->id,
                    'photo_url' => "https://picsum.photos/id/" . rand(1, 1000) . "/400/400"
                ]);
            }

            for ($v = 0; $v < 5; $v++) {
                DB::table('review_listing')->insert([
                    'note' => $faker->text($maxNbChars = 100),
                    'rating' => rand(1, 5),
                    'guest_id' => rand(3, 10),
                    'listing_id' => $last_listing->id
                ]);
            }
        }
    }
}

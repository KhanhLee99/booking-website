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

        $limit = 20;

        $this->create_listing($faker, $limit, 1);
        $this->create_listing($faker, $limit, 2);
        $this->create_listing($faker, $limit, 3);
        $this->create_listing($faker, $limit, 4);
        $this->create_listing($faker, $limit, 5);
    }

    function create_listing($faker, $limit, $city_id)
    {
        for ($i = 0; $i < $limit; $i++) {
            DB::table('listing')->insert([
                'name' => $faker->text($maxNbChars = 60),
                'description' => $faker->text($maxNbChars = 1500),
                'street_address' => $faker->streetAddress,
                'standard_guest_count' => $faker->numberBetween($min = 2, $max = 10),
                'listing_type_id' => $faker->numberBetween($min = 1, $max = 7),
                'city_id' => $city_id,
                'user_id' => 2,
                'bedroom_count' => $faker->numberBetween($min = 1, $max = 5),
                'bed_count' => $faker->numberBetween($min = 1, $max = 5),
                'bathroom_count' => $faker->numberBetween($min = 1, $max = 5),
                'price_per_night_base' => $faker->randomFloat($nbMaxDecimals = NULL, $min = 100000, $max = 200000),
                'price_per_night_weekend' => $faker->randomFloat($nbMaxDecimals = NULL, $min = 200000, $max = 250000),
                'avatar_url' => "https://picsum.photos/id/" . rand(1, 1000) . "/400/300",
                'rental_form' => $faker->randomElement(['entire_place', 'private_room', 'shared_room']),
                'reservation_form' => $faker->randomElement(['quick', 'request']),
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
        }
    }
}

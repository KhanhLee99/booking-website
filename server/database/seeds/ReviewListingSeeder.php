<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $faker = Faker\Factory::create();

        for ($i = 1; $i < 10; $i++) {
            for ($v = 0; $v < 5; $v++) {
                DB::table('review_listing')->insert([
                    'note' => $faker->text($maxNbChars = 100),
                    'rating' => rand(1, 5),
                    'guest_id' => rand(3, 10),
                    'listing_id' => $i
                ]);
            }
        }
    }
}

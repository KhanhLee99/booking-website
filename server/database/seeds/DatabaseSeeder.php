<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        Model::unguard();
        $this->call(RoleSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(AmenityTypeSeeder::class);
        $this->call(AmenitySeeder::class);
        $this->call(CitySeeder::class);
        $this->call(ListingTypeSeeder::class);
        $this->call(BedTypeSeeder::class);
        $this->call(ReservationStatusSeeder::class);
        $this->call(NotificationTypeSeeder::class);
        $this->call(ListingSeeder::class);
        $this->call(WebInfoSeeder::class);
        $this->call(ReservationSeeder::class);
        $this->call(PaymentSeeder::class);
        Model::reguard();
    }
}

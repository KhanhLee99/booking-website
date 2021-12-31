<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('listing', function (Blueprint $table) {
            $table->id();
            $table->longText('name')->nullable();
            $table->longText('description')->nullable();
            $table->string('street_address')->nullable();
            $table->integer('standard_guest_count')->nullable();
            $table->integer('max_guest_count')->nullable();
            $table->integer('standard_child_count')->nullable();
            $table->integer('min_nights_count')->nullable();
            $table->integer('max_nights_count')->nullable();
            $table->integer('bedroom_count')->default(0);
            $table->integer('bathroom_count')->default(0);
            $table->integer('bed_count')->default(0);
            $table->float('price_per_night_base')->default(0);
            $table->float('price_per_night_weekend')->default(0);
            $table->float('discount_weekly')->default(0);
            $table->float('discount_monthly')->default(0);
            $table->float('extra_per_adult')->default(0);
            $table->float('extra_per_child')->default(0);
            $table->longText('avatar_url')->nullable();
            $table->float('rating')->default(0);
            $table->enum('rental_form', ['entire_place', 'private_room', 'shared_room'])->nullable();
            $table->enum('reservation_form', ['quick', 'request'])->nullable();
            $table->boolean('is_public')->nullable();

            $table->unsignedBigInteger('listing_type_id')->nullable();
            $table->foreign('listing_type_id')->references('id')->on('listing_type');

            $table->unsignedBigInteger('city_id')->nullable();
            $table->foreign('city_id')->references('id')->on('city');

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('listing');
    }
}

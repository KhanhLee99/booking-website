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
            $table->string('name');
            $table->string('street_address')->nullable();
            $table->integer('standard_guest_count')->nullable();
            $table->integer('max_guest_count')->nullable();
            $table->integer('standard_child_count')->nullable();
            $table->integer('min_nights_count')->nullable();
            $table->integer('max_nights_count')->nullable();
            $table->integer('bedroom_count')->default(0);
            $table->integer('bahtroom_count')->default(0);
            $table->integer('bed_count')->default(0);
            $table->float('price_per_night_base')->default(0);
            $table->float('price_per_night_weekend')->default(0);
            $table->float('extra_per_adult')->default(0);
            $table->float('extra_per_child')->default(0);
            $table->string('avatar_url')->nullable();
            $table->float('rating')->default(0);
            $table->boolean('is_public')->default(0);
            $table->unsignedBigInteger('listing_type_id')->nullable();
            $table->foreign('listing_type_id')->references('id')->on('listing_type');
            $table->unsignedBigInteger('city_id');
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

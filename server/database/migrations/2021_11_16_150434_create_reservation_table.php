<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservation', function (Blueprint $table) {
            $table->id();
            $table->dateTime('checkin_date');
            $table->dateTime('checkout_date');
            $table->decimal('total_price', 10, 2);
            $table->integer('adult_count')->default(0);
            $table->integer('child_count')->default(0);
            $table->integer('infant_count')->default(0);
            $table->unsignedBigInteger('promo_code_id')->nullable();
            $table->foreign('promo_code_id')->references('id')->on('promo_code');
            $table->unsignedBigInteger('reservation_status_id');
            $table->foreign('reservation_status_id')->references('id')->on('reservation_status');
            $table->unsignedBigInteger('guest_id');
            $table->foreign('guest_id')->references('id')->on('users');
            $table->unsignedBigInteger('listing_id');
            $table->foreign('listing_id')->references('id')->on('listing')->onDelete('cascade');
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
        Schema::dropIfExists('reservation');
    }
}

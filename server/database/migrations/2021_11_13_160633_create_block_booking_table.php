<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlockBookingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('block_booking', function (Blueprint $table) {
            $table->id();
            $table->string('note');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
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
        Schema::dropIfExists('block_booking');
    }
}

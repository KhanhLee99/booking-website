<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTimelineReservationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('timeline_reservation', function (Blueprint $table) {
            $table->id();

            $table->foreign('reservation_id')->references('id')->on('reservation');
            $table->unsignedBigInteger('reservation_id');

            $table->unsignedBigInteger('reservation_status_id');
            $table->foreign('reservation_status_id')->references('id')->on('reservation_status');

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
        Schema::dropIfExists('timeline_reservation');
    }
}

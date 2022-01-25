<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReviewListingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('review_listing', function (Blueprint $table) {
            $table->id();
            $table->string('note');
            $table->float('rating');

            $table->unsignedBigInteger('guest_id');
            $table->foreign('guest_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('listing_id');
            $table->foreign('listing_id')->references('id')->on('listing')->onDelete('cascade');

            $table->unsignedBigInteger('reservation_id')->nullable();
            $table->foreign('reservation_id')->references('id')->on('reservation')->onDelete('cascade');

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
        Schema::dropIfExists('review_listing');
    }
}

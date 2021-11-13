<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhotoListingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('photo_listing', function (Blueprint $table) {
            $table->id();
            $table->string('photo_url');
            $table->string('description');
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
        Schema::dropIfExists('photo_listing');
    }
}

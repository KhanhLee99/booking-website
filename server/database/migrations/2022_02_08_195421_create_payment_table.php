<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment', function (Blueprint $table) {
            $table->id();

            $table->decimal('total_price', 10, 2);
            $table->decimal('host_recive', 10, 2);
            $table->decimal('web_recive', 10, 2);

            $table->boolean('is_send_host')->default(0);

            $table->foreign('reservation_id')->references('id')->on('reservation');
            $table->unsignedBigInteger('reservation_id');
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
        Schema::dropIfExists('payment');
    }
}

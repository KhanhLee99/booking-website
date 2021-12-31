<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notification', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('message');
            $table->boolean('is_read')->default(0);

            $table->unsignedBigInteger('noti_type_id');
            $table->foreign('noti_type_id')->references('id')->on('notification_type');

            $table->unsignedBigInteger('sender_id')->nullable();
            $table->foreign('sender_id')->references('id')->on('users');

            $table->unsignedBigInteger('receiver_id');
            $table->foreign('receiver_id')->references('id')->on('users');

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
        Schema::dropIfExists('notification');
    }
}

// Table Notification {
//     id int [pk, increment]
//     noti_type_id int
//     sender_id int
//     receiver_id int
//     title varchar
//     message varchar
//     // notification_header varchar
//     // notification_body varchar
//     is_read boolean
//     created_at datetime
//     updated_at datetime
//   }

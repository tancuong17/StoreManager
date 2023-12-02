<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_forms', function (Blueprint $table) {
            $table->id();
            $table->String("code")->nullable(false);
            $table->String("note")->nullable(false);
            $table->String("table_number")->nullable(false);
            $table->String("status");
            $table->bigInteger("creator")->nullable(false)->unsigned();
            $table->foreign('creator')->references('id')->on('users'); 
            $table->bigInteger("updater")->unsigned();
            $table->foreign('updater')->references('id')->on('users'); 
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
        Schema::dropIfExists('order_forms');
    }
}

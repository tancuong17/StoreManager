<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prices', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("product")->nullable(false)->unsigned();
            $table->foreign('product')->references('id')->on('products'); 
            $table->integer("price")->nullable(false);
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
        Schema::dropIfExists('prices');
    }
}

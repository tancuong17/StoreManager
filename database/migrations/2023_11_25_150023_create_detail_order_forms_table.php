<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailOrderFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail_order_forms', function (Blueprint $table) {
            $table->bigInteger("order_form")->unsigned();
            $table->foreign('order_form')->references('id')->on('order_forms'); 
            $table->bigInteger("product")->unsigned();
            $table->foreign('product')->references('id')->on('products'); 
            $table->integer("quantity")->nullable(false);
            $table->unique(['order_form', 'product']);
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
        Schema::dropIfExists('detail_order_forms');
    }
}

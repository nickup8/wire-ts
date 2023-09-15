<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wires', function (Blueprint $table) {
            $table->id();
            $table->string('material');
            $table->integer('hu')->unique();
            $table->string('description');
            $table->integer('batch');
            $table->float('qnt', 5, 3);
            $table->foreignId('order_id')->references('id')->on('orders');
            $table->foreignId('supplier_id')->references('id')->on('suppliers');
            $table->string('area')->default('A');
            $table->boolean('ordered')->default(false);
            $table->boolean('scanned')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wires');
    }
};

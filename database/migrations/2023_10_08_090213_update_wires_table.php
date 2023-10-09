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
        Schema::table('wires', function (Blueprint $table) {
            $table->removeColumn("order_id", "invoice_id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('wires', function (Blueprint $table) {
            $table->removeColumn("invoice_id", "order_id");
        });
    }
};

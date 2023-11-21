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
        Schema::create('relatship_wire_storage_bin', function (Blueprint $table) {
            $table->id();
            $table->foreignId("wire_id")->references("id")->on("wires");
            $table->foreignId("storage_bin_feeding")->references("id")->on("storage_bin_feedings");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('relatship_wire_storage_bin');
    }
};

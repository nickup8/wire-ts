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
        Schema::create('storage_bin_feedings', function (Blueprint $table) {
            $table->id();
            $table->string("rack");
            $table->string("shelf_from");
            $table->string("shelf_to");
            $table->integer("level_from");
            $table->integer("level_to");
            $table->integer("komax_id")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('storage_bin_feedings');
    }
};

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
        Schema::create('storage_bin_feeding_lists', function (Blueprint $table) {
            $table->id();
            $table->string("rack");
            $table->string("shelf_from");
            $table->string("shelf_to");
            $table->string("level_from");
            $table->string("level_to");
            $table->integer("count_shelfs");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('storage_bin_feeding_lists');
    }
};

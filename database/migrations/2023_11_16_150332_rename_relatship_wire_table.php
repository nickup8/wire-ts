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
        Schema::rename("relatship_wire_storage_bin", "relatship_wire_storage_bins");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename("relatship_wire_storage_bins", "relatship_wire_storage_bin");
    }
};

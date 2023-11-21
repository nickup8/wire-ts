<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RelatshipWireStorageBin extends Model
{
    use HasFactory;

    protected $fillable = [
        'wire_id',
        'storage_bin_feeding',
    ];

    public function wire(): BelongsTo
    {
        return $this->belongsTo(Wire::class);
    }

    public function storage(): BelongsTo
    {
        return $this->belongsTo(StorageBinFeeding::class);
    }
}

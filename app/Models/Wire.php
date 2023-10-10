<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Wire extends Model
{
    use HasFactory;

    protected $fillable = [
        "material",
        "hu",
        "description",
        "batch",
        "qnt",
        "invoice_id",
        "supplier_id",
        "area",
        "ordered",
        "scanned",
        "storage_bin"
    ];

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }
    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }
}

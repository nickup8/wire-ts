<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}

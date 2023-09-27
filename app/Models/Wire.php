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
        "qnt",

    ];
}

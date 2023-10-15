<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StorageBinList extends Model
{
    use HasFactory;

    protected $fillable = [
        "shelf",
        "shelf_from",
        "shelf_to",
        "levels",
        "count_shelfs",
    ];
}

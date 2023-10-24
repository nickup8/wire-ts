<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StorageBinFeedingList extends Model
{
    use HasFactory;
    protected $fillable = [
        "rack",
        "shelf_from",
        "shelf_to",
        "level_from",
        "level_to",
        "count_shelfs"
    ];
}

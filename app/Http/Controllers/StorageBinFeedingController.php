<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorageBinFeedingRequest;
use App\Models\StorageBinFeeding;
use Illuminate\Http\Request;

class StorageBinFeedingController extends Controller
{
    public function create(StorageBinFeedingRequest $request)
    {
        $data = $request->validated();
        $count = 0;
        $prefix = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


        for ($level = $data['level_from']; $level <= $data['level_to']; $level++) {
            for ($shelf = $data['shelf_from']; $shelf <= $data['shelf_to']; $shelf++) {
                if ($shelf < 10) {
                    $shelf = '00' . $shelf;
                } elseif ($shelf >= 10 && $shelf < 100) {
                    $shelf = '0' . $shelf;
                }
                StorageBinFeeding::create([
                    'name' => $data['rack'] . '-' . $shelf . '-' . $prefix[$level - 1]
                ]);
                $count++;
            }
        };
        return $count;
    }

    public function machine()
    {
        return StorageBinFeeding::all();
    }
}

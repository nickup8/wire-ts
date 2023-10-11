<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorageBinRequest;
use App\Http\Resources\StorageBinResource;
use App\Models\StorageBin;
use Illuminate\Http\Request;

class StorageBinController extends Controller
{
    public function create(StorageBinRequest $request)
    {
        $data = $request->validated();
        $count = 0;

        if ($data["levels"] > 1) {
            for ($level = 1; $level <= $data["levels"]; $level++) {
                for ($i = $data["shelf_from"]; $i <= $data["shelf_to"]; $i++) {
                    if ($i < 10) {
                        $i = '00' . $i;
                    } elseif ($i >= 10 && $i < 100) {
                        $i = '0' . $i;
                    }
                    StorageBin::create([
                        "storage_bins" => $data["shelf"] . "-" . $i . "-" . $level
                    ]);
                    $count++;
                }
            }
        } else {
            for ($i = $data["shelf_from"]; $i <= $data["shelf_to"]; $i++) {
                if ($i < 10) {
                    $i = '00' . $i;
                } elseif ($i >= 10 && $i < 100) {
                    $i = '0' . $i;
                }
                StorageBin::create([
                    "storage_bins" => $data["shelf"] . "-" . $i . "-" . $data["levels"]
                ]);
                $count++;
            }
        }
        return $count;
    }
}

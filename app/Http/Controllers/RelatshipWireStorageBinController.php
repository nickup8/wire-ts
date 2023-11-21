<?php

namespace App\Http\Controllers;

use App\Http\Requests\WiresStorageRequest;
use App\Http\Resources\WireFeddingResourse;
use App\Http\Resources\WireResource;
use App\Models\RelatshipWireStorageBin;
use App\Models\StorageBinFeeding;
use App\Models\Wire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RelatshipWireStorageBinController extends Controller
{
    public function create(WiresStorageRequest $request)
    {

        $data = $request->validated();

        $storage = StorageBinFeeding::where("name", $data['storage_bin_feeding'])->first();
        if (!$storage) {
            return response()->json([
                'message' => "Место" . $data['storage_bin_feeding'] . " не найдено"
            ], 404);
        }

        $wire_id = Wire::where("hu", "=", $data['hu'])->first();
        if (!$wire_id || $wire_id['scanned'] != true) {
            return response()->json([
                "message" => "Провод " . $data['hu'] . " не найден"
            ], 404);
        }

        $wire_at_storage = RelatshipWireStorageBin::where("storage_bin_feeding", $storage["id"])->first();
        if (!$wire_at_storage) {
            $wire_at_feeding = RelatshipWireStorageBin::where("wire_id", $wire_id["id"])->first();
            if (!$wire_at_feeding) {
                RelatshipWireStorageBin::create([
                    "wire_id" => $wire_id['id'],
                    'storage_bin_feeding' => $storage['id']
                ]);
            } else {
                DB::table("relatship_wire_storage_bins")->where("wire_id", "=", $wire_id['id'])->update(["storage_bin_feeding" => $storage['id']]);
            }
        } else {
            return response()->json([
                'message' => "Место " . $data['storage_bin_feeding'] . " занято!"
            ], 412);
        }

        return response()->json([
            'message' => "Провод " . $wire_id['material'] . " перемещен на место " . $data['storage_bin_feeding']
        ], 200);
    }

    public function index()
    {
        return WireFeddingResourse::collection(RelatshipWireStorageBin::all());
    }
}

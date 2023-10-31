<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\MovingWireRequest;
use App\Http\Requests\WireRequest;
use App\Http\Resources\WireResource;
use App\Imports\WireImport;
use App\Models\StorageBin;
use App\Models\Wire;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class WireController extends Controller
{
    public function create(WireRequest $request)
    {
        $data = $request->validated();
        $wire_data = $data['wires'];
        foreach ($wire_data as $wire) {

            Wire::create([
                "supplier_id" => $data["supplier_id"],
                "invoice_id" => $data["invoice_id"],
                "batch" => $data["batch"],
                "material" => $wire["material"],
                'hu' => $wire["hu"],
                "description" => $wire["description"],
                "qnt" => $wire["qnt"],
            ]);
        }

        return true;
    }

    public function acceptance()
    {
        $wires = Wire::all()->where("area", "A");
        return WireResource::collection($wires);
    }
    public function warehouse()
    {
        $wires = Wire::all()->where("area", "1000");
        return WireResource::collection($wires);
    }
    public function feeding_buffer()
    {
        $wires = Wire::all()->where("area", "2000")->where("scanned", 1);
        return WireResource::collection($wires);
    }
    public function StorageBinWires(MovingWireRequest $request)
    {
        $data = $request->validated();
        $storage_bin = StorageBin::where('storage_bins', $data['storage_bin'])->first();
        if (!$storage_bin) {
            return response()->json([
                "message" => "МХ не существует."
            ], 404);
        }
        $wires = Wire::all()->where("storage_bin", $data['storage_bin']);
        return WireResource::collection($wires);
    }
}

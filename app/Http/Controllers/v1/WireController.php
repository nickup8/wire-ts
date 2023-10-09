<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\WireRequest;
use App\Imports\WireImport;
use App\Models\Wire;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
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
}

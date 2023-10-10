<?php

namespace App\Http\Resources;

use App\Models\Wire;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WireResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $invoice = Wire::find($this->id)->invoice;
        $supplier = Wire::find($this->id)->supplier;

        return [
            "id" => $this->id,
            "material" => $this->material,
            "hu" => $this->hu,
            "description" => $this->description,
            "batch" => $this->batch,
            "qnt" => $this->qnt,
            "invoice" => $invoice,
            "supplier" => $supplier,
            "area" => $this->area,
            "storage_bin" => $this->storage_bin,
            "created_at" => $this->created_at,
        ];
    }
}

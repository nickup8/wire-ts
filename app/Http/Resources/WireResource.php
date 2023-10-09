<?php

namespace App\Http\Resources;

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
        return [
            "id" => $this->id,
            "material" => $this->material,
            "hu" => $this->hu,
            "description" => $this->description,
            "batch" => $this->batch,
            "qnt" => $this->qnt,
            "order" => $this->order_id,
            "supplier" => $this->supplier_id,
            "aria" => $this->aria,
            "storage_bin" => $this->storage_bin,
        ];
    }
}

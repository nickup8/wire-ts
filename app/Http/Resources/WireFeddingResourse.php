<?php

namespace App\Http\Resources;

use App\Models\RelatshipWireStorageBin;
use App\Models\StorageBinFeeding;
use App\Models\Wire;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WireFeddingResourse extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $wire = new WireResource(Wire::find($this->wire_id));
        $storage = StorageBinFeeding::find($this->storage_bin_feeding);
        return [
            "wire" => $wire,
            "storage_bin" => $storage
        ];
    }
}

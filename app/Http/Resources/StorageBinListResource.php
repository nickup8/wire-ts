<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StorageBinListResource extends JsonResource
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
            "shelf" => $this->shelf,
            "shelf_from" => $this->shelf_from,
            "shelf_to" => $this->shelf_to,
            "levels" => $this->levels,
            "count_shelfs" => $this->count_shelfs,
            "create_at" => $this->create_at
        ];
    }
}

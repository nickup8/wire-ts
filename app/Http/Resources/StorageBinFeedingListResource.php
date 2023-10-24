<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StorageBinFeedingListResource extends JsonResource
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
            "rack" => $this->rack,
            "shelf_from" => $this->shelf_from,
            "shelf_to" => $this->shelf_to,
            "level_from" => $this->level_from,
            "level_to" => $this->level_to,
            "count_shelfs" => $this->count_shelfs,
            "created_at" => $this->created_at
        ];
    }
}

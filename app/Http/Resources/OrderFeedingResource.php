<?php

namespace App\Http\Resources;

use App\Models\OrderFeeding;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderFeedingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $machine = OrderFeeding::find($this->id)->machine;
        return [
            "id" => $this->id,
            "material" => $this->material,
            "machine" => $machine,
        ];
    }
}

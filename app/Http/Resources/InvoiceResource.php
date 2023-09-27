<?php

namespace App\Http\Resources;

use App\Models\Invoice;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = Invoice::find($this->id)->user;
        $supplier = Invoice::find($this->id)->supplier;
        return [
            "id" => $this->id,
            "number" => $this->number,
            "date" => $this->date,
            "supplier" => $supplier,
            "user" => $user,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

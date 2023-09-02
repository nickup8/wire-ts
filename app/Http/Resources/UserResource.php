<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $rule = User::find($this->id)->rule;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'lastname' => $this->lastname,
            'login' => $this->login,
            'rule' => $rule,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorageBinRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'shelf' => 'required|integer',
            'shelf_from' => 'required|integer',
            'shelf_to' => 'required|integer',
            'levels' => 'required|integer',
        ];
    }
}

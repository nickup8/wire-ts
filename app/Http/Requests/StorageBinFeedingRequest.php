<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorageBinFeedingRequest extends FormRequest
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
            'rack' => 'required',
            'shelf_from' => 'required',
            'shelf_to' => 'required',
            'level_from' => 'required',
            'level_to' => 'required',
        ];
    }
}

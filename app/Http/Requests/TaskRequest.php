<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if(Auth::user()){
            return true;
        }

        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:20|regex:/^[\pL\s\0-9]+$/u',
            'details' => 'nullable|max:512|regex:/^[\pL\s\0-9\.,\-_]+$/u',
            'type' => 'required',
            'count' => 'nullable|numeric|max_digits:999',
        ];
    }
}

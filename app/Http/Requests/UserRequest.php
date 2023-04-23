<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'email' => 'required|email|unique:App\Models\User,email',
            'username' => 'required|min:3|max:16|unique:App\Models\User,username',
            'name' => 'required|min:3|max:16',
            'lastname' => 'required|min:3|max:16',
            'password' => 'required|min:8|max:24',
            'rePassword' => 'required|same:password',
        ];
    }
}

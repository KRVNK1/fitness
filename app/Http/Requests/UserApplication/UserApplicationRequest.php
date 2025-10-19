<?php

namespace App\Http\Requests\UserApplication;

use Illuminate\Foundation\Http\FormRequest;

class UserApplicationRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'trainer_id'     => 'required|exists:users,id',
            'requested_date' => 'required|date|after:now',
            'comment'        => 'nullable|string|max:500',
        ];
    }
}

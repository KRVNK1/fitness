<?php

use App\Http\Controllers\Api\AuthController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);


Route::get('/tokens/create', function (Request $request) {
    $token = User::first()->createToken('123');
    $userId = User::first()->id;


    return ['token' => $token->plainTextToken, 'user_id'=> $userId];
});
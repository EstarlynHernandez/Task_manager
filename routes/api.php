<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\ApiTaskController;
use App\Http\Controllers\ApiTgroupController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Tasks
Route::get('task/{device}', [ApiTaskController::class, 'index'])->middleware('auth:sanctum');
Route::post('task/store', [ApiTaskController::class, 'store'])->middleware('auth:sanctum');
Route::put('task/check', [ApiTaskController::class, 'check'])->middleware('auth:sanctum');
Route::put('task/update', [ApiTaskController::class, 'update'])->middleware('auth:sanctum');
Route::delete('task/delete', [ApiTaskController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('task/value', [ApiTaskController::class, 'setValue'])->middleware('auth:sanctum');

// Tgroups
Route::get('group', [ApiTgroupController::class, 'index'])->middleware('auth:sanctum');
Route::post('group/store', [ApiTgroupController::class, 'store'])->middleware('auth:sanctum');
Route::put('group/check', [ApiTgroupController::class, 'check'])->middleware('auth:sanctum');
Route::delete('group/delete', [ApiTgroupController::class, 'destroy'])->middleware('auth:sanctum');
Route::put('group/edit', [ApiTgroupController::class, 'update'])->middleware('auth:sanctum');

// user
Route::post('login', [ApiController::class, 'login']);
Route::post('user/store', [ApiController::class, 'store']);
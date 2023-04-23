<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


// Tasks
Route::get('/', [TaskController::class, 'index'] );
Route::put('/task/check', [TaskController::class, 'check'] )->name('task.check');
Route::resource('task', TaskController::class);


// User

Route::get('/login', [UserController::class, 'login'])->name('login');
Route::post('/login', [UserController::class, 'auth'])->name('auth');
Route::delete('/login', [UserController::class, 'logout'])->name('logout');

Route::resource('user', UserController::class);

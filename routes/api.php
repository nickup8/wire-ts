<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\v1\InvoiceController;
use App\Http\Controllers\v1\RuleController;
use App\Http\Controllers\v1\SupplierController;
use App\Http\Controllers\v1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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




Route::post('/login', [AuthController::class, 'login']);
Route::get('/users', [UserController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/suppliers', [SupplierController::class, 'create']);
    Route::get('/suppliers', [SupplierController::class, 'index']);
    Route::get('/rules', [RuleController::class, 'index']);
    Route::post('/invoice', [InvoiceController::class, 'create']);
    Route::get('/invoices', [InvoiceController::class, 'index']);
});

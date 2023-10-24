<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\StorageBinController;
use App\Http\Controllers\StorageBinFeedingController;
use App\Http\Controllers\StorageBinFeedingListController;
use App\Http\Controllers\StorageBinListController;
use App\Http\Controllers\v1\InvoiceController;
use App\Http\Controllers\v1\RuleController;
use App\Http\Controllers\v1\SupplierController;
use App\Http\Controllers\v1\UserController;
use App\Http\Controllers\V1\WireController;
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
    Route::post('/wires_create', [WireController::class, 'create']);
    Route::get('/wires_acceptance', [WireController::class, 'acceptance']);
    Route::get('/warehouse', [WireController::class, 'warehouse']);
    Route::get('/feedin_buffer', [WireController::class, 'feeding_buffer']);
    Route::post('/storage_bin', [StorageBinController::class, 'create']);
    Route::post('/storage_bin_list', [StorageBinListController::class, 'create']);
    Route::get('/storage_bin_list', [StorageBinListController::class, 'index']);
    Route::post('/storage_bin_feeding', [StorageBinFeedingController::class, 'create']);
    Route::post('/storage_bin_feeding_list', [StorageBinFeedingListController::class, 'create']);
    Route::get('/storage_bin_feeding_list', [StorageBinFeedingListController::class, 'index']);
    Route::post('/machine_new', [MachineController::class, 'create']);
    Route::get('/machines', [MachineController::class, 'index']);
    Route::get('/machines/{id}', [MachineController::class, 'view']);
    Route::get('storage_bin_feeding_machine', [StorageBinFeedingController::class, "machine"]);
});

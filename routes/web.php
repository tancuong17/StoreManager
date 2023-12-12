<?php

use App\Http\Controllers\DetailOrderFormController;
use App\Http\Controllers\OrderFormController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/login', function () {
    return view('login');
});

Route::get('/logout', [UserController::class, 'logout']);

Route::get('/loggedCheck', [UserController::class, 'loggedCheck']);

Route::post('/logincheck', [UserController::class, 'loginCheck']);

Route::post('/addProduct', [ProductController::class, 'add']);

Route::post('/updateProduct', [ProductController::class, 'update']);

Route::get('/getProducts/{page}', [ProductController::class, 'gets']);

Route::post('/getProduct', [ProductController::class, 'get']);

Route::get('/searchProducts/{page}/{keyword}', [ProductController::class, 'gets']);

Route::post('/deleteProduct', [ProductController::class, 'delete']);

Route::post('/addOrder', [OrderFormController::class, 'add']);

Route::post('/updateOrder', [OrderFormController::class, 'update']);

Route::get('/getOrders/{status}/{page}', [OrderFormController::class, 'gets']);

Route::post('/getOrder', [OrderFormController::class, 'get']);

Route::get('/searchOrders/{status}/{page}/{keyword}', [OrderFormController::class, 'gets']);

Route::post('/removeOrder', [OrderFormController::class, 'delete']);

Route::post('/payOrder', [OrderFormController::class, 'pay']);

Route::post('/removeDetailOrder', [DetailOrderFormController::class, 'remove']);
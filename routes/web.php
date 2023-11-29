<?php

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

Route::get('/getProducts', [ProductController::class, 'gets']);

Route::post('/getProduct', [ProductController::class, 'get']);

Route::post('/searchProducts', [ProductController::class, 'search']);

Route::post('/deleteProduct', [ProductController::class, 'delete']);
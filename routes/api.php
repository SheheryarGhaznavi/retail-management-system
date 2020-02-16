<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



///////////Product////////////
Route::post('/product/add','Product@add');
Route::get('/product/get','Product@get');
Route::get('/product/getSingle/{id}','Product@getSingle');
Route::post('/product/update/{id}','Product@update');
Route::get('/product/nonActive/{id}','Product@nonActive');
Route::get('/product/active/{id}','Product@active');
Route::get('/product/delete/{id}','Product@delete');



///////////Product Image////////////
Route::get('/product/getImage/{id}','Product@getImage');
Route::get('/product/getAllImage/{id}','Product@getAllImage');
Route::post('/product/updateImage/{id}','Product@updateImage');



///////////Order////////////
Route::post('/order/add','Order@add');
Route::get('/order/get','Order@get');
Route::get('/order/checkStatus/{id}','Order@checkStatus');
Route::get('/order/purchased/{id}','Order@purchased');
Route::get('/order/notPurchased/{id}','Order@notPurchased');
Route::get('/order/delivered/{id}','Order@delivered');
Route::get('/order/notDelivered/{id}','Order@notDelivered');
Route::get('/order/delete/{id}','Order@delete');


///////////Expense////////////
Route::post('/expense/add','Expense@add');
Route::get('/expense/get','Expense@get');
Route::get('/expense/nonActive/{id}','Expense@nonActive');
Route::get('/expense/active/{id}','Expense@active');
Route::get('/expense/delete/{id}','Expense@delete');

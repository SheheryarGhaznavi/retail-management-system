<?php

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

Route::get('/', function () { return view('main');});
Route::get('/Login', function () { return view('login');});



/////////Expense///////////////
Route::get('/expense/add', function () { return view('Expense.add');});
Route::get('/expense/manage', function () { return view('Expense.manage');});


/////////Product///////////////
Route::get('/product/add', function () { return view('Product.add');});
Route::get('/product/manage', function () { return view('Product.manage');});


/////////Purchase///////////////
Route::get('/purchase/add', function () { return view('Purchase.add');});
Route::get('/purchase/manage', function () { return view('Purchase.manage');});


/////////Order///////////////
Route::get('/order/add','Order@addView');
Route::get('/order/manage', function () { return view('Order.manage');});

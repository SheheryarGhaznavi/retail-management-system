<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class Expense extends Controller
{
  public function add()
  {
    $current = Carbon::now();
    $current = $current->addHours(5);
    $_POST['token'] = $_POST['_token'];
    $no = DB::table('expense')->orderBy('id','desc')->first();
    if ($no) {
        $expense_no = $no->no+1;
    } else {
        $expense_no = 1001;
    }
    DB::table('expense')->insert(['no' => $expense_no,'title' => $_POST['title'],'price' => $_POST['price'],'detail' => $_POST['detail'],'created_on' => $current]);
    return response()->json('success');
  }
  public function get()
  {       
    $expense = DB::table('expense')->get();
    foreach ($expense as $key => $value) {
      $value->created_on =  Carbon::parse($value->created_on)->toDayDateTimeString();
    }
    return response()->json($expense);
  }
  public function nonActive($id)
  {
    DB::table('expense')->where('id',$id)->update(['status' => '0']);
    return response()->json("success");
  }
  public function active($id)
  {
    DB::table('expense')->where('id',$id)->update(['status' => '1']);
    return response()->json("success");
  }
  public function delete($id)
  {
    DB::table('expense')->where('id',$id)->delete();
    return response()->json("success");
  }
  
    
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class Order extends Controller
{
    
    public function addView()
    {
      $current = Carbon::now();
      $current = $current->addHours(5);
      $product = DB::table('product')->get();
      $order = DB::table('order')
      ->whereDate('order.created_on',$current->toDateString())
      ->join('product','product.id','=','order.product_id')
      ->select('*','order.id as id','order.status as status','order.no as no','order.created_on as created_on')->get();
      foreach ($order as $key => $value) {
        $value->created_on =  Carbon::parse($value->created_on)->toDayDateTimeString();
        $image = DB::table('product_image')->where('product_id',$value->product_id)->first();
        if ($image) {
          $value->manufacture = $image->image;
        } else {
          $value->manufacture = null;
        }
      }
      return view('Order.add',['product' => $product, 'order' => $order]);
    }
    public function get()
    {       
      $order = DB::table('order')
      ->join('product','product.id','=','order.product_id')
      ->select('*','order.id as id','order.status as status','order.no as no','order.created_on as created_on')->get();
      foreach ($order as $key => $value) {
        $value->created_on =  Carbon::parse($value->created_on)->toDayDateTimeString();
        $image = DB::table('product_image')->where('product_id',$value->product_id)->first();
        if ($image) {
          $value->manufacture = $image->image;
        } else {
          $value->manufacture = null;
        }
      }
      return response()->json($order);
    }
    public function add()
    {
      $current = Carbon::now();
      $current = $current->addHours(5);
      $_POST['token'] = $_POST['_token'];
      $product = DB::table('product')->where('id',$_POST['product'])->first();
      $no = DB::table('order')->orderBy('id','desc')->first();
      if ($no) {
          $order_no = $no->no+1;
      } else {
          $order_no = 1001;
      }
      $id = DB::table('order')->insertGetId(['no' => $order_no,'product_id' => $_POST['product'],'quantity' => $_POST['quantity'],'profit' => $_POST['quantity'] * ($product->sale - $product->retail),'created_on' => $current]);
      $data = DB::table('order')->where('id',$id)->first();
      return response()->json($data);
    }
    public function purchased($id)
    {
        DB::table('order')->where('id',$id)->update(['is_purchased' => '1']);
    }
    public function notPurchased($id)
    {
        DB::table('order')->where('id',$id)->update(['is_purchased' => '0']);
    }
    public function checkStatus($id)
    {
        $data = DB::table('order')->where('id',$id)->first();
        if ($data->is_purchased == '1') {
          return 'error';
        } else {
          return 'success';
        }
        
    }
    public function delivered($id)
    {
        DB::table('order')->where('id',$id)->update(['status' => '1']);
    }
    public function notDelivered($id)
    {
        DB::table('order')->where('id',$id)->update(['status' => '2']);
    }
    public function delete($id)
    {
      DB::table('order')->where('id',$id)->delete();
      return response()->json("success");
    }
    
    
}

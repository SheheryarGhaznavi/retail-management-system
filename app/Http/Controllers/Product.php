<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class Product extends Controller
{
    
    public function add()
    {
      $current = Carbon::now();
      $current = $current->addHours(5);
      $_POST['token'] = $_POST['_token'];
      $no = DB::table('product')->orderBy('id','desc')->first();
      if ($no) {
          $product_no = $no->no+1;
      } else {
          $product_no = 1001;
      }
      $id = DB::table('product')->insertGetId(['no' => $product_no,'name' => $_POST['name'],'manufacture' => $_POST['manufacture'],'retail' => $_POST['retail'],'sale' => $_POST['sale'],'size' => $_POST['size'],'supplier' => $_POST['supplier'],'detail' => $_POST['detail'],'created_on' => $current]);
      $images = $_POST['image'];
      if ($images) {
          for ($i=0; $i < sizeof($images); $i++) {
              if (strlen($images[$i]) > 500) {
                $string = $images[$i];
                $new_data=explode(";",$string);
                $type=$new_data[0];
                $data=explode(",",$new_data[1]);
                header("Content-type:".$type);
                $codeBase = base64_decode($data[1]);
                $image = uniqid().$images[$i-1];
                $file = file_put_contents('product/'.$image,$codeBase);
                DB::table('product_image')->insert(['image' => $image,'product_id' => $id,'created_on' => $current]);    
              } 
            }
                
      }
    }
    public function get()
    {
      $data = DB::table('product')->get();
      if ($data) {
        foreach ($data as $key => $value) {
          $value->created_on =  Carbon::parse($value->created_on)->toDayDateTimeString();
          $image = DB::table('product_image')->where('product_id',$value->id)->first();
          if ($image) {
            $value->manufacture = $image->image;
          } else {
            $value->manufacture = null;
          }
        }
      }
    return response()->json($data);
    }
    public function getImage($id)
    {
      $data = DB::table('product_image')->where('product_id',$id)->simplePaginate(1);
      return response()->json($data);
    }
    public function getSingle($id)
    {
      $data = DB::table('product')->where('id',$id)->first();
      return response()->json($data);
    }
    public function update($id)
    {
      DB::table('product')->where('id',$id)->update($_POST);
      return response()->json("success");
    }
    public function nonActive($id)
    {
      DB::table('product')->where('id',$id)->update(['status' => '0']);
      return response()->json("success");
    }
    public function active($id)
    {
      DB::table('product')->where('id',$id)->update(['status' => '1']);
      return response()->json("success");
    }
    public function delete($id)
    {
      DB::table('product')->where('id',$id)->delete();
      return response()->json("success");
    }
    public function getAllImage($id)
    {
      $data = DB::table('product_image')->where('product_id',$id)->get();
      return response()->json($data);
    }
    // public function checkImageName($image,$count)
    // {
    //   $data = DB::table('product_image')->where('image',$image)->count();
    //   if ($data > 0) {
    //     $new_data=explode(".",$image);
    //     $newImage = $new_data[0].$count.".".$new_data[1];
    //     self::checkImageName($newImage,$count+1);
    //   } else {
    //     return $image;
    //   }
    // }
    
}

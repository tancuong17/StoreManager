<?php

namespace App\Http\Controllers;

use App\Http\Controllers\PriceController;
use App\Models\Price;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function add(Request $request)
    {
        try{
            $name = $request->name;
            if(Product::where('name', $name)->get()->count() == 1){
                echo json_encode(0);
            }
            else{
                $image = $request->file('photo')->store('images');
                $product = new Product();
                $product->name = $name;
                $product->image = $image;
                $product->creator = Auth::user()->id;
                $product->updater = Auth::user()->id;
                $product->save();
                $priceController = new PriceController();
                $priceController->add(array("product" => $product->id, "price" => $request->price, "creator" => Auth::user()->id));
                echo json_encode(array("id" => $product->id, "name" => $product->name, "image" => $product->image, "price" => $request->price));
            }
        }catch (\Exception $e) {
            echo json_encode(2);
        }
    }
    public function update(Request $request)
    {
        try {
            $product = Product::find($request->id);
            $name = $request->name;
            if(Product::where('name', $name)->where('id', '<>', (String)$request->id)->get()->count() > 0){
                echo json_encode(0);
            }
            else{
                if($request->file('photo') != ""){
                    $image = $request->file('photo')->store('images');
                    Storage::delete($product->image);
                    $product->image = $image;
                }
                $product->name = $name;
                $product->updater = Auth::user()->id;
                $product->save();
                if($request->price != ""){
                    $priceController = new PriceController();
                    $priceController->update(array("product" => $request->id, "price" => $request->price, "creator" => Auth::user()->id));
                }
                echo json_encode(array("id" => $product->id, "name" => $product->name, "image" => $product->image, "price" => $request->price));
            }
        } catch (\Throwable $th) {
            echo json_encode(2);
        }
    }
    public function gets()
    {
        try {
            $products = Product::select('products.id', 'products.name', 'products.image', 'prices.price')->join('prices', 'prices.product', '=', 'products.id')->whereNull('prices.updater')->get();
            echo json_encode($products);
        } catch (\Throwable $th) {
            echo json_encode(2);
        }
        
    }

    public function get(Request $request)
    {
        try {
            $product = Product::select('products.id', 'products.name', 'products.image', 'products.updated_at', 'prices.price', 'users.name as creator')->join('prices', 'prices.product', '=', 'products.id')->join('users', 'products.updater', '=', 'users.id')->where('products.id', "=", (String)$request->id)->whereNull('prices.updater')->get();
            echo json_encode($product);
        } catch (\Throwable $th) {
            echo json_encode(2);
        }
    }

    public function search(Request $request)
    {
        try {
            $products = Product::select('products.id', 'products.name', 'products.image', 'prices.price')->join('prices', 'prices.product', '=', 'products.id')->where('products.name', 'like', "%$request->keyword%")->whereNull('prices.updater')->get();
            echo json_encode($products);
        } catch (\Throwable $th) {
            echo json_encode(2);
        }
    }
    public function delete(Request $request)
    {
        try {
            $image = Product::where("id", $request->id)->get();
            if(Price::where("product", $request->id)->firstOrFail()->delete()){
                if(Product::where("id", $request->id)->firstOrFail()->delete()){
                    Storage::delete($image[0]->image);
                    echo json_encode(1);
                }
                else
                    echo json_encode(0);
            }
            else
                echo json_encode(0);
        } catch (\Throwable $th) {
            echo json_encode(2);
        }
       
    }
}

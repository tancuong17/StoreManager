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
            $product->save();
            $priceController = new PriceController();
            $priceController->add(array("product" => $product->id, "price" => $request->price, "creator" => Auth::user()->id));
            echo json_encode(array("id" => $product->id, "name" => $product->name, "image" => $product->image, "price" => $request->price));
        }
    }
    public function gets()
    {
        $products = Product::select('products.id', 'products.name', 'products.image', 'prices.price')->join('prices', 'prices.product', '=', 'products.id')->whereNull('prices.updater')->get();
        echo json_encode($products);
    }

    public function search(Request $request)
    {
        $products = Product::select('products.id', 'products.name', 'products.image', 'prices.price')->join('prices', 'prices.product', '=', 'products.id')->where('products.name', 'like', "%$request->keyword%")->whereNull('prices.updater')->get();
        echo json_encode($products);
    }
    public function delete(Request $request)
    {
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
    }
}

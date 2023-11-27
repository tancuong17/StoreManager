<?php

namespace App\Http\Controllers;

use App\Http\Controllers\PriceController;
use App\Models\product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

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
}

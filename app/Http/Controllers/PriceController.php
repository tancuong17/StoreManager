<?php

namespace App\Http\Controllers;

use App\Models\Price;
use Illuminate\Http\Request;

class PriceController extends Controller
{
    public function add($data)
    {
        $price = new Price();
        $price->product = $data["product"];
        $price->price = $data["price"];
        $price->creator = $data["creator"];
        $price->save();
    }
}

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
    public function update($data)
    {
        Price::where('product', (String)$data["product"])->whereNull('updater')->update(["updater" => $data["creator"]]);
        $this->add($data);
    }
}

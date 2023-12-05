<?php

namespace App\Http\Controllers;

use App\Models\DetailOrderForm;
use Illuminate\Http\Request;

class DetailOrderFormController extends Controller
{
    
    public function add($data)
    {
        $detailOrderForm = new DetailOrderForm();
        $detailOrderForm->order_form = $data["orderForm"];
        $detailOrderForm->product = $data["product"];
        $detailOrderForm->quantity = $data["quantity"];
        $detailOrderForm->save();
    }
    
    public function update($data)
    {
        if(DetailOrderForm::where("order_form", $data["orderForm"])->where("product", $data["product"])->get()->count() > 0)
            DetailOrderForm::where("order_form", $data["orderForm"])->where("product", $data["product"])->update(['quantity' => $data["quantity"]]);
        else
            $this->add($data);
    }
    public function remove(Request $request)
    {   
        try {
            DetailOrderForm::where("id", $request->id)->firstOrFail()->delete();
            echo json_encode(1);
        } catch (\Throwable $th) {
            echo json_encode(0);
        }
    }
}

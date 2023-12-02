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
}

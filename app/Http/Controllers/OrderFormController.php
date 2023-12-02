<?php

namespace App\Http\Controllers;

use App\Models\OrderForm;
use App\Models\User;
use App\Http\Controllers\DetailOrderFormController;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class OrderFormController extends Controller
{
    public function add(Request $request)
    {
        try {
            $order = new OrderForm();
            $order->code = time();
            $order->table_number = implode(",", $request->tables);
            $order->note = ($request->note != "") ? $request->note : "Không";
            $order->creator = Auth::user()->id;
            $order->save();
            foreach ($request->products as $key => $value) {
                $detailOrder = new DetailOrderFormController();
                $detailOrder->add(array("orderForm" => (int)$order->id, "product" => (int)$value["id"], "quantity" => (int)$value["quantity"]));
            }
            echo json_encode(array("id" => $order->id, "table_number" => implode(",", $request->tables), "note" => $order->note, "creator" => Auth::user()->name, "created_at" => $order->created_at));
          } catch (\Exception $e) {
            echo json_encode(0);
          }
    }
    public function gets()
    {
      try {
        $orders = OrderForm::select('order_forms.id', 'order_forms.table_number', 'order_forms.note', 'order_forms.created_at', 'users.name as creator')->join('users', 'order_forms.creator', '=', 'users.id')->where("status", 0)->get();
        echo json_encode($orders);
      } catch (\Throwable $th) {
          echo json_encode(2);
      }
    }
}

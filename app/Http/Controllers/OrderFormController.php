<?php

namespace App\Http\Controllers;

use App\Models\OrderForm;
use App\Models\DetailOrderForm;
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
            $order->table_number = ($request->tables != "") ? implode(",", $request->tables) : "TA".OrderForm::where("status", 0)->count();
            $order->note = ($request->note != "") ? $request->note : "Không";
            $order->creator = Auth::user()->id;
            $order->updater = Auth::user()->id;
            $order->save();
            foreach ($request->products as $key => $value) {
                $detailOrder = new DetailOrderFormController();
                $detailOrder->add(array("orderForm" => (int)$order->id, "product" => (int)$value["id"], "quantity" => (int)$value["quantity"]));
            }
            echo json_encode(array("id" => $order->id, "table_number" => $order->table_number, "note" => $order->note, "updater" => Auth::user()->name, "updated_at" => $order->created_at));
          } catch (\Exception $e) {
            echo json_encode(0);
          }
    }
    public function update(Request $request)
    {
        try {
            $order = OrderForm::find($request->id);
            $order->table_number = ($request->tables != "") ? implode(",", $request->tables) : "TA";
            $order->note = ($request->note != "") ? $request->note : "Không";
            $order->updater = Auth::user()->id;
            $order->save();
            foreach ($request->products as $key => $value) {
              $detailOrder = new DetailOrderFormController();
              $detailOrder->update(array("orderForm" => (int)$order->id, "product" => (int)$value["id"], "quantity" => (int)$value["quantity"]));
            }
            echo json_encode(array("id" => $order->id, "table_number" => $order->table_number, "note" => $order->note, "updater" => Auth::user()->name, "updated_at" => $order->updated_at));
          } catch (\Exception $e) {
            echo json_encode(0);
          }
    }
    public function gets()
    {
      try {
        $orders = OrderForm::select('order_forms.id', 'order_forms.table_number', 'order_forms.note', 'order_forms.updated_at', 'users.name as updater')->join('users', 'order_forms.updater', '=', 'users.id')->where("status", 0)->get();
        echo json_encode($orders);
      } catch (\Throwable $th) {
          echo json_encode(2);
      }
    }
    public function search(Request $request)
    {
      try {
        $orders = OrderForm::select('order_forms.id', 'order_forms.table_number', 'order_forms.note', 'order_forms.updated_at', 'users.name as updater')->join('users', 'order_forms.updater', '=', 'users.id')->where("status", 0)->where("table_number", "like", "%$request->keyword%")->get();
        echo json_encode($orders);
      } catch (\Throwable $th) {
          echo json_encode(2);
      }
    }
    public function get(Request $request)
    {
      try {
        $order = OrderForm::select('order_forms.table_number', 'order_forms.note', 'products.name', 'products.id as id_product', 'products.image', 'prices.price', 'detail_order_forms.quantity', 'detail_order_forms.id')->join('detail_order_forms', 'detail_order_forms.order_form', '=', 'order_forms.id')->join('products', 'products.id', '=', 'detail_order_forms.product')->join('prices', 'prices.product', '=', 'products.id')->where("order_forms.id", $request->id)->where("order_forms.status", 0)->whereNull('prices.updater')->get();
        echo json_encode($order);
      } catch (\Throwable $th) {
          echo json_encode(2);
      }
    }
    public function delete(Request $request)
    {
      try {
        DetailOrderForm::where("order_form", $request->id)->firstOrFail()->delete();
        OrderForm::where("id", $request->id)->firstOrFail()->delete();
        echo json_encode(1);
      } catch (\Throwable $th) {
          echo json_encode(0);
      }
    }
}

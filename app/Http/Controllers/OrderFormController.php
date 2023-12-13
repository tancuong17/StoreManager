<?php

namespace App\Http\Controllers;

use App\Models\OrderForm;
use App\Models\DetailOrderForm;
use App\Models\Product;
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
    public function gets(Request $request)
    {
      try {
        if($request->keyword){
          $pageQuantity = ceil(OrderForm::where("status", $request->status)->where(($request->status == 0) ? "table_number" : "code", "like", "%$request->keyword%")->count() / 12);
          $orders = OrderForm::select('order_forms.id', 'order_forms.code', 'order_forms.table_number', 'order_forms.note', 'order_forms.updated_at', 'users.name as updater')->join('users', 'order_forms.updater', '=', 'users.id')->where("status", $request->status)->where(($request->status == 0) ? "order_forms.table_number" : "order_forms.code", "like", "%$request->keyword%")->orderBy('order_forms.updated_at', 'ASC')->offset((int)$request->page - 1)->limit(12)->get();
        }
        else{
          $pageQuantity = ceil(OrderForm::where("status", $request->status)->count() / 12);
          $orders = OrderForm::select('order_forms.id', 'order_forms.code', 'order_forms.table_number', 'order_forms.note', 'order_forms.updated_at', 'users.name as updater')->join('users', 'order_forms.updater', '=', 'users.id')->where("status", $request->status)->orderBy('order_forms.updated_at', 'ASC')->offset(((int)$request->page - 1) * 12)->limit(12)->get();
        }
        if(count($orders) != 0)
          echo json_encode(array("quantity" => $pageQuantity, "data" => $orders));
        else
          echo json_encode(0);
      } catch (\Throwable $th) {
          echo json_encode(2);
      }
    }
    public function get(Request $request)
    {
      try {
        $order = OrderForm::select('order_forms.table_number', 'order_forms.code', 'order_forms.note', 'order_forms.created_at', 'products.name', 'products.id as id_product', 'products.image', 'prices.price', 'detail_order_forms.quantity', 'detail_order_forms.id', 'users.name as updater')->join('detail_order_forms', 'detail_order_forms.order_form', '=', 'order_forms.id')->join('products', 'products.id', '=', 'detail_order_forms.product')->join('prices', 'prices.product', '=', 'products.id')->where("order_forms.id", $request->id)->join('users', 'order_forms.updater', '=', 'users.id')->where("order_forms.status", $request->status)->whereNull('prices.updater')->get();
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
    public function pay(Request $request)
    {
      try {
        $order = OrderForm::find($request->id);
        $order->status = 1;
        $order->updater = Auth::user()->id;
        $date = date_create($request->time);
        $order->updated_at = date_format($date,"Y-m-d H:i:s");
        $order->save();
        echo json_encode(1);
      } catch (\Throwable $th) {
          echo json_encode(0);
      }
    }
    public function dashboard(Request $request)
    {
      try {
        $now = date('Y-m-d');
        $orderQuantity = OrderForm::where("status", 0)->whereDate("created_at", "=", $now)->count();
        $billQuantity = OrderForm::where("status", 1)->whereDate("updated_at", "=", $now)->count();
        $productQuantity = Product::count();
        $revenue = OrderForm::select("detail_order_forms.id", "prices.price")->join('detail_order_forms', 'detail_order_forms.order_form', '=', 'order_forms.id')->join('products', 'products.id', '=', 'detail_order_forms.product')->join('prices', 'prices.product', '=', 'products.id')->where("order_forms.status", 1)->whereDate("order_forms.updated_at", "=", $now)->whereRaw('prices.created_at = prices.updated_at')->where("order_forms.status", 1)->orWhereDate("order_forms.updated_at", "=", $now)->whereRaw('prices.created_at <= order_forms.updated_at')->whereRaw('prices.updated_at >= order_forms.updated_at')->sum("prices.price", "*", "detail_order_forms.quantity");
        echo json_encode(array("orderQuantity" => $orderQuantity, "billQuantity" => $billQuantity, "productQuantity" => $productQuantity, "revenue" => $revenue));
      } catch (\Throwable $th) {
          echo json_encode(0);
      }
    }
}

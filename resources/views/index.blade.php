<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>Trang chủ</title>
    <link rel="stylesheet" href="{{ URL::asset('resources/css/index.css') }}">
    <link rel="shortcut icon" href="https://i.pinimg.com/originals/c3/2c/4a/c32c4a1691437b455a972b454005eba2.jpg">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body onresize="Resize()">
  @include('menu')
  <section id="tab-container">
    @include('header')
    <div id="tabs">
      @include('dashboard_tab')
      @include('products_tab')
      @include('orders_tab')
      @include('bills_tab')
    </div>
  </section>
  @include('add_product_modal')
  @include('add_order_modal')
</body>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="{{ URL::asset('resources/js/index.js') }}"></script>
</html>
$.ajaxSetup({
  headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

function preventBack(){
  window.history.forward();
}

setTimeout("preventBack()", 0);

window.onunload=function(){null};

 $.ajax({
      type: "get",
      url: "./loggedCheck",
      dataType: "json",
      success: function (response) {
          if (response == 0) {
            window.location.href = "./login";
          }
          else{
            $("#user-image").attr("src", response.image);
            $("#user-name").text(response.name);
            $("#user-position").text(response.position);
          }
      }
  });
const ctx = document.getElementById('myChart');
new Chart(ctx, {
  type: 'bar',
  responsive: true,
  data: {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [{
      label: 'Doanh thu',
      data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

OpenTab((localStorage.getItem("tab")) ? localStorage.getItem("tab") : 0);

function OpenTab(tab) {
    $(".icon-container").removeClass("icon-active");
    $(".icon-container").eq(tab).addClass("icon-active");
    $(".tab").removeClass("tab-active");
    $(".tab").eq(tab).addClass("tab-active");
    localStorage.setItem("tab", tab);
    getData(tab);
}

function getData(tab) {
  $(".load-icon-container").attr("style", "display: flex");
  $(".emty-icon-container").attr("style", "display: none");
  $("#body-tab-product").attr("style", "height: calc(100vh - 9rem)");
  let url = "";
  let tabAddData = "";
  if(tab == 1){
    $("#body-tab-product").find(".product-container").remove();
    url = "./getProducts";
    tabAddData = "#body-tab-product";
  }
  $.ajax({
    type: "get",
    url: url,
    dataType: "json",
    success: function (response) {
      if(tab == 1){
        $(".load-icon-container").attr("style", "display: none");
        if(response.length == 0){
          $(".emty-icon-container").attr("style", "display: flex");
        }
        else{
          $("#body-tab-product").attr("style", "height: auto");
          $.map(response, function (element) {
            $("#body-tab-product").prepend(AddProductElementOnTab(element));
          });
        }
      }
    }
  });
}

function AddProductElementOnTab(response) {
  return `
    <div class="product-container" id="product-`+ response.id +`">
      <div class="product" onclick="OpenModalProductDetail(`+ response.id +`)">
        <img src="./storage/app/` + response.image +`" alt="product"/>
        <div>
          <p id="name-product">`+ response.name +`</p>
          <p id="price-product">`+ new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(response.price) +`đ</p>
        </div>
      </div>
      <div class="product-function">
        <div class="product-edit" onclick="OpenModalUpdateProduct(`+ response.id +`)">
          <i class="fa-regular fa-pen-to-square"></i>
        </div>
        <div class="product-remove" onclick="DeleteProduct(this, `+ response.id +`)">
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>
  `;
}


function DeleteProduct(e, id) {
  $.ajax({
    type: "post",
    url: "./deleteProduct",
    data: {id: id},
    dataType: "json",
    success: function (response) {
      if(response == 1)
        $(e).parent().remove();
      if($(".product-container").length == 0){
        $(".emty-icon-container").attr("style", "display: flex");
        $("#body-tab-product").attr("style", "height: calc(100vh - 9rem)");
      }
    }
  });
}

document.getElementById("image-upload-add-input").onchange = evt => {
  const [file] = document.getElementById("image-upload-add-input").files;
  if (file) {
    document.getElementById("image-add-upload").src = URL.createObjectURL(file)
  }
}

document.getElementById("image-upload-edit-input").onchange = evt => {
  const [file] = document.getElementById("image-upload-edit-input").files;
  if (file) {
    document.getElementById("image-edit-upload").src = URL.createObjectURL(file)
  }
}

$("#keyword_product").keyup(function(event) {
  if (event.keyCode === 13) {
    SearchProduct();
  }
});

function SearchProduct() {
  $("#body-tab-product").find(".product-container").remove();
  $(".load-icon-container").attr("style", "display: flex");
  $(".emty-icon-container").attr("style", "display: none");
  $("#body-tab-product").attr("style", "height: calc(100vh - 9rem)");
  $.ajax({
    type: "post",
    url: "./searchProducts",
    data: {keyword: $("#keyword_product").val()},
    dataType: "json",
    success: function (response) {
      $(".load-icon-container").attr("style", "display: none");
      if(response.length == 0){
        $(".emty-icon-container").attr("style", "display: flex");
      }
      else{
        $("#body-tab-product").attr("style", "height: auto");
        $.map(response, function (element) {
          $("#body-tab-product").prepend(AddProductElementOnTab(element));
        });
      }
    }
  });
}

function OpenModalAddProduct(){
  $("#modal-add-product").attr("style", "display: grid");
}

function CloseModalAddProduct(){
  $("#modal-add-product").attr("style", "display: none");
}

function OpenModalUpdateProduct(id){
  $("#modal-edit-product").attr("style", "display: grid");
  $.ajax({
    type: "post",
    url: "./getProduct",
    data: {id: id},
    dataType: "json",
    success: function (response) {
      $("#image-edit-upload").attr("src", "./storage/app/" + response[0].image);
      $("#name-edit").val(response[0].name);
      $("#price-edit").val(response[0].price);
      $("#price-edit").attr("data-price", response[0].price);
      $("#btn-update-product").attr("onclick", "UpdateProduct("+ id +")");
    }
  });
}

function CloseModalUpdateProduct(){
  $("#modal-edit-product").attr("style", "display: none");
}

function OpenModalProductDetail(id){
  $.ajax({
    type: "post",
    url: "./getProduct",
    data: {id: id},
    dataType: "json",
    success: function (response) {
      $("#image-detail-upload").attr("src", "./storage/app/" + response[0].image);
      $("#name-detail").val(response[0].name);
      $("#price-detail").val(response[0].price);
      $("#updated_date").text("Thời gian: " + new Date(response[0].updated_at).toLocaleString());
      $("#updater").text("Cập nhật hoặc tạo: " + response[0].creator);
    }
  });
  $("#modal-detail-product").attr("style", "display: grid");
}

function CloseModalProductDetail(){
  $("#modal-detail-product").attr("style", "display: none");
}

function AddOrder() {
  $("#modal-add-product-to-order").attr("style", "display: flex");
}

function CloseModalAddProductToOrder() {
  $("#modal-add-product-to-order").attr("style", "display: none");
}

function AddInputTable() {
  $("#input-table").prepend(`<input/>`);
}

function OpenMenu() {
  $("#menu-container").attr("style", "display: flex");
}

function CloseMenu() {
  $("#menu-container").attr("style", "display: none");
}

function Resize() {
  if(window.innerWidth > 600)
    OpenMenu();
  else
    CloseMenu();
}

function AddProduct() {
  let data = new FormData();
  data.append("name", $("#name").val());
  data.append("price", $("#price").val());
  data.append("photo", $("#image-upload-add-input")[0].files[0]);
  $.ajax({
    type: "post",
    url: "./addProduct",
    data: data,
    processData: false,
    contentType: false,
    dataType: "json",
    success: function (response) {
      $("#body-tab-product").attr("style", "height: auto");
      $(".emty-icon-container").attr("style", "display: none");
      if(response == 0){
        $("#notification-product").attr("style", "display: flex");
        $("#notification-product").find("p").text("Sản phẩm này đã tồn tại!");
        $("#notification-product").find("img").attr("src", "https://cdn-icons-png.flaticon.com/128/2997/2997911.png");
        $("#notification-product").find("img").attr("onclick", "CloseNotificationProduct()");
      }
      else{
        $("#notification-product").attr("style", "display: flex");
        $("#notification-product").find("p").text("Thêm sản phẩm thành công!");
        $("#notification-product").find("img").attr("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1024px-Flat_tick_icon.svg.png");
        setTimeout(() => {
          $("#modal-add-product").attr("style", "display: none");
          $("#notification-product").attr("style", "display: none");
          $("#name").val("");
          $("#price").val("");
          $("#image-add-upload").attr("src", "https://static.thenounproject.com/png/104062-200.png");
        }, 1500);
        $("#body-tab-product").prepend(AddProductElementOnTab(response));
      }
    }
  });
}

function UpdateProduct(id) {
  let data = new FormData();
  data.append("id", id);
  data.append("name", $("#name-edit").val());
  data.append("photo", $("#image-upload-edit-input")[0].files[0]);
  if($("#price-edit").attr("data-price") != $("#price-edit").val())
    data.append("price", $("#price-edit").val());
  else
    data.append("price", "");
  $.ajax({
    type: "post",
    url: "./updateProduct",
    data: data,
    processData: false,
    contentType: false,
    dataType: "json",
    success: function (response) {
      $("#product-" + response.id).find("img").attr("src", "./storage/app/" + response.image);
      $("#product-" + response.id).find("#name-product").text($("#name-edit").val());
      $("#product-" + response.id).find("#price-product").text(new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format($("#price-edit").val()) + "đ");
      CloseModalUpdateProduct();
    }
  });
}

function CloseNotificationProduct() {
  $("#notification-product").attr("style", "display: none");
}
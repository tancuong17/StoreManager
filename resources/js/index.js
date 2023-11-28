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
    <div class="product-container">
      <div class="product">
        <img src="./storage/app/` + response.image +`" alt="product"/>
        <div>
          <p>`+ response.name +`</p>
          <p>`+ new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(response.price) +`đ</p>
        </div>
      </div>
      <div class="product-remove" onclick="DeleteProduct(this, `+ response.id +`)">
        <i class="fa-solid fa-trash"></i>
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

function CloseNotificationProduct() {
  $("#notification-product").attr("style", "display: none");
}
function AddProductElementOnTab(response) {
    return `
      <div class="product-container" id="product-`+ response.id + `">
        <div class="product" onclick="OpenModalProductDetail(`+ response.id + `)">
          <img src="./storage/app/` + response.image + `" alt="product"/>
          <div>
            <p id="name-product">`+ response.name + `</p>
            <p id="price-product">`+ new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(response.price) + `đ</p>
          </div>
        </div>
        <div class="product-function">
          <div class="product-edit" onclick="OpenModalUpdateProduct(`+ response.id + `)">
            <i class="fa-regular fa-pen-to-square"></i>
          </div>
          <div class="product-remove" onclick="DeleteProduct(this, `+ response.id + `)">
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    `;
}

function DeleteProduct(e, id) {
    let image = $(e).parents(".product-container").find("img").attr("src");
    $(e).parents(".product-container").find("img").attr("src", "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif");
    $.ajax({
        type: "post",
        url: "./deleteProduct",
        data: { id: id },
        dataType: "json",
        success: function (response) {
            if (response == 1) {
                $(e).parents(".product-container").find("img").attr("src", "https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif");
                setTimeout(() => {
                    $(e).parents(".product-container").remove();
                    if ($(".product-container").length == 0) {
                        $(".emty-icon-container").attr("style", "display: flex");
                        $("#body-tab-product").attr("style", "height: calc(100vh - 9rem)");
                    }
                }, 3000);
            }
            else {
                $(e).parents(".product-container").find("img").attr("src", "https://i.pinimg.com/originals/ef/8b/bd/ef8bbd4554dedcc2fd1fd15ab0ebd7a1.gif");
                setTimeout(() => {
                    $(e).parents(".product-container").find("img").attr("src", image);
                }, 3000);
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

$("#keyword_product").keyup(function (event) {
    if (event.keyCode === 13) {
        getData(localStorage.getItem("tab"), 1);
    }
});

function SearchProduct() {
    getData(localStorage.getItem("tab"), 1);
}

function OpenModalAddProduct() {
    $("#modal-add-product").attr("style", "display: grid");
}

function CloseModalAddProduct() {
    $("#modal-add-product").attr("style", "display: none");
}

function OpenModalUpdateProduct(id) {
    $("#load-edit-product-modal").attr("style", "display: flex");
    $(".body-modal").attr("style", "display: none");
    $(".footer-modal").attr("style", "display: none");
    $("#modal-edit-product").attr("style", "display: grid");
    $.ajax({
        type: "post",
        url: "./getProduct",
        data: { id: id },
        dataType: "json",
        success: function (response) {
            $(".body-modal").attr("style", "display: flex");
            $(".footer-modal").attr("style", "display: flex");
            $("#load-edit-product-modal").attr("style", "display: none");
            $("#image-edit-upload").attr("src", "./storage/app/" + response[0].image);
            $("#name-edit").val(response[0].name);
            $("#price-edit").val(response[0].price);
            $("#price-edit").attr("data-price", response[0].price);
            $("#btn-update-product").attr("onclick", "UpdateProduct(" + id + ")");
        }
    });
}

function CloseModalUpdateProduct() {
    $("#modal-edit-product").attr("style", "display: none");
}

function OpenModalProductDetail(id) {
    $("#load-detail-product-modal").attr("style", "display: flex");
    $(".body-modal").attr("style", "display: none");
    $(".footer-modal").attr("style", "display: none");
    $.ajax({
        type: "post",
        url: "./getProduct",
        data: { id: id },
        dataType: "json",
        success: function (response) {
            $(".body-modal").attr("style", "display: flex");
            $(".footer-modal").attr("style", "display: flex");
            $("#load-detail-product-modal").attr("style", "display: none");
            $("#image-detail-upload").attr("src", "./storage/app/" + response[0].image);
            $("#name-detail").val(response[0].name);
            $("#price-detail").val(response[0].price);
            $("#updated_date").text("Thời gian: " + new Date(response[0].updated_at).toLocaleString());
            $("#updater").text("Cập nhật hoặc tạo: " + response[0].creator);
        }
    });
    $("#modal-detail-product").attr("style", "display: grid");
}

function CloseModalProductDetail() {
    $("#modal-detail-product").attr("style", "display: none");
}

function CloseModalAddProductToOrder() {
    $("#modal-add-product-to-order").attr("style", "display: none");
}

function AddProduct() {
    let data = new FormData();
    data.append("name", $("#name").val());
    data.append("price", $("#price").val());
    data.append("photo", $("#image-upload-add-input")[0].files[0]);
    $("#load-add-product-modal").find("img").attr("src", "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif");
    $(".body-modal").attr("style", "display: none");
    $(".footer-modal").attr("style", "display: none");
    $("#load-add-product-modal").attr("style", "display: flex");
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
            if (response == 0) {
                $("#load-add-product-modal").find("img").attr("src", "https://i.redd.it/he0qua80qrn91.gif");
                setTimeout(() => {
                    $("#load-add-product-modal").attr("style", "display: none");
                    $("#notification-product").attr("style", "display: flex");
                    $(".body-modal").attr("style", "display: flex");
                    $(".footer-modal").attr("style", "display: flex");
                    $("#notification-product").find("p").text("Sản phẩm này đã tồn tại!");
                    $("#notification-product").find("img").attr("src", "https://cdn-icons-png.flaticon.com/128/2997/2997911.png");
                    $("#notification-product").find("img").attr("onclick", "CloseNotificationProduct()");
                }, 3000);
            }
            else {
                $("#load-add-product-modal").attr("style", "display: none");
                $("#success-add-product-modal").attr("style", "display: flex");
                setTimeout(() => {
                    $("#modal-add-product").attr("style", "display: none");
                    $(".body-modal").attr("style", "display: flex");
                    $(".footer-modal").attr("style", "display: flex");
                    $("#success-add-product-modal").attr("style", "display: none");
                    $("#name").val("");
                    $("#price").val("");
                    $("#image-add-upload").attr("src", "https://static.thenounproject.com/png/104062-200.png");
                    $("#body-tab-product").prepend(AddProductElementOnTab(response));
                }, 3000);
            }
        }
    });
}

function UpdateProduct(id) {
    $("#load-edit-product-modal").find("img").attr("src", "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif");
    $(".body-modal").attr("style", "display: none");
    $(".footer-modal").attr("style", "display: none");
    $("#load-edit-product-modal").attr("style", "display: flex");
    let data = new FormData();
    data.append("id", id);
    data.append("name", $("#name-edit").val());
    data.append("photo", $("#image-upload-edit-input")[0].files[0]);
    if ($("#price-edit").attr("data-price") != $("#price-edit").val())
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
            $("#body-tab-product").attr("style", "height: auto");
            $(".emty-icon-container").attr("style", "display: none");
            if (response == 0) {
                $("#load-edit-product-modal").find("img").attr("src", "https://i.redd.it/he0qua80qrn91.gif");
                setTimeout(() => {
                    $("#load-edit-product-modal").attr("style", "display: none");
                    $("#notification-edit-product").attr("style", "display: flex");
                    $(".body-modal").attr("style", "display: flex");
                    $(".footer-modal").attr("style", "display: flex");
                    $("#notification-edit-product").find("p").text("Tên sản phẩm này đã tồn tại!");
                    $("#notification-edit-product").find("img").attr("src", "https://cdn-icons-png.flaticon.com/128/2997/2997911.png");
                    $("#notification-edit-product").find("img").attr("onclick", "CloseNotificationEditProduct()");
                }, 3000);
            }
            else {
                $("#load-edit-product-modal").attr("style", "display: none");
                $("#success-edit-product-modal").attr("style", "display: flex");
                setTimeout(() => {
                    $("#modal-edit-product").attr("style", "display: none");
                    $(".body-modal").attr("style", "display: flex");
                    $(".footer-modal").attr("style", "display: flex");
                    $("#success-edit-product-modal").attr("style", "display: none");
                    $("#image-edit-upload").attr("src", "https://static.thenounproject.com/png/104062-200.png");
                    CloseModalUpdateProduct();
                    $("#product-" + response.id).find("img").attr("src", "./storage/app/" + response.image);
                    $("#product-" + response.id).find("#name-product").text($("#name-edit").val());
                    $("#product-" + response.id).find("#price-product").text(new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format($("#price-edit").val()) + "đ");
                    $("#name-edit").val("");
                    $("#price-edit").val("");
                }, 3000);
            }
        }
    });
}

function CloseNotificationProduct() {
    $("#notification-product").attr("style", "display: none");
}

function CloseNotificationEditProduct() {
    $("#notification-edit-product").attr("style", "display: none");
}
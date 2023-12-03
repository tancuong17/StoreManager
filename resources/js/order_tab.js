
function OpenOrderTab(id) {
    $("#product-to-order-footer-modal").find(".product-order").remove();
    $("#modal-add-product-to-order").attr("style", "display: flex");
    $("#load-product-in-order-modal").attr("style", "display: flex");
    if(id != null){
        $("#product-in-order-modal .product-order").remove();
        $("#add-submit-btn").text("Thanh toán");
        $("#emty-icon-order-container").attr("style", "display: none");
        $.ajax({
            type: "post",
            url: "./getOrder",
            data: {id: id},
            dataType: "json",
            success: function (response) {
                $("#order-note-add").text(response[0].note);
                $.map(response[0].table_number.split(","), function (element) {
                    $("#input-table input").remove();
                    $("#input-table").prepend(`
                        <input onchange="WriteTableNumber(this)" value="`+ element +`"/>
                    `);
                });
                $.map(response, function (element) {
                    $("#product-in-order-modal").prepend(`
                        <div class="product-order" id="product-order-`+ element.id_product +`">
                            <div class="info-container">
                                <img class="product-image" src="./storage/app/` + element.image + `" alt="product"/>
                                <div>
                                    <p>`+ element.name + `</p>
                                    <p>`+ new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(element.price) + `đ</p>
                                </div>
                            </div>
                            <div class="quantity-product-order-container">
                                <input value="`+ element.quantity + `"/>
                                <img class="icon" onclick="RemoveProductToOrder(this)" src="https://cdn-icons-png.flaticon.com/128/11890/11890341.png" alt="icon">
                            </div>
                        </div>
                    `);
                });
            }
        });
    }
    $.ajax({
        type: "get",
        url: "./getProducts",
        dataType: "json",
        success: function (response) {
            $("#load-product-in-order-modal").attr("style", "display: none");
            $.map(response, function (element) {
                $("#product-to-order-footer-modal").prepend(`
                    <div class="product-order">
                        <div class="info-container">
                        <img class="product-image" src="./storage/app/` + element.image + `" alt="product"/>
                        <div>
                            <p class="name-product-order">`+ element.name + `</p>
                            <p class="price-product-order">`+ new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(element.price) + `đ</p>
                        </div>
                        </div>
                        <div class="quantity-product-order-container">
                        <button class="btn" onclick="AddProductToOrder(this, `+ element.id + `)">Thêm</button>
                        </div>
                    </div>
                `);
            });
        }
    });
}

function AddInputTable() {
    $("#input-table").prepend(`<input onchange="WriteTableNumber(this)"/>`);
}

function AddProductToOrder(e, id) {
    if($("#product-order-"+ id).length){
        let quantityProductAddOrder = $("#product-order-"+ id).find(".quantity-product-order-container").find("input").val();
        $("#product-order-"+ id).find(".quantity-product-order-container").find("input").val(Number(quantityProductAddOrder) + 1);
    }
    else{
        $("#emty-icon-order-container").attr("style", "display: none");
        $("#product-in-order-modal").prepend(`
            <div class="product-order" id="product-order-`+ id +`">
                <div class="info-container">
                    <img class="product-image" src="` + $(e).parents(".product-order").find(".product-image").attr("src") + `" alt="product"/>
                    <div>
                        <p>`+ $(e).parents(".product-order").find(".name-product-order").text() + `</p>
                        <p>`+ $(e).parents(".product-order").find(".price-product-order").text() + `đ</p>
                    </div>
                </div>
                <div class="quantity-product-order-container">
                    <input value="1"/>
                    <img class="icon" onclick="RemoveProductToOrder(this)" src="https://cdn-icons-png.flaticon.com/128/11890/11890341.png" alt="icon">
                </div>
            </div>
        `);
    }
}

function RemoveProductToOrder(e) {
    $(e).parents(".product-order").remove();
    if($("#product-in-order-modal .product-order").length == 0)
        $("#emty-icon-order-container").attr("style", "display: flex");
}

function WriteTableNumber(e) {
    let tableNumbers = "";
    let count = 0;
    tableNumbers = tableNumbers.replaceAll("#", "");
    $('.table-number').each(function(i, obj) {
        tableNumbers += $(obj).text().replaceAll(",", "");
    });
    $('#input-table input').each(function(i, obj) {
        if(Number($(e).val()) == Number($(obj).val())){
            count += 1;
        }
    });
    if(count == 2 || tableNumbers.split("#").includes(String($(e).val()).padStart(2, '0')))
        $(e).val("");
}

function AddOrderElementOnTab(response) {
    let tableNumber = response.table_number.split(",");
    tableNumber.forEach((element, index) => {
        tableNumber[index] = "#" + String(element).padStart(2, '0');
    });
    return `
        <div class="order">
            <div onclick="OpenOrderTab(`+ response.id +`)">
                <p class="table-number">`+ tableNumber.toString() +`</p>
                <p class="order-text">Ngày tạo: `+ new Date(response.created_at).toLocaleString() +`</p>
                <p class="order-text">Người tạo: `+ response.creator +`</p>
                <p class="order-text">Ghi chú:</p>
                <textarea readonly class="order-note">`+ response.note +`</textarea>
            </div>
            <button class="btn">Xóa</button>
        </div>
    `;
}

function AddOrder() {
    let dataProduct = new Array();
    let dataTable = new Array();
    $('#product-in-order-modal .product-order').each(function(i, obj) {
        dataProduct.push({id: $(obj).attr("id").replace("product-order-", ""), quantity: $(obj).find(".quantity-product-order-container input").val()});
    });
    $('#input-table input').each(function(i, obj) {
        if($(obj).val() != "")
            dataTable.push($(obj).val());
    });
    $("#body-tab-order .emty-icon-container").attr("style", "display: none");
    $("#load-add-order-modal").attr("style", "display: flex");
    $(".body-modal-add-product-to-order").attr("style", "display: none");
    $.ajax({
        type: "post",
        url: "./addOrder",
        data: {"products": dataProduct, "tables": dataTable, "note": $("#order-note-add").val()},
        dataType: "json",
        success: function (response) {
            console.log(response);
            if(response == 0){
                $("#load-add-order-modal").find("img").attr("src", "https://i.redd.it/he0qua80qrn91.gif");
                setTimeout(() => {
                    $(".body-modal-add-product-to-order").attr("style", "display: grid");
                    $("#load-add-order-modal").find("img").attr("src", "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif");
                    $("#load-add-order-modal").attr("style", "display: none");
                }, 2000);
            }
            else{
                $("#load-add-order-modal").find("img").attr("src", "https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif");
                setTimeout(() => {
                    $('#input-table input').not(':first').remove();
                    $('#input-table input').val("");
                    $(".body-modal-add-product-to-order").attr("style", "display: grid");
                    $("#load-add-order-modal").find("img").attr("src", "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif");
                    $("#product-in-order-modal .product-order").remove();
                    $("#load-add-order-modal").attr("style", "display: none");
                    $("#emty-icon-order-container").attr("style", "display: flex");
                    $("#body-tab-order").prepend(AddOrderElementOnTab(response));
                }, 2000);
            }
        }
    });
}

function SearchProductAddOrder(e) {
    let countProductSearchOrder = true;
    $('#product-to-order-footer-modal .product-order').each(function(i, obj) {
        if($(obj).find(".name-product-order").text().toLowerCase().search($(e).val().toLowerCase()) != -1){
            $(obj).attr("style", "display: flex");
            countProductSearchOrder = false;
        }
        else
            $(obj).attr("style", "display: none");
    });
    if(countProductSearchOrder){
        $("#load-product-in-order-modal").find("img").attr("src", "https://assets-v2.lottiefiles.com/a/a4c7388c-1150-11ee-a0fa-4b9598be54ec/oceXQL7dcr.gif");
        $("#load-product-in-order-modal").attr("style", "display: flex");
    }
    else{
        $("#load-product-in-order-modal").attr("style", "display: none");
        $("#load-product-in-order-modal").find("img").attr("src", "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif");
    }
}



function OpenOrderTab(id) {
    $("#product-to-order-footer-modal").find(".product-order").remove();
    $("#modal-add-product-to-order").attr("style", "display: flex");
    $("#load-product-in-order-modal").attr("style", "display: flex");
    if (id != null) {
        $("#emty-icon-order-container").attr("style", "display: flex");
        $("#modal-add-product-to-order .header-modal").find("p").text("Chi tiết đơn hàng");
        $("#product-in-order-modal .product-order").remove();
        $("#add-submit-btn").text("Cập nhật");
        $("#add-submit-btn").attr("onclick", "UpdateOrder(" + id + ")");
        $("#emty-icon-order-container").find("img").attr("src", "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif");
        $.ajax({
            type: "post",
            url: "./getOrder",
            data: { id: id },
            dataType: "json",
            success: function (response) {
                $("#order-note-add").text(response[0].note);
                $("#input-table input").remove();
                $("#emty-icon-order-container").attr("style", "display: none");
                $("#emty-icon-order-container").find("img").attr("src", "https://assets-v2.lottiefiles.com/a/a4c7388c-1150-11ee-a0fa-4b9598be54ec/oceXQL7dcr.gif");
                if(response[0].table_number.search("TA") != -1)
                    $("#input-table").prepend(`
                        <input onchange="WriteTableNumber(this)"/>
                    `);
                else
                    $.map(response[0].table_number.split(","), function (element) {
                        $("#input-table").prepend(`
                            <input onchange="WriteTableNumber(this)" value="`+ element + `"/>
                        `);
                    });
                $.map(response, function (element) {
                    $("#product-in-order-modal").prepend(`
                        <div class="product-order" id="product-order-`+ element.id_product + `">
                            <div class="info-container">
                                <img class="product-image" src="./storage/app/` + element.image + `" alt="product"/>
                                <div>
                                    <p>`+ element.name + `</p>
                                    <p>`+ new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(element.price) + `đ</p>
                                </div>
                            </div>
                            <div class="quantity-product-order-container">
                                <input value="`+ element.quantity + `"/>
                                <img class="icon" onclick="RemoveProductToOrder(this, `+ element.id + `)" src="https://cdn-icons-png.flaticon.com/128/11890/11890341.png" alt="icon">
                            </div>
                        </div>
                    `);
                });
            }
        });
    }
    else {
        $("#modal-add-product-to-order .header-modal").find("p").text("Tạo hóa đơn");
        $("#add-submit-btn").text("Hoàn tất");
        $("#product-in-order-modal .product-order").remove();
        $("#add-submit-btn").attr("onclick", "AddOrder()");
        $("#input-table input").remove();
        $("#input-table").prepend(`
            <input onchange="WriteTableNumber(this)"/>
        `);
        $("#emty-icon-order-container").attr("style", "display: flex");
        $("#order-note-add").val("");
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
    if ($("#product-order-" + id).length) {
        let quantityProductAddOrder = $("#product-order-" + id).find(".quantity-product-order-container").find("input").val();
        $("#product-order-" + id).find(".quantity-product-order-container").find("input").val(Number(quantityProductAddOrder) + 1);
    }
    else {
        $("#emty-icon-order-container").attr("style", "display: none");
        $("#product-in-order-modal").prepend(`
            <div class="product-order" id="product-order-`+ id + `">
                <div class="info-container">
                    <img class="product-image" src="` + $(e).parents(".product-order").find(".product-image").attr("src") + `" alt="product"/>
                    <div>
                        <p>`+ $(e).parents(".product-order").find(".name-product-order").text() + `</p>
                        <p>`+ $(e).parents(".product-order").find(".price-product-order").text() + `đ</p>
                    </div>
                </div>
                <div class="quantity-product-order-container">
                    <input value="1"/>
                    <img class="icon" onclick="RemoveProductToOrder(this, null)" src="https://cdn-icons-png.flaticon.com/128/11890/11890341.png" alt="icon">
                </div>
            </div>
        `);
    }
}

function RemoveProductToOrder(e, id) {
    let image = $(e).parents("product-order").find(".product-image").attr("src");
    if (id == null) {
        $(e).parents(".product-order").remove();
        if ($("#product-in-order-modal .product-order").length == 0)
            $("#emty-icon-order-container").attr("style", "display: flex");
    }
    else {
        if ($("#product-in-order-modal .product-order").length > 1){
            $(e).parents(".product-order").find(".product-image").attr("src", "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif");
            $.ajax({
                type: "post",
                url: "./removeDetailOrder",
                data: { id: id },
                dataType: "json",
                success: function (response) {
                    if (response == 1) {
                        $(e).parents(".product-order").find(".product-image").attr("src", "https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif");
                        setTimeout(() => {
                            $(e).parents(".product-order").remove();
                        }, 1500);
                    }
                    else {
                        $(e).parents(".product-order").find(".product-image").attr("src", "https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif");
                        setTimeout(() => {
                            $(e).parents(".product-order").find(".product-image").attr("src", image);
                        }, 1500);
                    }
                }
            });
        }
    }
}

function WriteTableNumber(e) {
    let tableNumbers = "";
    let count = 0;
    tableNumbers = tableNumbers.replaceAll("#", "");
    $('.table-number').each(function (i, obj) {
        tableNumbers += $(obj).text().replaceAll(",", "");
    });
    $('#input-table input').each(function (i, obj) {
        if (Number($(e).val()) == Number($(obj).val())) {
            count += 1;
        }
    });
    if (count == 2 || tableNumbers.split("#").includes(String($(e).val()).padStart(2, '0')))
        $(e).val("");
}

function AddOrderElementOnTab(response) {
    let tableNumber = response.table_number.split(",");
    tableNumber.forEach((element, index) => {
        tableNumber[index] = "#" + String(element).padStart(2, '0');
    });
    return `
        <div class="order" id="order-`+ response.id + `">
            <div onclick="OpenOrderTab(`+ response.id + `)">
                <p class="table-number">`+ tableNumber.toString() + `</p>
                <p class="order-text">Thời gian: `+ new Date(response.updated_at).toLocaleString() + `</p>
                <p class="order-text">Tạo hoặc cập nhật: `+ response.updater + `</p>
                <p class="order-text">Ghi chú:</p>
                <textarea readonly class="order-note">`+ response.note + `</textarea>
            </div>
            <button class="btn" onclick="OpenPay(`+ response.id + `)">Thanh toán</button>
            <i class="fa-solid fa-trash" onclick="RemoveOrder(this, `+ response.id + `)"></i>
            <div class="load-icon-container">
                <img src="https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif" alt="icon">
            </div>
        </div>
    `;
}

function Pay(id, time) {
    $.ajax({
        type: "post",
        url: "./payOrder",
        data: {id: id, time: time},
        dataType: "json",
        success: function (response) {
            if(response == 1){
                window.print();
                ClosePay();
                $("#order-" + id).remove();
            }
        }
    });
}

function OpenPay(id) {
    $("#tab-pay-order").attr("style", "display: flex");
    $.ajax({
        type: "post",
        url: "./getOrder",
        data: {id: id},
        dataType: "json",
        success: function (response) {
            let totalMoney = 0;
            $(".body-table-pay-order-item").remove();
            $("#body-pay-order-info").find("p").eq(0).text("Mã đơn: " + response[0].code);
            $("#body-pay-order-info").find("p").eq(1).text((response[0].table_number.search("TA") == -1) ? "Số bàn: " + response[0].table_number : "Loại đơn: Khách mang về");
            $("#body-pay-order-info").find("p").eq(2).text("Ghi chú: " + response[0].note);
            $("#body-pay-order-info").find("p").eq(3).text("Giờ vào: " + new Date(response[0].created_at).toLocaleString());
            $("#body-pay-order-info").find("p").eq(4).text("Giờ ra: " + new Date().toLocaleString());
            $("#body-pay-order-info").find("p").eq(5).text("Nhân viên: " + response[0].updater);
            $("#pay-order-button").find("button").eq(1).attr("onclick", "Pay("+ id +", '"+ new Date().toLocaleString() +"')");
            response.forEach((element, index) => {
                totalMoney += element.price * element.quantity;
                $("#body-table-pay-order").append(`
                    <div class="body-table-pay-order-item">
                        <p>`+ element.name +`<br>`+ new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(element.price) +`đ</p>
                        <div class="body-table-pay-order-quantity">
                            <p>`+ element.quantity +`</p>
                        </div>
                    </div>
                `);
                $("#footer-table-pay-order").find("p").eq(1).text(new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(totalMoney) + "đ");
            });
        }
    });
}

function ClosePay() {
    $("#tab-pay-order").attr("style", "display: none");
}

function RemoveOrder(e, id) {
    $(e).parents(".order").find(".load-icon-container").attr("style", "display: flex");
    $.ajax({
        type: "post",
        url: "./removeOrder",
        data: {id: id},
        dataType: "json",
        success: function (response) {
            if(response == 1){
                $(e).parents(".order").find(".load-icon-container img").attr("src", "https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif");
                setTimeout(() => {
                    $(e).parents(".order").remove();
                    if($(".order").length == 0)
                        $(".emty-icon-container").attr("style", "display: flex");
                }, 1500);
            }
            else{
                $(e).parents(".order").find(".load-icon-container img").attr("src", "https://i.redd.it/he0qua80qrn91.gif");
                setTimeout(() => {
                    $(e).parents(".order").find(".load-icon-container img").attr("src", "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif");
                    $(e).parents(".order").find(".load-icon-container").attr("style", "display: none");
                }, 1500);
            }
        }
    });
}

function UpdateOrder(id) {
    if ($("#product-in-order-modal .product-order").length != 0) {
        let dataProduct = new Array();
        let dataTable = new Array();
        $('#product-in-order-modal .product-order').each(function (i, obj) {
            dataProduct.push({ id: $(obj).attr("id").replace("product-order-", ""), quantity: $(obj).find(".quantity-product-order-container input").val() });
        });
        $('#input-table input').each(function (i, obj) {
            if ($(obj).val() != "")
                dataTable.push($(obj).val());
        });
        $("#body-tab-order .emty-icon-container").attr("style", "display: none");
        $("#load-add-order-modal").attr("style", "display: flex");
        $(".body-modal-add-product-to-order").attr("style", "display: none");
        $.ajax({
            type: "post",
            url: "./updateOrder",
            data: { "id": id, "products": dataProduct, "tables": dataTable, "note": $("#order-note-add").val() },
            dataType: "json",
            success: function (response) {
                if (response == 0) {
                    $("#load-add-order-modal").find("img").attr("src", "https://i.redd.it/he0qua80qrn91.gif");
                    setTimeout(() => {
                        $(".body-modal-add-product-to-order").attr("style", "display: grid");
                        $("#load-add-order-modal").find("img").attr("src", "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif");
                        $("#load-add-order-modal").attr("style", "display: none");
                    }, 2000);
                }
                else {
                    let tableNumber = response.table_number.split(",");
                    tableNumber.forEach((element, index) => {
                        tableNumber[index] = "#" + String(element).padStart(2, '0');
                    });
                    $("#load-add-order-modal").find("img").attr("src", "https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif");
                    setTimeout(() => {
                        $('#input-table input').not(':first').remove();
                        $('#input-table input').val("");
                        $(".body-modal-add-product-to-order").attr("style", "display: grid");
                        $("#load-add-order-modal").find("img").attr("src", "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif");
                        $("#product-in-order-modal .product-order").remove();
                        $("#load-add-order-modal").attr("style", "display: none");
                        $("#emty-icon-order-container").attr("style", "display: flex");
                        $("#modal-add-product-to-order").attr("style", "display: none");
                        $("#order-" + response.id).find("p").eq(0).text(tableNumber.toString());
                        $("#order-" + response.id).find("p").eq(1).text("Thời gian: " + new Date(response.updated_at).toLocaleString());
                        $("#order-" + response.id).find("p").eq(2).text("Tạo hoặc cập nhật: " + response.updater);
                        $("#order-" + response.id).find("textarea").text(response.note);
                    }, 2000);
                }
            }
        });
    }
}

function AddOrder() {
    if ($("#product-in-order-modal .product-order").length != 0) {
        let dataProduct = new Array();
        let dataTable = new Array();
        $('#product-in-order-modal .product-order').each(function (i, obj) {
            dataProduct.push({ id: $(obj).attr("id").replace("product-order-", ""), quantity: $(obj).find(".quantity-product-order-container input").val() });
        });
        $('#input-table input').each(function (i, obj) {
            if ($(obj).val() != "")
                dataTable.push($(obj).val());
        });
        $("#body-tab-order .emty-icon-container").attr("style", "display: none");
        $("#load-add-order-modal").attr("style", "display: flex");
        $(".body-modal-add-product-to-order").attr("style", "display: none");
        $.ajax({
            type: "post",
            url: "./addOrder",
            data: { "products": dataProduct, "tables": dataTable, "note": $("#order-note-add").val() },
            dataType: "json",
            success: function (response) {
                console.log(response);
                if (response == 0) {
                    $("#load-add-order-modal").find("img").attr("src", "https://i.redd.it/he0qua80qrn91.gif");
                    setTimeout(() => {
                        $(".body-modal-add-product-to-order").attr("style", "display: grid");
                        $("#load-add-order-modal").find("img").attr("src", "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif");
                        $("#load-add-order-modal").attr("style", "display: none");
                    }, 2000);
                }
                else {
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
}

function SearchProductAddOrder(e) {
    let countProductSearchOrder = true;
    $('#product-to-order-footer-modal .product-order').each(function (i, obj) {
        if ($(obj).find(".name-product-order").text().toLowerCase().search($(e).val().toLowerCase()) != -1) {
            $(obj).attr("style", "display: flex");
            countProductSearchOrder = false;
        }
        else
            $(obj).attr("style", "display: none");
    });
    if (countProductSearchOrder) {
        $("#load-product-in-order-modal").find("img").attr("src", "https://assets-v2.lottiefiles.com/a/a4c7388c-1150-11ee-a0fa-4b9598be54ec/oceXQL7dcr.gif");
        $("#load-product-in-order-modal").attr("style", "display: flex");
    }
    else {
        $("#load-product-in-order-modal").attr("style", "display: none");
        $("#load-product-in-order-modal").find("img").attr("src", "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif");
    }
}

$("#keyword").keyup(function (event) {
    if (event.keyCode === 13) {
        SearchOrder();
    }
});

function SearchOrder() {
    $(".load-icon-container").attr("style", "display: flex");
    $(".emty-icon-container").attr("style", "display: none");
    $("#body-tab-order").find(".order").remove();
    $.ajax({
        type: "post",
        url: "./searchOrder",
        data: {keyword: $("#keyword").val()},
        dataType: "json",
        success: function (response) {
            $(".load-icon-container").attr("style", "display: none");
            if (response.length == 0) {
                $(".emty-icon-container").attr("style", "display: flex");
            }
            else {
                $("#body-tab-order").attr("style", "height: auto");
                $.map(response, function (element) {
                    $("#body-tab-order").prepend(AddOrderElementOnTab(element));
                });
            }
        }
    });
}

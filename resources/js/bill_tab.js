function AddBillElementOnTab(response) {
    return `
        <div class="bill" id="bill-`+ response.id + `">
            <div onclick="OpenDetailBill(`+ response.id + `)">
                <p class="bill-number">#`+ response.code + `</p>
                <p class="bill-text">Thời gian: `+ new Date(response.updated_at).toLocaleString() + `</p>
                <p class="bill-text">Thanh toán: `+ response.updater + `</p>
                <p class="bill-text">Ghi chú:</p>
                <textarea readonly class="bill-note">`+ response.note + `</textarea>
            </div>
        </div>
    `;
}

$("#keyword_bill").keyup(function (event) {
    if (event.keyCode === 13) {
        getData(localStorage.getItem("tab"), 1);
    }
});

function SearchBill() {
    getData(localStorage.getItem("tab"), 1);
}

function OpenDetailBill(id) {
    $("#tab-bill-detail").attr("style", "display: flex");
    $("#bill-load-section-to-print-container").attr("style", "display: flex");
    $("#bill-section-to-print").attr("style", "display: none");
    $("#bill-pay-button").attr("style", "display: none");
    $.ajax({
        type: "post",
        url: "./getOrder",
        data: {id: id, status: 1},
        dataType: "json",
        success: function (response) {
            if(response != 2){
                $("#bill-load-section-to-print-container").attr("style", "display: none");
                $("#bill-section-to-print").attr("style", "display: flex");
                $("#bill-pay-button").attr("style", "display: flex");
                let totalMoney = 0;
                $(".body-table-pay-bill-item").remove();
                $("#bill-body-pay-info").find("p").eq(0).text("Mã đơn: " + response[0].code);
                $("#bill-body-pay-info").find("p").eq(1).text((response[0].table_number.search("TA") == -1) ? "Số bàn: " + response[0].table_number : "Loại đơn: Khách mang về");
                $("#bill-body-pay-info").find("p").eq(2).text("Ghi chú: " + response[0].note);
                $("#bill-body-pay-info").find("p").eq(3).text("Giờ vào: " + new Date(response[0].created_at).toLocaleString());
                $("#bill-body-pay-info").find("p").eq(4).text("Giờ ra: " + new Date().toLocaleString());
                $("#bill-body-pay-info").find("p").eq(5).text("Nhân viên: " + response[0].updater);
                response.forEach((element, index) => {
                    totalMoney += element.price * element.quantity;
                    $("#bill-body-table-pay").append(`
                        <div class="body-table-pay-bill-item">
                            <p>`+ element.name +`<br>`+ new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(element.price) +`đ</p>
                            <div class="body-table-pay-order-quantity">
                                <p>`+ element.quantity +`</p>
                            </div>
                        </div>
                    `);
                });
                $("#bill-footer-table-pay").find("p").eq(1).text(new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(totalMoney) + "đ");
                $("#bill-footer-table-pay-text").find("p").eq(1).text(MoneyText(String(totalMoney)));
            }
            else{
                $("#bill-load-section-to-print-container").find("img").attr("src", "https://i.redd.it/he0qua80qrn91.gif");
                setTimeout(() => {
                    $("#bill-load-section-to-print-container").attr("style", "display: none");
                    $("#bill-load-section-to-print-container").find("img").attr("src", "https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif");
                    CloseDetailBill();
                }, 1500);
            }
        }
    });
}

function CloseDetailBill() {
    $("#tab-bill-detail").attr("style", "display: none");
}
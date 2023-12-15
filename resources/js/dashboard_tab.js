function ChangeStatisticalDate(e) {
    if($(e).val() != "" && new Date($("#dateStatisticalForm").val()) <= new Date($("#dateStatisticalTo").val())){
        $("#productQuantity").text("...");
        $("#orderQuantity").text("...");
        $("#billQuantity").text("...");
        $("#revenue").text("...");
        $.ajax({
            type: "post",
            url: "./statistical",
            data: {dateFrom: $("#dateStatisticalForm").val(), dateTo: $("#dateStatisticalTo").val()},
            dataType: "json",
            success: function (response) {
                $("#productQuantity").text(String(response.productQuantity).padStart(2, '0'));
                $("#orderQuantity").text(String(response.orderQuantity).padStart(2, '0'));
                $("#billQuantity").text(String(response.billQuantity).padStart(2, '0'));
                $("#revenue").text((response.revenue / 1000 > 1) ? response.revenue / 1000 + "K" : String(response.revenue).padStart(2, '0'));
            }
        });
    }
    else{
        let now = new Date().toLocaleDateString().split("/");
        $("#dateStatisticalForm").val(now[2] + "-" + now[1] + "-" + now[0]);
        $("#dateStatisticalTo").val(now[2] + "-" + now[1] + "-" + now[0]);
    }
}

function ChangeRevenueDate(e) {
    if($(e).val() != "" && $(e).val().length == 4){
        $.ajax({
            type: "post",
            url: "./revenue",
            data: {year: $(e).val()},
            dataType: "json",
            success: function (response) {
                let tableRevenue = new Array(12).fill(0);
                $.map(response, function (element) {
                    tableRevenue[Number(element.month) - 1] = element.money;
                });
                chart.data.datasets[0].data = tableRevenue;
                chart.update();
            }
        });
    }
    else{
        let now = new Date().toLocaleDateString().split("/");
        $(e).val(now[2]);
    }
}
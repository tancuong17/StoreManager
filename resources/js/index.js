$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

function preventBack() {
  window.history.forward();
}

setTimeout("preventBack()", 0);

window.onunload = function () { null };

$.ajax({
  type: "get",
  url: "./loggedCheck",
  dataType: "json",
  success: function (response) {
    if (response == 0) {
      window.location.href = "./login";
    }
    else {
      $("#user-image").attr("src", response.image);
      $("#user-name").text(response.name);
      $("#user-position").text(response.position);
    }
  }
});

const ctx = document.getElementById('myChart');
const chart = new Chart(ctx, {
  type: 'bar',
  responsive: true,
  data: {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [{
      label: 'Doanh thu',
      data: new Array(12).fill(0),
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        ticks: { callback : function(value) { return (value < 1000000) ? value/1000 + 'K' : value/1000000 + 'M'; } }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.formattedValue}K`
        }
      },
      datalabels: {
        formatter: function(context) {
          return context + "k";
        }
      },
    }
  }
});

OpenTab((localStorage.getItem("tab")) ? localStorage.getItem("tab") : 0, (localStorage.getItem("page")) ? localStorage.getItem("page") : 1);

function OpenTab(tab, page = 1) {
  $(".icon-container").removeClass("icon-active");
  $(".icon-container").eq(tab).addClass("icon-active");
  $(".tab").removeClass("tab-active");
  $(".tab").eq(tab).addClass("tab-active");
  localStorage.setItem("tab", tab);
  getData(tab, page);
  localStorage.setItem("page", page);
  $(".tab").eq(tab).find(".footer-tab").eq(0).find("input").eq(0).val(page);
}

function ChangePage(tab, e) {
  if($(e).val() > 0 && $(e).val() <= Number($(".tab").eq(tab).find(".footer-tab").eq(0).find("p").eq(0).text().replace("Tổng số trang: ", "")))
    getData(tab, $(e).val());
  else
    $(e).val((localStorage.getItem("page") ? localStorage.getItem("page") : 1));
}

function getData(tab, page) {
  $(".load-icon-container").attr("style", "display: flex");
  $(".emty-icon-container").attr("style", "display: none");
  $("#body-tab-product").attr("style", "height: calc(100vh - 9rem)");
  let url = "";
  if (tab == 1) {
    $("#body-tab-product").find(".product-container").remove();
    if($("#keyword_product").val().length != 0)
      url = "./searchProducts/" + page + "/" + $("#keyword_product").val();
    else
      url = "./getProducts/" + page + "/";
  }
  else if (tab == 2) {
    $("#body-tab-order").find(".order").remove();
    if($("#keyword_order").val().length != 0)
      url = "./searchOrders/0/" + page + "/" + $("#keyword_order").val();
    else
      url = "./getOrders/0/" + page;
  }
  else if (tab == 3) {
    $("#body-tab-bill").find(".bill").remove();
    if($("#keyword_bill").val().length != 0)
      url = "./searchOrders/1/" + page + "/" + $("#keyword_bill").val();
    else
      url = "./getOrders/1/" + page;
  }
  else if (tab == 0) {
    url = "./dashboard";
  }
  $.ajax({
    type: "get",
    url: url,
    dataType: "json",
    success: function (response) {
      if (tab == 1) {
        $(".load-icon-container").attr("style", "display: none");
        if (response == 0) {
          $(".emty-icon-container").attr("style", "display: flex");
        }
        else {
          $("#body-tab-product").attr("style", "height: auto");
          $.map(response.data, function (element) {
            $("#body-tab-product").prepend(AddProductElementOnTab(element));
          });
          $("#footer-product-tab").find("p").eq(0).text("Tổng số trang: " + response.quantity);
        }
      }
      else if (tab == 2) {
        $(".load-icon-container").attr("style", "display: none");
        if (response == 0) {
          $(".emty-icon-container").attr("style", "display: flex");
        }
        else {
          $("#body-tab-order").attr("style", "height: auto");
          $.map(response.data, function (element) {
            $("#body-tab-order").prepend(AddOrderElementOnTab(element));
          });
          $("#footer-order-tab").find("p").eq(0).text("Tổng số trang: " + response.quantity);
        }
      }
      else if (tab == 3) {
        $(".load-icon-container").attr("style", "display: none");
        if (response == 0) {
          $(".emty-icon-container").attr("style", "display: flex");
        }
        else {
          $("#body-tab-bill").attr("style", "height: auto");
          $.map(response.data, function (element) {
            $("#body-tab-bill").prepend(AddBillElementOnTab(element));
          });
          $("#footer-order-bill").find("p").eq(0).text("Tổng số trang: " + response.quantity);
        }
      }
      else if (tab == 0) {
        let tableRevenue = new Array(12).fill(0);
        $.map(response.tableRevenue, function (element) {
            tableRevenue[Number(element.month) - 1] = element.money;
        });
        chart.data.datasets[0].data = tableRevenue;
        chart.update();
        $("#productQuantity").text(String(response.productQuantity).padStart(2, '0'));
        $("#orderQuantity").text(String(response.orderQuantity).padStart(2, '0'));
        $("#billQuantity").text(String(response.billQuantity).padStart(2, '0'));
        $("#revenue").text((response.revenue / 1000 > 1) ? response.revenue / 1000 + "K" : response.revenue);
      }
    }
  });
}

function OpenMenu() {
  $("#menu-container").attr("style", "display: flex");
}

function CloseMenu() {
  $("#menu-container").attr("style", "display: none");
}

function Resize() {
  if (window.innerWidth > 600)
    OpenMenu();
  else
    CloseMenu();
}
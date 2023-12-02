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
  if (tab == 1) {
    $("#body-tab-product").find(".product-container").remove();
    url = "./getProducts";
  }
  else if (tab == 2) {
    $("#body-tab-order").find(".order").remove();
    url = "./getOrders";
  }
  $.ajax({
    type: "get",
    url: url,
    dataType: "json",
    success: function (response) {
      if (tab == 1) {
        $(".load-icon-container").attr("style", "display: none");
        if (response.length == 0) {
          $(".emty-icon-container").attr("style", "display: flex");
        }
        else {
          $("#body-tab-product").attr("style", "height: auto");
          $.map(response, function (element) {
            $("#body-tab-product").prepend(AddProductElementOnTab(element));
          });
        }
      }
      else if (tab == 2) {
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
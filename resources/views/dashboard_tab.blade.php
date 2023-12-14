<div class="tab tab-active" id="tab-dashboard">
    <div id="header-box-dashboard">
      <p>#Thống kê cửa hàng</p>
      <input type="date" value="<?php echo date("Y-m-d"); ?>" max="<?php echo date("Y-m-d"); ?>" onblur="ChangeStatisticalDate(this)"/>
    </div>
    <div id="box-conatainer">
      <div class="box">
        <img src="https://cdn-icons-png.flaticon.com/128/6626/6626968.png" alt="logo"/>
        <div>
          <p id="productQuantity"></p>
          <p>Đồ uống/Đồ ăn</p>
        </div>
      </div>
      <div class="box">
        <img src="https://cdn-icons-png.flaticon.com/128/9425/9425881.png" alt="logo"/>
        <div>
          <p id="orderQuantity"></p>
          <p>Đơn hàng</p>
        </div>
      </div>
      <div class="box">
        <img src="https://cdn-icons-png.flaticon.com/512/4250/4250183.png" alt="logo"/>
        <div>
          <p id="billQuantity"></p>
          <p>Hóa đơn</p>
        </div>
      </div>
      <div class="box">
        <img src="https://cdn-icons-png.flaticon.com/128/2474/2474495.png" alt="logo"/>
        <div>
          <p id="revenue"></p>
          <p>Doanh thu</p>
        </div>
      </div>
    </div>
    <div style="width: 100%;">
      <div id="header-chart">
        <p>#Doanh thu cửa hàng</p>
        <input type="number" maxlength="4" value="<?php echo date("Y"); ?>" onblur="ChangeRevenueDate(this)">
      </div>
      <canvas style="width: 100%;" id="myChart"></canvas>
    </div>
</div>
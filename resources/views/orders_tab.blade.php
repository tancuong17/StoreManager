<div class="tab" id="tab-order">
    <div class="header-tab">
      <p>Đơn hàng</p>
      <div class="header-div">
        <div class="search-container">
          <input placeholder="Bạn muốn tìm..." class="search-input" id="keyword_order"/>
          <img onclick="SearchOrder()" class="icon" src="https://cdn-icons-png.flaticon.com/128/2330/2330104.png" alt="icon">
        </div>
        <button class="btn" onclick="OpenOrderTab(null)">
          <p>Thêm mới</p>
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
    <div class="body-tab" id="body-tab-order">
      <div class="load-icon-container">
        <img src="https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif" alt="icon">
      </div>
      <div class="emty-icon-container">
        <img src="https://assets-v2.lottiefiles.com/a/a4c7388c-1150-11ee-a0fa-4b9598be54ec/oceXQL7dcr.gif" alt="icon">
      </div>
    </div>
    <div class="footer-tab" id="footer-order-tab">
      <p></p>
      <div>
        <p>Trang hiện tại:</p>
        <input value="1" onchange="ChangePage(2, this)"/>
      </div>
    </div>
</div>
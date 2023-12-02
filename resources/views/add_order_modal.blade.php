<section id="modal-add-product-to-order">
    <div class="background-modal" onclick="CloseModalAddProductToOrder()">alo</div>
    <div id="form-add-product-to-order">
      <div class="load-product-modal" id="load-add-order-modal">
        <img src="https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif" alt="product"/>
      </div>
      <div class="header-modal">
        <p>Tạo đơn hàng</p>
        <img onclick="CloseModalAddProductToOrder()" class="icon" src="https://cdn-icons-png.flaticon.com/128/2997/2997911.png" alt="icon"/>
      </div>
      <div class="body-modal-add-product-to-order">
        <div id="list-add-product-to-order">
          <div style="padding-right: 0.5rem;">
          <div class="search-container" id="search-container-product-to-order">
            <input placeholder="Tên sản phẩm..." class="search-input"/>
            <img class="icon" src="https://cdn-icons-png.flaticon.com/128/2330/2330104.png" alt="icon">
          </div>
        </div>
          <div id="product-to-order-footer-modal">
            <div class="load-product-modal" id="load-product-in-order-modal">
              <img src="https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif" alt="product"/>
            </div>
          </div>
        </div>
        <div id="order-content">
          <div id="info-order">
            <div id="number-table">
              <p>Số bàn:</p>
              <div id="input-table">
                <input onchange="WriteTableNumber(this)"/>
                <img onclick="AddInputTable()" class="icon" src="https://cdn-icons-png.flaticon.com/128/12597/12597351.png" alt="icon"/>
              </div>
            </div>
            <p>Ghi chú:</p>
            <textarea id="order-note-add"></textarea>
          </div>
          <div id="product-in-order-modal">
            <div id="emty-icon-order-container">
              <img src="https://assets-v2.lottiefiles.com/a/a4c7388c-1150-11ee-a0fa-4b9598be54ec/oceXQL7dcr.gif" alt="icon">
            </div>
          </div>
          <div class="total-money-order">
            <button class="btn" id="add-submit-btn" onclick="AddOrder()">Hoàn tất</button>
          </div>
        </div>
      </div>
    </div>
  </section>
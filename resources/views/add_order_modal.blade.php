<section id="modal-add-product-to-order">
    <div class="background-modal" onclick="CloseModalAddProductToOrder()">alo</div>
    <div id="form-add-product-to-order">
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
            <div class="product-order">
              <div class="info-container">
                <img class="product-image" src="https://gongcha.com.vn/wp-content/uploads/2022/06/Tra-sua-tran-chau-HK.png" alt="product"/>
                <div>
                  <p>Trà sữa kiwi</p>
                  <p>25.000đ</p>
                </div>
              </div>
              <div class="quantity-product-order-container">
                <button class="btn">Thêm</button>
              </div>
            </div>
          </div>
        </div>
        <div id="order-content">
          <div id="info-order">
            <div id="number-table">
              <p>Số bàn:</p>
              <div id="input-table">
                <input />
                <img onclick="AddInputTable()" class="icon" src="https://cdn-icons-png.flaticon.com/128/12597/12597351.png" alt="icon"/>
              </div>
            </div>
            <p>Ghi chú:</p>
            <textarea id="order-note-add"></textarea>
          </div>
          <div id="product-in-order-modal">
            <div class="product-order">
              <div class="info-container">
                <img class="product-image" src="https://gongcha.com.vn/wp-content/uploads/2022/06/Tra-sua-tran-chau-HK.png" alt="product"/>
                <div>
                  <p>Trà sữa kiwi</p>
                  <p>25.000đ</p>
                </div>
              </div>
              <div class="quantity-product-order-container">
                <input value="1"/>
                <img class="icon" src="https://cdn-icons-png.flaticon.com/128/11890/11890341.png" alt="icon">
              </div>
            </div>
          </div>
          <div class="total-money-order">
            <button class="btn" id="add-submit-btn">Hoàn tất</button>
          </div>
        </div>
      </div>
    </div>
  </section>
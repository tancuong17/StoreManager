<section id="modal-detail-product">
    <div class="background-modal" onclick="CloseModalProductDetail()"></div>
    <div id="form-detail-product">
      <div class="header-modal">
        <p>Chi tiết sản phẩm</p>
        <img onclick="CloseModalProductDetail()" class="icon" src="https://cdn-icons-png.flaticon.com/128/2997/2997911.png" alt="icon"/>
      </div>
      <div class="body-modal">
        <label for="image-upload-detail-input">
          <img id="image-detail-upload" src="https://static.thenounproject.com/png/104062-200.png" alt="product"/>
        </label>
        <input id="image-upload-detail-input" type="file" accept="image/*"/>
        <input readonly id="name-detail" class="product-input" placeholder="Tên sản phẩm..."/>
        <input readonly id="price-detail" class="product-input" placeholder="Giá sản phẩm..."/>
      </div>
      <div class="footer-modal">
        <p id="updated_date">...</p>
        <p id="updater">...</p>
      </div>
    </div>
</section>
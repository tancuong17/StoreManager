<section id="modal-edit-product">
    <div class="background-modal" onclick="CloseModalUpdateProduct()"></div>
    <div id="form-edit-product">
      <div class="header-modal">
        <p>Cập nhật sản phẩm</p>
        <img onclick="CloseModalUpdateProduct()" class="icon" src="https://cdn-icons-png.flaticon.com/128/2997/2997911.png" alt="icon"/>
      </div>
      <div class="body-modal">
        <div id="notification-edit-product">
          <p></p>
          <img/>
        </div>
        <label for="image-upload-edit-input">
          <img id="image-edit-upload" src="https://static.thenounproject.com/png/104062-200.png" alt="product"/>
        </label>
        <input id="image-upload-edit-input" type="file" accept="image/*"/>
        <input id="name-edit" class="product-input" placeholder="Tên sản phẩm..."/>
        <input id="price-edit" class="product-input" placeholder="Giá sản phẩm..."/>
      </div>
      <div class="footer-modal">
        <button id="btn-update-product">Cập nhật</button>
      </div>
    </div>
</section>
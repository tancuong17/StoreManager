<section id="modal-add-product">
    <div class="background-modal" onclick="CloseModalAddProduct()"></div>
    <div id="form-add-product">
      <div class="load-product-modal" id="load-add-product-modal">
        <img src="https://cdn.dribbble.com/users/2882885/screenshots/7861928/media/a4c4da396c3da907e7ed9dd0b55e5031.gif" alt="product"/>
      </div>
      <div class="success-product-modal" id="success-add-product-modal">
        <img src="https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif" alt="product"/>
      </div>
      <div class="header-modal">
        <p>Thêm sản phẩm</p>
        <img onclick="CloseModalAddProduct()" class="icon" src="https://cdn-icons-png.flaticon.com/128/2997/2997911.png" alt="icon"/>
      </div>
      <div class="body-modal">
        <div id="notification-product">
          <p></p>
          <img/>
        </div>
        <label for="image-upload-add-input">
          <img id="image-add-upload" src="https://static.thenounproject.com/png/104062-200.png" alt="product"/>
        </label>
        <input id="image-upload-add-input" type="file" accept="image/*"/>
        <input id="name" class="product-input" placeholder="Tên sản phẩm..."/>
        <input id="price" class="product-input" placeholder="Giá sản phẩm..."/>
      </div>
      <div class="footer-modal">
        <button onclick="AddProduct()">Thêm</button>
      </div>
    </div>
</section>
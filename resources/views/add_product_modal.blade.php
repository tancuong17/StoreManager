<section id="modal-add-product">
    <div class="background-modal" onclick="CloseModalAddProduct()"></div>
    <div id="form-add-product">
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
        <input id="name" class="add-product-input" placeholder="Tên sản phẩm..."/>
        <input id="price" class="add-product-input" placeholder="Giá sản phẩm..."/>
      </div>
      <div class="footer-modal">
        <button onclick="AddProduct()">Thêm sản phẩm</button>
      </div>
    </div>
</section>
<section id="menu-container">
    <img id="logo" src="https://i.pinimg.com/originals/c3/2c/4a/c32c4a1691437b455a972b454005eba2.jpg" alt="logo"/>
    <div id="menu-items">
      <div class="icon-container icon-active" onclick="OpenTab(0)">
        <img class="icon" src="https://cdn-icons-png.flaticon.com/128/4725/4725681.png" alt="logo"/>
        <p>Dashboard</p>
      </div>
      <div class="icon-container" onclick="OpenTab(1)">
        <img class="icon" src="https://cdn-icons-png.flaticon.com/128/6626/6626968.png" alt="logo"/>
        <p>Sản phẩm</p>
      </div>
      <div class="icon-container" onclick="OpenTab(2)">
        <img class="icon" src="https://cdn-icons-png.flaticon.com/128/9425/9425881.png" alt="logo"/>
        <p>Đơn hàng</p>
      </div>
      <div class="icon-container" onclick="OpenTab(3)">
        <img class="icon" src="https://cdn-icons-png.flaticon.com/512/4250/4250183.png" alt="logo"/>
        <p>Hóa đơn</p>
      </div>
    </div>
    <a href="{{ URL::asset('/logout') }}" class="icon-container">
      <img class="icon" src="https://cdn-icons-png.flaticon.com/512/339/339737.png" alt="logo"/>
      <p>Đăng xuất</p>
    </a>
    <i onclick="CloseMenu()" id="close-menu" class="fa-solid fa-x"></i>
</section>
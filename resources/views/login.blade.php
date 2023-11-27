<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <title>Đăng nhập</title>
    <link rel="stylesheet" href="{{ URL::asset('resources/css/login.css') }}">
    <link rel="shortcut icon" href="https://i.pinimg.com/originals/c3/2c/4a/c32c4a1691437b455a972b454005eba2.jpg">
</head>
<body>
    <section id="login-container">
        <form action="{{ url('/logincheck') }}" method="POST" id="login-form">
            {{ csrf_field() }}
            <img id="logo" src="https://i.pinimg.com/originals/c3/2c/4a/c32c4a1691437b455a972b454005eba2.jpg" alt="logo"/>
            <input name="username" placeholder="Mã nhân viên..."/>
            <input name="password" type="password" placeholder="Mật khẩu..."/>
            <button type="submit">Đăng nhập</button>
        </form>
    </section>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script>
    function preventBack(){window.history.forward();}
    setTimeout("preventBack()", 0);
    window.onunload=function(){null};
    $.ajax({
        type: "get",
        url: "./loggedCheck",
        dataType: "json",
        success: function (response) {
            if (response == 1) {
                window.location.href = "./";
            }
        }
    });
</script>
</html>
import { getCookie } from "./cookie.js";

const eleHeaderAuth = $('header .header__auth')


const userID = getCookie('uid')


if (userID) {
    $.ajax({
        url: `http://localhost:8000/api/v1/user/${userID}`,
        method: "GET",
        contentType: "application/json",
        success: function (response) {
            const { name } = response[0]
            eleHeaderAuth.html(`
                <div class="header__auth-nameuser">
                    <span class="header__auth-nameuser-text">
                        ${name}
                    </span>
                    <span 
                        class="logout__icon" 
                        onclick="
                            document.cookie = 'uid' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
                            document.cookie = 'accessToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
                            document.cookie = 'refreshToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; 
                            location.reload()">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </span>
                     <ul class="header__auth-content">
                            <li><a href="user-ticket.html">Vé Của Bạn</a></li>
                    </ul>
                </div>`)
        },
        error: function (xhr, status, error) {
            eleHeaderAuth.html(`<div class="header__auth-user-icon">
                        <i class="fa-solid fa-user"></i>
                         <ul class="header__auth-content">
                            <li><a href="login.html">Đăng Nhập</a></li>
                            <li><a href="register.html">Đăng Ký</a></li>
                        </ul>
                    </div>`)
        }
    })
} else {
    eleHeaderAuth.html(`<div class="header__auth-user-icon">
                        <i class="fa-solid fa-user"></i>
                         <ul class="header__auth-content">
                            <li><a href="login.html">Đăng Nhập</a></li>
                            <li><a href="register.html">Đăng Ký</a></li>
                        </ul>
                    </div>`)
}

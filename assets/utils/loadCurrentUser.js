import { getCookie } from "./cookieMethods.js";

const userID = getCookie('uid')

const eleHeaderAuth = $('header .header__auth')

const renderHTML = (data) => {
    let html = `<div class="header__auth-user-icon">
                        <i class="fa-solid fa-user"></i>
                         <ul class="header__auth-content">
                            <li><a href="login.html">Đăng Nhập</a></li>
                            <li><a href="register.html">Đăng Ký</a></li>
                        </ul>
                </div>`
    if (data) {
        const { name } = data
        html = `<div class="header__auth-nameuser">
                    <span class="header__auth-nameuser-text">
                        ${name}
                    </span>
                    <span class="logout__icon">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </span>
                     <ul class="header__auth-content">
                            <li><a href="user-ticket.html">Vé Của Bạn</a></li>
                    </ul>
                </div>`

    }
    eleHeaderAuth.html(html)
}

if (userID) {
    $.ajax({
        url: `http://localhost:8000/api/v1/user/${userID}`,
        method: "GET",
        contentType: "application/json",
        success: function (response) {
            renderHTML(response)
            // handle click logout
            $('.header__auth .header__auth-nameuser .logout__icon').on('click', function () {
                document.cookie = 'uid' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
                document.cookie = 'accessToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
                document.cookie = 'refreshToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                location.href = 'http://localhost:5500/index.html'
            })
        },
        error: function (xhr, status, error) {
            //Toast Message Error 
        }
    })

} else {
    renderHTML()
}

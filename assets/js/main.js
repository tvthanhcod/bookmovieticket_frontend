import { setCookie } from "../utils/cookie.js"
const login = () => {

    $('.loading').css("display", "flex")

    const accountUser = $('.login__box-form #form__username').val()
    const passwordUser = $('.login__box-form #form__password').val()

    if (!accountUser || !passwordUser) {
        alert("Missing fields")
        $('.loading').css("display", "none")
        return
    }

    $.ajax({
        url: "http://localhost:8000/api/v1/login",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            username: accountUser,
            password: passwordUser
        }),
        success: function (response) {
            setCookie('accessToken', response.accessToken, 1)
            setCookie('refreshToken', response.refreshToken, 1)
            setCookie('uid', response.uid, 1)
            $('.loading').css("display", "none")
            window.location.href = "http://localhost:5500/index.html"
        },
        error: function (xhr, status, error) {
            alert("Tài Khoản Hoặc Mật Khẩu Không Đúng. Vui Lòng Đăng Nhập Lại!!!")
            $('.loading').css("display", "none")
        }
    })
}

const register = () => {

    $('.loading').css("display", "flex")

    const fullName = $('.register__box-form #form__fullname').val().trim()
    const phoneNumber = $('.register__box-form #form__phonenumber').val().trim()
    const email = $('.register__box-form #form__email').val().trim()
    const userName = $('.register__box-form #form__username').val().trim()
    const password = $('.register__box-form #form__password').val().trim()

    if (!fullName || !phoneNumber || !email || !userName || !password) {
        alert("Missing fields")
        $('.loading').css("display", "none")
        return
    }

    $.ajax({
        url: "http://localhost:8000/api/v1/user/new",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            name: fullName,
            phone: phoneNumber,
            email: email,
            username: userName,
            password: password
        }),
        success: function (response) {
            response.message ? (
                $('.loading').css("display", "none"),
                window.location.href = '/login.html'
            ) : (
                $('.loading').css("display", "none"),
                alert("Đăng Ký Thất Bại!")
            )
        },
        error: function (xhr, status, error) {
            alert("Status Login: " + error)
        }
    })

}


$('.btn__login').on('click', () => {
    login()
})


$('.btn__register').on('click', () => {
    register()
})

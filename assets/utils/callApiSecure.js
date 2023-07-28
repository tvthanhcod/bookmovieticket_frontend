import { eraseCookie, getCookie, setCookie } from "./cookie.js"

const accessToken = getCookie("accessToken")
const refreshToken = getCookie("refreshToken")

const isValidAccessToken = (atk) => {
    const payload = atk.split(".")[1]
    const decodePayload = atob(payload)
    const expriesTimeAccesToken = JSON.parse(decodePayload).exp * 1000
    if (expriesTimeAccesToken > Date.now()) { return true } else { return false }

}

const newAccessToken = (refreshToken) => {
    return $.ajax({
        url: "http://localhost:8000/api/v1/refresh-token",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ refreshToken: refreshToken }),
        success: (response) => {
            const { accessToken } = response
            return accessToken
        },
        error: (xhr, status, error) => {
            return error
        }

    })
}

const callApiSecure = async (props) => {
    const { url, method, data = {} } = props
    if (!accessToken) {
        throw new Error("can't excute request because not accessToken exist")
    }
    if (isValidAccessToken(accessToken)) {
        return $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            data: data,
            success: (response) => {
                return response
            },

            error: (xhr, status, error) => {
                return error
            }
        })
    } else {
        const response = await newAccessToken(refreshToken)
        setCookie("accessToken", response.accessToken, 1)
        return $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            data: {},
            success: (response) => {
                return response
            },

            error: (xhr, status, error) => {
                return error
            }
        })
    }
}

export default callApiSecure
const Validate = (options) => {
    const selectorRules = {}
    const formElement = $(options.form)
    const handleError = (element, rule) => {
        let messageError
        let rules = selectorRules[rule.selector]
        for (let i = 0; i < rules.length; i++) {
            messageError = rules[i](element.val().trim())
            const formParrent = element.parent()
            if (messageError) {
                element.css('border', '2px solid #DB0000')
                formParrent.find('.error__label').css('display', 'flex')
                formParrent.find('.error__label').text(messageError)
                break
            } else {
                element.css('border', '2px solid transparent')
                formParrent.find('.error__label').css('display', 'none')
            }
        }
    }
    if (formElement) {
        options.rules.forEach(rule => {
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.resolve)
            } else {
                selectorRules[rule.selector] = [rule.resolve]
            }
            const inputElement = $(rule.selector)
            if (inputElement) {
                inputElement.on('blur', () => {
                    handleError(inputElement, rule)
                })
            }
        })
    }
}

Validate.isRequire = (selector) => {
    return {
        selector: selector,
        resolve: (value) => {
            return value ? undefined : "Vui Lòng Nhập Trường Này"
        }
    }
}


Validate.isValidPasswordLength = (selector) => {
    return {
        selector: selector,
        resolve: (value) => {
            return value && value.length >= 8 ? undefined : "Kí Tự của mật khẩu không đủ"
        }
    }
}

Validate.isEmail = (selector) => {

    return {
        selector: selector,
        resolve: (value) => {
            const result = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
            return value && result.test(value) ? undefined : "Không đúng định dạng email"
        }
    }
}

Validate.isPhoneNumber = (selector) => {
    return {
        selector: selector,
        resolve: (value) => {
            const result = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
            return value && result.test(value) ? undefined : "Không đúng định dạng số điện thoại"
        }
    }
}

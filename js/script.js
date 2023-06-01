// fuctions
const valid = (input, pattern) => {
    const valid = pattern.test(input.val())
    disabledSubmit()
    valid ? input.removeClass("error") : input.removeClass("filled")
    valid ? input.addClass("filled") : input.addClass("error")
    valid ? input.next().slideUp(200) : input.next().slideDown(200)
    return valid ? true : false
}

const disabledSubmit = () => {
    let disabledBtn = true
    inputs.forEach(el => {
        const valid = el.pattern.test(el.element.val())
        if (!valid) disabledBtn = false
    })
    formBtnSubmit.attr("disabled", disabledBtn ? false : true)
}

const inputBlur = (input, pattern) => {
    input.on('blur', () => valid(input, pattern))
}

const initializeTheForm = (callback) => {
    inputs.forEach(el => {
        callback(el.element, el.pattern)
    })
}

const submit = () => {
    formBtnSubmit.on('click', function (event) {
        event.preventDefault()
        let validation = true
        inputs.forEach(el => {
            const valid = el.pattern.test(el.element.val())
            if (!valid) validation = false
        })

        if (validation) {
            axios.post(`${formHttpsInput.val()}`, {})
                .then(function (response) {
                    // window.open("https://payproglobal.com/", "_self");
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

            window.open("https://payproglobal.com/", "_self");
        }
    })
}

// create variables

const formEmailInput = $('#form-email')
const formHttpsInput = $('#form-http')
const formBtnSubmit = $('#form-submit')
const inputs = [
    {
        element: formEmailInput,
        pattern: new RegExp(/^[a-zA-Z][a-z0-9]+@[a-z]+\.[a-z]{2,3}$/)
    },
    {
        element: formHttpsInput,
        pattern: new RegExp(/^https?:\/\/[a-z0-9]{0,30}$/)
    }]

// call functions once

initializeTheForm(inputBlur)
disabledSubmit()
submit()

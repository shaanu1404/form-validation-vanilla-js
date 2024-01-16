const form = document.querySelector('#form')
const resultBox = document.querySelector('#result')

function handleFormSubmit(e) {
    e.preventDefault()
    resultBox.innerHTML = `Result`

    const isValid = validate(e.target)
    if (!isValid) return;

    const formData = new FormData(e.target)
    const result = JSON.stringify(Object.fromEntries(formData), null, 2)
    resultBox.innerHTML = `Result: ${result}`
    resetForm(e.target)
}

form.addEventListener('submit', handleFormSubmit)

function validate(form) {
    const errors = {}

    if ('name' in form) {
        const nameInput = form['name']
        errors['name'] = []

        if (!nameInput.value.trim()) {
            errors['name'].push(`Name can't be empty`)
        }

        if (nameInput.value.length > 10) {
            errors['name'].push(`Name cannot be more than 10 characters`)
        }

        if (errors['name'].length) {
            nameInput.classList.add('is-invalid')
        } else {
            nameInput.classList.remove('is-invalid')
        }
    }
    if ('email' in form) {
        const nameInput = form['email']
        errors['email'] = []

        if (!nameInput.value.trim()) {
            errors['email'].push(`Email can't be empty`)
        }

        if (errors['email'].length) {
            nameInput.classList.add('is-invalid')
        } else {
            nameInput.classList.remove('is-invalid')
        }
    }

    const isValid = Object.values(errors).flat().length === 0

    if (!isValid) displayErrors(errors, form)

    return isValid;
}

function displayErrors(errors, form) {
    for (const key in errors) {
        const invalidFeedback = form[key].parentElement.querySelector('.invalid-feedback')
        invalidFeedback.innerHTML = errors[key].length ? errors[key].join(', ') : ""
    }
}

function resetForm(form) {
    Array.from(form.elements).forEach(element => {
        element.classList.remove('is-invalid')
    });

    form.reset()
}
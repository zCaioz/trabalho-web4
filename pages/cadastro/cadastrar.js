import { endpoint } from "../../env/environment.js"

const elements = {
    email: () => document.getElementById("email"),
    password: () => document.getElementById("password"),
    confirm_password: () => document.getElementById("confirmar-password"),
    btn_cadastrar: () => document.getElementById("cadastrar")
}

function validar_campos() {
    const email_valido = validateEmail(elements.email().value)
    const tam_password_valida = elements.password().value.length >= 6
    const confirm_password_valida = elements.confirm_password().value === elements.password().value
    const password_valida = tam_password_valida && confirm_password_valida

    elements.email().style.borderColor = email_valido ? "black" : "red"
    elements.password().style.borderColor = tam_password_valida ? "black" : "red"
    elements.confirm_password().style.borderColor = confirm_password_valida ? "black" : "red"

    elements.btn_cadastrar().disabled = !(email_valido && password_valida)
}

function carregamento() {
    elements.btn_cadastrar().textContent = "CARREGANDO..."
    elements.btn_cadastrar().disabled = true
}

function pos_carregamento() {
    elements.btn_cadastrar().textContent = "CADASTRAR"
    elements.btn_cadastrar().disabled = false
    elements.email().value = ''
    elements.password().value = ''
    elements.confirm_password().value = ''
}

function cadastrar() {
    carregamento()

    const email = elements.email().value
    const password = elements.password().value

    fetch(endpoint.cadastrar, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
        .then(data => {
            pos_carregamento()
            if (data.success) {
                window.location.href = "/trabalhoweb1/pages/home/home.html"
            } else if (data.code === "EMAIL_IN_USE") {
                alert("Email já cadastrado!")
            } else {
                alert("Erro ao cadastrar")
            }
        })
        .catch(() => {
            pos_carregamento()
            alert("Erro de rede")
        })
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
}

elements.email().addEventListener("input", validar_campos)
elements.password().addEventListener("input", validar_campos)
elements.confirm_password().addEventListener("input", validar_campos)
elements.btn_cadastrar().addEventListener("click", cadastrar)

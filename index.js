import { endpoint } from "./env/environment.js"

const elements = {
    email: () => document.getElementById("email-input"),
    password: () => document.getElementById("password-input"),
    btn_entrar: () => document.getElementById("entrar"),
    btn_cadastro: () => document.getElementById("cadastro")
}

function carregamento() {
    elements.btn_entrar().textContent = "CARREGANDO..."
    elements.btn_entrar().disabled = true
    elements.btn_cadastro().disabled = true
}

function pos_carregamento() {
    elements.btn_entrar().textContent = "ENTRAR"
    elements.btn_entrar().disabled = false
    elements.btn_cadastro().disabled = false
    elements.password().value = ''
}

function validar_campos() {
    const email_valido = validateEmail(elements.email().value)
    const password_valida = elements.password().value
    elements.btn_entrar().disabled = !email_valido || !password_valida
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
}

function login() {
    carregamento()

    fetch(endpoint.login, {
        method: 'POST',
        credentials: 'include' ,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: elements.email().value,
            password: elements.password().value
        })
    })
        .then(res => res.json())
        .then(data => {
            pos_carregamento()
            console.log(data)
            if (data.success) {
                window.location.href = "pages/home/home.html"
            } else {
                alert("Credenciais inválidas")
            }
        })
        .catch(() => {
            pos_carregamento()
            alert("Erro de rede")
        })
}

function register() {
    window.location.href = "pages/cadastro/cadastrar.html"
}

elements.email().addEventListener('input', validar_campos)
elements.password().addEventListener('input', validar_campos)
elements.btn_cadastro().addEventListener("click", register)
elements.btn_entrar().addEventListener("click", login)

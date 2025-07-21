export class Livro {
    constructor() {
        this._id = null
        this._titulo = ""
        this._autor = ""
        this._numeroPaginas = 0
        this._editora = ""
        this._anoPublicacao = 0
    }

    get id() {
        return this._id
    }
    set id(value) {
        this._id = value
    }

    get titulo() {
        return this._titulo
    }
    set titulo(value) {
        this._titulo = value
    }

    get autor() {
        return this._autor
    }
    set autor(value) {
        this._autor = value
    }

    get numeroPaginas() {
        return this._numeroPaginas
    }
    set numeroPaginas(value) {
        this._numeroPaginas = value
    }

    get editora() {
        return this._editora
    }
    set editora(value) {
        this._editora = value
    }

    get anoPublicacao() {
        return this._anoPublicacao
    }
    set anoPublicacao(value) {
        this._anoPublicacao = value
    }
}

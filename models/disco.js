export class Disco {
    constructor() {
        this._id = null
        this._titulo = ""
        this._artista = ""
        this._numeroFaixas = 0
        this._gravadora = ""
        this._anoLancamento = 0
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

    get artista() {
        return this._artista
    }
    set artista(value) {
        this._artista = value
    }

    get numeroFaixas() {
        return this._numeroFaixas
    }
    set numeroFaixas(value) {
        this._numeroFaixas = value
    }

    get gravadora() {
        return this._gravadora
    }
    set gravadora(value) {
        this._gravadora = value
    }

    get anoLancamento() {
        return this._anoLancamento
    }
    set anoLancamento(value) {
        this._anoLancamento = value
    }
}

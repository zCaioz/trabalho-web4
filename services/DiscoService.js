import { Disco } from "../models/disco.js"

export class DiscoService {

    constructor() {
        this.path = "https://trabalho-web3.onrender.com/api/v1/discos"
    }

    async recuperarDisco(id) {
        if (!id) return null

        const url = `${this.path}?id=${encodeURIComponent(id)}`

        const response = await fetch(url, {
            method: 'GET'
        })

        if (!response.ok) {
            throw new Error(`Erro ao buscar disco: ${response.statusText}`)
        }

        const data = await response.json()

        const disco = new Disco()
        disco.id = data.id
        disco.titulo = data.titulo
        disco.artista = data.artista
        disco.numeroFaixas = data.numeroFaixas
        disco.gravadora = data.gravadora
        disco.anoLancamento = data.anoLancamento

        return disco
    }

    async salvarDisco(disco) {
        if (!disco) throw new Error("Disco é obrigatório")

        if (disco.id !== null && disco.id !== undefined) {
            throw new Error("Disco já possui id. Para atualizar use outro método.")
        }

        const payload = {
            titulo: disco.titulo,
            artista: disco.artista,
            numero_faixas: disco.numeroFaixas,
            gravadora: disco.gravadora,
            ano_lancamento: disco.anoLancamento
        }

        const response = await fetch(this.path, {
            method: 'POST',
            credentials: 'include' ,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            throw new Error(`Erro ao salvar disco: ${response.statusText}`)
        }

        const data = await response.json()

        return data
    }

    async atualizarDisco(disco) {
        if (!disco) throw new Error("Disco é obrigatório")

        if (disco.id === null || disco.id === undefined) {
            throw new Error("Disco precisa ter id para atualizar")
        }

        const payload = {
            id: disco.id,
            titulo: disco.titulo,
            artista: disco.artista,
            numero_faixas: disco.numeroFaixas,
            gravadora: disco.gravadora,
            ano_lancamento: disco.anoLancamento
        }

        const url = `${this.path}?id=${encodeURIComponent(disco.id)}`

        const response = await fetch(url, {
            method: 'PATCH',
            credentials: 'include' ,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            throw new Error(`Erro ao atualizar disco: ${response.statusText}`)
        }

        const data = await response.json()

        return data
    }

    async removerDisco(id) {
        if (!id) throw new Error("ID do disco é obrigatório para remover")

        const url = `${this.path}?id=${encodeURIComponent(id)}`

        const response = await fetch(url, {
            credentials: 'include' ,
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error(`Erro ao remover disco: ${response.statusText}`)
        }

        return true
    }

    async recuperarDiscos() {
        const response = await fetch(this.path, {
            method: 'GET',
            credentials: 'include' ,
            headers: { 'Accept': 'application/json' }
        })

        if (!response.ok) {
            throw new Error(`Erro ao buscar discos: ${response.statusText}`)
        }

        const data = await response.json()

        return data.map(item => {
            const disco = new Disco()
            disco.id = item.id
            disco.titulo = item.titulo
            disco.artista = item.artista
            disco.numeroFaixas = item.numeroFaixas
            disco.gravadora = item.gravadora
            disco.anoLancamento = item.anoLancamento
            return disco
        })
    }
}

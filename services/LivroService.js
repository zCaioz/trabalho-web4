import { Livro } from "../models/livro.js"

export class LivroService {

    constructor() {
        this.path = "https://trabalho-web3.onrender.com/api/v1/livros"
    }

    async recuperarLivro(id) {
        if (!id) return null

        const url = `${this.path}?id=${encodeURIComponent(id)}`

        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include' 
        })

        if (!response.ok) {
            throw new Error(`Erro ao buscar livro: ${response.statusText}`)
        }

        const data = await response.json()

        const livro = new Livro()
        livro.id = data.id
        livro.titulo = data.titulo
        livro.autor = data.autor
        livro.numeroPaginas = data.numeroPaginas
        livro.editora = data.editora
        livro.anoPublicacao = data.anoPublicacao

        return livro
    }

    async salvarLivro(livro) {
        if (!livro) throw new Error("Livro é obrigatório")

        if (livro.id !== null && livro.id !== undefined) {
            throw new Error("Livro já possui id. Para atualizar use outro método.")
        }

        const payload = {
            titulo: livro.titulo,
            autor: livro.autor,
            numero_paginas: livro.numeroPaginas,
            editora: livro.editora,
            ano_publicacao: livro.anoPublicacao
        }

        const response = await fetch(this.path, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            throw new Error(`Erro ao salvar livro: ${response.statusText}`)
        }

        const data = await response.json()

        return data
    }

    async atualizarLivro(livro) {
        if (!livro) throw new Error("Livro é obrigatório")

        if (livro.id === null || livro.id === undefined) {
            throw new Error("Livro precisa ter id para atualizar")
        }

        const payload = {
            id: livro.id,
            titulo: livro.titulo,
            autor: livro.autor,
            numero_paginas: livro.numeroPaginas,
            editora: livro.editora,
            ano_publicacao: livro.anoPublicacao
        }

        const url = `${this.path}?id=${encodeURIComponent(livro.id)}`

        const response = await fetch(url, {
            method: 'PATCH',
            credentials: 'include' ,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            throw new Error(`Erro ao atualizar livro: ${response.statusText}`)
        }

        const data = await response.json()

        return data
    }

    async removerLivro(id) {
        if (!id) throw new Error("ID do livro é obrigatório para remover")

        const url = `${this.path}?id=${encodeURIComponent(id)}`

        const response = await fetch(url, {
            credentials: 'include' ,
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error(`Erro ao remover livro: ${response.statusText}`)
        }

        return true
    }

    async recuperarLivros() {
        const response = await fetch(this.path, {
            method: 'GET',
            credentials: 'include' ,
            headers: { 'Accept': 'application/json' }
        })

        if (!response.ok) {
            throw new Error(`Erro ao buscar livros: ${response.statusText}`)
        }

        const data = await response.json()

        return data.map(item => {
            const livro = new Livro()
            livro.id = item.id
            livro.titulo = item.titulo
            livro.autor = item.autor
            livro.numeroPaginas = item.numeroPaginas
            livro.editora = item.editora
            livro.anoPublicacao = item.anoPublicacao
            return livro
        })
    }
}

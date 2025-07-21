import { LivroService } from '../../services/LivroService.js'
import { Livro } from '../../models/livro.js'
import { verificarAutenticacao } from '../../auth.js'

const livroService = new LivroService()
const form = document.getElementById('livro-form')
const btnVoltar = document.getElementById('btn-voltar')

const params = new URLSearchParams(window.location.search)
const livroId = params.get('id')

const tituloInput = document.getElementById('titulo')
const autorInput = document.getElementById('autor')
const numeroPaginasInput = document.getElementById('numeroPaginas')
const editoraInput = document.getElementById('editora')
const anoPublicacaoInput = document.getElementById('anoPublicacao')

async function carregarLivro(id) {
  try {
    const livro = await livroService.recuperarLivro(id)
    if (livro) {
      tituloInput.value = livro.titulo
      autorInput.value = livro.autor
      numeroPaginasInput.value = livro.numeroPaginas
      editoraInput.value = livro.editora
      anoPublicacaoInput.value = livro.anoPublicacao
    }
  } catch (err) {
    alert('Erro ao carregar o livro: ' + err.message)
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()


  if (!form.checkValidity()) {
    alert('Por favor, preencha todos os campos corretamente.')
    return
  }


  const livro = new Livro()
  if (livroId) {
    livro.id = livroId
  }
  livro.titulo = tituloInput.value.trim()
  livro.autor = autorInput.value.trim()
  livro.numeroPaginas = Number(numeroPaginasInput.value)
  livro.editora = editoraInput.value.trim()
  livro.anoPublicacao = Number(anoPublicacaoInput.value)

  try {
    if (livroId) {
      await livroService.atualizarLivro(livro)
      alert('Livro atualizado com sucesso!')
    } else {
      await livroService.salvarLivro(livro)
      alert('Livro criado com sucesso!')
    }
    window.location.href = "/pages/home/home.html";
  } catch (err) {
    alert('Erro ao salvar livro: ' + err.message)
  }
})

btnVoltar.addEventListener('click', () => {
  window.history.back()
})

if (livroId) {
  carregarLivro(livroId)
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const auth = await verificarAutenticacao()
    if (!auth.logado) {
  
      window.location.href = '/index.html'
      return
    }

    console.log('Usuário logado:', auth.usuario)
  } catch {
    alert('Erro ao verificar autenticação. Tente recarregar a página.')
  }
})


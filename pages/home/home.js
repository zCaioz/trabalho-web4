
import { LivroService } from '../../services/LivroService.js'
import { DiscoService } from '../../services/DiscoService.js'
import { mockDiscos, mockLivros } from '../../mock.js'
import { verificarAutenticacao } from '../../auth.js'

const livroService = new LivroService()
const discoService = new DiscoService()

const livrosList = document.getElementById('livros-list')
const discosList = document.getElementById('discos-list')
const searchInput = document.getElementById('search')

let livros = []
let discos = []

async function carregarDados() {
    try {
        livros = await livroService.recuperarLivros()
        discos = await discoService.recuperarDiscos()

        renderizar()
    } catch (err) {
        alert('Erro ao carregar dados: ' + err.message)
    }
}

function renderizar() {
    const termo = searchInput.value.toLowerCase()

    livrosList.innerHTML = ''
    discosList.innerHTML = ''

    livros
        .filter(l => l.titulo.toLowerCase().includes(termo))
        .forEach(l => livrosList.appendChild(criarCardLivro(l)))

    discos
        .filter(d => d.titulo.toLowerCase().includes(termo))
        .forEach(d => discosList.appendChild(criarCardDisco(d)))
}

function criarCardLivro(livro) {
    const div = document.createElement('div')
    div.className = 'card'

    div.innerHTML = `
    <h3>${livro.titulo}</h3>
    <p><strong>Autor:</strong> ${livro.autor}</p>
    <p><strong>Editora:</strong> ${livro.editora}</p>
    <div class="card-actions">
      <button class="editar">Editar</button>
      <button class="excluir">Excluir</button>
    </div>
  `

    div.querySelector('.editar').addEventListener('click', () => {
        window.location.href = `../livro/livro.html?id=${livro.id}`
    })

    div.querySelector('.excluir').addEventListener('click', async () => {
        if (confirm('Deseja realmente excluir este livro?')) {
            try {
                await livroService.removerLivro(livro.id)
                removerItemDaLista(livros, livro.id)
                renderizar()
            } catch (err) {
                alert('Erro ao excluir: ' + err.message)
            }
        }
    })

    return div
}

function criarCardDisco(disco) {
    const div = document.createElement('div')
    div.className = 'card'

    div.innerHTML = `
    <h3>${disco.titulo}</h3>
    <p><strong>Artista:</strong> ${disco.artista}</p>
    <p><strong>Gravadora:</strong> ${disco.gravadora}</p>
    <div class="card-actions">
      <button class="editar">Editar</button>
      <button class="excluir">Excluir</button>
    </div>
  `

    div.querySelector('.editar').addEventListener('click', () => {
        window.location.href = `../disco/disco.html?id=${disco.id}`
    })

    div.querySelector('.excluir').addEventListener('click', async () => {
        if (confirm('Deseja realmente excluir este disco?')) {
            try {
                await discoService.removerDisco(disco.id)
                removerItemDaLista(discos, disco.id)
                renderizar()
            } catch (err) {
                alert('Erro ao excluir: ' + err.message)
            }
        }
    })

    return div
}

function removerItemDaLista(lista, id) {
    const index = lista.findIndex(item => item.id === id)
    if (index > -1) {
        lista.splice(index, 1)
    }
}

searchInput.addEventListener('input', renderizar)

carregarDados()

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





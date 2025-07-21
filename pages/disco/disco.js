import { DiscoService } from '../../services/DiscoService.js'
import { Disco } from '../../models/disco.js'
import { verificarAutenticacao } from '../../auth.js'

const discoService = new DiscoService()
const form = document.getElementById('disco-form')
const btnVoltar = document.getElementById('btn-voltar')

const params = new URLSearchParams(window.location.search)
const discoId = params.get('id')

const tituloInput = document.getElementById('titulo')
const artistaInput = document.getElementById('artista')
const numeroFaixasInput = document.getElementById('numeroFaixas')
const gravadoraInput = document.getElementById('gravadora')
const anoLancamentoInput = document.getElementById('anoLancamento')

async function carregarDisco(id) {
    try {
        const disco = await discoService.recuperarDisco(id)
        if (disco) {
            tituloInput.value = disco.titulo
            artistaInput.value = disco.artista
            numeroFaixasInput.value = disco.numeroFaixas
            gravadoraInput.value = disco.gravadora
            anoLancamentoInput.value = disco.anoLancamento
        }
    } catch (err) {
        alert('Erro ao carregar o disco: ' + err.message)
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (!form.checkValidity()) {
        alert('Por favor, preencha todos os campos corretamente.')
        return
    }

    const disco = new Disco()
    if (discoId) {
        disco.id = discoId
    }
    disco.titulo = tituloInput.value.trim()
    disco.artista = artistaInput.value.trim()
    disco.numeroFaixas = Number(numeroFaixasInput.value)
    disco.gravadora = gravadoraInput.value.trim()
    disco.anoLancamento = Number(anoLancamentoInput.value)

    try {
        if (discoId) {
            await discoService.atualizarDisco(disco)
            alert('Disco atualizado com sucesso!')
        } else {
            await discoService.salvarDisco(disco)
            alert('Disco criado com sucesso!')
        }
        window.location.href = "/trabalhoweb1/pages/home/home.html";
    } catch (err) {
        alert('Erro ao salvar disco: ' + err.message)
    }
})

btnVoltar.addEventListener('click', () => {
    window.history.back()
})

if (discoId) {
    carregarDisco(discoId)
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


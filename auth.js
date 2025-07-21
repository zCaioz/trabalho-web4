
export async function verificarAutenticacao() {
  try {
    const response = await fetch('https://trabalho-web3.onrender.com/api/v1/auth', {
      method: 'GET',
      credentials: 'include' 
    })

    if (!response.ok) {
      if (response.status === 401) {
        return { logado: false, usuario: null }
      }
      throw new Error(`Erro na verificação de autenticação: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      logado: data.logado === true,
      usuario: data.usuario || null
    }

  } catch (error) {
    console.error('Erro ao verificar autenticação:', error)
    throw error
  }
}

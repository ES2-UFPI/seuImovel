module.exports = class ConfigUsuario {
    constructor(plano, descricaoPlano, notificacoes,quantImagens,quantImoveis,quantAtualImoveis) {
      this.plano = String(plano), 
      this.descricaoPlano = String(descricaoPlano),
      this.notificacoes = notificacoes,
      this.quantImagens = parseInt(String(quantImagens))
      this.quantImoveis = parseInt(String(quantImoveis))
      this.quantAtualImoveis = parseInt(String(quantAtualImoveis))
    }
}
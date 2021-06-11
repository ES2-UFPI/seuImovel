module.exports = class ConfigUsuario {
    constructor(plano, descricaoPlano, notificacoes, raioNotificacoes) {
      this.plano = plano, 
      this.descricaoPlano = descricaoPlano,
      this.notificacoes = Boolean(notificacoes), 
      this.raioNotificacoes = Number(raioNotificacoes) 
    }
}
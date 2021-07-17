module.exports = class PerfilUsuario {
    constructor(cpf, email,nascimento,proprietario,telefone) {
      this.cpf = String(cpf)
      this.email = String(email)
      this.nascimento = String(nascimento)
      this.proprietario = String(proprietario)
      this.telefone = parseInt(String(telefone))
    }
}
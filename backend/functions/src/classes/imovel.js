module.exports = class imovel {
    constructor(cpf, descricao, numero, banheiros, complemento, dimensao, imagens, latitude, longitude, proprietario, quartos, tipo, valor) {
        this.cpf = String(cpf);
        this.descricao = String(descricao);
        this.numero = parseInt(String(numero));
        this.banheiros = parseInt(String(banheiros));
        this.complemento = String(complemento);
        this.dimensao = Number(dimensao);
        this.imagens = imagens;
        this.latitude = Number(latitude);
        this.longitude = Number(longitude);
        this.proprietario = String(proprietario);
        this.quartos = parseInt(String(quartos));
        this.tipo = String(tipo);
        this.valor = Number(valor);
    }

  
}
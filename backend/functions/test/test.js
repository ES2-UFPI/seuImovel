const assert = require('assert');
const Imovel = require('../src/classes/imovel')//classe imóvel
const ConfigUsuario = require('../src/classes/ConfigUsuario')
const PerfilUsuario = require('../src/classes/PerfilUsuario')

// plano, descricaoPlano, notificacoes, raioNotificacoes
const configUsuario = new ConfigUsuario("premium","Plano de até 7 imóveis e até 7 fotos por imóvel",false,7,7,6)

const imovel1 = new Imovel(
    '05458903201', 
    'Casa com psicina e grande área de lazer', 
    8990, 
    4, 
    'Proximo ao Posto Ipiranga', 
    430, 
    ['https://resizedimgs.zapimoveis.com.br/crop/272x224/vr.images.sp/54dfc9f4a92cc0f90b4f737988369abc.jpg','https://imagens-revista.vivadecora.com.br/uploads/2020/03/arquitetura-para-casas-de-luxo-modernas-com-piscina-Foto-Pinterest.jpg'], 
    -5.1439291, 
    -42.7955821, 
    'João Lucas', 
    3, 
    'Venda', 
    500000)

const Perfil = new PerfilUsuario('2221110003','joaomota59@hotmail.com','11/02/1998','João Lucas',86999221344)



//Teste da Configuração
describe("Testes da Configuração",()=>{//dentro do decribe que serão colocados os testes

    it("Conferindo se o plano está correto", ()=>{
        assert.strictEqual(configUsuario.plano,'premium')
    })

    it("Conferindo a descrição do plano", () => {
        assert.strictEqual(configUsuario.descricaoPlano,"Plano de até 7 imóveis e até 7 fotos por imóvel")
    })

    it("Conferindo se a notificação está desativada", () => {
        assert.strictEqual(configUsuario.notificacoes,false)
    })

    it("Conferindo se a quantidade máxima de imagens está correta", () => {
        assert.strictEqual(configUsuario.quantImagens,7)
    })

    it("Conferindo se a quantidade máxima de imóveis está correta", () => {
        assert.strictEqual(configUsuario.quantImoveis,7)
    })

    it("Conferindo se a quantidade atual de imóveis está correta", () => {
        assert.strictEqual(configUsuario.quantAtualImoveis,6)
    })


})


//Testes do Imóvel
describe("Testes Imóvel",()=>{//dentro do decribe que serão colocados os testes

    it("Conferindo se o cpf passado está correto", ()=>{

        assert.strictEqual(imovel1.cpf,'05458903201')
    })

    it("Conferindo se o nome do proprietário passado está correto", ()=>{

        assert.strictEqual(imovel1.proprietario,'João Lucas')
    })

    it("Conferindo se a descrição passada está correta", ()=>{

        assert.strictEqual(imovel1.descricao,'Casa com psicina e grande área de lazer')
    })

    it("Conferindo se o valor passado está correto", ()=>{

        assert.strictEqual(imovel1.valor,500000)
    })

    it("Conferindo se a quantidade de banheiros passado está correta", ()=>{

        assert.strictEqual(imovel1.banheiros,4)
    })

    it("Conferindo se a quantidade de quartos passado está correto",()=>{
        assert.strictEqual(imovel1.quartos,3)
    })

    it("Conferindo se o tipo do imóvel está correto",()=>{
        assert.strictEqual(imovel1.tipo,'Venda')
    })

    it("Conferindo se a latitude está correta",()=>{
        assert.strictEqual(imovel1.latitude,-5.1439291)
    })

    it("Conferindo se a longitude está correta",()=>{
        assert.strictEqual(imovel1.longitude,-42.7955821)
    })

    it("Conferindo se as imagens passadas estão corretas",()=>{
        assert.strictEqual(imovel1.imagens[0],'https://resizedimgs.zapimoveis.com.br/crop/272x224/vr.images.sp/54dfc9f4a92cc0f90b4f737988369abc.jpg')
        assert.strictEqual(imovel1.imagens[1],'https://imagens-revista.vivadecora.com.br/uploads/2020/03/arquitetura-para-casas-de-luxo-modernas-com-piscina-Foto-Pinterest.jpg')
    })

    it("Conferindo se o complemento está correto",()=>{
        assert.strictEqual(imovel1.complemento,'Proximo ao Posto Ipiranga')
    })

    it("Conferindo se a dimensão está correta",()=>{
        assert.strictEqual(imovel1.dimensao,430)
    })

    it("Conferindo se o numero do imóvel está correto",()=>{
        assert.strictEqual(imovel1.numero,8990)
    })

})

describe("Testes Perfil do Usuário",()=>{//dentro do decribe que serão colocados os testes

    it("Conferindo se o cpf está correto",()=>{
        assert.strictEqual(Perfil.cpf,'2221110003')
    })

    it("Conferindo se o e-mail passado está correto",()=>{
        assert.strictEqual(Perfil.email,'joaomota59@hotmail.com')
    })

    it("Conferindo se o nascimento passado está correto",()=>{
        assert.strictEqual(Perfil.nascimento,'11/02/1998')
    })

    it("Conferindo se o nome passado está correto",()=>{
        assert.strictEqual(Perfil.proprietario,'João Lucas')
    })

    it("Conferindo se o telefone passado está correto",()=>{
        assert.strictEqual(Perfil.telefone,86999221344)
    })

})
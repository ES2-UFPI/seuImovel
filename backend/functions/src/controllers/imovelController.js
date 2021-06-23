const db = require('../database/db')//conexão com database
const Imovel = require('../classes/imovel')//classe imóvel


module.exports = {

    async index(request, response) {

        //paginacao
        const { page = 1 } = request.query;
        const qtd_imoveisListados = 5;

        const docRef = db.collection('houses')
        let imoveis = []

        const quantTotalImoveis = (await docRef.get()).size //quantidade total de imóveis

        await docRef
            .limit(qtd_imoveisListados)
            .offset((page - 1) * qtd_imoveisListados)
            .get()
            .then((snapshot => {
                snapshot.forEach(doc => {
                    imoveis.push({
                        id: doc.id,
                        descricao: doc.data().descricao,
                        numero: doc.data().numero,
                        banheiros: doc.data().banheiros,
                        complemento: doc.data().complemento,
                        dimensao: doc.data().dimensao,
                        imagens: doc.data().imagens,
                        latitude: doc.data().latitude,
                        longitude: doc.data().longitude,
                        proprietario: doc.data().proprietario,
                        quartos: doc.data().quartos,
                        tipo: doc.data().tipo,
                        valor: doc.data().valor,
                    })
                })

                response.header('X-Total-Count', quantTotalImoveis)//retorna a quantidade no cabeçalho da requisição
                response.json(imoveis)

            }))
            .catch(() => {
                response.status(404).send()
            })
    },

    async create(req, res) {
        const docRef = db.collection('houses')
        //#var storageRef = firebase.storage().ref()

        const {
            cpf,
            descricao,
            numero,
            banheiros,
            complemento,
            dimensao,
            imagens,
            latitude,
            longitude,
            proprietario,
            quartos,
            tipo,
            valor } = req.body

        imovel = new Imovel(cpf, descricao, numero, banheiros, complemento, dimensao, imagens, latitude, longitude, proprietario, quartos, tipo, valor)

        const imovelJS = {//imovel json
            cpf: imovel.cpf,
            descricao: imovel.descricao,
            numero: imovel.numero,
            banheiros: imovel.banheiros,
            complemento: imovel.complemento,
            dimensao: imovel.dimensao,
            imagens: imovel.imagens,
            latitude: imovel.latitude,
            longitude: imovel.longitude,
            proprietario: imovel.proprietario,
            quartos: imovel.quartos,
            tipo: imovel.tipo,
            valor: imovel.valor
        }

        const docRef2 = db.collection('users')
        //const docRef3 = db.collection('houses')
        let idDocUsuario//id do documento do usuário
        let quantImoveis//quantidade de imoveis que o plano permite
        let quantAtualImoveis//quantidade atual de imoveis que o usuario possui

        //quantAtualImoveis = (await docRef3.where('cpf', '==', imovel.cpf).get()).size


        await docRef2.where('cpf', '==', imovel.cpf).get()
            .then(async snapshot => {
                if (snapshot.empty) {//Usuario não existe, usuário precisa ser cadastrado primeiro antes do cadastro de imovel
                    res.status(404).send()//Retorna erro
                }
                else {
                    snapshot.forEach(doc => {
                        idDocUsuario = doc.id
                        quantImoveis = doc.data().quantImoveis
                        quantAtualImoveis = doc.data().quantAtualImoveis
                    })
                    if (quantAtualImoveis + 1 > quantImoveis) {//requisicao para cadastrar numero de imoveis maior que o plano pode permitir, erro
                        res.status(404).send()
                    }

                }
            })
            .catch(() => {//erro ao obter informações do database
                res.status(404).send()
            })

        if (quantAtualImoveis + 1 <= quantImoveis) {
            await docRef.add(imovelJS)
                .then(
                    res.status(200).send()
                )
                .catch(() => {
                    res.status(404).send()
                })



            await docRef2.doc(idDocUsuario).update({
                quantAtualImoveis: quantAtualImoveis + 1
            })
        }
    },

    async update(request, response) {
        const { cpfUsuario } = request.params
        const {
            imovelID,
            cpf,
            descricao,
            numero,
            banheiros,
            complemento,
            dimensao,
            imagens,
            latitude,
            longitude,
            proprietario,
            quartos,
            tipo,
            valor } = request.body

        imovel = new Imovel(cpf, descricao, numero, banheiros, complemento, dimensao, imagens, latitude, longitude, proprietario, quartos, tipo, valor)

        const imovelJS = {//imovel json
            cpf: imovel.cpf,
            descricao: imovel.descricao,
            numero: imovel.numero,
            banheiros: imovel.banheiros,
            complemento: imovel.complemento,
            dimensao: imovel.dimensao,
            imagens: imovel.imagens,
            latitude: imovel.latitude,
            longitude: imovel.longitude,
            proprietario: imovel.proprietario,
            quartos: imovel.quartos,
            tipo: imovel.tipo,
            valor: imovel.valor
        }

        const docRef = db.collection('houses')

        if (cpfUsuario == imovelJS.cpf) {
            docRef.doc(imovelID).update(
                imovelJS
            )
                .then(() => response.status(200).send())
                .catch(() => response.status(404).send())
        }
        else {
            response.status(404).send()
        }

    }

}
const db = require('../database/db')

module.exports = {


    async index(request, response) {//retorna todos imoveis favoritos de um usuario
        const docRef = db.collection('favorites')
        const docRef2 = db.collection('houses')
        const imoveisFavoritos = []//Lista de imóveis favoritos
        const imoveisIds = []
        const { cpf } = request.query;
        const { page = 1 } = request.query;
        const qtd_imoveisListados = 5;

        const quantTotalImoveisFavoritos = (await docRef.where('cpf', "==", String(cpf)).get()).size //quantidade total de imóveis

        await docRef.where('cpf', "==", String(cpf)).limit(qtd_imoveisListados).offset((page - 1) * qtd_imoveisListados).get()
            .then(snapshot => {
                if (snapshot.empty) {//se não possui nenhum imóvel favorito.. retorna uma lista vazia
                    response.json(imoveisFavoritos)
                }

                snapshot.forEach(doc => {//adiciona todos imóveis favoritados no array
                    imoveisIds.push(doc.data().imovelID)
                });
            })
            .catch(() => {//erro ao fazer requisição do banco de dados
                response.status(404).send()
            })


        for (i = 0; i < imoveisIds.length; i++) {
            doc2 = await docRef2.doc(imoveisIds[i]).get()
            arquivoJson = doc2.data()
            arquivoJson["id"] = imoveisIds[i]
            imoveisFavoritos.push(arquivoJson)
        }
        response.header('X-Total-Count', quantTotalImoveisFavoritos)//retorna a quantidade no cabeçalho da requisição
        response.json(imoveisFavoritos)

    },

    async oneIndex(request, response) {
        const docRef = db.collection('favorites')
        const { cpf = '', imovelID = '' } = request.query

        await docRef.where('imovelID', "==", String(imovelID)).where('cpf', '==', String(cpf)).get()
            .then(async (snapshot) => {
                if (snapshot.empty) {//se não existe o imóvel passado, favoritado pelo usuario...
                    response.status(404).send()//envia erro
                }
                response.status(200).send()//Se existe o imóvel 
            })
            .catch(() => {//erro ao fazer requisição do banco de dados
                response.status(404).send()
            })

    },


    async create(req, res) {//relaciona o id do imóvel favorito com o usuário que favoritou
        const docRef = db.collection('favorites')
        const {
            cpf,
            imovelID
        } = req.body
        let docID




        await docRef.where('imovelID', "==", String(imovelID)).where('cpf', '==', String(cpf)).get()
            .then(async (snapshot) => {
                if (snapshot.empty) {//se não existe o imóvel favoritado pelo usuario...
                    await docRef.add({
                        cpf: String(cpf),
                        imovelID: String(imovelID)
                    })
                        .then(() => {
                            res.status(200).send()
                        })
                        .catch(() => {//deu algum erro ao adicionar
                            res.status(404).send()
                        })
                }
                snapshot.forEach(doc => {
                    docID = doc.id
                })


                res.status(404).send()//Não foi possível favoritar o imóvel pois ele já foi favoritado
            })
            .catch(() => {//erro ao fazer requisição do banco de dados
                res.status(404).send()
            })

    },

    async delete(request, response) {
        const docRef = db.collection('favorites')
        const {
            cpf,
            imovelID
        } = request.body
        let docID

        await docRef.where('imovelID', "==", String(imovelID)).where('cpf', '==', String(cpf)).get()
            .then(async snapshot => {
                if (snapshot.empty) {//Imóvel deletado nao existe para esse usuario
                    response.status(404).send()
                }
                snapshot.forEach(doc => {
                    docID = doc.id
                })
                await docRef.doc(docID).delete();//se já existir apaga do database
                response.status(200).send()
            })



    }

}
const db = require('../database/db')

module.exports = {


    async index(request, response) {//retorna todos imoveis favoritos de um usuario
        const docRef = db.collection('favorites')
        const docRef2 = db.collection('houses')
        const imoveisFavoritos = []//Lista de imóveis favoritos
        const imoveisIds = []
        const { cpf } = request.params
        
        const quantTotalImoveisFavoritos = (await docRef.where('cpf', "==", String(cpf)).get()).size //quantidade total de imóveis

        await docRef.where('cpf', "==", String(cpf)).get()
            .then(snapshot => {
                if (snapshot.empty) {//se não possui nenhum imóvel favorito.. retorna uma lista vazia
                    response.json(imoveisFavoritos)
                }

                snapshot.forEach( doc => {//adiciona todos imóveis favoritados no array
                   imoveisIds.push(doc.data().imovelID)
                });
            })
            .catch(() => {//erro ao fazer requisição do banco de dados
                response.status(404).send()
            })

            
            for(i=0; i<imoveisIds.length; i++){
                doc2 =  await docRef2.doc(imoveisIds[i]).get()
                arquivoJson = doc2.data()
                arquivoJson["id"] = imoveisIds[i]
                imoveisFavoritos.push(arquivoJson)        
            }
            response.header('X-Total-Count', quantTotalImoveisFavoritos)//retorna a quantidade no cabeçalho da requisição
            response.json(imoveisFavoritos)

    },

    
    async createAndDelete(req, res) {//relaciona o id do imóvel favorito com o usuário que favoritou
        const docRef = db.collection('favorites')
        const {
            cpf,
            imovelID
        } = req.body
        let docID




        await docRef.where('imovelID', "==", String(imovelID)).where('cpf','==',String(cpf)).get()
            .then(async (snapshot) => {
                if (snapshot.empty) {//se não existe o imóvel favortitado pelo usuario...
                    await docRef.add({
                        cpf: String(cpf),
                        imovelID: String(imovelID)
                    })
                        .then(() => {res.status(200).send()
                        })
                        .catch(() => {//deu algum erro ao adicionar
                            res.status(404).send()
                        })
                }
                snapshot.forEach(doc => {
                    docID = doc.id
                })

                await docRef.doc(docID).delete();//se já existir apaga do database


                res.status(200).send()//Não foi possível cadastrar o token porque ele já existe no banco de dados
            })
            .catch(() => {//erro ao fazer requisição do banco de dados
                response.status(404).send()
            })

    }
    
}
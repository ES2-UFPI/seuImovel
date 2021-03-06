const db = require('../database/db')//conexão com database

module.exports = {

    async index(request, response) {
        const docRef = db.collection('houses')
        const { cpf = '', imovelID = '' } = request.query
        
        await docRef.doc(imovelID).get()
            .then( doc => {

                    if(doc.data().cpf === cpf){//Se o imóvel pertence ao usuário passado
                        response.status(200).send()
                    }
                    else{
                        response.status(404).send()
                    }
                 
            })
            .catch(() => {//erro ao fazer requisição do banco de dados ou não existe o imovel
                response.status(404).send()
            })
    },

    async delete(request,response){
        const docRef = db.collection('houses')
        const docRef2 = db.collection('users')
        const docRef3 = db.collection('favorites')
        let flagImovelPertenceAoUsuario = false;//verifica se o imovel pertence ou nao ao usuario

        const { cpf = '', imovelID = '' } = request.query

        await docRef.doc(imovelID).get()
            .then( async doc => {
                    if(doc.data().cpf === cpf){//Se o imóvel pertence ao usuário passado
                        flagImovelPertenceAoUsuario = true;
                        await docRef.doc(imovelID).delete();//apaga o imovel do database
                    }
                    else{
                        response.status(404).send()
                    }
            })
            .catch(() => {//erro ao fazer requisição do banco de dados ou não existe o imovel
                response.status(404).send()
            })

        if(flagImovelPertenceAoUsuario){//altera a quantidade de imoveis atual no database

            await docRef2.where('cpf', '==', String(cpf)).get()
            .then(snapshot => {
                if (snapshot.empty) {//nao encontrou nenhum com o cpf informado
                    response.status(404).send()
                }
                else{
                    snapshot.forEach(doc => {
                        docRef2.doc(doc.id).update({//muda o tipo do plano e a descricao do plano no banco de dados
                            quantAtualImoveis:doc.data().quantAtualImoveis -1 
                        })
                });
                }
            }).catch(() => {
                response.status(404).send()
            })

            await docRef3.where('imovelID', '==', String(imovelID)).get()
            .then(snapshot => {
                if (snapshot.empty) {//nao encontrou o imovel favoritado para nenhum usuario
                    response.status(200).send()
                }
                else{
                    snapshot.forEach(async doc => {
                        await docRef3.doc(doc.id).delete();//se já existir apaga do database
                });
                response.status(200).send()
                }
            }).catch(() => {
                response.status(404).send()
            })
            
            
            
        }

    }

}

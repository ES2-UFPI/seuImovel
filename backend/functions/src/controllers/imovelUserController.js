const db = require('../database/db')//conexão com database

module.exports = {

    async index(request, response) {
        const docRef = db.collection('houses')
        const { cpf = '', imovelID = '' } = request.query
        let cpfDB
        
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
    }

}
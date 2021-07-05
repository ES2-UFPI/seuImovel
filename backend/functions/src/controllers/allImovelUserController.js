const db = require('../database/db')//conexão com database

module.exports = {
    
    async index(request, response){
        const docRef = db.collection('houses')
        const { cpf } = request.query;
        const { page = 1 } = request.query;
        const qtd_imoveisListados = 5;

        const quantTotalImoveisDoUsuario = (await docRef.where('cpf', "==", String(cpf)).get()).size //quantidade total de imóveis
        
        let imoveisDoUsuario = []

        await docRef
        .where('cpf', "==", String(cpf))
        .limit(qtd_imoveisListados)
            .offset((page - 1) * qtd_imoveisListados)
            .get()
            .then((snapshot => {
                snapshot.forEach(doc => {
                    imoveisDoUsuario.push({
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
                response.header('X-Total-Count', quantTotalImoveisDoUsuario)//retorna a quantidade no cabeçalho da requisição
                response.json(imoveisDoUsuario)
            }))
            .catch(() => {
                response.status(404).send()
            })


    }

}
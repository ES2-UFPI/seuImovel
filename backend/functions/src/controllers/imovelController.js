const db = require('../database/db')

module.exports = {

    async index(request, response){


        //paginacao
        const {page = 1} = request.query; 
        const qtd_imoveisListados = 5;
        
        const docRef = db.collection('houses')
        let imoveis = []
    
        await docRef
        .limit(qtd_imoveisListados)
        .offset((page - 1) * qtd_imoveisListados)
        .get()
        .then((snapshot=>{
            snapshot.forEach(doc =>{
                imoveis.push({
                    descricao : doc.data().descricao,
                    numero : doc.data().numero,
                    banheiros : doc.data().banheiros,
                    complemento : doc.data().complemento,
                    dimensao : doc.data().dimensao,
                    imagens : doc.data().imagens,
                    latitude : doc.data().latitude,
                    longitude : doc.data().longitude,
                    proprietario : doc.data().proprietario,
                    quartos : doc.data().quartos,
                    tipo : doc.data().tipo,
                    valor : doc.data().valor,
                })
            })

            response.json(imoveis)
    
        }))
        .catch(()=>{
            response.status(404).send()
        })
    }
    
    }
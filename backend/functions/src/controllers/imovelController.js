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
    },

    async post(req, res){
        const docRef = db.collection('houses')
        const {descricao,
               numero, 
               banheiros, 
               complemento, 
               dimensao,
               imagens,
               latitude,longitude,
               proprietario,
               quartos,
               tipo,
               valor} = req.body

        

        const imovel = {descricao,
            numero, 
            banheiros, 
            complemento, 
            dimensao,
            imagens,
            latitude,longitude,
            proprietario,
            quartos,
            tipo,
            valor}
        
        try {
         await docRef.add(imovel)   
        } catch (e) {
            return res.status(400).json({sucess: false, msg: "Erro de inserção"})
        }
        

        return res.status(200).json({success: true, msg: 'Imóvel cadastrado com sucesso', data: imovel})
    }
    
    }
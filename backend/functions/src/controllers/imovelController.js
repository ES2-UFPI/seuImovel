const db = require('../database/db')

module.exports = {

    async index(request, response){

        //paginacao
        const {page = 1} = request.query; 
        const qtd_imoveisListados = 5;
        
        const docRef = db.collection('houses')
        let imoveis = []
    
        const quantTotalImoveis = (await docRef.get()).size //quantidade total de imóveis

        await docRef
        .limit(qtd_imoveisListados)
        .offset((page - 1) * qtd_imoveisListados)
        .get()
        .then((snapshot=>{
            snapshot.forEach(doc =>{
                imoveis.push({
                    id : doc.id,
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

            response.header('X-Total-Count',quantTotalImoveis)//retorna a quantidade no cabeçalho da requisição
            response.json(imoveis)
    
        }))
        .catch(()=>{
            response.status(404).send()
        })
    },

    async create(req, res){
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
               valor} = req.body

        

        const imovel = {
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
            valor}
        
         await docRef.add(imovel)
         .then(
            res.status(200).send()
         )
         .catch(()=>{
            res.status(400).send()
        })        
    }
    
    }
const db = require('../database/db')

module.exports = {
    async index(request, response){
        const docRef = db.collection('users')
        const {cpf} = request.params

        await docRef.where('cpf', '==', String(cpf)).get()
        .then(snapshot=>{
            if (snapshot.empty) {//nao encontrou nenhum com o cpf informado
                response.status(404).send()
              }
            snapshot.forEach(doc => {
                plano =  doc.data().plano,
                descricaoPlano =  doc.data().descricaoPlano
                notificacoes = doc.data().notificacoes
                raioNotificacoes = doc.data().raioNotificacoes
              });
            response.json({plano,descricaoPlano,notificacoes,raioNotificacoes})
        })
        .catch(()=>{//erro ao fazer requisição do banco de dados
            response.status(404).send()
        })
    },

    async update(request,response){
        const docRef = db.collection('users')
        const {cpf} = request.params
        const {plano , descricaoPlano, notificacoes, raioNotificacoes} = request.body

        if (plano != "premium" && plano != "gratis"){//deve ser passado uma string como o nome premium ou gratis
            response.status(404).send()
            return
        }
        await docRef.where('cpf', '==', String(cpf)).get()
        .then(snapshot=>{
            if (snapshot.empty) {//nao encontrou nenhum com o cpf informado
                response.status(404).send()
              }
            
            snapshot.forEach(doc => {
                db.collection('users').doc(doc.id).update({//muda o tipo do plano e a descricao do plano no banco de dados
                    plano : String(plano),
                    descricaoPlano : String(descricaoPlano),
                    notificacoes : Boolean(notificacoes),
                    raioNotificacoes : Number(raioNotificacoes)
                })
                response.status(200).send()
              });
        })
        .catch(()=>{
            response.status(404).send()
        })





    }


}

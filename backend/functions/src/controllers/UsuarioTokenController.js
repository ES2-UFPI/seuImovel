const db = require('../database/db')


module.exports = {
    async index(request, response) {//retorna todos tokens obtidos e seus usuarios correspondentes (Cada token é um dispositivo mobile)
        const docRef = db.collection('tokens')
        const dispostivosMoveis = []

        await docRef.get()
            .then(snapshot => {
                if (snapshot.empty) {//se não possui nenhum token, então...
                    response.status(404).send()
                }
                snapshot.forEach(doc => {
                    dispostivosMoveis.push({
                        cpf: doc.data().cpf,
                        token: doc.data().token,
                        criacao: doc.data().criacao
                    })

                });
                response.json(dispostivosMoveis)
            })
            .catch(() => {//erro ao fazer requisição do banco de dados
                response.status(404).send()
            })
    },


    async create(req, res) {
        const docRef = db.collection('tokens')
        const {
            cpf,
            token
        } = req.body




        await docRef.where('token', "==", String(token)).get()
            .then(async (snapshot) => {
                if (snapshot.empty) {//se não possui nenhum token igual ao passado entao adiciona no banco de dados
                    await docRef.add({
                        cpf: String(cpf),
                        token: String(token),
                        criacao : new Date().toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'}),
                        mudanca: new Date().toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'})
                    })
                        .then(//deu certo adicionar
                            res.status(200).send()
                        )
                        .catch(() => {//deu algum erro ao adicionar
                            res.status(404).send()
                        })
                }
                snapshot.forEach(async doc =>{//se entrar aqui é porque outro usuário entrou no mesmo dispositivo ou o mesmo usuario solicitou fazer um novo token
                    if(doc.data().cpf != cpf){//Condição caso já exista cpf nao faz update
                    await docRef.doc(doc.id).update({
                        cpf : String(cpf),//se outro usuario estiver entrado no mesmo dispositivo atualiza o cpf
                        mudanca: new Date().toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'})
                    })
                }
                })

                res.status(200).send()//Não foi possível cadastrar o token porque ele já existe no banco de dados
            })
            .catch(() => {//erro ao fazer requisição do banco de dados
                response.status(404).send()
            })

    }

}
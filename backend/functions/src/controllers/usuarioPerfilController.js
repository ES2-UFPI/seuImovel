const db = require('../database/db')

module.exports = {
    async index(request, response) {//Informações sobre o perfil do usuário
        const docRef = db.collection('users')
        const { cpf } = request.params

        await docRef.where('cpf', '==', String(cpf)).get()
            .then(snapshot => {
                if (snapshot.empty) {//nao encontrou nenhum com o cpf informado
                    response.status(404).send()
                }
                snapshot.forEach(doc => {
                    nome = doc.data().proprietario
                    email = doc.data().email
                    idade = doc.data().idade
                    nascimento = doc.data().nascimento
                    telefone = doc.data().telefone
                });
                response.json({ cpf, nome, email, idade, nascimento, telefone})
            })
            .catch(() => {//erro ao fazer requisição do banco de dados
                response.status(404).send()
            })
    },


    async update(request, response) {


        /*A rota relacionada a função setPlano
        muda as configurações relacionadas ao plano do usuário
        basta passar o cpf na rota e no body envia os dados que devem ser modificados!
        */

        const docRef = db.collection('users')
        const { cpf } = request.params
        const { nome, email, idade, nascimento, telefone} = request.body

       
        await docRef.where('cpf', '==', String(cpf)).get()
            .then(snapshot => {
                if (snapshot.empty) {//nao encontrou nenhum com o cpf informado
                    response.status(404).send()
                }

                snapshot.forEach(doc => {
                    db.collection('users').doc(doc.id).update({//muda o tipo do plano e a descricao do plano no banco de dados
                        proprietario: String(nome),
                        email: String(email),
                        idade: parseInt(String(idade)),
                        nascimento: String(nascimento),
                        telefone: parseInt(String(telefone))
                    })
                    response.status(200).send()
                });
            })
            .catch(() => {
                response.status(404).send()
            })


    }
}
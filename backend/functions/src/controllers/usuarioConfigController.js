const db = require('../database/db')
const ConfigUsuario = require('../classes/ConfigUsuario')

module.exports = {
    /*A rota relacionada a função Index
    lista a configuração de usuário, basta passar o cpf do usuário na rota /usuarioConfig/113456923954
    */
    async index(request, response) {//Configuração do Plano do usuário
        const docRef = db.collection('users')
        const { cpf } = request.params

        await docRef.where('cpf', '==', String(cpf)).get()
            .then(snapshot => {
                if (snapshot.empty) {//nao encontrou nenhum com o cpf informado
                    response.status(404).send()
                }
                snapshot.forEach(doc => {
                    plano = doc.data().plano,
                    descricaoPlano = doc.data().descricaoPlano
                    notificacoes = doc.data().notificacoes
                    quantImagens = doc.data().quantImagens
                    quantImoveis = doc.data().quantImoveis
                    quantAtualImoveis = doc.data().quantAtualImoveis
                });
                response.json({ plano, descricaoPlano, notificacoes, quantImagens, quantImoveis, quantAtualImoveis})
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
        const { plano, descricaoPlano,quantImagens,quantImoveis, notificacoes } = request.body

        configUsuario = new ConfigUsuario(plano, descricaoPlano, notificacoes,quantImagens,quantImoveis)

        if (configUsuario.plano.toLowerCase().search("premium") === -1 && configUsuario.plano.toLowerCase() != "gratis" && configUsuario.plano.toLowerCase() != "grátis") {//deve ser passado uma string como o nome premium ou gratis
            response.status(404).send()
            return
        }
        await docRef.where('cpf', '==', String(cpf)).get()
            .then(snapshot => {
                if (snapshot.empty) {//nao encontrou nenhum com o cpf informado
                    response.status(404).send()
                }

                snapshot.forEach(doc => {
                    db.collection('users').doc(doc.id).update({//muda o tipo do plano e a descricao do plano no banco de dados
                        plano: configUsuario.plano,
                        descricaoPlano: configUsuario.descricaoPlano,
                        quantImagens: configUsuario.quantImagens,
                        quantImoveis: configUsuario.quantImoveis,
                        notificacoes: configUsuario.notificacoes
                    })
                    response.status(200).send()
                });
            })
            .catch(() => {
                response.status(404).send()
            })
    }
}

const db = require('../database/db')

module.exports = {
    async index2(request, response) {//Informações sobre o perfil do usuário pelo email
        const docRef = db.collection('users')
        const { email } = request.params

        await docRef.where('email', '==', String(email)).get()
            .then(snapshot => {
                if (snapshot.empty) {//nao encontrou nenhum com o cpf informado
                    response.status(404).send()
                }
                snapshot.forEach(doc => {
                    nome = doc.data().proprietario
                    nascimento = doc.data().nascimento
                    telefone = doc.data().telefone
                    cpf = doc.data().cpf
                });
                response.json({ cpf, nome, nascimento, telefone })
            })
            .catch(() => {//erro ao fazer requisição do banco de dados
                response.status(404).send()
            })
    },

    async index(request, response) {//Informações sobre o perfil do usuário pelo cpf
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
                    nascimento = doc.data().nascimento
                    telefone = doc.data().telefone
                });
                response.json({ cpf, nome, email, nascimento, telefone })
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
        const { nome, email, nascimento, telefone } = request.body


        await docRef.where('cpf', '==', String(cpf)).get()
            .then(snapshot => {
                if (snapshot.empty) {//nao encontrou nenhum com o cpf informado
                    response.status(404).send()
                }

                snapshot.forEach(doc => {
                    db.collection('users').doc(doc.id).update({//muda o tipo do plano e a descricao do plano no banco de dados
                        proprietario: String(nome),
                        email: String(email),
                        nascimento: String(nascimento),
                        telefone: parseInt(String(telefone))
                    })
                    response.status(200).send()
                });
            })
            .catch(() => {
                response.status(404).send()
            })
    },

    async create(request, response) {
        const docRef = db.collection('users')

        const { email, cpf, nascimento, proprietario, telefone } = request.body

        let flagEmail = false

        await docRef.where('cpf', '==', String(cpf)).get()
            .then(async snapshot => {
                if (snapshot.empty) {
                    flagEmail = true//nao encontrou nenhum com o cpf informado entao verifica agora se já existe algum email já cadastrado
                }
                else {
                    response.status(404).json({ Cadastrado: "CPF já foi cadastrado" }).send()
                }
            })
            .catch(() => {
                response.status(404).json({ Database: "Erro ao obter requisição do database" }).send()
            })


        if (flagEmail) {
            console.log(email)

            await docRef.where('email', '==', String(email)).get()
                .then(async snapshot => {
                    if (snapshot.empty) {//entao é porque o email não foi cadastrado ainda
                        await docRef.add({
                            cpf: String(cpf),
                            descricaoPlano: "Plano de até 3 imóveis e 3 fotos por imóvel",
                            email: String(email),
                            nascimento: String(nascimento),
                            plano: "grátis",
                            proprietario: String(proprietario),
                            quantAtualImoveis: 0,
                            quantImovel: 3,
                            quantImagens: 3,
                            telefone: Number(telefone),
                            notificacoes: true
                        })
                            .then(() => {
                                response.json({ Cadastrado: "Usuário foi cadastrado" })
                            })
                            .catch(() => {//deu algum erro ao adicionar
                                response.status(404).json({ Database: "Erro ao adicionar usuario no database" }).send()
                            })
                    }
                    else {
                        response.status(404).json({ Database: "Email já existe" }).send()
                    }
                })
                .catch(() => {
                    response.status(404).json({ Database: "Erro ao obter requisição do database" }).send()
                })

        }
    },

    async delete(request, response) {
        docRef = db.collection('users')
        docRef2 = db.collection('favorites')
        docRef3 = db.collection('tokens')
        docRef4 = db.collection('houses')

        const { cpf } = request.params

        let flag1 = false

        //DELETA EMAIL DO USUARIO CADASTRADO
        await docRef.where('cpf', '==', String(cpf)).get()
            .then(snapshot => {
                if (snapshot.empty) {//entao é o usuario não está cadastrado
                    response.status(404).json({ Erro: "Usuário cadastrado não existe!" })
                }
                else {
                    flag1 = true
                    snapshot.forEach(async doc => {
                        await docRef.doc(doc.id).delete();
                    })
                }
            })
            .catch(() => {
                response.status(404).json({ Erro: "Falha ao deletar" })
            })

        if (flag1) {//se o usuario existe

            //DELETA IMÓVEIS FAVORITADOS
            await docRef2.where('cpf', '==', String(cpf)).get()
            .then(snapshot =>{
                if(snapshot.empty){//usuario não possui imóveis favoritados
                    
                }
                else{
                    snapshot.forEach(async doc => {
                        await docRef.doc(doc.id).delete();//apaga todos imóveis favoritados
                    })
                }
            })
            .catch(()=>{
                response.status(404).json({ Erro: "Falha ao deletar" })
            })

            //Deleta tokens do usuário no dispositivo
            await docRef3.where('cpf','==',String(cpf)).get()
            .then(snapshot =>{
                if(snapshot.empty){

                }
                else{
                    snapshot.forEach(async doc => {
                        await docRef.doc(doc.id).delete();//apaga todos tokens do usuario
                    })
                }
            })
            .catch(()=>{
                response.status(404).json({ Erro: "Falha ao deletar" })
            })


            //Deleta Imóveis cadastrados pelo usuário
            await docRef4.where('cpf','==',String(cpf)).get()
            .then(snapshot =>{
                if(snapshot.empty){

                }
                else{
                    snapshot.forEach(async doc => {
                        await docRef.doc(doc.id).delete();//apaga imóveis do usuario
                    })
                }
            })
            .catch(()=>{
                response.status(404).json({ Erro: "Falha ao deletar" })
            })

            response.status(200).json({ Ok: "Usuário deletado!" })

            
        }



    }

}
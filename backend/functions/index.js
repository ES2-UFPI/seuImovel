const functions = require('firebase-functions')

const db = require('./src/database/db')//conexão com database vai servir apenas para o onUpdate no exports.notifcacoes

const fetch = require('node-fetch')

const express = require('express')

const routes = require('./src/routes')

const app = express()

app.use(express.json())

app.use(routes)

exports.notificacoes = functions.firestore
    .document(`houses/{id}`)//fica observando quando algum documento foi feito update na tabela de houses
    .onUpdate(async (change, context) => {
        const documentoNovo = change.after.data();//Depois do update
        const documentoAntigo = change.before.data();//Antes do update

        if (documentoNovo.valor != documentoAntigo.valor) {
            const docRef = db.collection('favorites')
            let idDocumento = change.after.id //id do documento que teve update
            let cpfDosUsuarios = []
            //console.log("ID do Documento do update: ",idDocumento)
            /*
            tem que fazer essa verificao pq essa função(onUpdate) verifica qualquer update no documento, em qualquer campo, 
            porem só interessa mudanças no campo valor
            */

            await docRef.where('imovelID', "==", String(idDocumento)).get()
                .then(async (snapshot) => {
                    if (snapshot.empty) {//se não existe o imóvel passado, entao é pq ninguem favoritou
                    }
                    else {
                        snapshot.forEach(doc => {
                            cpfDosUsuarios.push(doc.data().cpf)//Pega todos cpfs que favoritaram o imóvel
                        })
                    }
                })
                .catch(() => {//erro ao fazer requisição do banco de dados
                    console.log("Erro ao fazer requisição no database")
                })

            if (cpfDosUsuarios.length > 0) {//se existir usuarios que favoritaram os imóveis...

                const docRef2 = db.collection('users')
                let notificacoes //verifica se o usuario desejou ou não receber notificações
                let cpfDosUsuariosNotificados = []//apenas usuarios que favoritaram e desejam receber as notificações

                for (i = 0; i < cpfDosUsuarios.length; i++) {//agr tem que minerar do vetor. Notificacoes devem aparecer apenas os usuarios que desejam recebe-las
                    await docRef2.where('cpf', "==", String(cpfDosUsuarios[i])).get()
                        .then(
                            async (snapshot) => {
                                if (snapshot.empty) {
                                    console.log("Erro cpf não existe no BD")
                                }
                                else {
                                    snapshot.forEach(doc => {
                                        notificacoes = doc.data().notificacoes
                                    })
                                    if (notificacoes === true) {//se o usuario tiver ativado as notificações,nas suas configurações, então deve ser enviado para ele
                                        cpfDosUsuariosNotificados.push(cpfDosUsuarios[i])
                                    }
                                }
                            }
                        )
                        .catch(() => { console.log("Erro ao fazer requisição no database") })
                }


                //3 etapa: enviar mensagem de notificacao para os usuarios com seus respectivos tokens

                const docRef3 = db.collection('tokens')
                let mensagens = [] //mensagens a serem enviadas
                let token //token do usuario
                let k = ''

                for (i = 0; i < cpfDosUsuariosNotificados.length; i++) {
                    await docRef3.where('cpf', "==", String(cpfDosUsuariosNotificados[i])).get()
                        .then(
                            async (snapshot) => {
                                if (snapshot.empty) {
                                    console.log("Não existe token para esse usuário!")
                                }
                                else {//Envia Notificação para o usuário
                                    snapshot.forEach(doc => {
                                        token = doc.data().token
                                    })
                                    if(documentoNovo.valor>documentoAntigo.valor){
                                        k='aumentou'
                                    }
                                    else{
                                        k='diminuiu'
                                    }
                                    mensagens.push({
                                        "to": token,
                                        "sound": "default",
                                        "title":`O preço do imóvel ${k}!`,
                                        "body":`${documentoNovo.descricao}`
                                    })
                                }
                            }
                        )
                        .catch(() => { console.log("Erro ao fazer requisição no database tokens") })

                    if (mensagens.length > 0) {//Envia mensagens 
                        fetch("https://exp.host/--/api/v2/push/send", {
                            method: "POST",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(mensagens)
                        })
                    }
                }
                console.log("Usuarios que desejam receber:", cpfDosUsuariosNotificados)

            }

        }
        else {
            console.log("Alteração foi feita em outro campo.")
        }

    })

exports.api = functions.https.onRequest(app)
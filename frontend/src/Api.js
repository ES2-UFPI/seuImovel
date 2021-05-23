import axios from 'axios'
const BASE_API = 'https://us-central1-seuimovel-2b042.cloudfunctions.net/api/';



const api = axios.create({
    baseURL: BASE_API
})

export default {

    getListaImoveis: (page) =>{

        return api.get(`/listaImoveis/?page=${page}`).then(res =>{
            return res.data;
        })
    }
}
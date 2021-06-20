import axios from 'axios'
// https://us-central1-seuimovel-2b042.cloudfunctions.net/api
const api = axios.create({
    baseURL: 'https://us-central1-seuimovel-2b042.cloudfunctions.net/api'
})

export default api
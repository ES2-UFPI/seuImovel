import axios from 'axios'

const api = axios.create({
    baseURL: 'https://us-central1-seuimovel-2b042.cloudfunctions.net/api'
})

export default api
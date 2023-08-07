import axios from 'axios'

const myAxios = axios
myAxios.defaults.baseURL = "https://localhost:3003"

export {myAxios}
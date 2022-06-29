import axios from "axios";


const api = axios.create({
  baseURL: "http://34.95.198.36:3333"
})

export default api;
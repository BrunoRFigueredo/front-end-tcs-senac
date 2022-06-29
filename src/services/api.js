import axios from "axios";


const api = axios.create({
  baseURL: "34.151.224.90:8080"
})

export default api;
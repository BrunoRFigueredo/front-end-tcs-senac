import axios from "axios";


const api = axios.create({
  baseURL: "http://34.151.224.90:8080"
})

export default api;
import axios from "axios";


const api = axios.create({
  baseURL: "https://gestao-projetos-sociais.herokuapp.com"
})

export default api;
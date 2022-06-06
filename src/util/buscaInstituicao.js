import CrudService from "@/services/crud";
import api from "axios";
import router from '@/router'

export async function buscarInstituicao(idUsuario){    
    let instituicao = {};

    await api.get('http://localhost:8080/instituicao/usuario/'+ idUsuario)
    .then(response => {
        instituicao = {id:  response.data.id, nome: response.data.nome};
    }).catch(error => {
        if (error.response.data.error === 'Not Found') {
            alert('Usuário não está vinculado a uma instituição!');
        } 
        else if (!error.response.data.message){
            alert('Erro ao buscar instituição do usuário: ' + error.response.data.error);
        }
        else if (error.response.data.message){
            alert('Erro ao buscar instituição do usuário: ' + error.response.data.message);
        }
        router.push('/projeto');
    })

    return { instituicao };
}


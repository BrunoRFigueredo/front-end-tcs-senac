import api from "axios";
import router from '@/router'

export async function buscarInstituicao(idUsuario) {
    let instituicao = {};

    await api.get('https://gestao-projetos-sociais.herokuapp.com/instituicao/usuario/' + idUsuario)
        .then(response => {
            instituicao = {id: response.data.id, nome: response.data.nome};
        }).catch(error => {
            console.log(error);
        });

    return {instituicao};
}


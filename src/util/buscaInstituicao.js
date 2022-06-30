import api from "@/services/api";
import router from '@/router'

export async function buscarInstituicao(idUsuario) {
    let instituicao = {};

    await api.get('/instituicao/usuario/' + idUsuario)
        .then(response => {
            instituicao = {id: response.data.id, nome: response.data.nome};
        }).catch(error => {
            console.log(error);
        });

    return {instituicao};
}


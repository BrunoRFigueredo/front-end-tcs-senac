import api from "@/services/api";
import router from '@/router'

export async function buscarVoluntario(idUsuario) {
    let voluntario = {};

    await api.get('/voluntario/usuario/' + idUsuario)
        .then(response => {
            voluntario = {id: response.data.id, nome: response.data.nome};
        }).catch(error => {
            console.log(error);
        })

    return {voluntario};
}


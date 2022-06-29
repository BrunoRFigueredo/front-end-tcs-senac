import api from "axios";
import router from '@/router'

export async function buscarVoluntario(idUsuario) {
    let voluntario = {};

    await api.get('http://34.151.224.90:8080/voluntario/usuario/' + idUsuario)
        .then(response => {
            voluntario = {id: response.data.id, nome: response.data.nome};
        }).catch(error => {
            console.log(error);
        })

    return {voluntario};
}


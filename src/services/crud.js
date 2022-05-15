import {getClient} from './http'

class CrudService {

    constructor(path) {
        this.path = path
    }

    findAll({paginaDesejada = 0, tamanhoPagina = 10, filter = ''}) {
        return getClient().get(`${this.path}?paginaDesejada=${paginaDesejada}&tamanhoPagina=${tamanhoPagina}&filter=${filter}`)
    }

    findById(id) {
        return getClient().get(`${this.path}${id}`)
    }

    save(record) {
        if (record.id) {
            return getClient().put(`${this.path}${record.id}`, record)
        }
        return getClient().post(this.path, record)
    }

    saveImagem(imagem) {
        const formData = new FormData();
        formData.append('file', imagem);
        return getClient().post(this.path, formData)
    }

    remove(id) {
        return getClient().delete(`${this.path}${id}`)
    }
}

export default CrudService

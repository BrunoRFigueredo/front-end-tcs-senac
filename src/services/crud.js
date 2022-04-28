import { getClient } from './http'

class CrudService {

  constructor(path) {
    this.path = path
  }

  findAll({ page=1, limit=10, filter='' }) {
    return getClient().get(`${this.path}?page=${page}&limit=${limit}&filter=${filter}`)
  }

  findById(id) {
    return getClient().get(`${this.path}/${id}`)
  }

  save(record) {
    if (record.id) {
      return getClient().put(`${this.path}/${record.id}`, record)
    }
    return getClient().post(this.path, record)
  }

  remove(id) {
    return getClient().delete(`${this.path}/${id}`)
  }
}

export default CrudService

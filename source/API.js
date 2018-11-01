const axios = require('axios')

class API {

  constructor({ url }){
    this.url = url
    this.endpoints = {}
  }
  /**
   * Create and store a single entity's endpoints
   * @param {A entity Object} entity
   */
  createEntity(entity) {
    this.endpoints[entity.name] = this.createBasicCRUDEndpoints(entity)
  }

  createEntities(arrayOfEntity) {
    arrayOfEntity.forEach(this.createEntity.bind(this))
  }
  /**
   * Create the basic endpoints handlers for CRUD operations
   * @param {A entity Object} entity
   */
  createBasicCRUDEndpoints( { name } ) {
    var endpoints = {}

    const resourceURL = `${this.url}/${name}`

    endpoints.getAll = ({ query = {} }, config = {}) => {
      return axios.get(
        resourceURL,
        Object.assign({ params: { query }, config })
      )
    }

    endpoints.getOne = ({ id }, config = {}) => {
      return axios.get(`${resourceURL}/${id}`, config)
    }

    endpoints.create = (toCreate, config = {}) => {
      return axios.post(resourceURL, toCreate, config)
    }

    endpoints.update = (toUpdate, config = {}) => {
      return axios.put(`${resourceURL}/${toUpdate.id}`, toUpdate, config)
    }

    endpoints.patch = ({ id }, toPatch, config = {}) => {
      return axios.patch(`${resourceURL}/${id}`, toPatch, config)
    }

    endpoints.delete = ({ id }, config = {}) => {
      return axios.delete(`${resourceURL}/${id}`, config)
    }
    
    return endpoints

  }

}

export default API

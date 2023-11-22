import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

/**
 * Hakee kaikki kontaktit palvelimelta
 */
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(r => r.data)
}

const get = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(r => r.data)
}

const create = newContact => {
    const request = axios.post(baseUrl, newContact)
    return request.then(r => r.data)
}

const update = (id, newContact) => {
    const request = axios.put(`${baseUrl}/${id}`, newContact)
    return request.then(r => r.data)
}

const patch = (id, newValue) => {
    const request = axios.patch(`${baseUrl}/${id}`, newValue)
    return request.then(r => r.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(r => r.data)
}

export default { getAll, get, create, update, patch, remove }
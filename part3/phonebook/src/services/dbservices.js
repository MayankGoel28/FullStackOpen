import axios from 'axios'

const dburl = '/api/persons'

const fetchy = () => {
    return axios.get(dburl)
}

const posty = (newObject) => {
    return axios.post(dburl, newObject)
}

const delety = (id) => {
    return axios.delete(`${dburl}/${id}`)
}

const putty = (id, newObject) => {
    return axios.put(`${dburl}/${id}`, newObject)
}
export default {
    fetchy,
    posty,
    delety,
    putty
}

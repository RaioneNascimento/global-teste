import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_HOST;

const usersService = {

    async list(){
        const enpoint = apiUrl + "/users"
        return axios.get(enpoint)
    },

    async getOne(userId){
        const enpoint = apiUrl + "/users/" + userId
        return axios.get(enpoint)
    },

    async create(data){
        const enpoint = apiUrl + "/users"
        return axios.post(enpoint, data)
    },

    async edit(data, userId){
        const enpoint = apiUrl + "/users/" + userId
        return axios.put(enpoint, data)
    },

    async delete(userId){
        const enpoint = apiUrl + "/users/" + userId
        return axios.delete(enpoint)
    },


}

export default usersService;
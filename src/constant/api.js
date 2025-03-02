import axios from "axios"

export const ROOT_API = 'http://localhost:3000/'

const token = localStorage.getItem('accessToken')

const headers = { headers: {Authorization : `Bearer ${token}`}}

export const getAPI = (url) => {
   return axios.get(url, headers)
}

export const postAPI = (url, data) => {
    return axios.post(url, data)
}

export const putAPI = (url, data) => {
   return axios.put(url, data, headers)
}
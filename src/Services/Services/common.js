import axios from '../config'

const CommonService = (request) => {
   const { method, url, data, headers, params, baseURL } = request
   return axios({ method, url, data, params, baseURL, headers })
       .then(({ data }) => Promise.resolve(data))
       .catch(error => {
           displayCatchErrorMsg(error)
           return Promise.reject(error)
       })
}

export default CommonService
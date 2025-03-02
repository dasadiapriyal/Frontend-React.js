import axios from "axios"
import { Toast } from "../Components"

import { API_URL } from "../Services/api/routes/Common"
import { store } from '../redux/store'
import { handleLogout } from "../redux/authentication"

const Instance = axios.create({
   baseURL: API_URL,
   headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Allow-Access-Control-Allow-Origin": "*"
   }
})

const requestHandler = (config) => {
   const token = localStorage.getItem('accessToken')
   // Add User Token in requests
   if (!config.headers.Authorization) {
      config.headers.Authorization = token ? `Bearer ${token}` : ''
   }

   return config
}

//request interceptor
Instance.interceptors.request.use(
   (config) => requestHandler(config),
   (error) => Promise.reject(error)
)

const errorHandler = (error) => {
   // let previousRequest = {}
   if (!error.response) {
      // Ofline or request Rejected
      Toast.error(error.message || "Network error - something went wrong", "Network error")
   }

   if (error.response && error.response.data) {
      // if (error.response.data.status !== "E_INVALID_TOKEN") {
      //    //Network error Popup
      //    Toast.error(error.response.data.message)
      //    console.log('ska unauthorized',error.response.data)
      // }

      if ([ "BAD_REQUEST" ].includes(error.response.data.status) ) {
         Toast.error(error.response.data.message)
      } 

      if ([ "UNAUTHORIZED" ].includes(error.response.data.status) ) {
         Toast.error(error.response.data.message, "unauthorized")
         // logout User
         store.dispatch(handleLogout())

      } 
      // else if (error.response.data.status === "E_INVALID_TOKEN") {
      //    //refresh token
      //    // const refreshToken = localStorage.getItem("refreshToken")
      //    // const req = { refreshToken: "jwt " + JSON.parse(refreshToken) }
      //    const canCall = true

      //    previousRequest = error.config
      //    if (canCall) {
      //       const tokenResponse = CommonService({...tokenRefresh, data: req })
      //          .then(async (data) => {
      //             if (data && data.code === "OK") {
      //                // For Updating tokrn in rudux and localstorage
      //                // dispatch(setToken(data.data.token))
                     
      //                previousRequest.headers.Authorization = `JWT ${data.data.token}`
      //                const res = await Instance(previousRequest) // call API which had return expire token error
      //                return Promise.resolve(res)
      //             }
      //          })

      //       if (tokenResponse) return Promise.resolve(tokenResponse)
      //    }
      // }
   }
   return Promise.reject(error)
}

//response interceptor
Instance.interceptors.response.use(
   (response) => Promise.resolve(response),
   (error) => errorHandler(error)
)

export default Instance

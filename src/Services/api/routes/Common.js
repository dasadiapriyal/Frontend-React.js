
let ROOT_API = 'http://localhost:5000'

if(process.env.NODE_ENV === 'development'){
  ROOT_API = 'http://localhost:5000'
}else{
  ROOT_API = 'http://localhost:3000'
}

export const API_MODULE = {
  ALL: 1,
}

export const BASE_URL = {
  [API_MODULE.ALL]: `${ROOT_API}`,
}

let apiUrl
if (process.env.PUBLIC_URL === "production") {
  apiUrl = "/"
}

export const API_URL = apiUrl
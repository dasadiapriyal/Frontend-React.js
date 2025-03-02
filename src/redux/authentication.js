// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { decryptData, encryptData } from '../utility/Crypto'


const initialUser = () => {
  let item = decryptData(localStorage.getItem('userData'))
  //** Parse stored json or if none return initialValue
  // return item ? JSON.parse(item) : {}
  return item ? item : {}
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser()
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload

      localStorage.setItem('userData', encryptData(action.payload))
      localStorage.setItem('accessToken', action.payload.accessToken)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
    },
    handleLogout: state => {
      state.userData = {}
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userData')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer

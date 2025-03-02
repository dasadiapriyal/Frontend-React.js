// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Axios from "../../../configs/httpConfig"

// ** Axios Imports
// import { getAPI, postAPI, putAPI } from '../../../../constant/api'
import { 
  ChangePassword, 
  CityList, 
  CountryList, 
  RegenrateApiKey, 
  StateList, 
  userData, 
  UserUpdateProfile 
} from '../../../Services/api/routes/APIRoutes'

export const getUserProfile = createAsyncThunk('appChat/getTasks', async () => {
  const response = await axios.get('/apps/chat/users/profile-user')
  return response.data
})

// export const getChatContacts = createAsyncThunk('appChat/getChatContacts', async () => {
//   const response = await axios.get('/apps/chat/chats-and-contacts')
//   return response.data
// })

// export const selectChat = createAsyncThunk('appChat/selectChat', async (id, { dispatch }) => {
//   const response = await axios.get('/apps/chat/get-chat', { id })
//   await dispatch(getChatContacts())
//   return response.data
// })

const token = localStorage.getItem('accessToken')

export const getLoginUser = createAsyncThunk('accountSet/getLoginUser',async () => {
  const response = await Axios(userData)
  return response.data.data
})

export const allCountry = createAsyncThunk('accountSet/allCountry', async (obj) => {
  const response = await Axios({...CountryList, data: obj})
  return response.data.data
})

export const getStates = createAsyncThunk('accountSet/getStates', async (obj) => {
    const response = await Axios({...StateList, data: obj})
    return response.data.data
  })

export const getCity = createAsyncThunk('accountSet/getCity', async (obj) => {
    const response = await Axios({...CityList, data: obj})
    return response.data.data
  })

  export const updateProfile = createAsyncThunk('accountSet/updateProfile', async (obj) => {
    const response = await Axios({...UserUpdateProfile, data: obj})

    return response.data
  })

  export const regenrateApiKey = createAsyncThunk('accountSet/regenrateApiKey', async (obj) => {
    const response = await Axios({...RegenrateApiKey, data: obj})

    return response.data
  })

  export const changePassword = createAsyncThunk('accountSet/changePassword', async (obj) => {
    const response = await Axios({...ChangePassword, data: obj})

    return response.data
  })


export const accountSettingSlice = createSlice({
  name: 'accountSet',
  initialState: {
    loginUserdata: null,
    allCountrydata: [],
    states:[],
    city: [],
    loading: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(allCountry.fulfilled, (state, action) => {
        state.allCountrydata = action.payload
      }) 
      .addCase(getStates.fulfilled, (state, action) => {
        state.states = action.payload
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.city = action.payload
      }) 
      .addCase(getLoginUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getLoginUser.fulfilled, (state, action) => {
        state.loginUserdata = action.payload
        state.loading = false
      })  
      .addCase(getLoginUser.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(updateProfile.fulfilled, (state, action) => {  
        state.loginUserdata = action.payload.data
      }) 
      .addCase(regenrateApiKey.fulfilled, (state, action) => {  
        state.loginUserdata.apiKey = action.payload.data.apiKey
      })
      .addCase(changePassword.fulfilled, (state, action) => { 
        // state.loginUserdata.apiKey = action.payload.data.apiKey
      })  
  }
})

export default accountSettingSlice.reducer

// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AddPaymentMethod, CustomerAccounts, CustomerAccountsById, CustomerAccountTypes, CustomerRank } from '../../../../Services/api/routes/APIRoutes'
import Axios from "../../../../Services/api/config"

export const customerAccounts = createAsyncThunk('customerAccount/customerAccountList', async (obj) => {
    const response = await Axios({...CustomerAccounts, data: obj})
    return response.data.data 
  })

export const customerAccountById = createAsyncThunk('customerAccount/customerAccountDetail', async (id) => {
    let {url, ...rest} = CustomerAccountsById
    url= url+`/${id}`
    const response = await Axios({url, ...rest})
    return response.data.data 
})

export const customerOrders = createAsyncThunk('customerAccount/customerOrderList', async (obj) => {
  const response = await Axios({...CustomerOrders, data: obj})
  return response.data.data 
})

export const customerAccountTypes = createAsyncThunk('customerAccount/customerAccountTypeList', async (obj) => {
  const response = await Axios({...CustomerAccountTypes, data: obj})
  return response.data.data 
})

export const customerRank = createAsyncThunk('customerAccount/customerRankList', async (obj) => {
  const response = await Axios({...CustomerRank, data: obj})
  return response.data.data 
})

export const addPaymentMethod = createAsyncThunk('customerAccount/addPaymentMethod', async (obj) => {
  const response = await Axios({...AddPaymentMethod, data: obj})
  return response.data.data 
})

export const customerAccountsSlice = createSlice({
  name: 'customerAccount',
  initialState: {
    customerAccounts: {},
    loading: false,
    customerAccountById: null,
    customerOrderList: [],
    customerAccountTypeList: [],
    customerRankList: [],
    payments: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(customerAccounts.fulfilled, (state, action) => {
        state.customerAccounts = action.payload
      }) 
      .addCase(customerAccountById.pending, (state, action) => {
        state.loading = true
      })
      .addCase(customerAccountById.fulfilled, (state, action) => {
        state.customerAccountById = action.payload
        state.loading = false
      })
      .addCase(customerAccountById.rejected, (state, action) => {
        state.loading = false
      }) 
      .addCase(customerOrders.fulfilled, (state, action) => {
        state.customerOrderList = action.payload
      }) 
      .addCase(customerAccountTypes.fulfilled, (state, action) => {
        state.customerAccountTypeList = action.payload
      }) 
      .addCase(customerRank.fulfilled, (state, action) => {
        state.customerRankList = action.payload
      }) 
      .addCase(addPaymentMethod.fulfilled, (state, action) => {
        state.payments = action.payload
      }) 
  }
})

export default customerAccountsSlice.reducer

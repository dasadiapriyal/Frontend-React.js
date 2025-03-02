// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from "../../../../Services/api/config"
import { HealthInspector, LtvMoniter, RevenueForecaster} from '../../../../Services/api/routes/APIRoutes'

export const healthInspector = createAsyncThunk('insights/healthInspector', async (obj) => {
    const response = await Axios({...HealthInspector, data: obj})
    return response.data.data 
})

export const revenueForecaster = createAsyncThunk('insights/revenueforecaster', async (obj) => {
  const response = await Axios({...RevenueForecaster, data: obj})
  return response.data.data 
})

export const ltvMoniter = createAsyncThunk('insights/ltvmoniter', async (obj) => {
  const response = await Axios({...LtvMoniter, data: obj})
  return response.data.data 
})

export const insightsSlice = createSlice({
  name: 'insights',
  initialState: {
    HealthInspectorDetails: null,
    revenueForecasterDetails: null,
    ltvMoniterDetails: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(healthInspector.fulfilled, (state, action) => {
        state.HealthInspectorDetails = action.payload
      }) 
      .addCase(revenueForecaster.fulfilled, (state, action) => {
        state.revenueForecasterDetails = action.payload
      })
      .addCase(ltvMoniter.fulfilled, (state, action) => {
        state.ltvMoniterDetails = action.payload
      })
  }
})

export default insightsSlice.reducer

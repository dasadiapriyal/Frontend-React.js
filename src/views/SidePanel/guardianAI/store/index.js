// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from "../../../../Services/api/config"
import { ClientBranding, ClientBrandingUpdate, GetPreventionRecoveryCampaign, GuardianAiMessageList, GuardianAiMessageUpdate, GuardianOutreachQueue, ProtectionMetrics, UpdateSuppessionList } from '../../../../Services/api/routes/APIRoutes'
import OutreachQueue from '../outreachQueue'

export const outreachQueue = createAsyncThunk('guardianAI/outreachQueue', async (obj) => {
    const response = await Axios({...GuardianOutreachQueue, data: obj})
    return response.data.data 
  })

export const updateSuppessionList = createAsyncThunk('guardianAI/addSuppressionList', async (obj) => {
  const response = await Axios({...UpdateSuppessionList, data: obj})
  return response.data 
})

export const guardianMessageListPrevention = createAsyncThunk('guardianAI/guardianMessageListPrevention', async (obj) => {
  const response = await Axios({...GuardianAiMessageList, data: obj})
  return response.data
})

export const guardianMessageListRecovery = createAsyncThunk('guardianAI/guardianMessageListRecovery', async (obj) => {
  const response = await Axios({...GuardianAiMessageList, data: obj})
  return response.data
})

export const guardianMessageUpdate = createAsyncThunk('guardianAI/guardianAImessageUpdate', async (obj) => {
  let {url, ...rest} = GuardianAiMessageUpdate
  url= url+`/${obj.id}`
  let GuardianAiMessageUpdatePayload = {url, ...rest}
  const response = await Axios({...GuardianAiMessageUpdatePayload, data: obj})
  return response.data 
})

export const clientBranding = createAsyncThunk('guardianAI/clientBranding', async (obj) => {
  const response = await Axios({...ClientBranding, data: obj})
  return response.data
})

export const clientBrandingUpdate = createAsyncThunk('guardianAI/clientBrandingUpdate', async (obj) => {
  const response = await Axios({...ClientBrandingUpdate, data: obj})
  return response.data
})

export const protectionMetrics = createAsyncThunk('guardianAI/protectionMetrics', async (obj) => {
  const response = await Axios({...ProtectionMetrics, data: obj})
  return response.data
})

export const lifetimeReturn = createAsyncThunk('guardianAI/lifetimeReturn', async (obj) => {
  const response = await Axios({...ProtectionMetrics, data: obj})
  return response.data
})

export const getPreventionRecoveryCampaign = createAsyncThunk('guardianAI/getPreventionRecoveryCampaign', async (obj) => {
  const response = await Axios({...GetPreventionRecoveryCampaign, data: obj})
  return response.data
})

export const guardianAISlice = createSlice({
  name: 'guardianAI',
  initialState: {
    outreachQueueList: [],
    addSuppressionList: [],
    guardianMessageListPrevention: [],
    guardianMessageListRecovery: [],
    clientBrandingDetails: null,
    protectionMetricsData: null,
    lifetimeReturnData: null,
    preventionRecoveryCampaignData: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(outreachQueue.fulfilled, (state, action) => {
        state.outreachQueueList = action.payload
      }) 
      .addCase(updateSuppessionList.fulfilled, (state, action) => {
        state.addSuppressionList = action.payload
      })
      .addCase(guardianMessageListPrevention.fulfilled, (state, action) => {
        state.guardianMessageListPrevention = action.payload
      }) 
      .addCase(guardianMessageListRecovery.fulfilled, (state, action) => {
        state.guardianMessageListRecovery = action.payload
      })  
      .addCase(clientBranding.fulfilled, (state, action) => {
        state.clientBrandingDetails = action.payload
      }) 
      .addCase(clientBrandingUpdate.fulfilled, (state, action) => {
        state.clientBrandingDetails = action.payload
      })  
      .addCase(protectionMetrics.fulfilled, (state, action) => {
        state.protectionMetricsData = action.payload
      }) 
      .addCase(lifetimeReturn.fulfilled, (state, action) => {
        state.lifetimeReturnData = action.payload
      }) 
      .addCase(getPreventionRecoveryCampaign.fulfilled, (state, action) => {
        state.preventionRecoveryCampaignData = action.payload
      })  
  }
})

export default guardianAISlice.reducer

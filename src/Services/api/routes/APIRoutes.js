import { BASE_URL, API_MODULE } from './Common'

const baseURL = BASE_URL[API_MODULE.ALL]

export const LoginRoute = {
   url: '/auth/login',
   method: 'POST',
   baseURL
}

export const ForgotPassRoute = {
   url: '/auth/forgot-password',
   method: 'POST',
   baseURL
}

export const userData = {
   url: '/user/me',
   method: 'GET',
   baseURL
}

export const CountryList = {
   url: '/country/list',
   method: 'POST',
   baseURL
}

export const StateList = {
   url: '/state/list',
   method: 'POST',
   baseURL
}

export const CityList = {
   url: '/city/list',
   method: 'POST',
   baseURL
}

export const UserUpdateProfile = {
   url: 'user/update-profile',
   method: 'PUT',
   baseURL
}

export const RegenrateApiKey = {
   url: 'user/regenerate-api-key',
   method: 'PUT',
   baseURL
}

export const ChangePassword = {
   url: 'user/change-password',
   method: 'PUT',
   baseURL
}

export const CustomerAccounts = {
   url: 'customeraccounts/list',
   method: 'POST',
   baseURL
}

export const CustomerAccountsById = {
   url: 'customeraccounts',
   method: 'GET',
   baseURL
}

export const CustomerAccountTypes = {
   url: 'accounttype/list',
   method: 'POST',
   baseURL
}

export const CustomerRank = {
   url: '/companyrank/list',
   method: 'POST',
   baseURL
}

export const CustomerOrders = {
   url: 'order/list',
   method: 'POST',
   baseURL
}

export const CustomerPaymentMethods = {
   url: 'paymentmethod/list',
   method: 'POST',
   baseURL
}

export const CustomerOutreachJourney = {
   url: 'guardianaioutreach/list',
   method: 'POST',
   baseURL
}

export const GuardianOutreachQueue = {
   url: 'guardianaioutreach/list/queue',
   method: 'POST',
   baseURL
}

export const GuardianOutreachArchived = {
   url: 'guardianaioutreach/list/archived',
   method: 'POST',
   baseURL
}

export const GuardianSuppessionList = {
   url: 'guardianaioutreach/suppression/list',
   method: 'POST',
   baseURL
}

export const UpdateSuppessionList = {
   url: 'guardianaioutreach/suppression/update',
   method: 'POST',
   baseURL
}

export const AddPaymentMethod = {
   url: 'paymentmethod/create',
   method: 'POST',
   baseURL
}

export const GuardianAiMessageList = {
   url: "/guardianaimessages/list",
   method: 'POST',
   baseURL
}

export const GuardianAiMessageUpdate = {
   url: "/guardianaimessages/update",
   method: 'PUT',
   baseURL
}

export const ClientBranding = {
   url: 'clientbranding/me',
   method: 'GET',
   baseURL
}

export const ClientBrandingUpdate = {
   url: 'clientbranding/create',
   method: 'POST',
   baseURL
}

export const ProtectionMetrics = {
   url: 'user/protectionmetrics',
   method: 'POST',
   baseURL
}

export const GetPreventionRecoveryCampaign = {
   url: 'user/getPreventionRecoveryCampaign',
   method: 'GET',
   baseURL
}

export const HealthInspector = {
   url: 'insights/healthinspector',
   method: 'POST',
   baseURL
}

export const RevenueForecaster = {
   url: 'insights/revenueforecaster',
   method: 'POST',
   baseURL
}

export const LtvMoniter = {
   url: 'user/ltvmonitor',
   method: 'POST',
   baseURL
}


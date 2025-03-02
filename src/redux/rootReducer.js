// ** Reducers Imports
import layout from './layout'
import auth from './authentication'
import accountSetting from '../views/User/store'
import customerAccounts from '../views/SidePanel/accountExplorer/store'
import guardianAI from "../views/SidePanel/guardianAI/store"
import insights from "../views/SidePanel/insights/store"

const rootReducer = {
  auth,
  layout,
  accountSetting,
  customerAccounts,
  guardianAI,
  insights
}

export default rootReducer

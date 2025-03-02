// ** React Imports
import { lazy } from 'react'

//Pages
const Insights = lazy(() => import('../../views/SidePanel/insights/insights'))

const AccountExplorer = lazy(() => import('../../views/SidePanel/accountExplorer/accountExplorer'))
const AccountDetails = lazy(() => import('../../views/SidePanel/accountExplorer/accountDetails'))

const GuardianAI = lazy(() => import('../../views/SidePanel/guardianAI'))
const Settings = lazy(() => import('../../views/SidePanel/guardianAI/settings'))
const OutreachQueue = lazy(() => import('../../views/SidePanel/guardianAI/outreachQueue'))
const OutreachArchive = lazy(() => import('../../views/SidePanel/guardianAI/outreachArchive'))
const SuppressionList = lazy(() => import('../../views/SidePanel/guardianAI/suppressionList'))

const SidePanel = [
  {
    path: '/insights',
    element: <Insights />
  },
  {
    path: '/accountExplorer',
    element: <AccountExplorer />
  },
  {
    path: '/accountExplorer/accountDetails/:id',
    element: <AccountDetails />
  },
  {
    path: '/guardianAI',
    element: <GuardianAI />
  },
  {
    path: '/guardianAI/settings',
    element: <Settings />
  },
  {
    path: '/guardianAI/outreachQueue',
    element: <OutreachQueue />
  },
  {
    path: '/guardianAI/outreachArchive',
    element: <OutreachArchive />
  },
  {
    path: '/guardianAI/suppressionList',
    element: <SuppressionList />
  }
]

export default SidePanel

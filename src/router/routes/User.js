import { lazy } from 'react'


const ProfileSettings = lazy(() => import('../../views/User'))

const ProfileRoutes = [
  {
    path: '/profile-settings',
    element: <ProfileSettings />
  }
]

export default ProfileRoutes
// ** React Imports
import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'
import { getUserData } from './../../../utility/Utils'

const PublicRoute = ({ children, route }) => {
  if (route) {
    const user = getUserData()

    const restrictedRoute = route.meta && route.meta.restricted

    if (user && restrictedRoute) {
      return <Navigate to={getHomeRouteForLoggedInUser(user.role)} />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PublicRoute

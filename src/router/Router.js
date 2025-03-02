// ** Router imports
import { lazy } from 'react'

// ** Router imports
import { useRoutes, Navigate } from 'react-router-dom'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'

// ** Utils
import { getHomeRouteForLoggedInUser } from '../utility/Utils'
import { getUserData } from './../utility/Utils'

// ** Components
const Login = lazy(() => import('../views/Authentication/Login'))

const Error = lazy(() => import('../views/Misc/Error'))
const NotAuthorized = lazy(() => import('../views/Misc/NotAuthorized'))
const ComingSoon = lazy(() => import('../views/Misc/ComingSoon'))
const Maintenance = lazy(() => import('../views/Misc/Maintenance'))

const Router = ({ allRoutes }) => {
  const getHomeRoute = () => {
    const user = getUserData()
    if (user) {
      return getHomeRouteForLoggedInUser(user.role)
    } else {
      return '/login'
    }
  }

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }]
    },
    {
      path: '/auth/not-auth',
      element: <BlankLayout />,
      children: [{ path: '/auth/not-auth', element: <NotAuthorized /> }]
    },
    {
      path: '/misc/coming-soon',
      element: <ComingSoon />,
      meta: {
        publicRoute: true,
        layout: 'blank'
      }
    },
    {
      path: '/misc/maintenance',
      element: <Maintenance />,
      meta: {
        publicRoute: true,
        layout: 'blank'
      }
    },
    {
      path: '/misc/error',
      element: <Error />,
      meta: {
        publicRoute: true,
        layout: 'blank'
      }
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <Error /> }]
    },
    ...allRoutes
  ])

  return routes
}

export default Router

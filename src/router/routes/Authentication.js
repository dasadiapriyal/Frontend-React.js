// ** React Imports
import { lazy } from 'react'

const Login = lazy(() => import('../../views/Authentication/Login'))
const Register = lazy(() => import('../../views/Authentication/Register'))
const ForgotPassword = lazy(() => import('../../views/Authentication/ForgotPassword'))

const AuthenticationRoutes = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/register',
    element: <Register />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    layout: 'BlankLayout',
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  }
]

export default AuthenticationRoutes

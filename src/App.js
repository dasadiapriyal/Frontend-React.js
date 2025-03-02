import React, { useState, useEffect, Suspense } from 'react'

// ** Router Import
import Router from './router/Router'

// ** Routes & Default Routes
import { getRoutes } from './router/routes'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'
import { useNavigate } from 'react-router-dom'
import isEmpty from './validation/is-empty'
import { useSelector } from 'react-redux'

const App = () => {
  const [allRoutes, setAllRoutes] = useState([])
  const { userData } = useSelector(state => state.auth)
  const navigate = useNavigate()

  // ** Hooks
  const { layout } = useLayout()

  useEffect(() => {
    setAllRoutes(getRoutes(layout))
  }, [layout])

  useEffect(() => {
    if (isEmpty(userData)) {
      navigate('/login')
    }
  }, [userData])  

  return (
    <Suspense fallback={null}>
      <Router allRoutes={allRoutes} />
    </Suspense>
  )
}

export default App

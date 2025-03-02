// ** Dropdowns Imports
import NotificationDropdown from './NotificationDropdown'

import { handleLogout } from '@store/authentication'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'
import * as Icon from 'react-feather'
// import Avatar from '@components/avatar'

// import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isUserLoggedIn } from '@utils'
import { useDispatch } from 'react-redux'
import { getUserData } from './../../../../utility/Utils'


const NavbarUser = () => {
  // ** Props
  // const { skin, setSkin } = props

  // ** Function to toggle Theme (Light/Dark)
  // const ThemeToggler = () => {
  //   if (skin === 'dark') {
  //     return <Sun className='ficon' onClick={() => setSkin('light')} />
  //   } else {
  //     return <Moon className='ficon' onClick={() => setSkin('dark')} />
  //   }
  // }

  const dispatch = useDispatch()

  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(getUserData())
    }
  }, [])

  // const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <ul className='nav navbar-nav align-items-center ms-auto top-header-block'>
      {/* <IntlDropdown />
      <NavItem className='d-none d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem>
      <CartDropdown /> */}
      <NotificationDropdown />
      {/* <UserDropdown /> */}
      <NavItem className='mobile-menu me-auto'>
      <div className='user-nav d-sm-block d-none text-end'>
          <h5 className='user-name fw-bold mb-0'>{(userData && userData['companyName'])}</h5>
          <span className='user-status'>{(userData && userData.firstName + " " + userData.lastName + " (Client ID:" + " " + userData.clientId + ")" )}</span>
        </div>
        {/* <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' /> */}
      </NavItem>
      
      <NavItem className='mobile-menu me-auto'>
        <NavLink className='nav-menu-main menu-toggle hidden-xs is-active p-0' tag={Link} to="/profile-settings">
          <Icon.Settings size={14} className='' />
        </NavLink>
      </NavItem>
      <NavItem className='mobile-menu me-auto'>
        <NavLink className='nav-menu-main menu-toggle hidden-xs is-active p-0' to="/login" tag={Link} onClick={() => dispatch(handleLogout())}>
          <Icon.Power size={14} className='' />
        </NavLink>
      </NavItem>
    </ul>
  )
}
export default NavbarUser

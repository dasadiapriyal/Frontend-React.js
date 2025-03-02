// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { useLocation, useParams } from 'react-router-dom'
import NavbarBookmarks from './NavbarBookmarks'
import {allMenuIcons} from "../../../../constant/common"

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  const history = useLocation()
  const isParams = useParams()
  const pathName = history.pathname.split("/")
  const filteredPathName = pathName.filter(x => x !== "").filter(y => y !== isParams.id)

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
        <Breadcrumb listClassName='breadcrumb-chevron'>
          {filteredPathName?.map((path, index) => (
            <BreadcrumbItem tag='li' key={index}>
          <span>     
          {allMenuIcons.map((menuicon, menuindex) => {
            if (menuicon.name === path) {
              return <span key={menuindex}>{menuicon.icon}{menuicon.displayname}</span>
            }
          })}
    </span> 
          </BreadcrumbItem>
          ))}     
        </Breadcrumb>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar

// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from "reactstrap"

// ** Icons Imports
import { User, Lock, Bookmark, Link, Bell } from "react-feather"

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className="mb-2 custom-profile-tabs">
      <NavItem>
        <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
          Profile Details
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "2"} onClick={() => toggleTab("2")}>
          Email Notifications
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "3"} onClick={() => toggleTab("3")}>
          Security Settings
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "4"} onClick={() => toggleTab("4")}>
          API Key
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "5"} onClick={() => toggleTab("5")}>
          Email Sending Domain
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs

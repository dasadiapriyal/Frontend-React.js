import React from 'react'
import { Nav, NavItem, NavLink } from "reactstrap"

const TabsSettings = ({ activeTab, toggleTab }) => {
    return (
        <Nav pills className="mb-2 custom-profile-tabs">
            <NavItem>
                <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
                    Prevention Campaign
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={activeTab === "2"} onClick={() => toggleTab("2")}>
                    Recovery Campaign
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={activeTab === "3"} onClick={() => toggleTab("3")}>
                    Branding
                </NavLink>
            </NavItem>
        </Nav>
    )
}

export default TabsSettings

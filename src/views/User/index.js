// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import Tabs from './Tabs'
import ProfileDetails from './ProfileDetails'
import EmailNotification from './EmailNotification'
import APIKey from './APIKey'
import SecuritySetting from './SecuritySetting'
import EmailSendingDomain from './EmailSendingDomain'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const AccountSettings = () => {
  // ** States
  const [activeTab, setActiveTab] = useState('1')
  const [data, setData] = useState(null)

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  // useEffect(() => {
  //   axios.get('/account-setting/data').then(response => setData(response.data))
  // }, [])

  return (
    <Fragment>
      
      {/* {data !== null ? ( */}
        <Row>
          <Col md={3}>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
            </Col>
            <Col md={9}>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <ProfileDetails />
              </TabPane>
              <TabPane tabId='2'>
                <EmailNotification />
              </TabPane>
              <TabPane tabId='3'>
                  <SecuritySetting />
              </TabPane>
              <TabPane tabId='4'>
              <APIKey />
              </TabPane>
              <TabPane tabId='5'>
                <EmailSendingDomain />
              </TabPane>
            </TabContent>
            </Col>
        </Row>
      {/* ) : null} */}
    </Fragment>
  )
}

export default AccountSettings

import React, {Fragment, useState} from 'react'
import { Col, Row, TabContent, TabPane } from 'reactstrap'
import Branding from './settings/branding'
import PreventionCampaign from './settings/preventionCampaign'
import RecoveryCampaign from './settings/recoveryCampaign'
import TabsSettings from './tabsSettings'

const Settings = () => {
    const [activeTab, setActiveTab] = useState('1')
    const toggleTab = tab => {
        setActiveTab(tab)
      }

    return (
        <Fragment>
            <Row>
                <Col md={3}>
                    <TabsSettings className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
                </Col>
                <Col md={9}>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId='1'>
                            <PreventionCampaign />
                        </TabPane>
                        <TabPane tabId='2'>
                            <RecoveryCampaign />
                        </TabPane>
                        <TabPane tabId='3'>
                            <Branding />
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Settings

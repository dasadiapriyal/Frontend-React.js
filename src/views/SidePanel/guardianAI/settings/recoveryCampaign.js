import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'
import { Toast } from '../../../../Components'
import { guardianMessageList, guardianMessageListRecovery, guardianMessageUpdate } from '../store'
import EditEmail from './editEmail'
import EditNotification from './editNotification'
import EditSMS from './editSMS'

const RecoveryCampaign = () => {

    const [emailModelOpen, setEmailModelOpen] = useState(false)
    const [smsModelOpen, setSmsModelOpen] = useState(false)
    const [notificationModelOpen, setNotificationModelOpen] = useState(false)
    const [emailData, setEmailData] = useState(null)
    const [smsData, setSmsData] = useState(null)
    const [notificationData, setNotificationData] = useState(null)

    const emailModelHandler = (data) => {
        setEmailModelOpen(true)
        setEmailData(data)
    }

    const emailCloseModel = () => {
        setEmailModelOpen(false)
    }

    const smsModelHandler = (data) => {
        setSmsModelOpen(true)
        setSmsData(data)
    }

    const smsCloseModel = () => {
        setSmsModelOpen(false)
    }

    const notificationModelHandler = (data) => {
        setNotificationModelOpen(true)
        setNotificationData(data)
    }

    const notificationCloseModel = () => {
        setNotificationModelOpen(false)
    }

    const dispatch = useDispatch()

    const recoveryData = useSelector(state => state.guardianAI.guardianMessageListRecovery)

    useEffect(() => {
        const obj = {
            "query": {
                "messageCampaign": 1
            }
        }
        dispatch(guardianMessageListRecovery(obj))
    }, [])

    const activeChangeHandler = (e, info) => {
        const obj = {
            messageActiveStatus: e.target.checked,
            id: info.id
        }
        dispatch(guardianMessageUpdate(obj)).then((res) => {
            Toast.success(res.payload.message)
            const obj1 = {
                "query": {
                    "messageCampaign": 1
                }
            }
            dispatch(guardianMessageListRecovery(obj1))
        })
    }

    return (
        <Fragment>
            <h4 className="profile-tab-heading mb-2">Recovery Campaign</h4>
            <Card className="Api-key-card">
                <CardHeader>
                    <p className="fs-18 res-fs-16 mb-0 main-font">GuardianAI will help you prevent involuntary churn by recovering subscriptions suspended due to payment failures.</p>
                </CardHeader>
                <CardBody className="pt-0">
                    <hr className='my-lg-2 mt-lg-0 mb-2' />
                    <Row className=''>
                        <Col sm="12" className="mb-1">
                            <h4 className="api-key-title">Recovery Emails</h4>
                            <p className='main-font fs-16'>Our recovery emails are continuously tested and optimized across thousands
                                of subscription failures through GuardianAI.</p>
                        </Col>
                        {recoveryData?.data?.map((info, i) => {
                            if (info.messageType == 1) {
                                return <Col sm={12}>
                                    <div className='prevention-container'>
                                        <div className='prevention-wrapper'>
                                            <div className='reminder-block d-flex align-items-center gap-1 mb-1'>
                                                <div className='ibox m-0'>
                                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#1180FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14 15L11.586 12.586C11.2109 12.211 11.0001 11.7024 11 11.172V5" stroke="#1180FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <p className='mb-0 main-font fs-16 res-991-fs-14'> {info.messageWaitTime == 0 ? "Send Immediately" : `Wait ${info.messageWaitTime > 24 ? Math.floor(info.messageWaitTime/24) : info.messageWaitTime} ${Math.floor(info.messageWaitTime/24) <= 1 ? "Hours" : "Days"}` }</p>
                                            </div>
                                            <div className='prevention-block'>
                                                <div className='form-switch form-check-success'>
                                                    <Input
                                                        type='switch'
                                                        id='weeklyMetrics' 
                                                        name='weeklyMetrics'
                                                        defaultChecked={info.messageActiveStatus}
                                                        onChange={(e) => activeChangeHandler(e, info)}
                                                    />
                                                </div>
                                                <div className='reminder-content main-font'>
                                                    <div>
                                                        <Label for='weeklyMetrics' className='form-check-label main-font me-2 fs-16 res-991-fs-14'>
                                                            <h6 className='d-inline-block mb-0 fs-16 res-991-fs-14 msg-title'>Message {i + 1} :</h6> {info.messageTitle}
                                                        </Label>
                                                        <Button className='btn-sm rounded-pill grey-btn-light' onClick={() => emailModelHandler({subject: info.messageSubject, body: info.messageBody, id: info.id, messageActiveStatus: info.messageActiveStatus})}>Edit Email</Button>
                                                    </div>
                                                    <p className='mb-0 fs-16 res-991-fs-14'>{info.messageStatsOpenRate}% Open Rate | {info.messageStatsClickRate}% Click Rate | {info.messageStatsProtectionRate}% Protection Rate</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            }
                        })}
                    </Row>
                    <hr />
                    <Row className='mt-3'>
                        <Col sm="12" className="mb-1">
                            <h4 className="api-key-title">Recovery SMS</h4>
                            {/* <p className='main-font fs-16'>Our prevention SMS messages engage with your customers in a personalized way to help them quickly recover their unhealthy wallets.</p> */}
                        </Col>
                        {recoveryData?.data?.map((info, i) => {
                            if (info.messageType == 2) {
                                return <Col sm={12}>
                                    <div className='prevention-container'>
                                        <div className='prevention-wrapper'>
                                            <div className='reminder-block d-flex align-items-center gap-1 mb-1'>
                                                <div className='ibox m-0'>
                                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#1180FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14 15L11.586 12.586C11.2109 12.211 11.0001 11.7024 11 11.172V5" stroke="#1180FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <p className='mb-0 main-font fs-16 res-991-fs-14'>Wait {info.messageWaitTime > 24 ? Math.floor(info.messageWaitTime/24) : info.messageWaitTime} {Math.floor(info.messageWaitTime/24) <= 1 ? "Hours" : "Days"}</p>
                                            </div>
                                            <div className='prevention-block'>
                                                <div className='form-switch form-check-success'>
                                                    <Input
                                                        type='switch'
                                                        id='weeklyMetrics'
                                                        name='weeklyMetrics'
                                                        defaultChecked={info.messageActiveStatus}
                                                        onChange={(e) => activeChangeHandler(e, info)}
                                                    />
                                                </div>
                                                <div className='reminder-content main-font'>
                                                    <div>
                                                        <Label for='weeklyMetrics' className='form-check-label main-font me-2 fs-16 res-991-fs-14'>
                                                            {info.messageTitle}
                                                        </Label>
                                                        <Button className='btn-sm rounded-pill grey-btn-light' onClick={() => smsModelHandler({body: info.messageBody, id: info.id, messageActiveStatus: info.messageActiveStatus})}>Edit SMS</Button>
                                                    </div>
                                                    <p className='mb-0 fs-16 res-991-fs-14'>{info.messageStatsOpenRate}% Open Rate | {info.messageStatsClickRate}% Click Rate | {info.messageStatsProtectionRate}% Protection Rate</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            }
                        })}
                    </Row>
                    <hr />
                    <Row className='mt-3'>
                    {recoveryData?.data?.map((info, i) => {
                            if (info.messageType == 3) {
                                return <Col sm={12}>
                                <div className='prevention-wrapper'>
                                    <div className='prevention-block'>
                                        <div className='form-switch form-check-success'>
                                            <Input
                                                type='switch'
                                                id='weeklyMetrics'
                                                name='weeklyMetrics'
                                                defaultChecked={info.messageActiveStatus}
                                                onChange={(e) => activeChangeHandler(e, info)}
                                            />
    
                                        </div>
                                        <div className='reminder-content main-font'>
                                            <div>
                                                <Label for='weeklyMetrics' className='form-check-label main-font me-2'>
                                                    <h4 className='d-inline-block mb-0'>{info.messageTitle}</h4>
                                                </Label>
                                                <Button className='btn-sm rounded-pill grey-btn-light' onClick={() => notificationModelHandler({body: info.messageBody, id: info.id, messageActiveStatus: info.messageActiveStatus})}>Edit Notification</Button>
                                            </div>
                                            <p className='mb-0 fs-16 res-991-fs-14'>Prompt your logged in customers to update their expired subscription payment methods seamlessly from within your website so that you can reactivate their subscriptions.</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            }})}                 
                    </Row>
                </CardBody>
            </Card>
            <EditEmail modalOpen={emailModelOpen} handleCloseModal={emailCloseModel} emailData={emailData} messageCampaign={1} />
            <EditSMS modalOpen={smsModelOpen} handleCloseModal={smsCloseModel} smsData={smsData} messageCampaign={1} />
            <EditNotification modalOpen={notificationModelOpen} handleCloseModal={notificationCloseModel} notificationData={notificationData} messageCampaign={1}/>
        </Fragment>
    )
}

export default RecoveryCampaign

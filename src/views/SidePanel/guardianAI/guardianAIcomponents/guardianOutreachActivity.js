import React from 'react'
import { Card, Col, Row } from 'reactstrap'
import Chart from 'react-apexcharts'
import { GUARDIAN_AI_CAMPIGN_TYPE, GUARDIAN_MESSAGE_TYPE, MESSAGE_TYPE } from '../../../../constant/common'
import Table from '../../../../Components/Table'
import { GetPreventionRecoveryCampaign } from '../../../../Services/api/routes/APIRoutes'
import { useState } from 'react'
import { useEffect } from 'react'
import moment from "moment"

const GuardianOutreachActivity = ({ preventionRecoveryCampaignData }) => {


    const preventionColumns = [
        {
            selector: row =>
                GUARDIAN_MESSAGE_TYPE.map((x, i) => {
                    if (x.id === row?._id?.messageType) {
                        return <div className="icon-wrap"><span>{x.icon}</span><p>{row?._id?.campaignType == 2 ? "Prevention" : "Recovery"} {x.value}</p></div>
                    }
                }),
        },
        {
            name: "Campaign",
            cell: row =>
            (GUARDIAN_AI_CAMPIGN_TYPE.map((x, i) => {
                if (x.id === row?._id?.campaignType) {
                    return <div className="icon-wrap"><span>{x.icon}</span><p>{x.value}</p></div>
                }
            }))
        },
        {
            name: "Delivered",
            selector: (row) => row.delivered,
        },
        {
            name: "Open Rate (%)",
            selector: (row) => (row.openedRate)?.toFixed(2)
        },
        {
            name: "Click Rate (%)",
            selector: (row) => (row.clickedRate)?.toFixed(2)
        },
        {
            name: "Orders Protected",
            selector: (row) => (row.orderProtected)?.toFixed(2)
        },
        {
            name: "Protection Rate",
            selector: (row) => (row.protectionRate)?.toFixed(2)
        }
    ]

    const [preventionData, setPreventionData] = useState([])
    const [recoveryData, setRecoveryData] = useState([])
    const [series, setSeries] = useState([]) 
    const [graphDates, setGraphDates] = useState([]) 

    useEffect(() => {
        let preventionArr = []
        let recoveryArr = []
        let outreachDates = []
        let preventionEmail = []
        let preventionSMS = []
        let preventionNotifi = []
        let recoveryEmail = []
        let recoverySMS = []
        let recoveryNotifi = []
        preventionRecoveryCampaignData?.data?.map((info) => {
            info?.statusTable?.map((status) => {
                if (status._id.campaignType === 2) {
                    preventionArr.push(status)
                }
                if (status._id.campaignType === 1) {
                    recoveryArr.push(status)
                }
            })       
            info?.outreachActivity?.map((acti) => {
                outreachDates.push(moment(acti._id).format("MMMM D"))
                preventionEmail.push(acti.preventionEmail)
                preventionSMS.push(acti.preventionSMS)
                preventionNotifi.push(acti.preventionNotification)
                recoveryEmail.push(acti.recoveryEmail)
                recoverySMS.push(acti.recoverySMS)
                recoveryNotifi.push(acti.recoveryNotification)
            })

        })       
        setSeries([
            {
                name: "Prevention Emails",
                data: preventionEmail
            },
            {
                name: "Prevention SMS",
                data: preventionSMS
            },
            {
                name: "Prevention Notifications",
                data: preventionNotifi
            },
            {
                name: "Recovery Emails",
                data: recoveryEmail
            },
            {
                name: "Recovery SMS",
                data: recoverySMS
            },
            {
                name: "Recovery Notifications",
                data: recoveryNotifi
            }
        ])
        setPreventionData(preventionArr)
        setRecoveryData(recoveryArr)
        setGraphDates(outreachDates)
    }, [preventionRecoveryCampaignData])

    const options = {
        legend: {
            show: true,
            position: 'top'
        },
        chart: {
            id: "basic-bar",
        },
        xaxis: {
            categories: graphDates
        },
        colors: ['#2884C7', '#B33EFB', '#5243FF', '#28C76F', '#FB3E56', '#FF9F43']
    }

    return (
        <div className="protection-metrics-block">
            <h2 className="section-title">
                Outreach Activity
                <span>Last 30 Days</span>
            </h2>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Row>
                            <Col sm={12}>
                                <div className='outreact-chart mt-2 mb-3'>
                                    <Chart
                                        options={options}
                                        series={series}
                                        type="line"
                                        height="250"
                                    />
                                </div>
                            </Col>
                            <Col sm={12}>
                                <div className="react-dataTable position-relative mb-2">
                                    <Table columns={preventionColumns}
                                        dataURL={GetPreventionRecoveryCampaign}
                                        data={preventionData}
                                        isFetch={true} />
                                </div>
                            </Col>
                            <Col sm={12}>
                                <div className="react-dataTable position-relative mb-2">
                                    <Table columns={preventionColumns}
                                        dataURL={GetPreventionRecoveryCampaign}
                                        data={recoveryData}
                                        isFetch={true} />
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default GuardianOutreachActivity

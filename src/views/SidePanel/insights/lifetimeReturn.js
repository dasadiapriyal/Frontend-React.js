import React, { useEffect, useState } from "react"
import { Card, CardBody, CardText, Button, Row, Col, Spinner } from "reactstrap"
import { Line, ResponsiveContainer } from "react-chartjs-2"
import UsdFlag from "../../../assets/images/UsdFlag.png"
import gbp from "../../../assets/images/gbp.png"
import eur from "../../../assets/images/eur.png"
import { useDispatch, useSelector } from "react-redux"
import { lifetimeReturn, protectionMetrics } from "../guardianAI/store"
import { toAbsoluteUrl } from "../../../constant/common"

const LifetimeReturn = ({ labelColor, gridLineColor, allCountryData }) => {
  const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          borderColor: gridLineColor,
          color: gridLineColor,
        },
        scaleLabel: { display: true },
        display: false
      },
      y: {
        // min: 0,
        // max: 20,
        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: labelColor,
        },
        grid: {
          borderColor: gridLineColor,
          color: gridLineColor,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }
  const lifetimeReturnData = useSelector((state) => state.guardianAI.lifetimeReturnData)
  // ** Chart Data

  const [graphData1, setGraphData1] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: false,
        pointHoverRadius: 5,
        pointStyle: "circle",
        pointHoverBorderWidth: 5,
        borderColor: "#1180FF",
        pointBorderColor: "transparent",
        backgroundColor: "#1180FF",
        pointHoverBackgroundColor: "#1180FF",
      },
    ],
  })

  const [graphData2, setGraphData2] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: false,
        pointHoverRadius: 5,
        pointStyle: "circle",
        pointHoverBorderWidth: 5,
        borderColor: "#28C76F",
        pointBorderColor: "transparent",
        backgroundColor: "#28C76F",
        pointHoverBackgroundColor: "#28C76F",
      },
    ],
  })

  const plugins = [
    {
      beforeInit(chart) {
        chart.legend.afterFit = function () {
          this.height += 20
        }
      },
    },
  ]

  const dispatch = useDispatch()

  useEffect(() => {
    const obj = {
      "lastDays": 0
    }
    dispatch(lifetimeReturn(obj))
  }, [])

  useEffect(() => {
    let proOrderDate = []
    let proOrderVal = []
    let proCustDate = []
    let proCustVal = []

    lifetimeReturnData?.data?.map((info, i) => {
      info.protectedOrderChart.map((order) => {
        proOrderDate.push(order._id)
        proOrderVal.push(order.value)
      })
      info.protectedCustomerChart.map((cust) => {
        proCustDate.push(cust._id)
        proCustVal.push(cust.value)
      })
    })
    let finalgraph1 = {
      labels: proOrderDate,
      datasets: [
        {
          data: proOrderVal, 
          fill: false,
          tension: 0.5,
          pointRadius: 1,
          label: false,
          pointHoverRadius: 5,
          pointStyle: "circle",
          pointHoverBorderWidth: 5,
          borderColor: "#1180FF",
          pointBorderColor: "#1180FF",
          backgroundColor: "#000",
          pointHoverBackgroundColor: "transparent",
        }]
    }
    let finalgraph2 = {
      labels: proCustDate,
      datasets: [
        {
          data: proCustVal,
          fill: false,
          tension: 0.5,
          pointRadius: 1,
          label: false,
          pointHoverRadius: 5,
          pointStyle: "circle",
          pointHoverBorderWidth: 5,
          borderColor: "#28C76F",
          pointBorderColor: "transparent",
          backgroundColor: "#000",
          pointHoverBackgroundColor: "transparent"
        }]
    }

    setGraphData1(finalgraph1)
    setGraphData2(finalgraph2)
  }, [lifetimeReturnData])

  return (
    <div>
      <h2 className="section-title">Your Lifetime Return with LTV.ai</h2>
      <Row className="match-height">
        {lifetimeReturnData ? lifetimeReturnData?.data?.map((info, i) => (
          <>
            <Col xl="4" md="6" xs="12">
              <Card className="dash-card">
                <CardBody className="">
                  <Line
                    data={graphData1}
                    options={options}
                    height={"100"}
                    plugins={plugins}
                  />
                  <div className="text-center mt-1 grey-dark-text">
                    <h5>{info.protectedOrder}</h5>
                    <CardText>Orders Protected</CardText>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4" md="6" xs="12">
              <Card className="dash-card">
                <CardBody>
                  <ul className="inline-list flex-wrap flex-glow-1">
                    {info?.totalRevenueProtected?.length > 0 ? info?.totalRevenueProtected?.map((rev) => (
                      <li>
                        <img src={toAbsoluteUrl(`/assets/images/flags/${rev._id.toLowerCase()}.png`)} className="flag-round" />
                        <h5>{[...new Set(allCountryData?.data?.map((x) => {
                          if (x.currency === rev._id) {
                            return x.currency_symbol
                          }
                        }))].filter(Boolean)}{(rev.revenueProtected).toFixed(2)}</h5>
                        <p>{rev._id}</p>
                      </li>
                    )) : <p>There are no records to display</p>}
                    {/* <li>
                  <img src={UsdFlag} alt="usdflag" />
                  <h5>$659,823</h5>
                  <p>USD</p>
                </li>
                <li>
                  <img src={gbp} alt="gbp" />
                  <h5>£163,234</h5>
                  <p>GBP</p>
                </li>
                <li>
                  <img src={eur} alt="eur" />
                  <h5>€23,234</h5>
                  <p>EUR</p>
                </li> */}
                  </ul>
                  <div className="text-center mt-1 grey-dark-text">
                    <CardText>Revenue Protected</CardText>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4" md="6" xs="12">
              <Card className="dash-card">
                <CardBody>
                  <Line
                    data={graphData2}
                    options={options}
                    height={"110"}
                    plugins={plugins}
                  />
                  <div className="text-center mt-1  grey-dark-text">
                    <h5>{info.protectedCustomer}</h5>
                    <CardText>Accounts Protected</CardText>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </>
        )) : <div className='d-flex justify-content-center my-1 gap-1'>
          <Spinner size='sm' type='grow' color='primary' />
          <span className=''>Loading...</span>
        </div>}
      </Row>
    </div>
  )
}

export default LifetimeReturn

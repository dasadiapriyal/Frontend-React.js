import React from "react"
import { Card, CardBody, CardText, Button, Row, Col, CardHeader, ListGroup, ListGroupItem, Spinner } from "reactstrap"
import UsdFlag from "../../../../assets/images/UsdFlag.png"
import gbp from "../../../../assets/images/gbp.png"
import eur from "../../../../assets/images/eur.png"
import Protection from "../../../../assets/images/Protection.png"
import AntiProtection from "../../../../assets/images/antiprotection.png"
import Chart from 'react-apexcharts'
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { CARD_STATUS, toAbsoluteUrl } from "../../../../constant/common"
import { useState } from "react"
import { useEffect } from "react"

const GuardianPreventionCampaign = ({ preventionRecoveryCampaignData, allCountryData }) => {

  const donutColors = {
    series1: '#00CFE8',
    series2: '#A92FF3',
    series3: '#FB3E56',
    series4: '#1180FF',
    series5: '#FF9F43',
    series6: '#28C76F'
  }

  const optionsChart = {
    legend: {
      show: true,
      position: 'right'
    },
    labels: [],
    colors: [donutColors.series1, donutColors.series2, donutColors.series3, donutColors.series4, donutColors.series5, donutColors.series6],
    dataLabels: {
      enabled: true,
      formatter(val, opt) {
        return `${parseInt(val)}%`
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
            name: {
              fontSize: '2rem',
              fontFamily: 'Montserrat'
            },
            value: {
              fontSize: '1rem',
              fontFamily: 'Montserrat',
              formatter(val) {
                return `${parseInt(val)}%`
              }
            },
            total: {
              show: true,
              fontSize: '1.5rem',
              label: 'Operational',
              formatter(w) {
                return '31%'
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 200
          },
          legend: {
            position: 'right'
          }
        }
      },
      {
        breakpoint: 1500,
        options: {
          chart: {
            height: 250
          },
          legend: {
            position: 'bottom'
          },
          dataLabels: {
            style: {
              fontSize: '11px'
            }
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 200
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: false,
                  name: {
                    fontSize: '1.5rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1.5rem'
                  }
                }
              }
            },
          }
        }
      }
    ]
  }


  const [options, setOptions] = useState(optionsChart)

  useEffect(() => {
    if (preventionRecoveryCampaignData) {
      let labelsArr = []
      preventionRecoveryCampaignData?.data[0]?.unhealthyWalletChart?.map(y => {
        CARD_STATUS.map((x) => {
          if (y._id == x.id) {
            labelsArr.push(x.value)
          }
        })
      })
      setOptions({ ...optionsChart, labels: labelsArr })
    }
    // optionsChart.labels
  }, [preventionRecoveryCampaignData])

  return (
    <div className="protection-metrics-block">
      {preventionRecoveryCampaignData ? preventionRecoveryCampaignData?.data?.map((info, i) => (<>
        <h2 className="section-title">
          Prevention Campaign
          <span><Button
            className="btn-grey-primary rounded-pill pe-1 ps-1 filterbtn "
          >
            <span className="me-50">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.25 9.25C10.344 9.25 11.3932 8.8154 12.1668 8.04182C12.9404 7.26823 13.375 6.21902 13.375 5.125C13.375 4.03098 12.9404 2.98177 12.1668 2.20818C11.3932 1.4346 10.344 1 9.25 1C8.15598 1 7.10677 1.4346 6.33318 2.20818C5.5596 2.98177 5.125 4.03098 5.125 5.125C5.125 6.21902 5.5596 7.26823 6.33318 8.04182C7.10677 8.8154 8.15598 9.25 9.25 9.25ZM12 5.125C12 5.85435 11.7103 6.55382 11.1945 7.06954C10.6788 7.58527 9.97935 7.875 9.25 7.875C8.52065 7.875 7.82118 7.58527 7.30546 7.06954C6.78973 6.55382 6.5 5.85435 6.5 5.125C6.5 4.39565 6.78973 3.69618 7.30546 3.18046C7.82118 2.66473 8.52065 2.375 9.25 2.375C9.97935 2.375 10.6788 2.66473 11.1945 3.18046C11.7103 3.69618 12 4.39565 12 5.125ZM17.5 16.125C17.5 17.5 16.125 17.5 16.125 17.5H2.375C2.375 17.5 1 17.5 1 16.125C1 14.75 2.375 10.625 9.25 10.625C16.125 10.625 17.5 14.75 17.5 16.125ZM16.125 16.1195C16.1236 15.7812 15.9132 14.7638 14.981 13.8315C14.0845 12.935 12.3974 12 9.25 12C6.10125 12 4.4155 12.935 3.519 13.8315C2.58675 14.7638 2.37775 15.7812 2.375 16.1195H16.125Z" fill="#1180FF" stroke="#1180FF" strokeWidth="0.2" />
              </svg>
            </span>
            {info.accountInPreventionCampaign} Accounts Currently in Campaign
          </Button></span>
        </h2>
        <Row className="match-height">
          <Col xl="4" md="6" xs="12">
            <Card className="protection-card">
              <CardBody className="d-md-flex align-items-center justify-content-md-center justify-content-around flex-row">
                <div className="text-center moniter-box py-xxl-2">
                  <div className="ibox bg-success-light position-relative">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 5H5C4.20435 5 3.44129 5.31607 2.87868 5.87868C2.31607 6.44129 2 7.20435 2 8V16C2 16.7956 2.31607 17.5587 2.87868 18.1213C3.44129 18.6839 4.20435 19 5 19H19C19.7956 19 20.5587 18.6839 21.1213 18.1213C21.6839 17.5587 22 16.7956 22 16V8C22 7.20435 21.6839 6.44129 21.1213 5.87868C20.5587 5.31607 19.7956 5 19 5ZM4 8C4 7.73478 4.10536 7.48043 4.29289 7.29289C4.48043 7.10536 4.73478 7 5 7H19C19.2652 7 19.5196 7.10536 19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V9H4V8ZM20 16C20 16.2652 19.8946 16.5196 19.7071 16.7071C19.5196 16.8946 19.2652 17 19 17H5C4.73478 17 4.48043 16.8946 4.29289 16.7071C4.10536 16.5196 4 16.2652 4 16V11H20V16Z" fill="#28C76F" />
                      <path d="M7 15H11C11.2652 15 11.5196 14.8946 11.7071 14.7071C11.8946 14.5196 12 14.2652 12 14C12 13.7348 11.8946 13.4804 11.7071 13.2929C11.5196 13.1054 11.2652 13 11 13H7C6.73478 13 6.48043 13.1054 6.29289 13.2929C6.10536 13.4804 6 13.7348 6 14C6 14.2652 6.10536 14.5196 6.29289 14.7071C6.48043 14.8946 6.73478 15 7 15ZM15 15H17C17.2652 15 17.5196 14.8946 17.7071 14.7071C17.8946 14.5196 18 14.2652 18 14C18 13.7348 17.8946 13.4804 17.7071 13.2929C17.5196 13.1054 17.2652 13 17 13H15C14.7348 13 14.4804 13.1054 14.2929 13.2929C14.1054 13.4804 14 13.7348 14 14C14 14.2652 14.1054 14.5196 14.2929 14.7071C14.4804 14.8946 14.7348 15 15 15Z" fill="#28C76F" />
                    </svg>
                    <span className="protection-icon">
                      <img src={Protection} alt="Protection" />
                    </span>
                  </div>
                  <div className="grey-dark-text">
                    <h5 className="mb-50">{info.recoveredWallet}</h5>
                    <p>Recovered Wallets</p>
                  </div>
                </div>
                <div className="text-center moniter-box py-xxl-2">
                  <div className="ibox bg-light-danger position-relative">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 5H5C4.20435 5 3.44129 5.31607 2.87868 5.87868C2.31607 6.44129 2 7.20435 2 8V16C2 16.7956 2.31607 17.5587 2.87868 18.1213C3.44129 18.6839 4.20435 19 5 19H19C19.7956 19 20.5587 18.6839 21.1213 18.1213C21.6839 17.5587 22 16.7956 22 16V8C22 7.20435 21.6839 6.44129 21.1213 5.87868C20.5587 5.31607 19.7956 5 19 5ZM4 8C4 7.73478 4.10536 7.48043 4.29289 7.29289C4.48043 7.10536 4.73478 7 5 7H19C19.2652 7 19.5196 7.10536 19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V9H4V8ZM20 16C20 16.2652 19.8946 16.5196 19.7071 16.7071C19.5196 16.8946 19.2652 17 19 17H5C4.73478 17 4.48043 16.8946 4.29289 16.7071C4.10536 16.5196 4 16.2652 4 16V11H20V16Z" fill="#FB3E56" />
                      <path d="M7 15H11C11.2652 15 11.5196 14.8946 11.7071 14.7071C11.8946 14.5196 12 14.2652 12 14C12 13.7348 11.8946 13.4804 11.7071 13.2929C11.5196 13.1054 11.2652 13 11 13H7C6.73478 13 6.48043 13.1054 6.29289 13.2929C6.10536 13.4804 6 13.7348 6 14C6 14.2652 6.10536 14.5196 6.29289 14.7071C6.48043 14.8946 6.73478 15 7 15ZM15 15H17C17.2652 15 17.5196 14.8946 17.7071 14.7071C17.8946 14.5196 18 14.2652 18 14C18 13.7348 17.8946 13.4804 17.7071 13.2929C17.5196 13.1054 17.2652 13 17 13H15C14.7348 13 14.4804 13.1054 14.2929 13.2929C14.1054 13.4804 14 13.7348 14 14C14 14.2652 14.1054 14.5196 14.2929 14.7071C14.4804 14.8946 14.7348 15 15 15Z" fill="#FB3E56" />
                    </svg>
                    <span className="protection-icon">
                      <img src={AntiProtection} alt="Protection" />
                    </span>
                  </div>
                  <div className="grey-dark-text">
                    <h5 className="mb-50">{info.unhealthyWallet}</h5>
                    <p>Unhealthy Wallets</p>
                  </div>
                </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl="4" md="6" xs="12">
          <Card className="prevention-campaign-card">
            <CardBody className="">
              <ul className="inline-list align-items-center mb-1 flex-wrap">
              {info?.atRiskRecurringRevenue?.map((risk, index) => (
                <li>
                  <img src={toAbsoluteUrl(`/assets/images/flags/${risk._id.toLowerCase()}.png`)} className="flag-round" />
                  <h5>{[...new Set(allCountryData?.data?.map((x) => {
                        if (x.currency === risk._id) {
                          return x.currency_symbol
                        }
                      }))].filter(Boolean)}{risk.subscriptionValue}</h5>
                      <p>{risk._id}</p>
                    </li>
                  ))}
                  {/* <li>
                  <img src={gbp} alt="gbp" />
                  <h5>£13,102</h5>
                  <p>123 Orders</p>
                </li>
                <li>
                  <img src={eur} alt="eur" />
                  <h5>€4,123</h5>
                  <p>54 Orders</p>
                </li> */}
                </ul>
                <div className="d-flex justify-content-center align-items-center gap-1">
                  <span className="ibox bg-light-warning d-inline-block m-0">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.2898 3.86118L1.81978 18.0012C1.64514 18.3036 1.55274 18.6465 1.55177 18.9957C1.55079 19.3449 1.64127 19.6883 1.8142 19.9917C1.98714 20.2951 2.2365 20.5479 2.53748 20.725C2.83847 20.9021 3.18058 20.9973 3.52978 21.0012H20.4698C20.819 20.9973 21.1611 20.9021 21.4621 20.725C21.7631 20.5479 22.0124 20.2951 22.1854 19.9917C22.3583 19.6883 22.4488 19.3449 22.4478 18.9957C22.4468 18.6465 22.3544 18.3036 22.1798 18.0012L13.7098 3.86118C13.5315 3.56729 13.2805 3.3243 12.981 3.15567C12.6814 2.98703 12.3435 2.89844 11.9998 2.89844C11.656 2.89844 11.3181 2.98703 11.0186 3.15567C10.7191 3.3243 10.468 3.56729 10.2898 3.86118V3.86118Z"
                        stroke="#FF9F43"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 9V13"
                        stroke="#FF9F43"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 17H12.01"
                        stroke="#FF9F43"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p className="mb-0 main-font">
                    At Risk Recurring Revenue{" "}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4" md="6" xs="12">
            <Card className="health-inspector-card">
              <CardHeader className="justify-content-start gap-1 ">
                Unhealthy Wallets {" "}
              </CardHeader>
              <CardBody>
                <Chart options={options} series={preventionRecoveryCampaignData?.data[0]?.unhealthyWalletChart?.map((data) => (data.count))} type='donut' height={200} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
      )) : <>
        <h2 className="section-title">
          Prevention Campaign
        </h2>
        <Row className="match-height">
          <div className='d-flex justify-content-center my-1 gap-1'>
            <Spinner size='sm' type='grow' color='primary' />
            <span className=''>Loading...</span>
          </div>
        </Row>
      </>}
    </div>
  )
}

export default GuardianPreventionCampaign

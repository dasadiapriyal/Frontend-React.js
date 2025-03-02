import moment from "moment"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
  Spinner,
  Tooltip,
} from "reactstrap"
import Table from "../../../Components/Table"
import { customerAccountById, customerAccountTypes, customerRank } from "./store"
import Timeline from "@components/timeline"
import "./accountexplorer.scss"
import GaugeChart from "react-gauge-chart"
import {
  CAMPIGN_TYPE,
  CARD_STATUS,
  CARD_TYPE,
  CHURN_RISK,
  CUSTOMER_TELEPHONE_TYPE,
  GUARDIAN_AI_CAMPIGN_TYPE,
  LTV_RANK,
  MESSAGE_TYPE,
  ORDER_STATUS,
  ORDER_TYPE,
  OUTREACH_STATUS,
  toAbsoluteUrl,
  WALLET_STATUS,
} from "../../../constant/common"
import { FormatDate } from "../../../constant/formateDate"
import AddSuppressionList from "../guardianAI/addSuppressionList"
import {
  CustomerOrders,
  CustomerOutreachJourney,
  CustomerPaymentMethods,
} from "../../../Services/api/routes/APIRoutes"

import { ResponsiveContainer } from "recharts"
import { allCountry } from "../../User/store"
import PageLoader from "../../../Components/PageLoader"
import TinyFlag from "tiny-flag-react"
import PaymentMethod from "./paymentMethod"
import { Mail } from 'react-feather'
import { BASE_URL, API_MODULE } from '../../../Services/api/routes/Common'

const baseURL = BASE_URL[API_MODULE.ALL]

const AccountDetails = () => {
  const dispatch = useDispatch()
  const paramsData = useParams()

  useEffect(() => {
    dispatch(customerAccountById(paramsData.id))
    let obj = {
      query: {},
      options: {
        pagination: false,
      },
    }
    dispatch(allCountry(obj))
    dispatch(customerAccountTypes(obj))
    dispatch(customerRank(obj))
  }, [])

  const allCountryData = useSelector(
    (state) => state.accountSetting.allCountrydata
  )

  const accountDetailsData = useSelector(
    (state) => state.customerAccounts.customerAccountById
  )

  const isLoading = useSelector((state) => state.customerAccounts.loading)
  const accountTypes = useSelector((state) => state.customerAccounts.customerAccountTypeList)
  const accountRanks = useSelector((state) => state.customerAccounts.customerRankList)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [paymentModelIsOpen, setPaymentModelIsOpen] = useState(false)
  const [isData, setIsData] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const toggle = () => {
    setTooltipOpen(!tooltipOpen)
  }

  const WalletColumns = [
    {
      sortable: true,
      id: "paymentId",
      name: "Payment ID",
      selector: (row) => row.paymentId,
      // width: "auto"
    },
    {
      name: "Card Health",    
      selector: (row) =>
        WALLET_STATUS.map((x) => {
          if (x.id === row.cardHealth) {
            return (
              <div className="wallet-status-wrap">
                <span
                  className="bullet bullet-sm bullet-bordered me-50"
                  style={{ backgroundColor: x.color }}
                ></span>
                {x.value}
              </div>
            )
          }
        }),
    },
    {
      name: "Card Type",
      selector: (row) => CARD_TYPE.map((x) => {
        if (x.id === row.cardType) {
          return <img src={x.imgLink} className="card-img-block" />
        }
      }),
    },
    {
      name: <div>
      <div>SMP <span href="#" id="TooltipExample"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.99992 1.66536C5.58543 1.66536 4.22888 2.22727 3.22868 3.22746C2.22849 4.22766 1.66659 5.58421 1.66659 6.9987C1.66659 8.41319 2.22849 9.76974 3.22868 10.7699C4.22888 11.7701 5.58543 12.332 6.99992 12.332C8.41441 12.332 9.77096 11.7701 10.7712 10.7699C11.7713 9.76974 12.3333 8.41319 12.3333 6.9987C12.3333 5.58421 11.7713 4.22766 10.7712 3.22746C9.77096 2.22727 8.41441 1.66536 6.99992 1.66536ZM0.333252 6.9987C0.333252 3.3167 3.31792 0.332031 6.99992 0.332031C10.6819 0.332031 13.6666 3.3167 13.6666 6.9987C13.6666 10.6807 10.6819 13.6654 6.99992 13.6654C3.31792 13.6654 0.333252 10.6807 0.333252 6.9987Z" fill="#484A54"/>
<path d="M7 5.66667C7.17681 5.66667 7.34638 5.7369 7.4714 5.86193C7.59643 5.98695 7.66667 6.15652 7.66667 6.33333V10.3333C7.66667 10.5101 7.59643 10.6797 7.4714 10.8047C7.34638 10.9298 7.17681 11 7 11C6.82319 11 6.65362 10.9298 6.5286 10.8047C6.40357 10.6797 6.33333 10.5101 6.33333 10.3333V6.33333C6.33333 6.15652 6.40357 5.98695 6.5286 5.86193C6.65362 5.7369 6.82319 5.66667 7 5.66667ZM8 4C8 4.26522 7.89464 4.51957 7.70711 4.70711C7.51957 4.89464 7.26522 5 7 5C6.73478 5 6.48043 4.89464 6.29289 4.70711C6.10536 4.51957 6 4.26522 6 4C6 3.73478 6.10536 3.48043 6.29289 3.29289C6.48043 3.10536 6.73478 3 7 3C7.26522 3 7.51957 3.10536 7.70711 3.29289C7.89464 3.48043 8 3.73478 8 4Z" fill="#484A54"/>
</svg>
</span></div>
      <Tooltip placement="top" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
      Payment methods that are used for subscriptions will be checked.
      </Tooltip>
    </div>,
      selector: (row) => (
        <div className="form-check-success">
          <Input type="checkbox" checked={row.spm} disabled />
        </div>
      ),
    },
    {
      name: "Last 4 Digits",
      selector: (row) => row.last4Digits,
    },
    {
      name: "Expiration",
      selector: (row) => row.expirationMonth + "/" + row.expirationYear,
    },
    // {
    //   name: "Billing Zip",
    //   selector: (row) => row.billingZipPostal,
    // },
    {
      name: "Billing Telephone",
      selector: (row) =>
        "+" + row.billingTelPrimaryCountryCode + row.billingTelPrimary,
    },
    {
      name: "Card Status",
      cell: (row) =>
        CARD_STATUS.map((x) => {
          if (x.id === row.cardStatus) {
            return (
              <div
                className="ltv-rank-wrap"
                style={{ background: x.background }}
              >
                <span style={{ color: x.color }}>{x.value}</span>
              </div>
            )
          }
        }),
    },
    {
      name: "Status Date",
      selector: (row) => FormatDate(row.cardStatusDate),
    },
    {
      name: "Date Added",
      selector: (row) => FormatDate(row.createdAt),
    },
  ]

  const OrderHistoryColumns = [
    {
      id: "Order ID",
      name: "Order ID",
      selector: (row) => row.orderId,
    },
    {
      name: "Date",
      selector: (row) => FormatDate(row.orderDate),
    },
    {
      name: "Order Type",
      selector: (row) =>
        ORDER_TYPE.map((x, i) => {
          if (x.id === row.orderType) {
            return <span>{x.value}</span>
          }
        }),
    },
    {
      name: "Status",
      selector: (row) =>
        ORDER_STATUS.map((x,i) => {
          if (x.id === row.orderStatus) {
            return (
              <div
                className="ltv-rank-wrap"
                style={{ background: x.background }}
              >
                <span style={{ color: x.color }}>{x.value}</span>
              </div>
            )
          }
        }),
    },
    {
      name: "Order Value",
      selector: (row) => [...new Set(allCountryData?.data?.map((x) => {
        if(x.currency === accountDetailsData?.volumeAndEarnings?.lastCommissionCurrency){
          return x.currency_symbol
        } 
      }))].filter(Boolean) + (row.orderValue).toFixed(2) ,
    },
    {
      name: "Currency",
      selector: (row) =>
              <div className="table-flag-wrap">   
                <p>{row.orderCurrency}</p>
                <img src={toAbsoluteUrl(`/assets/images/flags/${row.orderCurrency.toLowerCase()}.png`)}/>
              </div>
    },
    {
      name: "Points Value",
      selector: (row) => row.orderPoints + " Points",
    },
    {
      name: "Payment ID",
      selector: (row) => row.paymentId,
    },
  ]

  const OutreachJourneyColumns = [
    {
      name: "Date",
      selector: (row) => FormatDate(row.createdAt),
    },
    {
      name: "Campaign",
      selector: (row) =>
      (GUARDIAN_AI_CAMPIGN_TYPE.map((x,i) => {
        if (x.id === row?.guardianAICampaign?.campaignType) {
          return <div className="icon-wrap"><span>{x.icon}</span><p>{x.value}</p></div>
        }
      }))
    },
    {
      name: "Message Type",
      selector: (row) =>
        MESSAGE_TYPE.map((x,i) => {
          if (x.id === row.messageType) {
            return <span>{x.value}</span>
          }
        }),
    },
    {
      name: "Message",
      selector: (row) => row.messageName,
    },
    {
      name: "Opened",
      selector: (row) => (
        <div className="form-check-success">
          <Input type="checkbox" checked={row?.messageOpenedTimeDate ? true : false} />
        </div>
      ),
    },
    {
      name: "Clicked",
      selector: (row) => (
        <div className="form-check-success">
          <Input type="checkbox" checked={row?.messageClickedTimeDate ? true : false} />
        </div>
      ),
    },
  ]

  const chartStyle = {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
  }

  const data = [
    {
      title: "Organizational Volume: ",
      content: accountDetailsData?.volumeAndEarnings?.teamVolume ? accountDetailsData?.volumeAndEarnings?.teamVolume + " Points" : "0 Points",
    },
    {
      title: "Personal Volume:",
      content: accountDetailsData?.volumeAndEarnings?.personalVolume ? accountDetailsData?.volumeAndEarnings?.personalVolume + " Points": "0 Points",
    },
    {
      title: "Last Commission: ",
      content: accountDetailsData?.volumeAndEarnings?.lastCommissionValue ? [...new Set(allCountryData?.data?.map((x) => {
        if(x.currency === accountDetailsData?.volumeAndEarnings?.lastCommissionCurrency){
          return x.currency_symbol
        } 
      }))].filter(Boolean) + accountDetailsData?.volumeAndEarnings?.lastCommissionValue + " (" + FormatDate(accountDetailsData?.volumeAndEarnings?.lastCommissionDate) + ")" : "-",
    },
  ]

  const data2 = [
    {
      title: "Personally Enrolled: ",
      content: accountDetailsData?.volumeAndEarnings?.personallyEnrolled ? accountDetailsData?.volumeAndEarnings?.personallyEnrolled + " Accounts" : "0 Accounts",
    },
    {
      title: "Last Personally Enrolled: ",
      content: accountDetailsData?.volumeAndEarnings?.lastPersonallyEnrolledDate ? FormatDate(accountDetailsData?.volumeAndEarnings?.lastPersonallyEnrolledDate) : "-",
    },
    {
      title: "Active in Organization: ",
      content: accountDetailsData?.volumeAndEarnings?.activeInTeam ? accountDetailsData?.volumeAndEarnings?.activeInTeam + " Accounts" : "0 Accounts",
    },
  ]

  const supressionClickHandler = () => {
    const data = {
      customerId: accountDetailsData?.customerId,
      customerEmail: accountDetailsData?.customerEmail
    }
    setModalIsOpen(true)
    setIsData(true)
    setSelectedData(data)
  }

  const closeModelHandler = () => {
    setModalIsOpen(false)
    setIsData(false)
  }

  const closePaymentModelHandler = () => {
    setPaymentModelIsOpen(false)
  }

  const paymentClickHandler = () => {
    setPaymentModelIsOpen(true)
  }

  if (isLoading) {
    return <PageLoader />
  }
  const flagURL = (code) => {
    return `https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/${code}.svg`
  }

  return (
    <div className="detail-page-block">
      <Row>
        <Col lg="5">
          <Card className="detail-page-card">
            <CardBody>
              <Row>
                <Col sm="6">
                  <div className="mb-2 mb-sm-0">
                    <h4 className="card-title-lg text-capitalize">
                      {accountDetailsData?.customerFirstName}{" "}
                      {accountDetailsData?.customerLastName}                 
                    </h4>
                    <p className="mb-25 fs-16 text-dark"><label className="fw-bolder">Account ID: </label> {accountDetailsData?.customerId}</p>
                    
                    <p className="mb-25 fs-16 text-dark">
                    <label className="fw-bolder">Enrollment Date:</label> 
                    {" "}{moment(
                        accountDetailsData?.customerEnrollmentDate
                      ).format("L")}
                    </p>
                    <Badge className="bg-success p-50 mt-50">
                      <span>Account Type:</span>{" "}
                      <label className="fw-bolder">{accountTypes?.data?.map((x,i) => {
                        if (x.accountTypeId === accountDetailsData?.customerAccountTypeId) {
                          return <span className="text-uppercase">{x.name}</span>
                        }
                      })}</label>
                    </Badge>
                  </div>
                </Col>
                <Col sm="6">
                  {/* <svg
                      width="20"
                      height="20"
                      viewBox="0 0 12 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.2 0H1.8C0.80625 0 0 0.839844 0 1.875V18.125C0 19.1602 0.80625 20 1.8 20H10.2C11.1938 20 12 19.1602 12 18.125V1.875C12 0.839844 11.1938 0 10.2 0ZM6 18.75C5.33625 18.75 4.8 18.1914 4.8 17.5C4.8 16.8086 5.33625 16.25 6 16.25C6.66375 16.25 7.2 16.8086 7.2 17.5C7.2 18.1914 6.66375 18.75 6 18.75ZM10.2 14.5312C10.2 14.7891 9.9975 15 9.75 15H2.25C2.0025 15 1.8 14.7891 1.8 14.5312V2.34375C1.8 2.08594 2.0025 1.875 2.25 1.875H9.75C9.9975 1.875 10.2 2.08594 10.2 2.34375V14.5312Z"
                        fill="#495057"
                      />
                    </svg> */}
                  {CUSTOMER_TELEPHONE_TYPE.map((x, i) => {
                    if (x.id === accountDetailsData?.customerTelPrimaryType) {
                      return <p className="mb-75 d-flex gap-1 text-dark fs-16">
                        {x.icon}<label className="fw-bolder">{x.value}:</label>
                        {allCountryData?.data?.map((country, index) => {
                        if(country.iso3 === accountDetailsData?.customerCountry){
                          return <span className="table-flag-wrap d-inline ms-50">    
                            <TinyFlag
                      country={country.code}
                      alt={country.code + " Flag"}
                      fallbackImageURL={flagURL(country.code)}
                      className="flag-img"
                    />
                            </span>
                        }
                      })}<span>{"+" + accountDetailsData?.customerTelPrimaryCountryCode + accountDetailsData?.customerTelPrimary}</span>
                      </p>
                    }
                  })}
{/* <p className="mb-25 fs-16 text-dark"> */}
<div className="email-box d-flex gap-1">

<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M16.875 0.5C18.325 0.5 19.5 1.675 19.5 3.125V12.875C19.5 14.325 18.325 15.5 16.875 15.5H3.125C2.42881 15.5 1.76113 15.2234 1.26884 14.7312C0.776562 14.2389 0.5 13.5712 0.5 12.875V3.125C0.5 1.675 1.675 0.5 3.125 0.5H16.875ZM18.25 5.1755L10.301 9.5475C10.2192 9.59247 10.1284 9.61855 10.0352 9.62383C9.94203 9.62911 9.84884 9.61345 9.7625 9.578L9.699 9.548L1.75 5.175V12.875C1.75 13.2397 1.89487 13.5894 2.15273 13.8473C2.41059 14.1051 2.76033 14.25 3.125 14.25H16.875C17.2397 14.25 17.5894 14.1051 17.8473 13.8473C18.1051 13.5894 18.25 13.2397 18.25 12.875V5.1755ZM16.875 1.75H3.125C2.76033 1.75 2.41059 1.89487 2.15273 2.15273C1.89487 2.41059 1.75 2.76033 1.75 3.125V3.7495L10 8.2865L18.25 3.749V3.125C18.25 2.76033 18.1051 2.41059 17.8473 2.15273C17.5894 1.89487 17.2397 1.75 16.875 1.75Z" fill="#484A54" />
                                                        </svg>
<p className="mb-75 d-flex gap-1 text-dark fs-16">
{/* <Mail />  */}

                    <label className="fw-bolder">Email: </label> {accountDetailsData?.customerEmail}
                    </p>
</div>

                  {/* <p className="mb-75 d-flex gap-1 text-dark fs-16">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.60722 1.9302L6.9908 1.51306C7.44742 1.37561 7.93845 1.40896 8.3723 1.60689C8.80615 1.80482 9.15318 2.15381 9.34865 2.58877L10.3187 4.74592C10.487 5.12015 10.5339 5.53771 10.4528 5.93997C10.3717 6.34223 10.1667 6.709 9.86651 6.98877L8.39008 8.36449C8.19222 8.55234 8.34222 9.28449 9.06508 10.5373C9.78865 11.7909 10.3479 12.2866 10.6058 12.2095L12.5401 11.6181C12.9322 11.4981 13.3519 11.5039 13.7406 11.6346C14.1292 11.7652 14.4672 12.0142 14.7072 12.3466L16.0858 14.2573C16.3642 14.6432 16.4932 15.117 16.4486 15.5907C16.4041 16.0644 16.1891 16.5059 15.8437 16.8331L14.7779 17.8423C14.4339 18.1681 14.0096 18.3969 13.5483 18.5052C13.087 18.6134 12.6053 18.5974 12.1522 18.4588C9.91937 17.7752 7.85151 15.7466 5.92079 12.4016C3.98579 9.05163 3.25508 6.22592 3.76437 3.91734C3.86708 3.45217 4.092 3.0228 4.41594 2.67351C4.73987 2.32421 5.15109 2.06763 5.60722 1.9302Z"
                        fill="#495057"
                      />
                    </svg>
                    <span>Home</span>{" "}
                    <label className="fw-bolder">+1 (484) 286-3456</label>
                  </p>
                  <p className="mb-75 d-flex gap-1 text-dark fs-16">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.60722 1.9302L6.9908 1.51306C7.44742 1.37561 7.93845 1.40896 8.3723 1.60689C8.80615 1.80482 9.15318 2.15381 9.34865 2.58877L10.3187 4.74592C10.487 5.12015 10.5339 5.53771 10.4528 5.93997C10.3717 6.34223 10.1667 6.709 9.86651 6.98877L8.39008 8.36449C8.19222 8.55234 8.34222 9.28449 9.06508 10.5373C9.78865 11.7909 10.3479 12.2866 10.6058 12.2095L12.5401 11.6181C12.9322 11.4981 13.3519 11.5039 13.7406 11.6346C14.1292 11.7652 14.4672 12.0142 14.7072 12.3466L16.0858 14.2573C16.3642 14.6432 16.4932 15.117 16.4486 15.5907C16.4041 16.0644 16.1891 16.5059 15.8437 16.8331L14.7779 17.8423C14.4339 18.1681 14.0096 18.3969 13.5483 18.5052C13.087 18.6134 12.6053 18.5974 12.1522 18.4588C9.91937 17.7752 7.85151 15.7466 5.92079 12.4016C3.98579 9.05163 3.25508 6.22592 3.76437 3.91734C3.86708 3.45217 4.092 3.0228 4.41594 2.67351C4.73987 2.32421 5.15109 2.06763 5.60722 1.9302Z"
                        fill="#495057"
                      />
                    </svg>
                    <span>Home</span>{" "}
                    <label className="fw-bolder">+1 (484) 286-3456</label>
                  </p> */}
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card className="detail-page-card">
            <CardBody>
              <Row>
                <Col md="12">
                  <div>
                    <h4 className="card-title-lg">Engagement</h4>
                    <p className="mb-75 d-flex gap-1 text-dark fs-16 mt-1">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.713 16.5813C14.2964 16.5721 13.9613 16.2238 13.9613 15.8021C13.9522 15.3805 14.2873 15.033 14.7039 15.0239H14.713C15.1386 15.0239 15.4827 15.3722 15.4827 15.8021C15.4827 16.233 15.1386 16.5813 14.713 16.5813ZM11.0181 13.208C10.6015 13.2272 10.2574 12.8963 10.2393 12.4755C10.2393 12.0539 10.5653 11.7055 10.9819 11.6863C11.3894 11.6863 11.7245 12.008 11.7335 12.4196C11.7516 12.8422 11.4256 13.1905 11.0181 13.208ZM11.0181 16.5355C10.6015 16.5547 10.2574 16.2238 10.2393 15.8021C10.2393 15.3805 10.5653 15.033 10.9819 15.0138C11.3894 15.0138 11.7245 15.3355 11.7335 15.748C11.7516 16.1697 11.4256 16.518 11.0181 16.5355ZM7.2961 13.208C6.87953 13.2272 6.5354 12.8963 6.51729 12.4755C6.51729 12.0539 6.8433 11.7055 7.25988 11.6863C7.6674 11.6863 8.00247 12.008 8.01153 12.4196C8.02964 12.8422 7.70362 13.1905 7.2961 13.208ZM7.28705 16.5355C6.87047 16.5547 6.52634 16.2238 6.50823 15.8021C6.50823 15.3805 6.83425 15.033 7.25082 15.0138C7.65834 15.0138 7.99341 15.3355 8.00247 15.748C8.02058 16.1697 7.69457 16.518 7.28705 16.5355ZM13.9704 12.4664C13.9704 12.0447 14.2964 11.7055 14.713 11.6964C15.1205 11.6964 15.4465 12.0255 15.4646 12.4297C15.4737 12.8514 15.1476 13.1997 14.7401 13.208C14.3235 13.2171 13.9794 12.8963 13.9704 12.4755V12.4664ZM2.75 8.48438V15.463C2.75 18.3596 4.57931 20.1655 7.45005 20.1655H14.5409C17.4388 20.1655 19.25 18.3963 19.25 15.5189V8.48438H2.75Z"
                          fill="#495057"
                        />
                        <path
                          opacity="0.4"
                          d="M2.75293 8.48564C2.7647 7.94755 2.80998 6.87964 2.89511 6.53589C3.3298 4.60264 4.80592 3.3743 6.91597 3.19922H15.0845C17.1764 3.38347 18.6706 4.62005 19.1053 6.53589C19.1895 6.87047 19.2348 7.94664 19.2466 8.48564H2.75293Z"
                          fill="#495057"
                        />
                        <path
                          d="M7.61284 6.03953C8.0113 6.03953 8.31015 5.73795 8.31015 5.3337V2.53878C8.31015 2.13453 8.0113 1.83203 7.61284 1.83203C7.21437 1.83203 6.91553 2.13453 6.91553 2.53878V5.3337C6.91553 5.73795 7.21437 6.03953 7.61284 6.03953Z"
                          fill="#495057"
                        />
                        <path
                          d="M14.3873 6.03953C14.7767 6.03953 15.0846 5.73795 15.0846 5.3337V2.53878C15.0846 2.13453 14.7767 1.83203 14.3873 1.83203C13.9888 1.83203 13.6899 2.13453 13.6899 2.53878V5.3337C13.6899 5.73795 13.9888 6.03953 14.3873 6.03953Z"
                          fill="#495057"
                        />
                      </svg>
                      <span>Last Login:</span>
                      <label className="fw-bolder">{accountDetailsData?.engagement?.lastLoginDate ? FormatDate(accountDetailsData?.engagement?.lastLoginDate) : "-"}</label>
                    </p>
                    <p className="mb-75 d-flex gap-1 text-dark fs-16"><span>Logins (Last 30 Days): </span> 
                    <label className="fw-bolder">{accountDetailsData?.engagement?.last30Day ? accountDetailsData?.engagement?.last30Day : "-"}</label>
                    </p>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card className="detail-page-card">
            <CardBody>
              <Row>
                <Col md="12">
                  <div>
                    <h4 className="card-title-lg">Health Score</h4>
                  </div>
                  <div className="d-md-flex align-items-center justify-content-center gap-1 flex-wrap flex-xxl-nowrap">
                    <div className="gaugecharts-wrapper m-auto m-md-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <GaugeChart
                          id="gauge-chart3"
                          className="gauge-chart"
                          nrOfLevels={8}
                          colors={[
                            "#FB3E56",
                            "#FB3E56",
                            "#FB3E56",
                            "#FF9F43",
                            "#FF9F43",
                            "#FF9F43",
                            "#28C76F",
                            "#28C76F",
                          ]}
                          arcWidth={0.12}
                          cornerRadius={0}
                          hideText={true}
                          style={chartStyle}
                          percent={accountDetailsData?.customerAccountInsight?.healthScore/100}
                        />
                      </ResponsiveContainer>
                    </div>

                    <div className="text-center gauge-chart-content">
                      <h3>{accountDetailsData?.customerAccountInsight?.healthScore ? accountDetailsData?.customerAccountInsight?.healthScore : "0"}%</h3>
                      <h5>Current Health Score</h5>
                      {CHURN_RISK.map((x, i) => {
                        if(x.id === accountDetailsData?.customerAccountInsight?.churnRisk){
                          return <Badge className={"badge rounded-pill " + x.class}>
                    {x.value}
                  </Badge>
                  // <span className={x.class}>{x.value}</span>
                        }
                      })}
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="7">
          <Card className="detail-page-card">
            <CardBody>
              <Row>
                <Col md="12">
                  <div>
                    <h4 className="card-title-lg d-md-flex align-items-center gap-1">
                      Volume & Earnings
                      <Badge bg="primary" className="bg-primary p-50 ">
                        <span>Company Rank:</span>{" "}
                        <label className="fw-bolder">{accountRanks?.data?.map((x, i) => {
                          if (x.companyRankId === accountDetailsData?.volumeAndEarnings?.currentRank) {
                            return <span className="text-uppercase">{x.rank}</span>
                          }
                        })}</label>
                      </Badge>
                    </h4>
                  </div>
                  <div className="earning-list mt-2">
                    <Row>
                      <Col md="6">
                        <Timeline data={data} />
                      </Col>
                      <Col md="6">
                        <Timeline data={data2} />
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card className="detail-page-card">
            <CardBody>
              <Row>
                <Col md="12">
                  <div>
                    <h4 className="card-title-lg mb-1">LTV Rank</h4>
                  </div>
                  <Row>
                    <Col md="12">
                      <ul className="rank-timeline">
                        {LTV_RANK.map((x, i) => (
                          <li key={i} className={"timeline" + ((x.id === accountDetailsData?.customerAccountInsight?.ltvRank) ? " active" : "")}>
                            <span></span>
                            <p>{x.value}</p>
                          </li>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col md="4">
                      <div className="d-flex gap-1 align-items-center rank-box mb-2">
                        <div className="ibox m-0">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                              stroke="#1180FF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3 6H21"
                              stroke="#1180FF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                              stroke="#1180FF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="rank-content">
                        <h6>{accountDetailsData?.customerAccountInsight?.totalOrders}</h6>
                        <p>Total Orders</p>
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="d-flex gap-1 align-items-center rank-box mb-2">
                        <div className="ibox m-0">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
                              fill="#1180FF"
                            />
                            <path
                              d="M12 8C11.2089 8 10.4355 8.2346 9.77772 8.67412C9.11993 9.11365 8.60723 9.73836 8.30448 10.4693C8.00173 11.2002 7.92252 12.0044 8.07686 12.7804C8.2312 13.5563 8.61216 14.269 9.17157 14.8284C9.73098 15.3878 10.4437 15.7688 11.2196 15.9231C11.9956 16.0775 12.7998 15.9983 13.5307 15.6955C14.2616 15.3928 14.8864 14.8801 15.3259 14.2223C15.7654 13.5645 16 12.7911 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8ZM12 14C11.6044 14 11.2178 13.8827 10.8889 13.6629C10.56 13.4432 10.3036 13.1308 10.1522 12.7654C10.0009 12.3999 9.96126 11.9978 10.0384 11.6098C10.1156 11.2219 10.3061 10.8655 10.5858 10.5858C10.8655 10.3061 11.2219 10.1156 11.6098 10.0384C11.9978 9.96126 12.3999 10.0009 12.7654 10.1522C13.1308 10.3036 13.4432 10.56 13.6629 10.8889C13.8827 11.2178 14 11.6044 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14Z"
                              fill="#1180FF"
                            />
                          </svg>
                        </div>
                        <div className="rank-content">
                          <h6>{ accountDetailsData?.customerAccountInsight?.totalOrderPoints}</h6>
                          <p>Lifetime Points</p>
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="d-flex gap-1 align-items-center rank-box mb-2">
                        <div className="ibox m-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 10C11.1935 10 12.3381 9.52589 13.182 8.68198C14.0259 7.83807 14.5 6.69347 14.5 5.5C14.5 4.30653 14.0259 3.16193 13.182 2.31802C12.3381 1.47411 11.1935 1 10 1C8.80653 1 7.66193 1.47411 6.81802 2.31802C5.97411 3.16193 5.5 4.30653 5.5 5.5C5.5 6.69347 5.97411 7.83807 6.81802 8.68198C7.66193 9.52589 8.80653 10 10 10ZM13 5.5C13 6.29565 12.6839 7.05871 12.1213 7.62132C11.5587 8.18393 10.7956 8.5 10 8.5C9.20435 8.5 8.44129 8.18393 7.87868 7.62132C7.31607 7.05871 7 6.29565 7 5.5C7 4.70435 7.31607 3.94129 7.87868 3.37868C8.44129 2.81607 9.20435 2.5 10 2.5C10.7956 2.5 11.5587 2.81607 12.1213 3.37868C12.6839 3.94129 13 4.70435 13 5.5ZM19 17.5C19 19 17.5 19 17.5 19H2.5C2.5 19 1 19 1 17.5C1 16 2.5 11.5 10 11.5C17.5 11.5 19 16 19 17.5ZM17.5 17.494C17.4985 17.125 17.269 16.015 16.252 14.998C15.274 14.02 13.4335 13 10 13C6.565 13 4.726 14.02 3.748 14.998C2.731 16.015 2.503 17.125 2.5 17.494H17.5Z"
                              fill="#1180FF"
                              stroke="#1180FF"
                              strokeWidth="0.2"
                            />
                          </svg>
                        </div>
                        <div className="rank-content">
                          <h6>{"$" + accountDetailsData?.customerAccountInsight?.totalOrderValue }</h6>
                          <p>Lifetime Value</p>
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="d-flex gap-1 align-items-center rank-box  mb-lg-0 mb-2">
                        <div className="ibox m-0">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.6304 16.4508H7.67338L8.37417 15.0234L20.0179 15.0023C20.4117 15.0023 20.7492 14.7211 20.8195 14.332L22.432 5.30625C22.4742 5.06953 22.4109 4.82578 22.2562 4.64062C22.1797 4.5495 22.0844 4.4761 21.9767 4.42551C21.8691 4.37492 21.7517 4.34835 21.6328 4.34766L6.82026 4.29844L6.6937 3.70312C6.61401 3.32344 6.27182 3.04688 5.88276 3.04688H2.26167C2.04224 3.04688 1.83181 3.13404 1.67665 3.2892C1.52149 3.44436 1.43433 3.65479 1.43433 3.87422C1.43433 4.09364 1.52149 4.30408 1.67665 4.45924C1.83181 4.6144 2.04224 4.70156 2.26167 4.70156H5.21245L5.76557 7.33125L7.12729 13.9242L5.37417 16.7859C5.28313 16.9088 5.22829 17.0547 5.21586 17.2071C5.20344 17.3596 5.23392 17.5124 5.30386 17.6484C5.44448 17.9273 5.72807 18.1031 6.04214 18.1031H7.51401C7.20023 18.5199 7.03074 19.0275 7.0312 19.5492C7.0312 20.8758 8.10932 21.9539 9.43588 21.9539C10.7624 21.9539 11.8406 20.8758 11.8406 19.5492C11.8406 19.0266 11.6671 18.518 11.3578 18.1031H15.1335C14.8198 18.5199 14.6503 19.0275 14.6507 19.5492C14.6507 20.8758 15.7288 21.9539 17.0554 21.9539C18.382 21.9539 19.4601 20.8758 19.4601 19.5492C19.4601 19.0266 19.2867 18.518 18.9773 18.1031H21.6328C22.0874 18.1031 22.4601 17.7328 22.4601 17.2758C22.4587 17.0566 22.3707 16.8468 22.2153 16.6923C22.0599 16.5377 21.8496 16.4509 21.6304 16.4508ZM7.16479 5.92969L20.6601 5.97422L19.3382 13.3758L8.73745 13.3945L7.16479 5.92969ZM9.43588 20.2898C9.02807 20.2898 8.69526 19.957 8.69526 19.5492C8.69526 19.1414 9.02807 18.8086 9.43588 18.8086C9.8437 18.8086 10.1765 19.1414 10.1765 19.5492C10.1765 19.7456 10.0985 19.934 9.95959 20.0729C9.82069 20.2118 9.63231 20.2898 9.43588 20.2898ZM17.0554 20.2898C16.6476 20.2898 16.3148 19.957 16.3148 19.5492C16.3148 19.1414 16.6476 18.8086 17.0554 18.8086C17.4632 18.8086 17.796 19.1414 17.796 19.5492C17.796 19.7456 17.718 19.934 17.5791 20.0729C17.4402 20.2118 17.2518 20.2898 17.0554 20.2898Z"
                              fill="#1180FF"
                            />
                          </svg>
                        </div>
                        <div className="rank-content">
                          <h6>${accountDetailsData?.customerAccountInsight?.averageOrderValue}</h6>
                          <p>Average Order Value</p>
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="d-flex gap-1 align-items-center rank-box  mb-lg-0 mb-2">
                        <div className="ibox m-0">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 12H18L15 21L9 3L6 12H2"
                              stroke="#1180FF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="rank-content">
                          <h6>Every {Math.floor(accountDetailsData?.customerAccountInsight?.averageOrderFrequency % 365 / 30)} Months </h6>
                          <p>Average Order Frequency</p>
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="d-flex gap-1 align-items-center rank-box  mb-lg-0 mb-2">
                        <div className="ibox m-0">
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.4175 3.58188H3.41753L4.60919 2.39938C4.7818 2.22676 4.87878 1.99265 4.87878 1.74854C4.87878 1.50443 4.7818 1.27032 4.60919 1.09771C4.43658 0.925097 4.20247 0.828125 3.95836 0.828125C3.71425 0.828125 3.48014 0.925097 3.30753 1.09771L0.557525 3.84771C0.471608 3.93293 0.403413 4.03431 0.356875 4.14601C0.310337 4.25772 0.286377 4.37753 0.286377 4.49854C0.286377 4.61955 0.310337 4.73937 0.356875 4.85107C0.403413 4.96278 0.471608 5.06416 0.557525 5.14938L3.30753 7.89938C3.39274 7.98529 3.49413 8.05349 3.60583 8.10003C3.71753 8.14656 3.83735 8.17052 3.95836 8.17052C4.07937 8.17052 4.19918 8.14656 4.31089 8.10003C4.42259 8.05349 4.52398 7.98529 4.60919 7.89938C4.69511 7.81416 4.7633 7.71278 4.80984 7.60107C4.85638 7.48937 4.88034 7.36955 4.88034 7.24854C4.88034 7.12753 4.85638 7.00772 4.80984 6.89601C4.7633 6.78431 4.69511 6.68293 4.60919 6.59771L3.41753 5.41521H14.4175C14.6053 5.41156 14.792 5.44495 14.9669 5.51347C15.1418 5.58198 15.3015 5.68428 15.4368 5.81452C15.5722 5.94476 15.6805 6.10039 15.7557 6.27252C15.8309 6.44465 15.8714 6.62991 15.875 6.81771V9.08188C15.875 9.32499 15.9716 9.55815 16.1435 9.73006C16.3154 9.90197 16.5486 9.99854 16.7917 9.99854C17.0348 9.99854 17.268 9.90197 17.4399 9.73006C17.6118 9.55815 17.7084 9.32499 17.7084 9.08188V6.81771C17.7048 6.38916 17.6168 5.96551 17.4495 5.57096C17.2821 5.17641 17.0387 4.81868 16.7331 4.5182C16.4276 4.21773 16.0658 3.98038 15.6685 3.81973C15.2711 3.65907 14.8461 3.57825 14.4175 3.58188ZM14.6925 12.0977C14.5199 11.9251 14.2858 11.8281 14.0417 11.8281C13.7976 11.8281 13.5635 11.9251 13.3909 12.0977C13.2182 12.2703 13.1213 12.5044 13.1213 12.7485C13.1213 12.9927 13.2182 13.2268 13.3909 13.3994L14.5825 14.5819H3.58253C3.39473 14.5855 3.20805 14.5521 3.03315 14.4836C2.85826 14.4151 2.69858 14.3128 2.56323 14.1826C2.42788 14.0523 2.31952 13.8967 2.24433 13.7246C2.16914 13.5524 2.1286 13.3672 2.12503 13.1794V10.9152C2.12503 10.6721 2.02845 10.4389 1.85654 10.267C1.68463 10.0951 1.45147 9.99854 1.20836 9.99854C0.965244 9.99854 0.732086 10.0951 0.560177 10.267C0.388269 10.4389 0.291692 10.6721 0.291692 10.9152V13.1794C0.295288 13.6079 0.383262 14.0316 0.550591 14.4261C0.71792 14.8207 0.961327 15.1784 1.26691 15.4789C1.5725 15.7794 1.93428 16.0167 2.33159 16.1774C2.72891 16.338 3.15397 16.4188 3.58253 16.4152H14.5825L13.3909 17.5977C13.3049 17.6829 13.2367 17.7843 13.1902 17.896C13.1437 18.0077 13.1197 18.1275 13.1197 18.2485C13.1197 18.3696 13.1437 18.4894 13.1902 18.6011C13.2367 18.7128 13.3049 18.8142 13.3909 18.8994C13.4761 18.9853 13.5775 19.0535 13.6892 19.1C13.8009 19.1466 13.9207 19.1705 14.0417 19.1705C14.1627 19.1705 14.2825 19.1466 14.3942 19.1C14.5059 19.0535 14.6073 18.9853 14.6925 18.8994L17.4425 16.1494C17.5284 16.0642 17.5966 15.9628 17.6432 15.8511C17.6897 15.7394 17.7137 15.6196 17.7137 15.4985C17.7137 15.3775 17.6897 15.2577 17.6432 15.146C17.5966 15.0343 17.5284 14.9329 17.4425 14.8477L14.6925 12.0977Z"
                              fill="#1180FF"
                            />
                          </svg>
                        </div>
                        <div className="rank-content">
                        {accountDetailsData?.customerSubscriptionValue?.length > 0 ? accountDetailsData?.customerSubscriptionValue?.map((subscri) => {
                          return <h6>{[...new Set(allCountryData?.data?.map((x) => {
                            if(x.currency === subscri?._id){
                              return x.currency_symbol
                            } 
                          }))].filter(Boolean)}{subscri?.subscriptionValue}</h6>
                        }) : <h6>0</h6>}                       
                          <p>Subscription Value</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Card className="card-table-wrapper p-0">
            <CardHeader>
              <h4 className="card-title-lg fs-2 d-flex">
                Wallet
                {WALLET_STATUS.map((x, i) => {
                  if(x.id === accountDetailsData?.customerAccountInsight?.walletStatus){
                    return <Badge className={"rounded-pill ms-50 d-flex align-items-center " + x.class}>
                    <span className="p-50 d-inline-block rounded-circle me-25" style={{ color: x.color, backgroundColor: x.color }}></span>
                    {x.value}
                  </Badge>       
                  }
                })} 
              </h4>
              <div className="d-flex align-items-center gap-25">
                <Button className="rounded-pill" color="primary" outline onClick={() => paymentClickHandler()}>
                  Add Payment Method
                </Button>
                <Button
                  className="waves-effect btn-icon btn btn-flat-primary"
                  color=""
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.3335 3.66536V14.6654C7.3335 15.1516 7.52665 15.6179 7.87047 15.9617C8.21428 16.3055 8.6806 16.4987 9.16683 16.4987H16.5002C16.9864 16.4987 17.4527 16.3055 17.7965 15.9617C18.1403 15.6179 18.3335 15.1516 18.3335 14.6654V6.6372C18.3335 6.39296 18.2846 6.15119 18.1899 5.92609C18.0951 5.70099 17.9563 5.49709 17.7817 5.32636L14.7429 2.35453C14.4004 2.01963 13.9404 1.83209 13.4614 1.83203H9.16683C8.6806 1.83203 8.21428 2.02519 7.87047 2.369C7.52665 2.71282 7.3335 3.17913 7.3335 3.66536V3.66536Z"
                      stroke="#1180FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.6667 16.4974V18.3307C14.6667 18.817 14.4736 19.2833 14.1298 19.6271C13.786 19.9709 13.3196 20.1641 12.8334 20.1641H5.50008C5.01385 20.1641 4.54754 19.9709 4.20372 19.6271C3.8599 19.2833 3.66675 18.817 3.66675 18.3307V8.2474C3.66675 7.76117 3.8599 7.29485 4.20372 6.95103C4.54754 6.60722 5.01385 6.41406 5.50008 6.41406H7.33341"
                      stroke="#1180FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </CardHeader>
            <div className="react-dataTable position-relative mb-2">
              <Table columns={WalletColumns} dataURL={CustomerPaymentMethods} customerId={accountDetailsData?.customerId} isFetch={false} />
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <Card className="card-table-wrapper p-0">
            <CardHeader>
              <h4 className="card-title-lg fs-2 d-flex">Order History</h4>
            </CardHeader>
            <div className="react-dataTable position-relative mb-2">
              <Table columns={OrderHistoryColumns} dataURL={CustomerOrders} customerId={accountDetailsData?.customerId} isFetch={false} populateValue={[{ "path": "payment", "select": ["paymentId"] }]} />
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <Card className="card-table-wrapper p-0">
            <CardHeader>
              <h4 className="fs-2 d-flex">Outreach Journey</h4>
              <div className="text-end">
                <div className="d-flex align-items-center mb-50">
                  <h5 className="mb-0">Outreach Status</h5>
                  <Badge className="bg-light-success rounded-pill ms-50 d-flex align-items-center">
                    <span className="bg-success p-50 d-inline-block rounded-circle me-25"></span>
                      {accountDetailsData?.outreachStatus === OUTREACH_STATUS.ALLOWED ?  "Allowed" : "Suppressed"}              
                  </Badge>
                </div>
                <Button
                  className="rounded-pill"
                  color="primary"
                  outline
                  onClick={() => supressionClickHandler()}
                >
                  Add to Supression List
                </Button>
              </div>
            </CardHeader>
            <div className="react-dataTable position-relative mb-2">
              <Table columns={OutreachJourneyColumns} dataURL={CustomerOutreachJourney} customerId={accountDetailsData?.customerId} isFetch={false} />
            </div>
          </Card>
        </Col>
      </Row>
      <AddSuppressionList
        modalOpen={modalIsOpen}
        handleCloseModal={() => closeModelHandler()}
        isData={isData} selcetedData={selectedData}
      />
      <PaymentMethod  
      modalOpen={paymentModelIsOpen}
      handleCloseModal={() => closePaymentModelHandler()}
      customerId={accountDetailsData?.customerAccountInsight?.customerId}
       />
    </div>
  )
}

export default AccountDetails

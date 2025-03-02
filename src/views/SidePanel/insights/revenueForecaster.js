import React from "react"
import { Card, CardBody, CardText, Button, Row, Col, Spinner } from "reactstrap"
import UsdFlag from "../../../assets/images/UsdFlag.png"
import gbp from "../../../assets/images/gbp.png"
import eur from "../../../assets/images/eur.png"
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { revenueForecaster } from "./store"
import { useEffect } from "react"
import { toAbsoluteUrl } from "../../../constant/common"
import { useState } from "react"

const RevenueForecaster = ({accountTypesOptions, allCountryData}) => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [selectedAccType, setSelectedAccType] = useState("")

  useEffect(() => {
    const obj = {
      "accountTypeId": selectedAccType
    }
   dispatch(revenueForecaster(obj))
  }, [])

  const revenueForecasterData = useSelector(state => state.insights.revenueForecasterDetails)

  const viewAccHandler = () => {
    navigate('/accountExplorer')
  }

  const accountChangeHandler = (e) =>{
    setSelectedAccType(e.value)
    const obj = {
      "accountTypeId": e.value
    }
   dispatch(revenueForecaster(obj))
  }  

  return (
    <div>
      <h2 className="section-title">Revenue Forecaster
      <span className="d-inline-flex daysDropdown"><Select
                placeholder=''
                theme={selectThemeColors}
                className="react-select select-sm"
                classNamePrefix="select"
                options={accountTypesOptions && [...accountTypesOptions, {value: "", label : "All Accounts"}]}
                defaultValue={{value: "", label : "All Accounts"}}
                onChange={(e) => accountChangeHandler(e)}
                // isClearable={true}
              />  </span>
      </h2>
      <Row className="match-height">
      {revenueForecasterData ? revenueForecasterData?.map(rev => (
        <>
        <Col xl="6" md="6" xs="12">
          <Card className="revenue-card">
            <CardBody className="px-xxl-5 gap-2">
              <ul className="inline-list align-items-center">
                {rev?.HealthyRecurringRevenue?.length > 0 ? rev?.HealthyRecurringRevenue?.map(healthy => (
                  <li className="">
                    <img src={toAbsoluteUrl(`/assets/images/flags/${healthy._id.toLowerCase()}.png`)} className="flag-round" />
                    <h5>{[...new Set(allCountryData?.data?.map((x) => {
                        if (x.currency === healthy._id) {
                          return x.currency_symbol
                        }
                      }))].filter(Boolean)} {(healthy.orderValue).toFixed(2)}</h5>
                  <p>{healthy.totalOrders} Orders</p>
                </li>
                )) : <p>There are no records to display</p>}         
                {/* <li>
                  <img src={eur} alt="eur" />
                  <h5>€34,234</h5>
                  <p>232 Orders</p>
                </li> */}
              </ul>
              <div className="d-flex justify-content-center align-items-center gap-1">
                <span className="ibox bg-light-success d-inline-block m-0">
                  <svg
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.9099 4.00019H3.90994L5.20994 2.71019C5.39824 2.52188 5.50403 2.26649 5.50403 2.00019C5.50403 1.73388 5.39824 1.47849 5.20994 1.29019C5.02164 1.10188 4.76624 0.996094 4.49994 0.996094C4.23364 0.996094 3.97824 1.10188 3.78994 1.29019L0.789939 4.29019C0.696211 4.38315 0.621816 4.49375 0.571048 4.61561C0.520279 4.73747 0.494141 4.86817 0.494141 5.00019C0.494141 5.1322 0.520279 5.2629 0.571048 5.38476C0.621816 5.50662 0.696211 5.61722 0.789939 5.71019L3.78994 8.71019C3.8829 8.80391 3.9935 8.87831 4.11536 8.92908C4.23722 8.97985 4.36793 9.00598 4.49994 9.00598C4.63195 9.00598 4.76266 8.97985 4.88452 8.92908C5.00637 8.87831 5.11698 8.80391 5.20994 8.71019C5.30367 8.61722 5.37806 8.50662 5.42883 8.38476C5.4796 8.2629 5.50574 8.1322 5.50574 8.00019C5.50574 7.86817 5.4796 7.73747 5.42883 7.61561C5.37806 7.49375 5.30367 7.38315 5.20994 7.29019L3.90994 6.00019H15.9099C16.1148 5.99621 16.3185 6.03263 16.5093 6.10737C16.7 6.18212 16.8742 6.29372 17.0219 6.4358C17.1695 6.57788 17.2878 6.74766 17.3698 6.93544C17.4518 7.12321 17.496 7.32531 17.4999 7.53019V10.0002C17.4999 10.2654 17.6053 10.5198 17.7928 10.7073C17.9804 10.8948 18.2347 11.0002 18.4999 11.0002C18.7652 11.0002 19.0195 10.8948 19.207 10.7073C19.3946 10.5198 19.4999 10.2654 19.4999 10.0002V7.53019C19.496 7.06267 19.4 6.60052 19.2175 6.1701C19.035 5.73968 18.7694 5.34943 18.4361 5.02163C18.1027 4.69384 17.708 4.43492 17.2746 4.25966C16.8412 4.0844 16.3774 3.99623 15.9099 4.00019ZM16.2099 13.2902C16.0216 13.1019 15.7662 12.9961 15.4999 12.9961C15.2336 12.9961 14.9782 13.1019 14.7899 13.2902C14.6016 13.4785 14.4958 13.7339 14.4958 14.0002C14.4958 14.2665 14.6016 14.5219 14.7899 14.7102L16.0899 16.0002H4.08994C3.88507 16.0042 3.68142 15.9677 3.49063 15.893C3.29983 15.8183 3.12564 15.7067 2.97798 15.5646C2.83033 15.4225 2.71212 15.2527 2.63009 15.0649C2.54807 14.8772 2.50384 14.6751 2.49994 14.4702V12.0002C2.49994 11.735 2.39458 11.4806 2.20705 11.2931C2.01951 11.1055 1.76516 11.0002 1.49994 11.0002C1.23472 11.0002 0.980368 11.1055 0.792832 11.2931C0.605296 11.4806 0.499939 11.735 0.499939 12.0002V14.4702C0.503862 14.9377 0.599834 15.3999 0.782375 15.8303C0.964915 16.2607 1.23045 16.6509 1.56382 16.9787C1.89718 17.3065 2.29185 17.5655 2.72528 17.7407C3.15872 17.916 3.62243 18.0041 4.08994 18.0002H16.0899L14.7899 19.2902C14.6962 19.3831 14.6218 19.4937 14.571 19.6156C14.5203 19.7375 14.4941 19.8682 14.4941 20.0002C14.4941 20.1322 14.5203 20.2629 14.571 20.3848C14.6218 20.5066 14.6962 20.6172 14.7899 20.7102C14.8829 20.8039 14.9935 20.8783 15.1154 20.9291C15.2372 20.9798 15.3679 21.006 15.4999 21.006C15.632 21.006 15.7627 20.9798 15.8845 20.9291C16.0064 20.8783 16.117 20.8039 16.2099 20.7102L19.2099 17.7102C19.3037 17.6172 19.3781 17.5066 19.4288 17.3848C19.4796 17.2629 19.5057 17.1322 19.5057 17.0002C19.5057 16.8682 19.4796 16.7375 19.4288 16.6156C19.3781 16.4937 19.3037 16.3831 19.2099 16.2902L16.2099 13.2902Z"
                      fill="#28C76F"
                    />
                  </svg>
                </span>
                <p className=" mb-0  main-font">Healthy Recurring Revenue</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl="6" md="6" xs="12">
          <Card className="revenue-card">
            <CardBody className="px-xxl-5 gap-2">
              <ul className="inline-list align-items-center">
              {rev?.AtRiskRecurringRevenue?.length > 0 ? rev?.AtRiskRecurringRevenue?.map(risk => (
                  <li className="">
                    <img src={toAbsoluteUrl(`/assets/images/flags/${risk._id.toLowerCase()}.png`)} className="flag-round" />
                    <h5>{[...new Set(allCountryData?.data?.map((x) => {
                        if (x.currency === risk._id) {
                          return x.currency_symbol
                        }
                      }))].filter(Boolean)} {(risk.orderValue).toFixed(2)}</h5>
                  <p>{risk.totalOrders} Orders</p>
                </li>
                )) : <p>There are no records to display</p>}
                
                {/* <li>
                  <img src={UsdFlag} alt="usdflag" />
                  <h5>$123,257</h5>
                  <p>534 Orders</p>
                </li>
                <li>
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
                  <Button
                    color="outline-primary"
                    className="ms-1 btn-sm rounded-pill"
                    onClick={viewAccHandler}
                  >
                    View Accounts
                  </Button>
                </p>
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

export default RevenueForecaster

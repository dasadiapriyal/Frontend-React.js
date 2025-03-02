import React, { useEffect, useState } from "react"
import { Card, CardBody, CardText, Button, Row, Col, Spinner } from "reactstrap"
import UsdFlag from "../../../assets/images/UsdFlag.png"
import gbp from "../../../assets/images/gbp.png"
import eur from "../../../assets/images/eur.png"
import Protection from "../../../assets/images/Protection.png"
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import "./insights.scss"
import { useDispatch, useSelector } from "react-redux"
import { protectionMetrics } from "../guardianAI/store"
import { toAbsoluteUrl } from "../../../constant/common"

const ProtectionMetrics = ({ allCountryData }) => {

  const dispatch = useDispatch()
  const [days, setDays] = useState(30)

  const protectionMetricsData = useSelector((state) => state.guardianAI.protectionMetricsData)

  useEffect(() => {
    const obj = {
      "lastDays": days
    }
    dispatch(protectionMetrics(obj))
  }, [days])

  const daysOptions = [
    { value: 30, label: "Last 30 Days" },
    { value: 90, label: "Last 90 Days" },
    { value: 0, label: "All Time" },
  ]

  const dayChangeHandler = (e) => {
    setDays(e.value)
  }

  return (
    <div className="protection-metrics-block">
      <h2 className="section-title">
        GuardianAl Protection Metrics <span className="d-inline-flex daysDropdown"><Select
          placeholder=''
          theme={selectThemeColors}
          className="react-select select-sm"
          classNamePrefix="select"
          options={daysOptions}
          defaultValue={daysOptions[0]}
          // isClearable={true}
          onChange={(e) => dayChangeHandler(e)}
        />  </span>
      </h2>
      <Row className="match-height">
        {protectionMetricsData ? protectionMetricsData?.data?.map((info, i) => (
          <>
            <Col xl="4" md="6" xs="12">
              <Card className="protection-card">
                <CardBody className="d-md-flex align-items-center justify-content-md-center justify-content-around flex-row">
                  <div className="text-center moniter-box py-xxl-2">
                    <div className="ibox bg-success-light position-relative">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.6307 16.4508H7.67363L8.37441 15.0234L20.0182 15.0023C20.4119 15.0023 20.7494 14.7211 20.8197 14.332L22.4322 5.30625C22.4744 5.06953 22.4111 4.82578 22.2564 4.64062C22.18 4.5495 22.0846 4.4761 21.977 4.42551C21.8693 4.37492 21.7519 4.34835 21.633 4.34766L6.8205 4.29844L6.69394 3.70312C6.61425 3.32344 6.27207 3.04688 5.88301 3.04688H2.26191C2.04249 3.04688 1.83205 3.13404 1.67689 3.2892C1.52174 3.44436 1.43457 3.65479 1.43457 3.87422C1.43457 4.09364 1.52174 4.30408 1.67689 4.45924C1.83205 4.6144 2.04249 4.70156 2.26191 4.70156H5.21269L5.76582 7.33125L7.12754 13.9242L5.37441 16.7859C5.28337 16.9088 5.22853 17.0547 5.21611 17.2071C5.20368 17.3596 5.23416 17.5124 5.3041 17.6484C5.44472 17.9273 5.72832 18.1031 6.04238 18.1031H7.51425C7.20047 18.5199 7.03098 19.0275 7.03144 19.5492C7.03144 20.8758 8.10957 21.9539 9.43613 21.9539C10.7627 21.9539 11.8408 20.8758 11.8408 19.5492C11.8408 19.0266 11.6674 18.518 11.358 18.1031H15.1338C14.82 18.5199 14.6505 19.0275 14.651 19.5492C14.651 20.8758 15.7291 21.9539 17.0557 21.9539C18.3822 21.9539 19.4603 20.8758 19.4603 19.5492C19.4603 19.0266 19.2869 18.518 18.9775 18.1031H21.633C22.0877 18.1031 22.4603 17.7328 22.4603 17.2758C22.459 17.0566 22.371 16.8468 22.2155 16.6923C22.0601 16.5377 21.8499 16.4509 21.6307 16.4508ZM7.16504 5.92969L20.6603 5.97422L19.3385 13.3758L8.73769 13.3945L7.16504 5.92969ZM9.43613 20.2898C9.02832 20.2898 8.6955 19.957 8.6955 19.5492C8.6955 19.1414 9.02832 18.8086 9.43613 18.8086C9.84394 18.8086 10.1768 19.1414 10.1768 19.5492C10.1768 19.7456 10.0987 19.934 9.95983 20.0729C9.82094 20.2118 9.63255 20.2898 9.43613 20.2898ZM17.0557 20.2898C16.6478 20.2898 16.315 19.957 16.315 19.5492C16.315 19.1414 16.6478 18.8086 17.0557 18.8086C17.4635 18.8086 17.7963 19.1414 17.7963 19.5492C17.7963 19.7456 17.7183 19.934 17.5794 20.0729C17.4405 20.2118 17.2521 20.2898 17.0557 20.2898Z"
                          fill="#28C76F"
                        />
                      </svg>
                      <span className="protection-icon">
                        <img src={Protection} alt="Protection" />
                      </span>
                    </div>
                    <div className="grey-dark-text">
                      <h5 className="mb-50">{info.protectedOrder}</h5>
                      <p>Orders Protected</p>
                    </div>
                  </div>
                  <div className="text-center moniter-box py-xxl-2">
                    <div className="ibox bg-success-light position-relative">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 10C11.1935 10 12.3381 9.52589 13.182 8.68198C14.0259 7.83807 14.5 6.69347 14.5 5.5C14.5 4.30653 14.0259 3.16193 13.182 2.31802C12.3381 1.47411 11.1935 1 10 1C8.80653 1 7.66193 1.47411 6.81802 2.31802C5.97411 3.16193 5.5 4.30653 5.5 5.5C5.5 6.69347 5.97411 7.83807 6.81802 8.68198C7.66193 9.52589 8.80653 10 10 10ZM13 5.5C13 6.29565 12.6839 7.05871 12.1213 7.62132C11.5587 8.18393 10.7956 8.5 10 8.5C9.20435 8.5 8.44129 8.18393 7.87868 7.62132C7.31607 7.05871 7 6.29565 7 5.5C7 4.70435 7.31607 3.94129 7.87868 3.37868C8.44129 2.81607 9.20435 2.5 10 2.5C10.7956 2.5 11.5587 2.81607 12.1213 3.37868C12.6839 3.94129 13 4.70435 13 5.5ZM19 17.5C19 19 17.5 19 17.5 19H2.5C2.5 19 1 19 1 17.5C1 16 2.5 11.5 10 11.5C17.5 11.5 19 16 19 17.5ZM17.5 17.494C17.4985 17.125 17.269 16.015 16.252 14.998C15.274 14.02 13.4335 13 10 13C6.565 13 4.726 14.02 3.748 14.998C2.731 16.015 2.503 17.125 2.5 17.494H17.5Z"
                          fill="#28C76F"
                          stroke="#28C76F"
                          strokeWidth="0.2"
                        />
                      </svg>
                      <span className="protection-icon">
                        <img src={Protection} alt="Protection" />
                      </span>
                    </div>
                    <div className="grey-dark-text">
                      <h5 className="mb-50">{info.protectedCustomer}</h5>
                      <p>Accounts Protected</p>
                    </div>
                  </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4" md="6" xs="12">
            <Card className="protection-card">
              <CardBody className="">
                <ul className="inline-list flex-grow-1 flex-wrap">
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
                  <h5>£659,823</h5>
                  <p>GBP</p>
                </li>
                <li>
                  <img src={eur} alt="eur" />
                  <h5>€23,234</h5>
                  <p>EUR</p>
                </li> */}
                  </ul>
                  <div className="d-flex justify-content-center align-items-center grey-dark-text">
                    <p className="mt-1 mb-0">Revenue Protected</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4" md="6" xs="12">
              <Card className="protection-card">
                <CardBody>
                  <div className="d-flex flex-column justify-content-center align-items-center text-center">
                    <span className="mb-1">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M29.8664 36.3062C29.3819 35.7596 28.8069 35.3009 28.1849 35.1799C28.1849 35.176 28.1855 35.1722 28.1855 35.1682C28.1855 34.2038 27.4037 33.4219 26.4392 33.4219H13.6046C12.6401 33.4219 11.8583 34.2037 11.8583 35.1682C11.8583 35.1721 11.8588 35.1759 11.8589 35.1799C11.2369 35.3009 10.6619 35.7596 10.1774 36.3062C9.37772 37.2084 10.0203 38.6326 11.2259 38.6326H28.818C30.0235 38.6326 30.6661 37.2084 29.8664 36.3062Z"
                          fill="#E2A042"
                        />
                        <path
                          d="M38.5619 6.72391C37.6314 5.61203 36.2661 4.9743 34.8162 4.9743H32.9307V2.70312H7.11352V4.9743H5.18477C3.73484 4.9743 2.36961 5.61195 1.43906 6.72391C0.508517 7.83578 0.121252 9.29203 0.376799 10.7193L1.88625 19.1517C2.3036 21.4832 4.32563 23.1755 6.69422 23.1755H12.7142C12.8856 23.1755 13.0557 23.1659 13.2242 23.1483C13.9952 24.0248 14.8188 24.887 15.6831 25.7513C16.3114 26.3796 16.8753 26.8975 17.3977 27.3059C17.2525 28.0232 17.0892 28.7366 16.9079 29.4456L16.6812 30.3056C16.5996 30.5893 16.5292 30.8685 16.4432 31.1387C16.3533 31.4088 16.2305 31.67 16.0941 31.9177C15.9566 32.1653 15.8122 32.3995 15.6944 32.6156C15.5856 32.8066 15.4879 33.0035 15.4015 33.2055C15.3671 33.2934 15.3307 33.3756 15.3068 33.4516C15.2837 33.5276 15.2676 33.5973 15.2617 33.6604C15.2325 33.9126 15.3295 34.0566 15.3295 34.0566C15.8152 34.7789 16.6 35.3959 17.6333 35.7898C20.2123 36.7728 23.3624 35.9969 24.6692 34.0566C24.6692 34.0566 24.7662 33.9126 24.737 33.6604C24.7312 33.5973 24.715 33.5276 24.6919 33.4516C24.6681 33.3756 24.6316 33.2934 24.5973 33.2055C24.5109 33.0035 24.4131 32.8066 24.3044 32.6156C24.1866 32.3995 24.0422 32.1653 23.9046 31.9177C23.7682 31.67 23.6454 31.4088 23.5555 31.1387C23.4695 30.8685 23.3992 30.5893 23.3176 30.3056L23.0909 29.4456C22.9122 28.7466 22.7509 28.0434 22.6071 27.3364C23.1405 26.9234 23.717 26.3954 24.3611 25.7513C25.2244 24.888 26.0469 24.027 26.8171 23.1516C26.9731 23.1671 27.1298 23.175 27.2866 23.1755H33.3067C35.6752 23.1755 37.6973 21.4833 38.1148 19.1516L39.6241 10.7193C39.8796 9.29211 39.4924 7.83578 38.5619 6.72391ZM6.69422 19.8474C6.32892 19.8477 5.97517 19.7194 5.69503 19.4849C5.41489 19.2505 5.22625 18.9249 5.16219 18.5652L3.65266 10.1329C3.54125 9.51023 3.81688 9.06797 3.99117 8.85977C4.16547 8.65156 4.55219 8.30227 5.18477 8.30227H7.11547C7.16539 13.0016 8.51234 16.6275 10.6604 19.8474H6.69422ZM36.3482 10.1329L34.8389 18.5652C34.7748 18.9249 34.5862 19.2505 34.306 19.485C34.0259 19.7194 33.6721 19.8478 33.3068 19.8475H29.3839C31.5319 16.6276 32.879 13.0017 32.9288 8.30234H34.8162C35.4487 8.30234 35.8355 8.65164 36.0098 8.85984C36.1841 9.06797 36.4596 9.51023 36.3482 10.1329Z"
                          fill="#FFB636"
                        />
                        <path
                          d="M10.4209 38.3801C11.4735 39.4327 15.5625 39.8422 20.0218 39.8422C24.4812 39.8422 29.0353 38.9937 29.7511 38.278C30.4669 37.5622 25.7618 37.543 25.7618 37.543L10.4209 38.3801Z"
                          fill="#E2A042"
                        />
                        <path
                          d="M20.0004 4.90125C27.1227 4.90125 32.8964 3.91687 32.8964 2.70258C32.8964 1.48829 27.1227 0.503906 20.0004 0.503906C12.8782 0.503906 7.10449 1.48829 7.10449 2.70258C7.10449 3.91687 12.8782 4.90125 20.0004 4.90125Z"
                          fill="#FFD469"
                        />
                        <path
                          d="M28.6329 14.9563C28.4794 14.9563 28.3234 14.9287 28.1715 14.8704C27.5068 14.6155 27.1746 13.8699 27.4296 13.2053C28.3841 10.7166 28.2944 9.27658 28.1995 7.75213C28.1552 7.04158 28.6953 6.42963 29.4058 6.38533C30.1177 6.34127 30.7283 6.88127 30.7725 7.59173C30.897 9.58861 30.9071 11.3378 29.8366 14.1285C29.6399 14.6413 29.1512 14.9563 28.6329 14.9563Z"
                          fill="#FFD469"
                        />
                      </svg>
                    </span>
                    <div className="grey-dark-text">
                      <h5 className="">{(info.protectionRate).toFixed(2)}%</h5>
                      <p className="mb-0">Protection Rate</p>
                    </div>
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

export default ProtectionMetrics

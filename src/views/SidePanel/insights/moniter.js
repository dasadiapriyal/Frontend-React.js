import React from "react"
import { Card, CardBody, CardHeader, CardTitle, Row, Col, Spinner } from "reactstrap"
import { selectThemeColors } from '@utils'
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts"
import Select from 'react-select'
import TinyFlag from "tiny-flag-react"
import { useDispatch, useSelector } from "react-redux"
import { ltvMoniter } from "./store"
import { useEffect } from "react"
import { ARROW_IMG, LTV_RANK } from "../../../constant/common"
import { useState } from "react"


const Moniter = ({ accountTypesOptions, currencyOptions }) => {
  const data = [
    { name: "Group A", value: 100, value2: "345 (5%)" },
    { name: "Group B", value: 300, value2: "2,652 (15%)" },
    { name: "Group C", value: 300, value2: "3,253 (20%)" },
    { name: "Group D", value: 200, value2: "4,474 (25%)" },
    { name: "Group E", value: 200, value2: "5,745 (35%)" },
  ]

  const ltvMoniterData = useSelector((state) => state.insights.ltvMoniterDetails)

  const COLORS = ["#FEDB49", "#BBDA62", "#28C76F", "#FB3E56", "#FF9F43"]

  const [selectedAccType, setSelectedAccType] = useState(["1", "2", "3", "4"])
  const [graphData, setGraphData] = useState([])
  const [chartColor, setChartColor] = useState([])
  const [lifetimeValFlag, setLifetimeValFlag] = useState("USD")
  const [orderValFlag, setOrderValFlag] = useState("USD")

  // const RADIAN = Math.PI / 180
  // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius }) => {
  //     console.log("info...", data)
  //     // {data.map((entry, index) => (entry.value2))}
  //     const radius = innerRadius + ((outerRadius - innerRadius) * 0.5)
  //     const x = cx + (radius * Math.cos(-midAngle * RADIAN))
  //     const y = cy + (radius * Math.sin(-midAngle * RADIAN))

  //     // return (
  //     //     <text x={x} y={y} fill="Black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
  //     //         {data.map((entry, index) => (entry.value2))}
  //     //     </text>
  //     // )
  //     return (
  //         <text style={{fontSize:"10px"}} x={x} y={y} fill="Black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
  //             {data.map((entry, index) => (entry.value2))}
  //         </text>
  //     )
  // }

  const flagURL = (code) => {
    return `https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/${code}.svg`
  }

  const dispatch = useDispatch()

  useEffect(() => {
    const obj = {
      "query":
      {
        "accountTypeId": Array.isArray(selectedAccType) ? selectedAccType : [selectedAccType],
        "lifeTimeValueCurrencyFilter": lifetimeValFlag,
        "orderValueCurrencyFilter": orderValFlag
      }
    }
    dispatch(ltvMoniter(obj))
  }, [])

  useEffect(() => {
    let filterData = []
    let filterColors = []
    ltvMoniterData?.ltvRank?.map((ltv) => {
      LTV_RANK.map((x) => {
        if (x.id === ltv?._id) {
          filterData.push({ name: x.value, value: ltv.count })
          filterColors.push(x.graphColor)
        }
      })
    })
    setGraphData(filterData)
    setChartColor(filterColors)
  }, [ltvMoniterData])

  const accountChangeHandler = (e) => {
    setSelectedAccType(Array.isArray(e.value) ? e.value : [e.value])
    const obj = {
      "query":
      {
        "accountTypeId": Array.isArray(e.value) ? e.value : [e.value],
        "lifeTimeValueCurrencyFilter": lifetimeValFlag,
        "orderValueCurrencyFilter": orderValFlag
      }
    }
    dispatch(ltvMoniter(obj))
  }

  const flagChangeHandler = (e, key) => {
    let lifetimeFlagVal = lifetimeValFlag
    let orderFlagVal = orderValFlag
    if (key == "lifetimeVal") {
      setLifetimeValFlag(e.value)
      lifetimeFlagVal = e.value
    }
    if (key == "orderVal") {
      setOrderValFlag(e.value)
      orderFlagVal = e.value
    }
    const obj = {
      "query":
      {
        "accountTypeId": Array.isArray(selectedAccType) ? selectedAccType : [selectedAccType],
        "lifeTimeValueCurrencyFilter": lifetimeFlagVal,
        "orderValueCurrencyFilter": orderFlagVal
      }
    }
    dispatch(ltvMoniter(obj))
  }

  return (
    <div>
      <h2 className="section-title">LTV Monitor
        <span className="d-inline-flex daysDropdown"><Select
          placeholder=''
          theme={selectThemeColors}
          className="react-select select-sm"
          classNamePrefix="select"
          options={accountTypesOptions && [...accountTypesOptions, { value: ["1", "2", "3", "4"], label: "All Accounts" }]}
          defaultValue={{ value: ["1", "2", "3", "4"], label: "All Accounts" }}
          onChange={(e) => accountChangeHandler(e)}
        // isClearable={true}
        />  </span>
      </h2>
      <Row className="match-height">
        {ltvMoniterData ? <>
          <Col xl="3" md="6" xs="12">
            <Card className="dash-card">
              <CardHeader>LTV Rank</CardHeader>
              <CardBody>
                <div
                  className="recharts-wrapper m-auto"
                  style={{ width: "100%", height: "150px" }}
                >
                  <ResponsiveContainer height={"100%"} width={"100%"}>
                    <PieChart width={230} height={110}>
                      <Pie
                        data={graphData}
                        cx={"50%"}
                        cy={"50%"}
                        innerRadius={"45%"}
                        outerRadius={"65%"}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {graphData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={chartColor[index % chartColor.length]}
                          />
                        ))}
                        {/* {data.map((entry, index) => (
  <Label key={`cell-${index}`}
  content={<CustomLabel value1={entry.value} value2={entry.value2}/>}>
</Label>
 ))} */}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="d-flex flex-wrap">
                  <div className="me-50">
                    <span
                      className="bullet bullet-sm bullet-bordered me-50"
                      style={{ backgroundColor: "#BBDA62" }}
                    ></span>
                    <small className="">Ultra High Value</small>
                  </div>
                  <div className="me-50">
                    <span
                      className="bullet bullet-sm bullet-bordered me-50"
                      style={{ backgroundColor: "#28C76F" }}
                    ></span>
                    <small className="">High Value</small>
                  </div>
                  <div className="me-50">
                    <span
                      className="bullet bullet-sm bullet-bordered me-50"
                      style={{ backgroundColor: "#FF9F43" }}
                    ></span>
                    <small className="">Average Value</small>
                  </div>
                  <div className="me-50">
                    <span
                      className="bullet bullet-sm bullet-bordered me-50"
                      style={{ backgroundColor: "#FEDB49" }}
                    ></span>
                    <small className="">Low Value</small>
                  </div>
                  <div className="me-50">
                    <span
                      className="bullet bullet-sm bullet-bordered me-50"
                      style={{ backgroundColor: "#FB3E56" }}
                    ></span>
                    <small className="">No Value</small>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3" md="6" xs="12">
            <Card className="moniter-card">
              <CardHeader></CardHeader>
              <CardBody>
                <div className="text-center moniter-box">
                  <span className="flagdropdown"><Select
                    placeholder=''
                    theme={selectThemeColors}
                    className="react-select select-sm"
                    classNamePrefix="select"
                    options={currencyOptions}
                    defaultValue={{
                      value: "USD",
                      label: (
                        <div className='table-flag-wrap gap-50 '>
                          <TinyFlag
                            country="USA"
                            // alt={info.code + " Flag"}
                            fallbackImageURL={flagURL("US")}
                            className="flag-img me-2"
                          />
                          USD
                        </div>
                      ),
                    }}
                    onChange={(e) => flagChangeHandler(e, "lifetimeVal")}
                  // isClearable={true}
                  />  </span>
                  <div className="ibox">
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
                  <h6>${ltvMoniterData.averageLifetimeValue.value}</h6>
                  <p>Average Lifetime Value</p>
                  <span className={ltvMoniterData.averageLifetimeValue.difference > 0 ? "text-success" : "text-danger"}>
                    {Math.abs(ltvMoniterData.averageLifetimeValue.difference)}% Above 90-Day Moving Average{" "}
                    {ltvMoniterData.averageLifetimeValue.difference > 0 ? ARROW_IMG.success : ARROW_IMG.error}
                    {/* <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.33301 6.33464L5.99968 1.66797L10.6663 6.33464M5.99968 12.3346V1.66797V12.3346Z"
                      stroke="#28C76F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg> */}
                  </span>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3" md="6" xs="12">
            <Card className="moniter-card">
              <CardHeader></CardHeader>
              <CardBody>
                <div className="text-center moniter-box">
                  <div className="ibox">
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
                  <h6>{ltvMoniterData.averageLifetimePoints.value}</h6>
                  <p>Average Lifetime Points</p>
                  <span className={ltvMoniterData.averageLifetimePoints.difference > 0 ? "text-success" : "text-danger"}>
                    {Math.abs(ltvMoniterData.averageLifetimePoints.difference)}% Above 90-Day Moving Average{" "}
                    {ltvMoniterData.averageLifetimePoints.difference > 0 ? ARROW_IMG.success : ARROW_IMG.error}
                  </span>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3" md="6" xs="12">
            <Card className="moniter-card">
              <CardHeader></CardHeader>
              <CardBody>
                <div className="text-center moniter-box">
                  <div className="ibox">
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
                  <h6>{ltvMoniterData.averageLifetimeOrders.value}</h6>
                  <p>Average Lifetime Orders</p>
                  <span className={ltvMoniterData.averageLifetimeOrders.difference > 0 ? "text-success" : "text-danger"}>
                    {Math.abs(ltvMoniterData.averageLifetimeOrders.difference)}% Above 90-Day Moving Average{" "}
                    {ltvMoniterData.averageLifetimeOrders.difference > 0 ? ARROW_IMG.success : ARROW_IMG.error}
                  </span>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3" md="6" xs="12">
            <Card className="moniter-card">
              <CardHeader></CardHeader>
              <CardBody>
                <div className="text-center moniter-box">
                  <span className="flagdropdown"><Select
                    placeholder=''
                    theme={selectThemeColors}
                    className="react-select select-sm"
                    classNamePrefix="select"
                    options={currencyOptions}
                    defaultValue={{
                      value: "USD",
                      label: (
                        <div className='table-flag-wrap gap-50 '>
                          <TinyFlag
                            country="USA"
                            // alt={info.code + " Flag"}
                            fallbackImageURL={flagURL("US")}
                            className="flag-img me-2"
                          />
                          USD
                        </div>
                      ),
                    }}
                    onChange={(e) => flagChangeHandler(e, "orderVal")}
                  // isClearable={true}
                  />  </span>
                  <div className="ibox">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.6307 16.4508H7.67363L8.37441 15.0234L20.0182 15.0023C20.4119 15.0023 20.7494 14.7211 20.8197 14.332L22.4322 5.30625C22.4744 5.06953 22.4111 4.82578 22.2564 4.64062C22.18 4.5495 22.0846 4.4761 21.977 4.42551C21.8693 4.37492 21.7519 4.34835 21.633 4.34766L6.8205 4.29844L6.69394 3.70312C6.61425 3.32344 6.27207 3.04688 5.88301 3.04688H2.26191C2.04249 3.04688 1.83205 3.13404 1.67689 3.2892C1.52174 3.44436 1.43457 3.65479 1.43457 3.87422C1.43457 4.09364 1.52174 4.30408 1.67689 4.45924C1.83205 4.6144 2.04249 4.70156 2.26191 4.70156H5.21269L5.76582 7.33125L7.12754 13.9242L5.37441 16.7859C5.28337 16.9088 5.22853 17.0547 5.21611 17.2071C5.20368 17.3596 5.23416 17.5124 5.3041 17.6484C5.44472 17.9273 5.72832 18.1031 6.04238 18.1031H7.51425C7.20047 18.5199 7.03098 19.0275 7.03144 19.5492C7.03144 20.8758 8.10957 21.9539 9.43613 21.9539C10.7627 21.9539 11.8408 20.8758 11.8408 19.5492C11.8408 19.0266 11.6674 18.518 11.358 18.1031H15.1338C14.82 18.5199 14.6505 19.0275 14.651 19.5492C14.651 20.8758 15.7291 21.9539 17.0557 21.9539C18.3822 21.9539 19.4603 20.8758 19.4603 19.5492C19.4603 19.0266 19.2869 18.518 18.9775 18.1031H21.633C22.0877 18.1031 22.4603 17.7328 22.4603 17.2758C22.459 17.0566 22.371 16.8468 22.2155 16.6923C22.0601 16.5377 21.8499 16.4509 21.6307 16.4508ZM7.16504 5.92969L20.6603 5.97422L19.3385 13.3758L8.73769 13.3945L7.16504 5.92969ZM9.43613 20.2898C9.02832 20.2898 8.6955 19.957 8.6955 19.5492C8.6955 19.1414 9.02832 18.8086 9.43613 18.8086C9.84394 18.8086 10.1768 19.1414 10.1768 19.5492C10.1768 19.7456 10.0987 19.934 9.95983 20.0729C9.82094 20.2118 9.63255 20.2898 9.43613 20.2898ZM17.0557 20.2898C16.6478 20.2898 16.315 19.957 16.315 19.5492C16.315 19.1414 16.6478 18.8086 17.0557 18.8086C17.4635 18.8086 17.7963 19.1414 17.7963 19.5492C17.7963 19.7456 17.7182 19.934 17.5794 20.0729C17.4405 20.2118 17.2521 20.2898 17.0557 20.2898Z"
                        fill="#1180FF"
                      />
                    </svg>
                  </div>
                  <h6>${ltvMoniterData.averageOrderValue.value}</h6>
                  <p>Average Order Value</p>
                  <span className={ltvMoniterData.averageOrderValue.difference > 0 ? "text-success" : "text-danger"}>
                    {Math.abs(ltvMoniterData.averageOrderValue.difference)}% Below 90-Day Moving Average{" "}
                    {ltvMoniterData.averageOrderValue.difference > 0 ? ARROW_IMG.success : ARROW_IMG.error}
                  </span>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3" md="6" xs="12">
            <Card className="moniter-card">
              <CardHeader></CardHeader>
              <CardBody>
                <div className="text-center moniter-box">
                  <div className="ibox">
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
                  <h6>Every {Math.floor(Math.floor(Math.floor(ltvMoniterData.avgOrderFrequency.value / 60) / 24) / 30)} Months</h6>
                  <p>Average Order Frequency</p>
                  <span className={ltvMoniterData.avgOrderFrequency.difference > 0 ? "text-success" : "text-danger"}>
                    {Math.abs(ltvMoniterData.avgOrderFrequency.difference)}% Above 90-Day Moving Average{" "}
                    {ltvMoniterData.avgOrderFrequency.difference > 0 ? ARROW_IMG.success : ARROW_IMG.error}
                  </span>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3" md="6" xs="12">
            <Card className="moniter-card">
              <CardHeader></CardHeader>
              <CardBody>
                <div className="text-center moniter-box">
                  <div className="ibox">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                        stroke="#1180FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 2V6"
                        stroke="#1180FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 2V6"
                        stroke="#1180FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 10H21"
                        stroke="#1180FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h6>{Math.floor(Math.floor(Math.floor(ltvMoniterData.averageLifespan.value / 60) / 24) / 30)} Months</h6>
                  <p>Average Lifespan</p>
                  <span className={ltvMoniterData.averageLifespan.difference > 0 ? "text-success" : "text-danger"}>
                    {Math.abs(ltvMoniterData.averageLifespan.difference)}% Above 90-Day Moving Average{" "}
                    {ltvMoniterData.averageLifespan.difference > 0 ? ARROW_IMG.success : ARROW_IMG.error}
                  </span>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3" md="6" xs="12">
            <Card className="moniter-card">
              <CardHeader></CardHeader>
              <CardBody>
                <div className="text-center moniter-box">
                  <div className="ibox">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                        stroke="#1180FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                        stroke="#1180FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23 11H17"
                        stroke="#1180FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h6>{ltvMoniterData.monthlyChurn.value}%</h6>
                  <p>Monthly Churn</p>
                  <span className={ltvMoniterData.monthlyChurn.difference > 0 ? "text-success" : "text-danger"}>
                    {Math.abs(ltvMoniterData.monthlyChurn.difference)}% Below 90-Day Moving Average{" "}
                    {ltvMoniterData.monthlyChurn.difference > 0 ? ARROW_IMG.success : ARROW_IMG.error}
                  </span>
                </div>
              </CardBody>
            </Card>
          </Col>
        </> : <div className='d-flex justify-content-center my-1 gap-1'>
          <Spinner size='sm' type='grow' color='primary' />
          <span className=''>Loading...</span>
        </div>}
      </Row>
    </div>
  )
}

export default Moniter

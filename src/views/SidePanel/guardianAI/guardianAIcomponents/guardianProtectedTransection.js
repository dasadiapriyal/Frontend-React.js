import React from 'react'
import { Card, Col, Row } from 'reactstrap'
import DataTable from "react-data-table-component"
import { GUARDIAN_AI_CAMPIGN_TYPE } from '../../../../constant/common'
import Table from '../../../../Components/Table'
import { CustomerOrders } from '../../../../Services/api/routes/APIRoutes'
import TinyFlag from 'tiny-flag-react'
import { FormatDate } from '../../../../constant/formateDate'

const GuardianProtectedTransection = ({ allCountryData }) => {

  const flagURL = (code) => {
    return `https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/${code}.svg`
  }

  const protectedTransactionColumns = [
    {
      name: "Order ID",
      selector: (row) => row.orderId,
    },
    {
      name: "Order Date",
      selector: (row) => FormatDate(row.orderDate)
    },
    {
      name: "Account ID",
      selector: (row) => row.customerId
    },
    {
      name: "Name",
      selector: (row) => row?.customer?.customerFirstName + " " + row?.customer?.customerLastName
    },
    {
      name: "Country",
      selector: (row) => allCountryData?.data?.map((x) => {
        if (x.iso3 === row?.customer?.customerCountry || x.name === row?.customer?.customerCountry) {
          return (
            <div className="table-flag-wrap">
              <p>{x.iso3}</p>
              <TinyFlag
                country={x.code}
                alt={x.code + " Flag"}
                fallbackImageURL={flagURL(x.code)}
              />
            </div>
          )
        }
      })
    },
    {
      name: "Currency",
      selector: (row) => row.orderCurrency
    },
    {
      name: "Order Value",
      selector: (row) => row.orderValue
    },
    {
      name: "GuardianAI Campaign",
      selector: (row) => (GUARDIAN_AI_CAMPIGN_TYPE.map((x) => {
        if (x.id === row?.guardianaicampaign?.campaignType) {
          return <div className="icon-wrap"><span>{x.icon}</span><p>{x.value}</p></div>
        }
      }))
    },
  ]

  return (
    <div className="protection-metrics-block">
      <h2 className="section-title">
        Recently Protected Transactions
      </h2>
      <Row>
        <Col sm={12}>
          <Card>
            <div className="react-dataTable position-relative mb-2">
              <Table
                columns={protectedTransactionColumns}
                linkedCampaignVal={true}
                dataURL={CustomerOrders}
                isFetch={true}
                populateValue={[{ "path": "guardianaicampaign", "select": ["campaignType"] }, { "path": "customer", "select": ["customerFirstName", "customerLastName", "customerCountry"] }]}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default GuardianProtectedTransection

import React, { Fragment, useState } from "react"
import {
  Card,
  CardBody,
  Input,
  Row,
  Col,
} from "reactstrap"
import { GUARDIAN_AI_CAMPIGN_TYPE, LTV_RANK, MESSAGE_TYPE, WALLET_STATUS } from '../../../constant/common'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Table from '../../../Components/Table'
import { GuardianOutreachArchived } from '../../../Services/api/routes/APIRoutes'
import { FormatDate } from '../../../constant/formateDate'
import FilterComponent from "../../../Components/Filter"

const OutreachArchive = () => {
  const [searchValue, setSearchValue] = useState(null)
  const [tableFilter, setTableFilter] = useState(null)

  const outreachQueueColumns = [
    {
      id: "customerId",
      name: "Account ID",
      selector: (row) => row?.customerAccount?.customerId,
    },
    {
      name: "First Name",
      selector: (row) => row?.customerAccount?.customerFirstName,
    },
    {
      name: "Last Name",
      selector: (row) => row?.customerAccount?.customerLastName,
    },
    {
      name: "Wallet Status",
      selector: (row) =>
        WALLET_STATUS.map((x) => {
          if (x.id === row?.customerAccountInsight?.walletStatus) {
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
      name: "Health Score",
      selector: (row) => (
        <div className="circulerprogressprogress-wrap">
          {" "}
          <CircularProgressbar
            className="circulerprogress-div"
            value={row?.customerAccountInsight?.healthScore}
            styles={buildStyles({
              pathColor:
                row.healthScore > 79
                  ? "rgb(40,199,111)"
                  : row.healthScore > 60
                  ? "rgb(255, 159, 67)"
                  : "rgb(251, 62, 86)",
            })}
          />
          <div className="progress-label">
            <p>{row?.customerAccountInsight?.healthScore}</p>
          </div>
        </div>
      ),
    },
    {
      name: "LTV Rank",
      selector: (row) =>
        LTV_RANK.map((x) => {
          if (x.id === row?.customerAccountInsight?.ltvRank) {
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
        name: "GuardianAI Campaign",
        selector: (row) => (GUARDIAN_AI_CAMPIGN_TYPE.map((x) => {
          if (x.id === row?.guardianAICampaign?.campaignType) {
            return <div className="icon-wrap"><span>{x.icon}</span><p>{x.value}</p></div>
          }
        }))
    },
    {
      name: "Message Type",
      selector: (row) =>
        MESSAGE_TYPE.map((x) => {
          if (x.id === row.messageType) {
            return <span>{x.value}</span>
          }
        }),
    },
    {
      name: "Message Name",
      selector: (row) => row.messageName,
    },
    {
      name: "Date Sent",
      selector: (row) => FormatDate(row.messageSendDate),
    },
  ]

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const handleData = (val) => {
    setTableFilter(val)
  }

  return (
    <Fragment>
      <FilterComponent getFilterValues={handleData} />
      <Card>
        <CardBody className="ps-0 pe-0">
          <Row>
            <Col className="ms-auto" lg={4} md="6">
              <div className="ms-2 me-2">
                <Input
                  placeholder="Search by name, email or account ID"
                  className="dataTable-filter form-control-sm"
                  type="text"
                  bsSize=""
                  id="search-input"
                  // value={searchValue}
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Table
                columns={outreachQueueColumns}
                dataURL={GuardianOutreachArchived}
                search={searchValue && {
                  keys: ["customerId", "customerLastName", "customerFirstName"],
                  value: searchValue,
                }}
                sort="-messageSendDate"
                filter={tableFilter}
                isFetch={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default OutreachArchive

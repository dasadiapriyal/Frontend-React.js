import React, { Fragment, useState } from "react"
import {
  Card,
  CardBody,
  Input,
  Row,
  Col,
} from "reactstrap"
import { Eye } from "react-feather"
import {  useSelector } from "react-redux"
import { LTV_RANK, WALLET_STATUS } from '../../../constant/common'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import TinyFlag from 'tiny-flag-react'
import Table from '../../../Components/Table'
import { CustomerAccounts } from '../../../Services/api/routes/APIRoutes'
import { useNavigate } from 'react-router-dom'
import { FormatDate } from '../../../constant/formateDate'
import FilterComponent from "../../../Components/Filter"

const AccountExplorer = () => {

  const [searchValue, setSearchValue] = useState(null)
  const [tableFilter, setTableFilter] = useState(null)

  const allCountryData = useSelector(
    (state) => state.accountSetting.allCountrydata
  )

  const accountTypes = useSelector(
    (state) => state.customerAccounts.customerAccountTypeList
  )

  const flagURL = (code) => {
    return `https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/${code}.svg`
  }

  const navigate = useNavigate()

  const viewDetailHandler = (row) => {
    navigate(`/accountExplorer/accountDetails/${row.customerId}`)
  }

  const AccountsColumns = [
    {
      id: "customerId",
      name: "Account ID",
      selector: (row) => row.customerId,
    },
    {
      name: "Account Type",
      selector: (row) =>
      accountTypes?.data?.map((x) => {
          if (x.accountTypeId === row.customerAccountTypeId) {
            return <span className="text-capitalize">{x.name}</span>
          }
        }),
    },
    {
      name: "First Name",
      selector: (row) => row.customerFirstName,
    },
    {
      name: "Last Name",
      selector: (row) => row.customerLastName,
    },
    {
      name: "Country",
      selector: (row) =>
        allCountryData?.data?.map((x) => {
          if (x.name === row.customerCountry || x.iso3 === row.customerCountry) {
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
        }),
    },
    {
      name: "Enrollment Date",
      selector: (row) => FormatDate(row.createdAt),
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
            value={row.healthScore}
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
      name: "View Details",
      cell: (row) => (
        <Eye className="showDetails" onClick={() => viewDetailHandler(row)} />
      ),
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
                columns={AccountsColumns}
                dataURL={CustomerAccounts}
                search={searchValue && {
                  keys: ["customerId", "customerLastName", "customerFirstName"],
                  value: searchValue,
                }}
                filter={tableFilter}
                isFetch={true}
                populateValue="customerAccountInsight"     
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default AccountExplorer

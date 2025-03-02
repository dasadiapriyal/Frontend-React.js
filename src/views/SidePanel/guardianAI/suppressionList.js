import React, { Fragment, useRef, useState } from "react"
import {
  Card,
  CardBody,
  Input,
  Row,
  Col,
  Button,
} from "reactstrap"
import { PlusCircle, UserX } from "react-feather"
import { LTV_RANK, WALLET_STATUS } from '../../../constant/common'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Table from '../../../Components/Table'
import { GuardianSuppessionList } from '../../../Services/api/routes/APIRoutes'
import { FormatDate } from '../../../constant/formateDate'
import AddSuppressionList from "../guardianAI/addSuppressionList"
import FilterComponent from "../../../Components/Filter"
import { useDispatch } from "react-redux"
import { updateSuppessionList } from './store'
import { OUTREACH_STATUS } from '../../../constant/common'
import RemoveSuppressionList from "./removeSuppressionList"

const SuppressionList = () => {

  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = useState(null)

  const [tableFilter, setTableFilter] = useState(null)
  const [removeModelIsOpen, setRemoveModelIsOpen] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)

  const outreachQueueColumns = [
    {
      id: "customerId",
      name: "Account ID",
      selector: (row) => row.customerId,
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
      name: "Suppression Date",
      selector: (row) => FormatDate(row.outreachSuppressionDate)
    },
    {
      name: 'Action',
      cell: row => (
        <PlusCircle className="showDetails"
          onClick={() => suppressionOpenHandler(row)} />
      )
    }
  ]

  const ref = useRef(false)

  const suppressionOpenHandler = (row) => {
    setSelectedRecord(row)
    ref.current = true
    setRemoveModelIsOpen(true)
  }

  const suppressionCloseHandler = () => {
    ref.current = false
    setRemoveModelIsOpen(false)
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const supressionClickHandler = () => {
    setModalIsOpen(true)
  }

  const closeModelHandler = () => {
    setModalIsOpen(false)
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
            <Col className="ms-auto" lg={12}>
              <div className="d-flex justify-content-end">
                <Button className="rounded-pill" color="primary" outline onClick={() => supressionClickHandler()}>Add to Suppression List</Button>
                <div className="ms-2 me-2">
                  <Input
                    placeholder="Search by name, email or account ID"
                    className="dataTable-filter form-control-sm custom-search-input"
                    type="text"
                    bsSize=""
                    id="search-input"
                    // value={searchValue}
                    onChange={(e) => handleSearch(e)}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Table
                columns={outreachQueueColumns}
                dataURL={GuardianSuppessionList}
                search={searchValue && {
                  keys: ["customerId", "customerLastName", "customerFirstName"],
                  value: searchValue,
                }}
                filter={tableFilter}
                isFetch={true}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <AddSuppressionList modalOpen={modalIsOpen} handleCloseModal={() => closeModelHandler()} isData={false} selcetedData={null} />
      <RemoveSuppressionList modalOpen={ref.current} handleCloseModal={() => suppressionCloseHandler()} data={selectedRecord} />
    </Fragment>
  )
}

export default SuppressionList

import React, { useEffect, useState } from 'react'
import { Filter } from '../../assets/images'
import { Button, Card, CardBody, Col, Collapse, Label, Row } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import isEmpty from '../../validation/is-empty'
import { allCountry } from '../../views/User/store'
import { customerAccountTypes, customerRank } from '../../views/SidePanel/accountExplorer/store'
import { useDispatch, useSelector } from 'react-redux'
import { LTV_RANK, WALLET_STATUS } from '../../constant/common'
import TinyFlag from 'tiny-flag-react'

const FilterComponent = ({ getFilterValues }) => {
  const dispatch = useDispatch()
  const [collapseFilter, setCollapseFilter] = useState(false)
  const [filterValue, setFilterValue] = useState({})
  const [tableFilter, setTableFilter] = useState(null)

  const allCountryData = useSelector(
    (state) => state.accountSetting.allCountrydata
  )

  const accountTypes = useSelector((state) => state.customerAccounts.customerAccountTypeList)
  const accountRanks = useSelector((state) => state.customerAccounts.customerRankList)

  useEffect(() => {
    let obj = {
      query:{},
      options: {
        pagination: false,
      },
    }
    dispatch(allCountry(obj))
    dispatch(customerAccountTypes(obj))
    dispatch(customerRank(obj))
  }, [])

  const filterToggel = () => {
    setCollapseFilter(!collapseFilter)
  }

  const flagURL = (code) => {
    return `https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/${code}.svg`
  }

  const countryOptions = allCountryData.data ? allCountryData.data.filter((info) => {
    if(info.iso3){
      return info
    }
  }).map((info) => {
      return {
        value: info.iso3,
        label: (
          <div className='table-flag-wrap gap-50'>
            <TinyFlag
              country={info.iso3}
              // alt={info.code + " Flag"}
              fallbackImageURL={flagURL(info.code)}
              className="flag-img"
            />
            {info.iso3}
          </div>
        ),
      }
    }) : []

  const accountTypesOptions = accountTypes?.data?.map((x) => {
    return { value: x.accountTypeId, label: x.name }
  })

  const accountRanksOptions = accountRanks?.data?.map((x) => {
    return { value: x.companyRankId, label: x.rank }
  })

  const currencyOptions = allCountryData.data ? allCountryData.data.filter((info) => {
    if(info.iso3){
      return info
    }
  }).map((info) => {
      return {
        value: info.currency,
        label: (
          <div className='table-flag-wrap gap-50 '>
            <TinyFlag
              country={info.iso3}
              // alt={info.code + " Flag"}
              fallbackImageURL={flagURL(info.code)}
              className="flag-img me-2"
            />
            {info.currency}
          </div>
        ),
      }
    })
    : []

  const walletStatusOptions = WALLET_STATUS.map((x) => {
    return {
      value: x.id,
      label: (
        <div>
          <span
            className="bullet bullet-sm bullet-bordered me-50"
            style={{ backgroundColor: x.color }}
          ></span>
          {x.value}
        </div>
      ),
    }
  })

  const healthScoreOptions = [
    { value: [71, 100], label: "71-100" },
    { value: [51, 70], label: "51-70" },
    { value: [31, 50], label: "31-50" },
  ]

  const ltvRankOptions = LTV_RANK.map((x) => {
    return {
      value: x.id,
      label: (
        <div>
          <span
            className="bullet bullet-sm bullet-bordered me-50"
            style={{ backgroundColor: x.color }}
          ></span>
          {x.value}
        </div>
      ),
    }
  })

  const organizationalVolumeOptions = [
    { value: [71, 100], label: "71-100" },
    { value: [51, 70], label: "51-70" },
    { value: [31, 50], label: "31-50" },
  ]

  const filterHandler = (e, feildName) => {
    let tableFilterObj = { ...tableFilter }
    let filterObj = { ...tableFilter }
    if (e === null) {
      delete tableFilterObj[feildName]
      delete filterObj[feildName]
    } else {
      tableFilterObj = !isEmpty(tableFilter) ? { ...tableFilter, [feildName]: e.value } : { [feildName]: e.value }
      filterObj = !isEmpty(filterValue) ? { ...filterValue, [feildName]: e } : { [feildName]: e }
    }
    setFilterValue(filterObj)
    setTableFilter(tableFilterObj)
    getFilterValues(tableFilterObj)
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <Col sm={12}>
            <div>
              <Button
                className="btn-grey-primary filterbtn"
                onClick={() => filterToggel()}
              >
                <span className="me-50">
                  <Filter />
                </span>
                Filter
              </Button>
            </div>
          </Col>
        </Row>
        <Collapse isOpen={collapseFilter}>
          <Row className="mt-2">
            <Col lg="3" md="6" className="mb-1">
              <Label className="form-label-sm" for="accountType">
                Account Type
              </Label>
              <Select
                placeholder=''
                theme={selectThemeColors}
                className="react-select select-sm text-capitalize"
                classNamePrefix="select"
                name="customerAccountType"
                options={accountTypesOptions}
                isClearable={true}
                onChange={(e) => filterHandler(e, "customerAccountTypeId")}
              />
            </Col>
            <Col lg="3" md="6" className="mb-1">
              <Label className="form-label-sm" for="walletStatus">
                Wallet Status
              </Label>
              <Select
                placeholder=''
                theme={selectThemeColors}
                className="react-select select-sm"
                classNamePrefix="select"
                options={walletStatusOptions}
                isClearable={true}
                onChange={(e) => filterHandler(e, "walletStatus")}
              />
            </Col>
            <Col lg="3" md="6" className="mb-1">
              <Label className="form-label-sm" for="healthScore">
                Health Score
              </Label>
              <Select
                placeholder=''
                theme={selectThemeColors}
                className="react-select select-sm"
                classNamePrefix="select"
                onChange={(e) => filterHandler(e, "healthScore")}
                options={healthScoreOptions}
                isClearable={true}
              />
            </Col>
            <Col lg="3" md="6" className="mb-1">
              <Label className="form-label-sm" for="ltvRank">
                LTV Rank
              </Label>
              <Select
                placeholder=''
                theme={selectThemeColors}
                className="react-select select-sm"
                classNamePrefix="select"
                // defaultValue={ltvRankOptions[0]}
                options={ltvRankOptions}
                isClearable={true}
                onChange={(e) => filterHandler(e, "ltvRank")}
              />
            </Col>
            <Col lg="3" md="6" className="mb-1">
              <Label className="form-label-sm" for="country">
                Country
              </Label>
              <Select
                placeholder=''
                theme={selectThemeColors}
                className="react-select select-sm"
                classNamePrefix="select"
                options={countryOptions}
                isClearable={true}
                onChange={(e) => filterHandler(e, "customerCountry")}
              />
            </Col>
            <Col lg="3" md="6" className="mb-1">
              <Label className="form-label-sm" for="currency">
                Currency
              </Label>
              <Select
                placeholder=''
                theme={selectThemeColors}
                className="react-select select-sm"
                classNamePrefix="select"
                options={currencyOptions}
                isClearable={true}
                onChange={(e) => filterHandler(e, "orderCurrency")}
              />
            </Col>
            <Col lg="3" md="6" className="mb-1">
              <Label className="form-label-sm" for="companyRank">
                Company Rank
              </Label>
              <Select
                placeholder=''
                theme={selectThemeColors}
                className="react-select select-sm text-capitalize"
                classNamePrefix="select"
                options={accountRanksOptions}
                isClearable={true}
                onChange={(e) => filterHandler(e, "currentRank")}
              />
            </Col>
            <Col lg="3" md="6" className="mb-1">
              <Label className="form-label-sm" for="organizationalVolume">
                Organizational Volume
              </Label>
              <Select
                placeholder=''
                theme={selectThemeColors}
                className="react-select select-sm"
                classNamePrefix="select"
                options={organizationalVolumeOptions}
                isClearable={true}
                onChange={(e) => filterHandler(e, "teamVolume")}
              />
            </Col>
          </Row>
        </Collapse>
      </CardBody>
    </Card>
  )
}

export default FilterComponent

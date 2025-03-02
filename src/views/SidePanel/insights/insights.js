import React, { useEffect } from 'react'
import HealthInspector from './healthInspector'
import LifetimeReturn from './lifetimeReturn'
import Moniter from './moniter'
import ProtectionMetrics from './protectionMetrics'
import RevenueForecaster from './revenueForecaster'
import "./insights.scss"
import { useDispatch, useSelector } from 'react-redux'
import { customerAccountTypes } from '../accountExplorer/store'
import { allCountry } from '../../User/store'
import TinyFlag from 'tiny-flag-react'

const Insights = () => {

    const dispatch = useDispatch()

  const accountTypes = useSelector((state) => state.customerAccounts.customerAccountTypeList)

  const accountTypesOptions = accountTypes?.data?.map((x) => {
    return { value: x.accountTypeId, label: x.name }
  })

  const allCountryData = useSelector(
    (state) => state.accountSetting.allCountrydata
  )

  const flagURL = (code) => {
    return `https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/${code}.svg`
  }

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

    useEffect(() => {
        let obj = {
          query: {},
          options: {
            pagination: false,
          },
        }
        dispatch(allCountry(obj))
        dispatch(customerAccountTypes(obj))
      }, [])

    return (
        <div className='insights-block'>
            <LifetimeReturn allCountryData={allCountryData}/>
            <Moniter accountTypesOptions={accountTypesOptions} currencyOptions={currencyOptions}/>
            <HealthInspector accountTypesOptions={accountTypesOptions} />
            <RevenueForecaster accountTypesOptions={accountTypesOptions} allCountryData={allCountryData}/>
            <ProtectionMetrics allCountryData={allCountryData}/>
        </div>
    )
}

export default Insights

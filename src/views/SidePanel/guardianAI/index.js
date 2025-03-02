import React from 'react'
import ProtectionMetrics from '../insights/protectionMetrics'
import "../insights/insights.scss"
import GuardianPreventionCampaign from './guardianAIcomponents/guardianPreventionCampaign'
import GuardianRecoveryCampaign from './guardianAIcomponents/guardianRecoveryCampaign'
import GuardianOutreachActivity from './guardianAIcomponents/guardianOutreachActivity'
import GuardianProtectedTransection from './guardianAIcomponents/guardianProtectedTransection'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { allCountry } from '../../User/store'
import { getPreventionRecoveryCampaign } from './store'

const GuardianAI = () => {

    const dispatch = useDispatch()

    const allCountryData = useSelector(
        (state) => state.accountSetting.allCountrydata
      )

    const preventionRecoveryCampaignData = useSelector((state) => state.guardianAI.preventionRecoveryCampaignData)

    useEffect(() => {
        let obj = {
          query: {},
          options: {
            pagination: false,
          },
        }
        dispatch(allCountry(obj))
        dispatch(getPreventionRecoveryCampaign())
      }, [])

    return (
        <div>
            <div className='insights-block'>
                <ProtectionMetrics allCountryData={allCountryData} />
            </div>
            <GuardianPreventionCampaign preventionRecoveryCampaignData={preventionRecoveryCampaignData} allCountryData={allCountryData} />
            <GuardianRecoveryCampaign preventionRecoveryCampaignData={preventionRecoveryCampaignData} allCountryData={allCountryData}/>
            <GuardianOutreachActivity preventionRecoveryCampaignData={preventionRecoveryCampaignData}/>
            <GuardianProtectedTransection allCountryData={allCountryData}/>
        </div>
    )
}

export default GuardianAI

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Card, CardBody, CardHeader, Input, Label } from "reactstrap"

import { Toast } from "../../Components"
import { updateProfile } from "./store"

const EmailNotification = () => {
	const dispatch = useDispatch()

	const { loginUserdata } = useSelector((state) => state.accountSetting)

	const [weeklyMetricsStatus, setWeeklyMetricsStatus] = useState(false)
	const [platformUpdatesStatus, setPlatformUpdatesStatus] = useState(false)

	useEffect(() => {
		if (loginUserdata) {
			setWeeklyMetricsStatus(loginUserdata?.weeklyMetrics)
			setPlatformUpdatesStatus(loginUserdata?.platformUpdates)
		}
	}, [loginUserdata])

	const onchange = (e) => {
		let updatedplatformUpdates = platformUpdatesStatus
		let updatedweeklyMetrics = weeklyMetricsStatus

		if (e.target.name === "weeklyMetrics") {
			setWeeklyMetricsStatus(e.target.checked)
			updatedweeklyMetrics = e.target.checked
		}

		if (e.target.name === "platformUpdates") {
			setPlatformUpdatesStatus(e.target.checked)
			updatedplatformUpdates = e.target.checked
		}

		const data = {
			weeklyMetrics: updatedweeklyMetrics,
			platformUpdates: updatedplatformUpdates,
		}

		dispatch(updateProfile(data))
			.then((res) => {
				if (res.payload.status === "SUCCESS") {
					Toast.success("Your data is successfully updated.")
				}
			})
			.catch((err) => {})
	}

	return (
		<>
			<h4 className='profile-tab-heading mb-2'>Email Notifications</h4>
			<Card className='email-notification-card'>
				<CardHeader className="fs-16">
					Select which email notifications you would like to receive from
					LTV.ai.
				</CardHeader>
				<CardBody className="pt-0">
					<div className='demo-inline-spacing'>
						<div className='form-switch form-check-success'>
							<Input
								type='switch'
								id='weeklyMetrics'
								name='weeklyMetrics'
								checked={weeklyMetricsStatus}
								onChange={(e) => onchange(e)}
							/>
							<Label for='weeklyMetrics' className='form-check-label'>
								Weekly Metrics
							</Label>
						</div>
						<div className='form-switch form-check-success'>
							<Input
								type='switch'
								id='platformUpdates'
								name='platformUpdates'
								checked={platformUpdatesStatus}
								onChange={(e) => onchange(e)}
							/>
							<Label for='platformUpdates' className='form-check-label'>
								Platform Updates
							</Label>
						</div>
					</div>
				</CardBody>
			</Card>
		</>
	)
}

export default EmailNotification

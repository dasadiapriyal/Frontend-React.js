// ** Icons Import
import {
	GuardianAI,
	OutreachQueue,
	OutreachArchive,
	SuppressionList,
} from "../../assets/images"

import { Settings } from 'react-feather'

export default [
	{
		id: "GuardianAI",
		title: "GuardianAI",
		icon: <GuardianAI />,
		navLink: "/guardianAI",
		children: [
			{
				id: "Settings",
				title: "Settings",
				icon: <Settings />,
				navLink: "/guardianAI/settings",
			},
			{
				id: "OutreachQueue",
				title: "Outreach Queue",
				icon: <OutreachQueue />,
				navLink: "/guardianAI/outreachQueue",
			},
			{
				id: "OutreachArchive",
				title: "Outreach Archive",
				icon: <OutreachArchive />,
				navLink: "/guardianAI/outreachArchive",
			},
			{
				id: "SuppressionList",
				title: "Suppression List",
				icon: <SuppressionList />,
				navLink: "/guardianAI/suppressionList",
			},
		],
	},
]

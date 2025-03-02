
import { useEffect, useState } from "react"
import axios from "../../configs/httpConfig"

const useAxios = (configParams) => {
	const [res, setRes] = useState()
	const [err, setErr] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchDataUsingAxios(configParams)
	}, [])

	const fetchDataUsingAxios = async () => {
		await axios(configParams)
			.then((res) => setRes(res.data))
			.catch((err) => setErr(err))
			.finally(() => setLoading(false))
	}

	return [res, loading, err ]
}

export default useAxios

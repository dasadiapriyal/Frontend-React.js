import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'

import DataTable from "react-data-table-component"
import { ChevronDown } from "react-feather"

import Axios from '../../configs/httpConfig'
import Paginate from "./Paginate/Paginate"
import { useParams } from "react-router-dom"
import { Spinner } from "reactstrap"

const Table = (props) => {
	const {
		columns,
		dataURL,
		showSizeChanger,
		search,
		filter: sentFilter,
		showPagination: paginationSetting,
		customerId,
		isFetch,
		populateValue,
		linkedCampaignVal,
		sort,
		data
	} = props

	const showPagination = paginationSetting ? paginationSetting : true
	const [tableData, setTableData] = useState()
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [isFetchApi, setIsFetchApi] = useState(isFetch)

	const [obj, setObj] = useState({
		query:{},
		options: {
			lean: false,
			leanWithId: true,
			page: currentPage,
			limit: pageSize,
			sort: sort ? sort : {},
			populate: populateValue == undefined ? []: populateValue,
		}
	})
	const [resPaginator, setresPaginator] = useState(true)

	const addSuppressionListdata = useSelector((state) => state.guardianAI.addSuppressionList)

	useEffect(() => {
		if(window.location.pathname === "/guardianAI/suppressionList" || window.location.pathname === "/guardianAI/outreachQueue"){
			if(addSuppressionListdata.data && tableData !== undefined){
				const filterData = tableData.filter(x => x?.customerId !== addSuppressionListdata?.data?.customerId)
				setTableData(filterData)
			} 
		}	
	}, [addSuppressionListdata])

	useEffect(() => {
		if(isFetchApi){
			fetch()
		}
	}, [obj])

	useEffect(() => {
		setTableData(data)
	}, [data])

	useEffect(() => {
		if(linkedCampaignVal){
			let options2 = {
			...obj,
			query:{
				...obj.query,
				linkedCampaign : true
			},
		}
		setObj(options2)
		}		

	}, [linkedCampaignVal])

	useEffect(() => {
		if (search) {
			let options = {
				...obj,
				keys: search?.keys,
				value: search?.value
			}
			setObj(options)
		}
	}, [search])

	useEffect(() => {
		if (sentFilter) {
			let options = {
				...obj,
				query: {
					...sentFilter
				},
			}
			setObj(options)
		}
	}, [sentFilter])

	useEffect(() => {
		if (customerId) {
			setIsFetchApi(true)
			let options = {
				...obj,
				query: {
					customerId: customerId,
				}
			}
			setObj(options)
		}
	}, [customerId])

	const fetch = () => {
			setLoading(true)
				Axios({ ...dataURL, data: obj }).then((res) => {
					setTableData(res.data.data === null ? [] : res.data.data.data ? res.data.data.data : res.data.data)
					setresPaginator(res.data.data === null ? [] : res.data.data.paginator)
				}).catch((err) => {
				}).finally(() => setLoading(false))
	}

	const handleSizeChange = (pgSize) => {
		let options = {
			...obj,
			options: {
				...obj.options,
				limit: pgSize,
				page: 1
			},
		}
		setCurrentPage(1)
		setObj(options)
		setPageSize(pgSize)
	}

	const handlePageChange = (pgNo) => {
		let options = {
			...obj,
			options: {
				...obj.options,
				page: pgNo + 1,
			},
		}	
		setObj(options)
		setCurrentPage(pgNo + 1)
	}

	const handleSort = (column, sortDirection) => {
		let tFilter = {}
		tFilter[column.id] = sortDirection

		let options = {
			...obj,
			options: {
				...obj.options,
				sort: {
					...tFilter,
				},
			},
		}
		setObj(options)
	}

	return (
		<div className='react-dataTable position-relative'>
			<DataTable
				noHeader
				persistTableHead={true}
				className='react-dataTable'

				progressPending={loading}
				progressComponent={<div className='d-flex justify-content-center my-1 gap-1'>
					<Spinner size='sm' type='grow' color='primary'/>
					<span className=''>Loading...</span>
					</div>}		
				columns={columns}
				data={tableData}

				pagination={showPagination}
				paginationServer
				paginationComponent={() => (
					<Paginate
						current={currentPage ? currentPage - 1 : 0}
						pageSize={pageSize}
						total={resPaginator ? resPaginator?.itemCount : 0}
						showSizeChanger={showSizeChanger ? showSizeChanger : true}
						onShowSizeChange={handleSizeChange}
						onPageChange={handlePageChange}
					/>
				)}

				sortServer
				sortIcon={<ChevronDown size={10} />}
				onSort={(column, sortDirection) => { handleSort(column, sortDirection) }}
			/>
		</div>
	)
}

export default Table
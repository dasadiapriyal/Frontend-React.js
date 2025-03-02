import React from 'react'
import { Spinner } from 'reactstrap'

const PageLoader = () => {
    return (
        <div className='d-flex justify-content-center my-1 gap-1 inner-page-loader'>
            <Spinner type='grow' color='primary' />
            <span className='loading-text'>Loading...</span>
        </div>
    )
}

export default PageLoader

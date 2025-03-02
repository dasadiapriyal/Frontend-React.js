import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { Toast } from '../../../Components'
import { OUTREACH_STATUS } from '../../../constant/common'
import { updateSuppessionList } from './store'

const RemoveSuppressionList = ({ modalOpen, handleCloseModal, data }) => {

    const dispatch = useDispatch()

    const deletHandler = () => {
        const obj = {
            customerId: data?.customerId,
            customerEmail: data?.customerEmail,
            outreachStatus: OUTREACH_STATUS.ALLOWED,
            outreachSuppressionDate: null,
        }
        dispatch(updateSuppessionList(obj)).then((res) => {
            handleCloseModal()
            if (res.meta.requestStatus == "fulfilled") {
                Toast.success(res.payload.message)
            }
        })
    }
    
    return (
        <div>
            <Modal isOpen={modalOpen} toggle={handleCloseModal}
                className="custom-modal modal-dialog-centered">
                <ModalHeader className='without-close' toggle={handleCloseModal}
                >Remove from Suppression List</ModalHeader>
                <ModalBody>
                    <div className='ps-50 pe-50 text-center mb-2'>
                        <p >Are you sure you want to remove this account from the suppression list?</p>
                        <p><strong>Account ID: </strong> {data?.customerId}</p>
                        <p><strong>Name: </strong>{data?.customerFirstName} {data?.customerLastName}</p>
                        <p><strong>Email: </strong>{data?.customerEmail}</p>
                        <p><strong>Country: </strong>{data?.customerCountry}</p>
                    </div>
                    <Row className='ps-1 pe-1'>
                        <Col sm="6">
                            <Button className='w-100' color="primary" onClick={deletHandler}>CONTINUE</Button>
                        </Col>
                        <Col sm="6">
                            <Button className='w-100 grey-btn' onClick={handleCloseModal}>CANCEL</Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default RemoveSuppressionList

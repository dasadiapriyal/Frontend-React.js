import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader, InputGroupText, Input, Row, Col, Label, Form } from 'reactstrap'
import { Toast } from '../../../Components'
import { OUTREACH_STATUS } from '../../../constant/common'
import { updateSuppessionList } from './store'

const AddSuppressionList = ({ modalOpen, handleCloseModal, isData, selcetedData }) => {

    const {
        control,
        setError,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()

    const onSubmit = (data) => {  
         const obj = {
                ...data,
                outreachStatus: OUTREACH_STATUS.SUPPRESSED,
          }  
        
      dispatch(updateSuppessionList(obj)).then((res) => {
        handleCloseModal()
        setValue("customerId", "")
        setValue("customerEmail", "")
        if(res.meta.requestStatus == "fulfilled") {
            Toast.success(res.payload.message)
        }
      })
    }

    useEffect(() => {
        if(isData){
            setValue("customerId", selcetedData.customerId)
            setValue("customerEmail", selcetedData.customerEmail)
        }
    }, [isData])

    return (
        <div>
            <Modal isOpen={modalOpen} toggle={handleCloseModal} className="custom-modal modal-dialog-centered">
                <ModalHeader toggle={handleCloseModal}>Add to Outreach Suppression List</ModalHeader>
                <ModalBody>
                    <Form
                        className="profile-setting-page"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Row>
                            <Col sm="12" className="">                   
                                {/* <Label className="form-label" for="companyName">
                                    Account Number
                                </Label> */}
                                <Controller
                                    name="customerId"
                                    control={control}
                                    render={({ field: {onChange, value} }) => (
                                        // <InputGroup className='input-group-merge mb-2'>
                                        //     <InputGroupText><svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        //         <path d="M18.125 1.75C18.2908 1.75 18.4497 1.81585 18.5669 1.93306C18.6842 2.05027 18.75 2.20924 18.75 2.375V13.625C18.75 13.7908 18.6842 13.9497 18.5669 14.0669C18.4497 14.1842 18.2908 14.25 18.125 14.25H1.875C1.70924 14.25 1.55027 14.1842 1.43306 14.0669C1.31585 13.9497 1.25 13.7908 1.25 13.625V2.375C1.25 2.20924 1.31585 2.05027 1.43306 1.93306C1.55027 1.81585 1.70924 1.75 1.875 1.75H18.125ZM1.875 0.5C1.37772 0.5 0.900805 0.697544 0.549175 1.04917C0.197544 1.40081 0 1.87772 0 2.375L0 13.625C0 14.1223 0.197544 14.5992 0.549175 14.9508C0.900805 15.3025 1.37772 15.5 1.875 15.5H18.125C18.6223 15.5 19.0992 15.3025 19.4508 14.9508C19.8025 14.5992 20 14.1223 20 13.625V2.375C20 1.87772 19.8025 1.40081 19.4508 1.04917C19.0992 0.697544 18.6223 0.5 18.125 0.5H1.875Z" fill="#484A54" />
                                        //         <path d="M3.75 4.875C3.75 4.70924 3.81585 4.55027 3.93306 4.43306C4.05027 4.31585 4.20924 4.25 4.375 4.25H15.625C15.7908 4.25 15.9497 4.31585 16.0669 4.43306C16.1842 4.55027 16.25 4.70924 16.25 4.875C16.25 5.04076 16.1842 5.19973 16.0669 5.31694C15.9497 5.43415 15.7908 5.5 15.625 5.5H4.375C4.20924 5.5 4.05027 5.43415 3.93306 5.31694C3.81585 5.19973 3.75 5.04076 3.75 4.875ZM3.75 8C3.75 7.83424 3.81585 7.67527 3.93306 7.55806C4.05027 7.44085 4.20924 7.375 4.375 7.375H15.625C15.7908 7.375 15.9497 7.44085 16.0669 7.55806C16.1842 7.67527 16.25 7.83424 16.25 8C16.25 8.16576 16.1842 8.32473 16.0669 8.44194C15.9497 8.55915 15.7908 8.625 15.625 8.625H4.375C4.20924 8.625 4.05027 8.55915 3.93306 8.44194C3.81585 8.32473 3.75 8.16576 3.75 8ZM3.75 11.125C3.75 10.9592 3.81585 10.8003 3.93306 10.6831C4.05027 10.5658 4.20924 10.5 4.375 10.5H11.875C12.0408 10.5 12.1997 10.5658 12.3169 10.6831C12.4342 10.8003 12.5 10.9592 12.5 11.125C12.5 11.2908 12.4342 11.4497 12.3169 11.5669C12.1997 11.6842 12.0408 11.75 11.875 11.75H4.375C4.20924 11.75 4.05027 11.6842 3.93306 11.5669C3.81585 11.4497 3.75 11.2908 3.75 11.125Z" fill="#484A54" />
                                        //     </svg>
                                        //     </InputGroupText>
                                        //     <Input {...field} />
                                        // </InputGroup>
                                        <div className="floating">
                                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.125 1.75C18.2908 1.75 18.4497 1.81585 18.5669 1.93306C18.6842 2.05027 18.75 2.20924 18.75 2.375V13.625C18.75 13.7908 18.6842 13.9497 18.5669 14.0669C18.4497 14.1842 18.2908 14.25 18.125 14.25H1.875C1.70924 14.25 1.55027 14.1842 1.43306 14.0669C1.31585 13.9497 1.25 13.7908 1.25 13.625V2.375C1.25 2.20924 1.31585 2.05027 1.43306 1.93306C1.55027 1.81585 1.70924 1.75 1.875 1.75H18.125ZM1.875 0.5C1.37772 0.5 0.900805 0.697544 0.549175 1.04917C0.197544 1.40081 0 1.87772 0 2.375L0 13.625C0 14.1223 0.197544 14.5992 0.549175 14.9508C0.900805 15.3025 1.37772 15.5 1.875 15.5H18.125C18.6223 15.5 19.0992 15.3025 19.4508 14.9508C19.8025 14.5992 20 14.1223 20 13.625V2.375C20 1.87772 19.8025 1.40081 19.4508 1.04917C19.0992 0.697544 18.6223 0.5 18.125 0.5H1.875Z" fill="#484A54" />
                                        <path d="M3.75 4.875C3.75 4.70924 3.81585 4.55027 3.93306 4.43306C4.05027 4.31585 4.20924 4.25 4.375 4.25H15.625C15.7908 4.25 15.9497 4.31585 16.0669 4.43306C16.1842 4.55027 16.25 4.70924 16.25 4.875C16.25 5.04076 16.1842 5.19973 16.0669 5.31694C15.9497 5.43415 15.7908 5.5 15.625 5.5H4.375C4.20924 5.5 4.05027 5.43415 3.93306 5.31694C3.81585 5.19973 3.75 5.04076 3.75 4.875ZM3.75 8C3.75 7.83424 3.81585 7.67527 3.93306 7.55806C4.05027 7.44085 4.20924 7.375 4.375 7.375H15.625C15.7908 7.375 15.9497 7.44085 16.0669 7.55806C16.1842 7.67527 16.25 7.83424 16.25 8C16.25 8.16576 16.1842 8.32473 16.0669 8.44194C15.9497 8.55915 15.7908 8.625 15.625 8.625H4.375C4.20924 8.625 4.05027 8.55915 3.93306 8.44194C3.81585 8.32473 3.75 8.16576 3.75 8ZM3.75 11.125C3.75 10.9592 3.81585 10.8003 3.93306 10.6831C4.05027 10.5658 4.20924 10.5 4.375 10.5H11.875C12.0408 10.5 12.1997 10.5658 12.3169 10.6831C12.4342 10.8003 12.5 10.9592 12.5 11.125C12.5 11.2908 12.4342 11.4497 12.3169 11.5669C12.1997 11.6842 12.0408 11.75 11.875 11.75H4.375C4.20924 11.75 4.05027 11.6842 3.93306 11.5669C3.81585 11.4497 3.75 11.2908 3.75 11.125Z" fill="#484A54" />
                                    </svg>
                                    <div className='w-100'>
                                        <input id="input__username" className="floating__input form-control" name="username" type="text" placeholder='Account Number' onChange={() => onChange()} value={value} />
                                        <label for="input__username" className="floating__label" data-content="Account Number">
                                        </label>
                                    </div>
                                </div>
                                    )}
                                />
                            </Col>
                            <Col sm="12" className="">  
                                {/* <Label className="form-label" for="companyName">
                                    Email
                                </Label> */}
                                <Controller
                                    name="customerEmail"
                                    control={control}
                                    render={({ field:{onChange, value} }) => (
                                        <div className="floating">
                                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M16.875 0.5C18.325 0.5 19.5 1.675 19.5 3.125V12.875C19.5 14.325 18.325 15.5 16.875 15.5H3.125C2.42881 15.5 1.76113 15.2234 1.26884 14.7312C0.776562 14.2389 0.5 13.5712 0.5 12.875V3.125C0.5 1.675 1.675 0.5 3.125 0.5H16.875ZM18.25 5.1755L10.301 9.5475C10.2192 9.59247 10.1284 9.61855 10.0352 9.62383C9.94203 9.62911 9.84884 9.61345 9.7625 9.578L9.699 9.548L1.75 5.175V12.875C1.75 13.2397 1.89487 13.5894 2.15273 13.8473C2.41059 14.1051 2.76033 14.25 3.125 14.25H16.875C17.2397 14.25 17.5894 14.1051 17.8473 13.8473C18.1051 13.5894 18.25 13.2397 18.25 12.875V5.1755ZM16.875 1.75H3.125C2.76033 1.75 2.41059 1.89487 2.15273 2.15273C1.89487 2.41059 1.75 2.76033 1.75 3.125V3.7495L10 8.2865L18.25 3.749V3.125C18.25 2.76033 18.1051 2.41059 17.8473 2.15273C17.5894 1.89487 17.2397 1.75 16.875 1.75Z" fill="#484A54" />
                                                        </svg>
                                                <div className='w-100'>
                                                    <input id="input__username" className="floating__input form-control" name="Email" type="text" placeholder='EmailAccount Number' onChange={() => onChange()} value={value} />
                                                    <label for="input__username" className="floating__label" data-content="Email">
                                                    </label>
                                                </div>
                                            </div>
                                    )}
                                />
                            </Col>
                            <Col sm="12">
                                <div className='text-center'>
                                <Button
                                    type="submit"
                                    color="primary"
                                    className='w-75'
                                >
                                   ADD TO SUPPRESSION LIST
                                </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default AddSuppressionList

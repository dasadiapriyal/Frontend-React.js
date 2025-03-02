import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { Toast } from '../../../../Components'
import { guardianMessageListPrevention, guardianMessageUpdate } from '../store'

const EditSMS = ({ modalOpen, handleCloseModal, smsData, messageCampaign }) => {

    const {
        control,
        setError,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [count, setCount] = useState(0)

    const changeHandler = (e) => {
        setCount(e.target.value.length)
    }

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        handleCloseModal()
        setValue("smsBody", "")
        setCount(0)
        const obj = {
            messageBody: data.smsBody,
            messageActiveStatus: smsData.messageActiveStatus,
            id: smsData?.id
        }
        dispatch(guardianMessageUpdate(obj)).then((res) => {
            handleCloseModal()
            if (res.meta.requestStatus == "fulfilled") {
                Toast.success(res.payload.message)
                const obj = {
                    "query": {
                        "messageCampaign": messageCampaign
                    }
                }
                dispatch(guardianMessageListPrevention(obj))
            }
        })
    }

    useEffect(() => {
        setCount(0)
    }, [handleCloseModal])

    useEffect(() => {
        setValue("smsBody", smsData?.body)
        setCount(smsData?.body?.length)
    }, [smsData])

    return (
        <div>
            <Modal isOpen={modalOpen} toggle={handleCloseModal} className="custom-modal modal-dialog-centered">
                <ModalHeader toggle={handleCloseModal}>SMS Editor</ModalHeader>
                <ModalBody>
                    <Form
                        className="profile-setting-page"
                    onSubmit={handleSubmit(onSubmit)}
                    >
                        <Row>       
                            <Col sm="12" className="">
                                {/* <Label className="form-label" for="companyName">
                                    Email
                                </Label> */}
                                <Controller
                                    name="smsBody"
                                    control={control}
                                    render={({ field : {onChange, value} }) => (
                                        <div className="floating email-edit-floating position-relative">
                                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.875 0.5C18.325 0.5 19.5 1.675 19.5 3.125V12.875C19.5 14.325 18.325 15.5 16.875 15.5H3.125C2.42881 15.5 1.76113 15.2234 1.26884 14.7312C0.776562 14.2389 0.5 13.5712 0.5 12.875V3.125C0.5 1.675 1.675 0.5 3.125 0.5H16.875ZM18.25 5.1755L10.301 9.5475C10.2192 9.59247 10.1284 9.61855 10.0352 9.62383C9.94203 9.62911 9.84884 9.61345 9.7625 9.578L9.699 9.548L1.75 5.175V12.875C1.75 13.2397 1.89487 13.5894 2.15273 13.8473C2.41059 14.1051 2.76033 14.25 3.125 14.25H16.875C17.2397 14.25 17.5894 14.1051 17.8473 13.8473C18.1051 13.5894 18.25 13.2397 18.25 12.875V5.1755ZM16.875 1.75H3.125C2.76033 1.75 2.41059 1.89487 2.15273 2.15273C1.89487 2.41059 1.75 2.76033 1.75 3.125V3.7495L10 8.2865L18.25 3.749V3.125C18.25 2.76033 18.1051 2.41059 17.8473 2.15273C17.5894 1.89487 17.2397 1.75 16.875 1.75Z" fill="#484A54" />
                                            </svg>
                                            <div className='w-100'>
                                                <textarea id="input__emailbody" value={value} className="floating__input form-control" name="emailBody" placeholder='EmailAccount Number' maxlength={500} onChange={(e) => 
                                                    {
                                                        onChange(e.target.value)
                                                        changeHandler(e)}
                                                    } />
                                                <label for="input__emailbody" className="floating__label__textarea" data-content="Body">
                                                </label>
                                                <p className='max-text'>{count}/500</p>
                                            </div>
                                        </div>
//                                         <div className="form-floating">
//   <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" ></textarea>
//   <label for="floatingTextarea2">Comments</label>
// </div>
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
                                        SAVE SMS
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

export default EditSMS

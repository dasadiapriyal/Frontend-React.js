import React, { Fragment, useEffect, useRef, useState } from 'react'
import { X } from 'react-feather'
import { Controller, useForm } from 'react-hook-form'
import { Card, CardBody, CardHeader, Col, Row, Form, Label, Button, Input, FormFeedback } from 'reactstrap'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import "../guardianmenu.scss"
import defaultImg from "../../../../assets/images/notselectImg.png"
import { useDispatch, useSelector } from 'react-redux'
import { clientBranding, clientBrandingUpdate } from '../store'
import { API_MODULE, BASE_URL } from '../../../../Services/api/routes/Common'
import { FONT_FAMILY } from '../../../../constant/common'
import { Toast } from '../../../../Components'

const Branding = () => {

    const {
        control: control1,
        setError: setError1,
        setValue: setValue1,
        handleSubmit: handleSubmit1,
        formState: { errors: errors1 },
        watch: watch1
    } = useForm()

    const {
        control: control2,
        setError: setError2,
        setValue: setValue2,
        handleSubmit: handleSubmit2,
        formState: { errors2 },
        watch: watch2
    } = useForm()

    const hiddenFileInput = useRef(null)
    const [img, setImg] = useState(null)
    const [isCloseBtn, setIsCloseBtn] = useState(false)

    const handleClick = event => {
        hiddenFileInput.current.click()
    }

    const dispatch = useDispatch()
    const baseURL = BASE_URL[API_MODULE.ALL]

    useEffect(() => {
        dispatch(clientBranding())
    }, [])

    const clientBrandingData = useSelector((state) => state.guardianAI.clientBrandingDetails)

    const backgroundColor = watch2("notificationBackgroundColor")
    const notificationFontColor = watch2("notificationBodyFontColor")
    const notificationHeaderTextColor = watch2("notificationHeaderTextColor")
    const notificationPrimaryButtonBackgroundColor = watch2("notificationPrimaryButtonBackgroundColor")
    const notificationSecondaryButtonBackgroundColor = watch2("notificationSecondaryButtonBackgroundColor")
    const notificationPrimaryButtonTextColor = watch2("notificationPrimaryButtonTextColor")
    const notificationSecondaryButtonTextColor = watch2("notificationSecondaryButtonTextColor")
    const emailFontFamily = watch1("emailFontFamily")
    const emailButtonColor = watch1("emailButtonColor")
    const notificationFontFamily = watch2("notificationFontFamily")

    const handleChange = event => {
        const [fileUploaded] = event.target.files
        if (fileUploaded) {
            var img = new Image()

            img.src = window.URL.createObjectURL(fileUploaded)

            img.onload = function () {
                var width = img.naturalWidth,
                    height = img.naturalHeight

                window.URL.revokeObjectURL(img.src)

                if (width <= 500 && height <= 150) {
                    // success
                    setImg(URL.createObjectURL(fileUploaded))
                    setIsCloseBtn(true)
                }
                else {
                    //fail
                    setError1("emailLogo", {
                        type: "custom",
                        message: "Image size should be maximum of 500 x 150 pixels",
                    })
                    setValue1("emailLogo", null)
                }
            }
        }

        if (fileUploaded?.size > 75000) {
            setError1("emailLogo", {
                type: "custom",
                message: "Image size should be less then 75kb",
            })
            setValue1("emailLogo", null)
        } else {
            setImg(URL.createObjectURL(fileUploaded))
            setIsCloseBtn(true)
        }
        // props.handleFile(fileUploaded)
    }

    const removeImgHandler = () => {
        setImg(null)
        setIsCloseBtn(false)
        setValue1("emailLogo", null)
    }

    useEffect(() => {
        setImg(clientBrandingData?.data?.emailLogo)
        setIsCloseBtn(true)
        setValue1("emailLogo", clientBrandingData?.data?.emailLogo)
        setValue1("emailFontFamily", clientBrandingData?.data?.emailFontFamily)
        setValue1("emailButtonColor", clientBrandingData?.data?.emailButtonColor)
        setValue2("notificationHeaderTextColor", clientBrandingData?.data?.notificationHeaderTextColor)
        setValue2("notificationBodyFontColor", clientBrandingData?.data?.notificationBodyFontColor)
        setValue2("notificationBackgroundColor", clientBrandingData?.data?.notificationBackgroundColor)
        setValue2("notificationPrimaryButtonBackgroundColor", clientBrandingData?.data?.notificationPrimaryButtonBackgroundColor)
        setValue2("notificationSecondaryButtonBackgroundColor", clientBrandingData?.data?.notificationSecondaryButtonBackgroundColor)
        setValue2("notificationPrimaryButtonTextColor", clientBrandingData?.data?.notificationPrimaryButtonTextColor)
        setValue2("notificationSecondaryButtonTextColor", clientBrandingData?.data?.notificationSecondaryButtonTextColor)
        setValue2("notificationFontFamily", clientBrandingData?.data?.notificationFontFamily)
    }, [clientBrandingData])

    const fontFamilyOptions = FONT_FAMILY.map((x) => {
        return { value: x.value, label: x.name }
    }
    )

    const onSubmitImgBlock = (data) => {
        if (!data.emailLogo) {
            setError1('emailLogo', {
                type: 'manual'
            })
        } else {
            const formData = new FormData()
            formData.append("emailLogo", data.emailLogo)
            formData.append("emailButtonColor", data.emailButtonColor)
            formData.append("emailFontFamily", data.emailFontFamily)
            dispatch(clientBrandingUpdate(formData)).then((res) => {
                if (res.meta.requestStatus == "fulfilled") {
                    Toast.success(res.payload.message)
                    dispatch(clientBranding())
                }
            })
        }
    }

    const onSubmitNotification = (data) => {
        const formData = new FormData()
        Object.keys(data).forEach(key => {
            if (typeof data[key] !== 'object') formData.append(key, data[key])
            else formData.append(key, JSON.stringify(data[key]))
        })
        dispatch(clientBrandingUpdate(formData)).then((res) => {
            if (res.meta.requestStatus == "fulfilled") {
                Toast.success(res.payload.message)
                dispatch(clientBranding())
            }
        })
    }

    return (
        <Fragment>
            <h4 className="profile-tab-heading mb-2">Branding</h4>
            <Card className="Api-key-card">
                <CardHeader className="fs-16">
                    Create your seamless brand experience by adding your logo and adjusting your colors.
                </CardHeader>
                <CardBody className="pt-0">
                    <Form onSubmit={handleSubmit1(onSubmitImgBlock)}>
                        <Row>
                            <Col sm="12" className="mb-1 mt-1">
                                <h4 className="api-key-title">Email  Messages</h4>
                            </Col>
                            <Col sm="8">
                                <Label className="form-label" for="emailLogo">
                                    Add Your Logo
                                </Label>
                                <Controller
                                    name="emailLogo"
                                    control={control1}
                                    render={({ field: { onChange, value } }) => (
                                        <div className='upload-img-box text-center py-xl-3 p-2 mb-2 mb-sm-0'>
                                            <img src={!img ? defaultImg : img} className="img-fluid preview-img" />
                                            {isCloseBtn ? <span className='box-close'><X className='showDetails' onClick={() => removeImgHandler()} /></span> : null}
                                            <hr className='my-xl-3 my-md-2 my-1' />
                                            <Button className='btn-lg btn' onClick={(event) => handleClick(event)}>
                                                Upload
                                            </Button>
                                            <input type="file" name="emailLogo"
                                                ref={hiddenFileInput}
                                                onChange={(event) => {
                                                    onChange(event.target.files[0])
                                                    handleChange(event)
                                                }}
                                                className="form-control"
                                                style={{ display: 'none' }}
                                            // {...field}
                                            />
                                            <p className='mb-0 mt-1'><span className='text-danger'>*</span>Must be a maximum of 500 x 150 pixels and less than 75kb.</p>
                                            {errors1?.emailLogo ? (errors1?.emailLogo?.type === "custom" ?
                                                <p className='text-danger'>{errors1?.emailLogo?.message}</p> : <p className='text-danger'>Please upload logo image.</p>)
                                                : ""}
                                        </div>
                                    )}
                                />
                            </Col>
                            <Col sm="4">
                                <Row>
                                    <Col sm={12}>
                                        <Label className="form-label" for="emailButtonColor">
                                            Button Color
                                        </Label>
                                        <div className='upload-typography'>
                                            <Controller
                                                name="emailButtonColor"
                                                control={control1}
                                                render={({ field: { onChange, value } }) => (
                                                    <div className='form-group'>
                                                        <Input
                                                            id="emailButtonColor"
                                                            name="emailButtonColor"
                                                            placeholder="color placeholder"
                                                            type="color"
                                                            onChange={(e) => onChange(e.target.value)}
                                                            value={value}
                                                        // {...field}
                                                        />
                                                        <label>{value}</label>
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </Col>
                                    <Col sm={12}>
                                        <Label className="form-label" for="emailFontFamily">
                                            Font Family
                                        </Label>
                                        <div className='upload-typography'>
                                            <Controller
                                                name="emailFontFamily"
                                                control={control1}
                                                render={({ field: { onChange, value } }) => (
                                                    <Select
                                                        placeholder=''
                                                        theme={selectThemeColors}
                                                        className="react-select select-sm"
                                                        classNamePrefix="select"
                                                        options={fontFamilyOptions}
                                                        onChange={(e) => onChange(e.value)}
                                                    // value={value}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={5} className="m-auto">
                                <div className='mt-2'>
                                    <Button className="btn-lg w-100" type="submit"
                                        color="primary"
                                        outline>Update & Save
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col sm={12} className="mb-1 mt-1">
                            <h4 className="api-key-title">Email Preview</h4>
                        </Col>
                        <Col sm={12}>
                            <Card className='email-preview-card'>
                                <CardBody className='text-center'>
                                    <img src={!img ? defaultImg : img} className="img-fluid preview-img" />
                                    <p className='text-center' style={{ fontFamily: emailFontFamily }}>Hello, This is a test email.</p>
                                    <div className='text-center'>
                                        <button className='w-50 w-100 btn' style={{ backgroundColor: emailButtonColor, color: "#fff" }}>Update Your Payment Method</button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Form onSubmit={handleSubmit2(onSubmitNotification)}>
                        <Row>
                            <Col sm="12" className="mb-1 mt-1">
                                <h4 className="api-key-title">In-App Notifications</h4>
                            </Col>
                            <Col sm={6} md={4}>
                                <Label className="form-label" for="notificationFontFamily">
                                    Font Family
                                </Label>
                                <div className='upload-typography'>
                                    <Controller
                                        name="notificationFontFamily"
                                        control={control2}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                placeholder=''
                                                theme={selectThemeColors}
                                                className="react-select select-sm"
                                                classNamePrefix="select"
                                                options={fontFamilyOptions}
                                                onChange={(e) => onChange(e.value)}
                                            // value={value}
                                            />
                                        )}
                                    />
                                </div>
                            </Col>
                            <Col sm={6} md={4}>
                                <Label className="form-label" for="notificationHeaderTextColor">
                                    Header Text Color
                                </Label>
                                <div className='upload-typography'>
                                    <Controller
                                        name="notificationHeaderTextColor"
                                        control={control2}
                                        render={({ field: { onChange, value } }) => (
                                            <div className='form-group'>
                                                <Input
                                                    id="notificationHeaderTextColor"
                                                    name="notificationHeaderTextColor"
                                                    placeholder="color placeholder"
                                                    type="color"
                                                    onChange={(e) => onChange(e.target.value)}
                                                    value={value}
                                                // {...field}
                                                />
                                                <label>{value}</label>
                                            </div>
                                        )}
                                    />
                                </div>
                            </Col>
                            <Col sm={6} md={4}>
                                <Label className="form-label" for="notificationBodyFontColor">
                                    Body Font Color
                                </Label>
                                <div className='upload-typography'>
                                    <Controller
                                        name="notificationBodyFontColor"
                                        control={control2}
                                        render={({ field: { onChange, value } }) => (
                                            <div className='form-group'>
                                                <Input
                                                    id="notificationBodyFontColor"
                                                    name="notificationBodyFontColor"
                                                    placeholder="color placeholder"
                                                    type="color"
                                                    onChange={(e) => onChange(e.target.value)}
                                                    value={value}
                                                // {...field}
                                                />
                                                <label>{value}</label>
                                            </div>
                                        )}
                                    />
                                </div>
                            </Col>
                            <Col sm={6} md={4}>
                                <Label className="form-label" for="notificationBackgroundColor">
                                    Background Color
                                </Label>
                                <div className='upload-typography'>
                                    <Controller
                                        name="notificationBackgroundColor"
                                        control={control2}
                                        render={({ field: { onChange, value } }) => (
                                            <div className='form-group'>
                                                <Input
                                                    id="notificationBackgroundColor"
                                                    name="notificationBackgroundColor"
                                                    placeholder="color placeholder"
                                                    type="color"
                                                    onChange={(e) => onChange(e.target.value)}
                                                    value={value}
                                                // {...field}
                                                />
                                                <label>{value}</label>
                                            </div>
                                        )}
                                    />
                                </div>
                            </Col>
                            <Col sm={6} md={4}>
                                <Label className="form-label" for="notificationPrimaryButtonBackgroundColor">
                                    Primary Button Background Color
                                </Label>
                                <div className='upload-typography'>
                                    <Controller
                                        name="notificationPrimaryButtonBackgroundColor"
                                        control={control2}
                                        render={({ field: { onChange, value } }) => (
                                            <div className='form-group'>
                                                <Input
                                                    id="notificationPrimaryButtonBackgroundColor"
                                                    name="notificationPrimaryButtonBackgroundColor"
                                                    placeholder="color placeholder"
                                                    type="color"
                                                    onChange={(e) => onChange(e.target.value)}
                                                    value={value}
                                                // {...field}
                                                />
                                                <label>{value}</label>
                                            </div>
                                        )}
                                    />
                                </div>
                            </Col>
                            <Col sm={6} md={4}>
                                <Label className="form-label" for="notificationSecondaryButtonBackgroundColor">
                                    Secondary Button Background Color
                                </Label>
                                <div className='upload-typography'>
                                    <Controller
                                        name="notificationSecondaryButtonBackgroundColor"
                                        control={control2}
                                        render={({ field: { onChange, value } }) => (
                                            <div className='form-group'>
                                                <Input
                                                    id="notificationSecondaryButtonBackgroundColor"
                                                    name="notificationSecondaryButtonBackgroundColor"
                                                    placeholder="color placeholder"
                                                    type="color"
                                                    onChange={(e) => onChange(e.target.value)}
                                                    value={value}
                                                // {...field}
                                                />
                                                <label>{value}</label>
                                            </div>
                                        )}
                                    />
                                </div>
                            </Col>
                            <Col sm={6} md={4}>
                                <Label className="form-label" for="notificationPrimaryButtonTextColor">
                                    Primary Button Text Color
                                </Label>
                                <div className='upload-typography'>
                                    <Controller
                                        name="notificationPrimaryButtonTextColor"
                                        control={control2}
                                        render={({ field: { onChange, value } }) => (
                                            <div className='form-group'>
                                                <Input
                                                    id="notificationPrimaryButtonTextColor"
                                                    name="notificationPrimaryButtonTextColor"
                                                    placeholder="color placeholder"
                                                    type="color"
                                                    onChange={(e) => onChange(e.target.value)}
                                                    value={value}
                                                // {...field}
                                                />
                                                <label>{value}</label>
                                            </div>
                                        )}
                                    />
                                </div>
                            </Col>
                            <Col sm={6} md={4}>
                                <Label className="form-label" for="notificationSecondaryButtonTextColor">
                                    Secondary Button Text Color
                                </Label>
                                <div className='upload-typography'>
                                    <Controller
                                        name="notificationSecondaryButtonTextColor"
                                        control={control2}
                                        render={({ field: { onChange, value } }) => (
                                            <div className='form-group'>
                                                <Input
                                                    id="notificationSecondaryButtonTextColor"
                                                    name="notificationSecondaryButtonTextColor"
                                                    placeholder="color placeholder"
                                                    type="color"
                                                    onChange={(e) => onChange(e.target.value)}
                                                    value={value}
                                                // {...field}
                                                />
                                                <label>{value}</label>
                                            </div>
                                        )}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} md={5} className="text- m-auto">
                                <Button className="btn-lg w-100"
                                    color="primary"
                                    outline>Update & Save</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row className='mt-2'>
                        <Col sm="12">
                            <h4 className="api-key-title mb-1" >Notification Preview</h4>
                            <div className='notification-preview' style={{ backgroundColor }}>
                                <p style={{ color: notificationFontColor, fontFamily: notificationFontFamily }}>Quick one here, do these current email notification settings allow us the option to include the actual
                                    content of replies. allowing useres (some of which have reported login issues) to be able to see the reply
                                    without having to open the web page?</p>
                                <button style={{ backgroundColor: notificationPrimaryButtonBackgroundColor, color: notificationPrimaryButtonTextColor }} className='btn-lg btn'>
                                    Notification</button>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default Branding

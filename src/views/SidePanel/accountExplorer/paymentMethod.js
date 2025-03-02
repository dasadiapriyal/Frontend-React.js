import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Col, Form, FormFeedback, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { CARD_TYPE } from '../../../constant/common'
import Cleave from 'cleave.js/react'
import DatePicker from "react-multi-date-picker"
import Select from "react-select"
import { useDispatch, useSelector } from 'react-redux'
import TinyFlag from 'tiny-flag-react'
import { selectThemeColors } from '@utils'
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { getCity, getStates } from '../../User/store'
import { addPaymentMethod } from './store'
import { Toast } from '../../../Components'
import { Home, Smartphone } from 'react-feather'

const PaymentMethod = ({ modalOpen, handleCloseModal, customerId }) => {

    const {
        control,
        setError,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()

    const allCountryData = useSelector(
        (state) => state.accountSetting.allCountrydata
    )

    const stateData = useSelector((state) => state.accountSetting.states)
    const cityData = useSelector((state) => state.accountSetting.city)

    const [selectedCardType, setSelectedCardType] = useState(null)
    const [countryOptions, setCountryOptions] = useState([])
    const [countryTelCode, setCountryTelCode] = useState("")
    const [phone, setPhone] = useState("")

    const countrySelectedVal = watch("countryId")
    const stateSelectedVal = watch("stateId")

    useEffect(() => {
        setSelectedCardType(null)
    }, [modalOpen])

    useEffect(() => {
        setValue("expDate", null)
    }, [handleCloseModal])

    const flagURL = (code) => {
        return `https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/${code}.svg`
    }

    const allStatesData =
        stateData === null
            ? []
            : stateData.length === 0
                ? []
                : stateData?.data?.map((info) => {
                    return { value: info.id, label: info.name }
                })

    const selectCountry = (e) => {
        const stateObj = {
            query: {
                countryId: e.value,
            },
            options: {
                pagination: false,
            },
        }
        dispatch(getStates(stateObj))
        setValue("countryId", e)
        setValue("stateId", null)
        setValue("cityId", null)
        setValue("postalCode", null)
    }

    useEffect(() => {
        setCountryOptions(
            allCountryData.data
                ? allCountryData?.data?.map((info) => {
                    return {
                        value: info.countryId,
                        label: (
                            <div className='table-flag-wrap gap-50 '>
                                <TinyFlag
                                    country={info.code}
                                    alt={info.code + " Flag"}
                                    fallbackImageURL={flagURL(info.code)}
                                    className="flag-img"
                                />{" "}
                                {info.name}
                            </div>
                        ),
                    }
                })
                : []
        )
    }, [allCountryData])

    const detectCardType = (number) => {
        // console.log("number...", number)
        var re = {
            unionpay: /^(62|88)\d+$/,
            visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
            amex: /^3[47][0-9]{13}$/,
            mastercard: /^5[1-5][0-9]{14}$/,
            discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
            jcb: /^(?:2131|1800|35\d{3})\d{11}$/
        }

        for (var key in re) {
            if (re[key].test(number)) {
                // console.log("card type", key)
                setSelectedCardType(key)
                return key
            } else {
                setSelectedCardType(null)
            }
        }
    }

    const onCreditCardTypeChanged = (type) => {
        setSelectedCardType(type)
    }

    const options = { creditCard: true, onCreditCardTypeChanged }

    const changeHandler = (e, key) => {
        if (key == "cvc") {
            if (e.target.value.length > "4") {
                setError("CVC", {
                    type: "custom",
                    message: "CVC should be 3-4 numbers.",
                })
            } else {
                setError("CVC", "")
            }
        }

        if (key == "cardNum") {
            // console.log("e.....", e)
            // detectCardType(e.target.value)
            // if(e.target.value.length > "16" ){
            //     setError("cardNumber", {
            //         type: "custom",
            //         message: "CVC should be 15-16 numbers.",
            //       })
            // } else {
            //     setError("cardNumber", "")
            // }
        }
    }

    const allCityData =
        cityData === null
            ? []
            : cityData.length === 0
                ? []
                : cityData?.data?.map((info) => {
                    return { value: info.cityId, label: info.name }
                })

    const selectState = (e) => {
        setValue("stateId", e)
        const cityObj = {
            query: {
                stateId: e.value,
            },
            options: {
                pagination: false,
            },
        }
        dispatch(getCity(cityObj))
    }

    const PhoneSelect = (e, country) => {
        setCountryTelCode(country.dialCode)
        setPhone(e)
    }

    const onSubmit = (data) => {
        let cardType
        CARD_TYPE.map((x) => {
            if (x.validateKey == selectedCardType) {
                cardType = x.id
            }
        })

        const obj = {
            "paymentId": data.cardNumber.replaceAll(" ", ""),
            "customerId": customerId,
            "cardType": cardType,
            "last4Digits": parseInt(data.cardNumber.slice(-4)),
            "expirationMonth": data.expDate.month.number,
            "expirationYear": data.expDate.year,
            "billingName": data.cardName,
            "billingAddress": data.address1 + data.address2,
            "billingCity": data.cityId.label,
            "billingStateProvince": data.stateId.label,
            "billingZipPostal": data.zipCode,
            "billingCountry": data.countryId.label.props.children[2],
            "billingTelPrimary": data.telephone,
            "billingTelPrimaryCountryCode": countryTelCode
        }
        dispatch(addPaymentMethod(obj)).then((res) => {
            handleCloseModal()
            if (res.meta.requestStatus == "fulfilled") {
                Toast.success("Payment method is added successfully")
            }
        })
    }

    const selectdropdown = () => {
        // console.log("on selecte called ")
    }

    const [focus, setFocus] = useState(false)
    const [flagshow, setFlagshow] = useState(false)
    const [isDateLabelFocus, setIsDateLabelFocus] = useState(false)

    const focusHandler = (e, flag) => {
        setFocus(flag)
    }

    const dateFocusHandler = (e, flag) => {
        setIsDateLabelFocus(flag)
    }

    const flagshownHandler = (e, flag) => {
        setFlagshow(flag)
    }

    return (
        <div>
            <Modal isOpen={modalOpen} toggle={handleCloseModal} className="custom-modal modal-dialog-centered">
                <ModalHeader toggle={handleCloseModal}>Add Your Payment Method</ModalHeader>
                <ModalBody>
                    <Form
                        className="profile-setting-page"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Row>
                            <Col sm="12" className="">
                                <Controller
                                    name="cardNumber"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <div className={"floating position-relative" + (errors?.cardNumber?.message ? " floating-error" : "")}>
                                            <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.0118 12.5215C20.8857 12.8321 20.8055 13.1724 20.6246 13.447C20.2062 14.0828 19.5735 14.3496 18.82 14.3491C17.2503 14.3475 15.6807 14.3486 14.1105 14.3486C10.4761 14.3486 6.84125 14.3491 3.20688 14.348C2.19328 14.348 1.3996 13.8102 1.11246 12.9071C1.03898 12.6757 1.00562 12.4225 1.0051 12.1786C0.998329 9.17581 0.999892 6.17305 1.00093 3.1703C1.00146 1.90708 1.89936 1.00708 3.1678 1.00239C4.39245 0.997704 5.61711 1.00135 6.84125 1.00135C10.8274 1.00135 14.814 1.00083 18.8002 1.00187C19.8242 1.00187 20.6158 1.54802 20.9097 2.45479C20.9493 2.57777 20.978 2.70389 21.0118 2.82896C21.0118 6.05945 21.0118 9.29046 21.0118 12.5215ZM1.8311 6.85157C1.8311 6.93547 1.8311 6.99957 1.8311 7.06315C1.8311 8.76307 1.83005 10.4625 1.83162 12.1624C1.83266 12.9853 2.35118 13.5075 3.17197 13.5075C8.39526 13.5085 13.618 13.5085 18.8413 13.5075C19.6621 13.5075 20.1796 12.9853 20.1806 12.1608C20.1822 10.4609 20.1812 8.76151 20.1806 7.06158C20.1806 6.99331 20.1744 6.92505 20.1713 6.85157C14.0527 6.85157 7.95855 6.85157 1.8311 6.85157ZM20.1561 4.36004C14.0485 4.36004 7.9523 4.36004 1.86028 4.36004C1.86028 4.914 1.86028 5.45129 1.86028 5.99066C7.96689 5.99066 14.0584 5.99066 20.1561 5.99066C20.1561 5.4393 20.1561 4.90254 20.1561 4.36004ZM20.201 3.49079C20.1754 3.23283 20.1817 2.98269 20.1223 2.74922C19.9743 2.17129 19.4881 1.84194 18.8257 1.84194C15.8104 1.84089 12.7952 1.84141 9.77991 1.84141C7.56562 1.84141 5.35134 1.85132 3.13705 1.83568C2.42362 1.83047 1.65652 2.40997 1.8608 3.49079C7.9596 3.49079 14.0589 3.49079 20.201 3.49079Z" fill="#484A54" stroke="#484A54" strokeWidth="0.2" />
                                                <path d="M18.5053 10.1926C18.5053 10.3683 18.5194 10.5454 18.5027 10.7195C18.4474 11.2912 18.0081 11.7612 17.4338 11.8191C17.0539 11.8571 16.6647 11.8608 16.2847 11.8248C15.6354 11.7628 15.1951 11.2521 15.1805 10.5965C15.1742 10.3167 15.1742 10.0363 15.1805 9.75697C15.1945 9.09305 15.6406 8.58182 16.3004 8.52294C16.6803 8.48906 17.0701 8.49271 17.4495 8.53388C18.0493 8.5985 18.4912 9.11911 18.5089 9.72466C18.5136 9.881 18.5095 10.0373 18.5095 10.1932C18.5084 10.1926 18.5069 10.1926 18.5053 10.1926ZM16.8382 11.0046C16.9747 11.0046 17.1118 11.0087 17.2483 11.0035C17.4964 10.9941 17.66 10.8534 17.6725 10.609C17.6871 10.3167 17.6876 10.0227 17.671 9.7304C17.6574 9.49432 17.4953 9.35362 17.2577 9.34736C16.9779 9.34059 16.6975 9.33955 16.4176 9.34841C16.1769 9.3557 16.0185 9.51777 16.0117 9.7601C16.0044 10.0337 16.0049 10.3073 16.0112 10.5809C16.0169 10.8336 16.1764 10.9926 16.4281 11.0035C16.5646 11.0093 16.7017 11.004 16.8382 11.0046Z" fill="#484A54" stroke="#484A54" strokeWidth="0.2" />
                                                <path d="M6.41238 11.0082C7.21961 11.0082 8.02632 11.0071 8.83355 11.0087C9.12487 11.0092 9.30309 11.1431 9.32967 11.3719C9.35625 11.5986 9.22701 11.7836 9.00292 11.8315C8.93361 11.8461 8.86117 11.8477 8.78978 11.8477C7.20814 11.8487 5.62703 11.8487 4.0454 11.8472C3.9615 11.8472 3.87499 11.8414 3.79474 11.8196C3.61807 11.7711 3.50238 11.6069 3.50342 11.4261C3.50447 11.2442 3.62016 11.0837 3.79891 11.0358C3.87916 11.0144 3.96567 11.0097 4.04957 11.0092C4.83752 11.0071 5.62495 11.0082 6.41238 11.0082Z" fill="#484A54" stroke="#484A54" strokeWidth="0.2" />
                                                <path d="M6.42195 9.34527C7.20261 9.34527 7.98378 9.34527 8.76443 9.34527C8.82958 9.34527 8.89472 9.34371 8.95934 9.34996C9.17925 9.37133 9.32934 9.53444 9.33247 9.75123C9.33559 9.96542 9.18863 10.14 8.97445 10.1702C8.91035 10.1791 8.84469 10.1754 8.77955 10.1754C7.20469 10.1754 5.63035 10.1754 4.0555 10.1754C4.00338 10.1754 3.95127 10.178 3.89916 10.1733C3.66673 10.1535 3.49684 9.96907 3.5031 9.74654C3.50935 9.52871 3.67403 9.35934 3.90385 9.34892C4.08572 9.34006 4.26812 9.34527 4.45051 9.34527C5.10766 9.34527 5.76481 9.34527 6.42195 9.34527Z" fill="#484A54" stroke="#484A54" strokeWidth="0.2" />
                                            </svg>
                                            <div className='w-100 position-relative'>
                                                <Cleave className='floating__input form-control' id="input__cardname" placeholder='0000 0000 0000 0000' options={options} onChange={(e) => { onChange(e.target.value), changeHandler(e, "cardNum") }} />
                                                {/* <input id="input__cardnumber" className="floating__input form-control" name="cardNumber" type="text" placeholder='Card Number' onChange={(e) => { onChange(e.target.value),changeHandler(e, "cardNum") }} /> */}
                                                <label for="input__cardnumber" className="floating__label" data-content="Card Number">
                                                </label>
                                                {CARD_TYPE.map((x) => {
                                                    if (x.validateKey == selectedCardType) {
                                                        return <img src={x.imgLink} className="card-img-block card-input-img" />
                                                    }
                                                })}
                                                {/* <img src={CARD_TYPE[0].imgLink} className="card-img-block card-input-img" /> */}
                                            </div>
                                        </div>
                                    )}
                                />
                                {errors.cardNumber ? <p className='text-danger'>{errors.cardNumber.message}</p> : null}
                            </Col>
                            <Col sm="6" className="">
                                <Controller
                                    name="expDate"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <div className="floating position-relative">
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.8335 9.16797H7.50016V10.8346H5.8335V9.16797ZM5.8335 12.5013H7.50016V14.168H5.8335V12.5013ZM9.16683 9.16797H10.8335V10.8346H9.16683V9.16797ZM9.16683 12.5013H10.8335V14.168H9.16683V12.5013ZM12.5002 9.16797H14.1668V10.8346H12.5002V9.16797ZM12.5002 12.5013H14.1668V14.168H12.5002V12.5013Z" fill="#484A54"/>
<path d="M4.16667 18.3346H15.8333C16.7525 18.3346 17.5 17.5871 17.5 16.668V5.0013C17.5 4.08214 16.7525 3.33464 15.8333 3.33464H14.1667V1.66797H12.5V3.33464H7.5V1.66797H5.83333V3.33464H4.16667C3.2475 3.33464 2.5 4.08214 2.5 5.0013V16.668C2.5 17.5871 3.2475 18.3346 4.16667 18.3346ZM15.8333 6.66797L15.8342 16.668H4.16667V6.66797H15.8333Z" fill="#484A54"/>
</svg>


                                            <div className='w-75 date-picker-block'>
                                                {/* <Cleave
                                                placeholder="MM/YY"
                                                options={{ date: true, datePattern: ["m", "d"] }}
                                                onChange={(e) => { onChange(e.target.rawValue) }}
                                                className="form-field floating__input form-control"
                                                id="input__expdate"
                                                /> */}
                                                {/* <input id="input__expdate" className="floating__input form-control" name="expDate" type="month" pattern="[0-9]{2}/[0-9]{2}" placeholder='Exp Date' onChange={(e) => { onChange(e.target.value) }} /> */}
                                                <div className={"date-container" + (value || isDateLabelFocus ? " date-picker-focus" : "")}>
                                                <DatePicker
                                                    onlyMonthPicker
                                                    className="form-control"
                                                    name="expDate"
                                                    id="input__expdate"
                                                    // placeholder='MM/YYYY'
                                                    onChange={(e) =>
                                                        onChange(e)
                                                    }
                                                    onClose={(e) => dateFocusHandler(e,false)}
                                                    onOpen={(e) => dateFocusHandler(e,true)}
                                                />
                                                    </div>
                                                <label for="input__expdate" className="floating__label"  data-content="Exp Date">
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                />
                            </Col>
                            {/* <Col sm="6" className="">
                                <Controller
                                    name="CVC"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <div className={"floating position-relative" + (errors?.CVC?.message ? " floating-error" : "")}>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.0499 11.4375C9.75084 11.4398 9.46111 11.5421 9.22695 11.7282C8.9928 11.9144 8.82772 12.1735 8.75803 12.4644C8.68835 12.7553 8.71808 13.0612 8.84247 13.3332C8.96687 13.6052 9.17878 13.8277 9.44439 13.9653V15.5542H10.5555V14.0153C10.8424 13.8977 11.0795 13.6843 11.2265 13.4113C11.3736 13.1384 11.4213 12.8229 11.3616 12.5187C11.302 12.2145 11.1386 11.9404 10.8994 11.7432C10.6602 11.5461 10.36 11.438 10.0499 11.4375Z" fill="#484A54" />
                                                <path d="M14.4442 8.33472V5.95694C14.4681 4.75244 14.0139 3.58752 13.1809 2.7171C12.348 1.84669 11.2042 1.34165 9.99978 1.3125C8.79539 1.34165 7.65158 1.84669 6.81865 2.7171C5.98571 3.58752 5.53148 4.75244 5.55534 5.95694V8.33472H3.88867V17.7792C3.88867 18.0739 4.00573 18.3565 4.21411 18.5648C4.42248 18.7732 4.7051 18.8903 4.99978 18.8903H14.9998C15.2945 18.8903 15.5771 18.7732 15.7855 18.5648C15.9938 18.3565 16.1109 18.0739 16.1109 17.7792V8.33472H14.4442ZM6.66645 5.95694C6.6425 5.04708 6.97965 4.16471 7.60423 3.50265C8.22882 2.84059 9.09006 2.45266 9.99978 2.42361C10.9095 2.45266 11.7707 2.84059 12.3953 3.50265C13.0199 4.16471 13.3571 5.04708 13.3331 5.95694V8.33472H6.66645V5.95694ZM4.99978 17.7792V9.44583H14.9998V17.7792H4.99978Z" fill="#484A54" />
                                            </svg>
                                            <div className='w-100'>
                                                <Cleave
                                                    placeholder="Cvc"
                                                    options={{
                                                        blocks: [3],
                                                        numericOnly: true
                                                    }}
                                                    onChange={(e) => onChange(e.target.rawValue)}
                                                    className="form-field floating__input form-control"
                                                    id="input__cvc"
                                                /> */}
                            {/* <input id="input__cvc" className="floating__input form-control" name="cardNumber" type="text" placeholder='Card Number' onChange={(e) => { onChange(e.target.value), changeHandler(e, "cvc") }} /> */}
                            {/* <label for="input__cvc" className="floating__label" data-content="CVC">
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                />
                                {errors.CVC ? <p className='text-danger'>{errors.CVC.message}</p> : null}
                            </Col> */}
                            <Col sm="6" className="">
                                <Controller
                                    name="cardName"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <div className="floating position-relative">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.3894 0.000488222C10.7843 0.0756744 11.1866 0.123032 11.5723 0.230929C12.9501 0.614671 14.0305 1.42365 14.8219 2.60857C15.4913 3.61089 15.8135 4.72745 15.7725 5.93043C15.7095 7.77054 14.9274 9.25473 13.4808 10.3908C13.4246 10.4348 13.3675 10.4767 13.2772 10.5446C15.2916 11.2725 16.9174 12.4868 18.1492 14.2092C19.3814 15.9326 19.9751 17.8635 20 19.9888C19.4747 19.9888 18.9694 19.9888 18.4489 19.9888C18.361 17.0585 17.1371 14.7174 14.735 13.0297C13.1825 11.939 11.4273 11.4786 9.53448 11.5748C5.23276 11.7935 1.57451 15.399 1.55254 19.998C1.03552 19.998 0.517515 19.998 0 19.998C0 19.8028 0 19.6075 0 19.4122C0.0112291 19.3565 0.0292933 19.3009 0.0327109 19.2442C0.10155 18.2107 0.325156 17.2098 0.725497 16.2558C1.8528 13.5687 3.77932 11.6944 6.49384 10.6315C6.56121 10.6052 6.62859 10.5778 6.71842 10.5422C6.63103 10.4763 6.57342 10.4343 6.51776 10.3903C5.07165 9.25424 4.28805 7.77054 4.22507 5.92994C4.18406 4.72696 4.5058 3.6104 5.17515 2.60808C5.96656 1.42317 7.04699 0.614183 8.42475 0.230441C8.81045 0.123032 9.21274 0.0751861 9.60771 0C9.86842 0.000488222 10.1291 0.000488222 10.3894 0.000488222ZM14.2165 5.77908C14.2146 3.46247 12.3252 1.57061 10.0066 1.56377C7.68656 1.55694 5.77957 3.46149 5.78152 5.78347C5.78347 8.10009 7.67289 9.99194 9.99146 9.99878C12.311 10.0056 14.2185 8.10106 14.2165 5.77908Z" fill="#484A54" />
                                            </svg>

                                            {/* <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.125 1.75C18.2908 1.75 18.4497 1.81585 18.5669 1.93306C18.6842 2.05027 18.75 2.20924 18.75 2.375V13.625C18.75 13.7908 18.6842 13.9497 18.5669 14.0669C18.4497 14.1842 18.2908 14.25 18.125 14.25H1.875C1.70924 14.25 1.55027 14.1842 1.43306 14.0669C1.31585 13.9497 1.25 13.7908 1.25 13.625V2.375C1.25 2.20924 1.31585 2.05027 1.43306 1.93306C1.55027 1.81585 1.70924 1.75 1.875 1.75H18.125ZM1.875 0.5C1.37772 0.5 0.900805 0.697544 0.549175 1.04917C0.197544 1.40081 0 1.87772 0 2.375L0 13.625C0 14.1223 0.197544 14.5992 0.549175 14.9508C0.900805 15.3025 1.37772 15.5 1.875 15.5H18.125C18.6223 15.5 19.0992 15.3025 19.4508 14.9508C19.8025 14.5992 20 14.1223 20 13.625V2.375C20 1.87772 19.8025 1.40081 19.4508 1.04917C19.0992 0.697544 18.6223 0.5 18.125 0.5H1.875Z" fill="#484A54" />
                                                <path d="M3.75 4.875C3.75 4.70924 3.81585 4.55027 3.93306 4.43306C4.05027 4.31585 4.20924 4.25 4.375 4.25H15.625C15.7908 4.25 15.9497 4.31585 16.0669 4.43306C16.1842 4.55027 16.25 4.70924 16.25 4.875C16.25 5.04076 16.1842 5.19973 16.0669 5.31694C15.9497 5.43415 15.7908 5.5 15.625 5.5H4.375C4.20924 5.5 4.05027 5.43415 3.93306 5.31694C3.81585 5.19973 3.75 5.04076 3.75 4.875ZM3.75 8C3.75 7.83424 3.81585 7.67527 3.93306 7.55806C4.05027 7.44085 4.20924 7.375 4.375 7.375H15.625C15.7908 7.375 15.9497 7.44085 16.0669 7.55806C16.1842 7.67527 16.25 7.83424 16.25 8C16.25 8.16576 16.1842 8.32473 16.0669 8.44194C15.9497 8.55915 15.7908 8.625 15.625 8.625H4.375C4.20924 8.625 4.05027 8.55915 3.93306 8.44194C3.81585 8.32473 3.75 8.16576 3.75 8ZM3.75 11.125C3.75 10.9592 3.81585 10.8003 3.93306 10.6831C4.05027 10.5658 4.20924 10.5 4.375 10.5H11.875C12.0408 10.5 12.1997 10.5658 12.3169 10.6831C12.4342 10.8003 12.5 10.9592 12.5 11.125C12.5 11.2908 12.4342 11.4497 12.3169 11.5669C12.1997 11.6842 12.0408 11.75 11.875 11.75H4.375C4.20924 11.75 4.05027 11.6842 3.93306 11.5669C3.81585 11.4497 3.75 11.2908 3.75 11.125Z" fill="#484A54" />
                                            </svg> */}
                                            <div className='w-100'>
                                                <input id="input__cardname" className="floating__input form-control" name="cardName" type="text" placeholder='Subject' onChange={(e) => { onChange(e.target.value) }} />
                                                <label for="input__cardname" className="floating__label" data-content="Name on Card">
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="">
                                <Controller
                                    name="countryId"
                                    id="countryId"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <div className="floating position-relative">
                                            <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.47114 1C7.09556 1.06457 6.71532 1.10988 6.34494 1.19685C3.54971 1.85458 1.42043 4.22146 1.03239 7.07056C0.847463 8.42768 1.08174 9.72595 1.52952 10.9982C2.09469 12.6032 2.91856 14.078 3.86139 15.483C4.98395 17.1557 6.15066 18.7982 7.29816 20.4542C7.36101 20.5448 7.42023 20.6386 7.48568 20.7276C7.75113 21.0896 8.20825 21.0922 8.46799 20.7271C8.71681 20.3777 8.95524 20.021 9.19835 19.6679C10.2664 18.1155 11.3588 16.5787 12.3951 15.0055C13.2902 13.6468 14.0418 12.2069 14.5447 10.6482C15.0454 9.09478 15.1982 7.51998 14.6693 5.95144C13.7582 3.24606 11.8731 1.63013 9.07732 1.08593C8.88148 1.04791 8.682 1.02812 8.48409 1C8.14644 1 7.80879 1 7.47114 1ZM7.95008 19.4085C6.71064 17.5687 5.48419 15.7856 4.2993 13.9754C3.62607 12.9474 3.07648 11.8465 2.65831 10.6857C2.26196 9.58482 2.02664 8.45892 2.18144 7.28043C2.5939 4.14022 5.38237 1.91394 8.53967 2.20245C10.9006 2.41804 12.9406 4.11991 13.592 6.39878C13.9748 7.73923 13.8403 9.04999 13.4133 10.3498C12.9494 11.7616 12.2673 13.0703 11.4544 14.3035C10.4425 15.8392 9.37964 17.3406 8.33812 18.8565C8.22488 19.0216 8.10852 19.1836 7.95008 19.4085Z" fill="#484A54" stroke="#484A54" strokeWidth="0.2" />
                                                <path d="M7.9936 11.546C9.92288 11.5397 11.4901 9.954 11.4839 8.01466C11.4782 6.08106 9.89639 4.50991 7.96191 4.51564C6.03262 4.52137 4.4654 6.1071 4.47164 8.04643C4.47787 9.98055 6.05963 11.5522 7.9936 11.546ZM10.3151 8.03445C10.314 9.32283 9.25641 10.3774 7.96918 10.3743C6.69234 10.3711 5.64251 9.3171 5.64043 8.03654C5.63835 6.74556 6.69026 5.68788 7.97697 5.68736C9.26316 5.68684 10.3166 6.74452 10.3151 8.03445Z" fill="#484A54" stroke="#484A54" strokeWidth="0.2" />
                                            </svg>
                                            <div className='w-100 floting-select-block'>
                                                <Select
                                                    placeholder=''
                                                    id="input__country"
                                                    name="countryId"
                                                    onChange={(e) => {
                                                        onChange(e.value)
                                                        selectCountry(e)
                                                    }}
                                                    onSelect={selectdropdown}
                                                    className={"react-select select-sm floating__input form-control floting_select" + (value ? " isSelectVal" : "") }
                                                    classNamePrefix="select"
                                                    options={
                                                        countrySelectedVal?.length === 0 ? [] : countryOptions
                                                    }
                                                    // value={value}
                                                    theme={selectThemeColors}
                                                    controlShouldRenderValue={true}
                                                />
                                                {/* <select class="floating__input form-control" >
        <option value=""></option>
        <option value="1">Item1</option>
        <option value="2">Item2</option>
        <option value="3">Item3</option>
        <option value="4">Item4</option>
        <option value="5">Item5</option>
      </select> */}
                                                <label for="input__country" className="floating__label" data-content="Country">
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                />
                            </Col>
                            <Col sm="6">
                                <Controller
                                    name="address1"
                                    id="address1"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <div className="floating position-relative">
                                            <Home />
                                            <div className='w-100'>
                                                <input id="input__cardname" className="floating__input form-control" name="address1" type="text" placeholder='address1' onChange={(e) => { onChange(e.target.value) }} />
                                                <label for="input__cardname" className="floating__label" data-content="Address1">
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                />
                            </Col>
                            <Col sm="6">
                                <Controller
                                    name="address2"
                                    id="address2"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <div className="floating position-relative">
                                            <Home />
                                            <div className='w-100'>
                                                <input id="input__cardname" className="floating__input form-control" name="address2" type="text" placeholder='address2' onChange={(e) => { onChange(e.target.value) }} />
                                                <label for="input__cardname" className="floating__label" data-content="Address2">
                                                </label>
                                            </div>
                                        </div>
                                        // <div className="floating position-relative">
                                        // <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        //     <path d="M10.3894 0.000488222C10.7843 0.0756744 11.1866 0.123032 11.5723 0.230929C12.9501 0.614671 14.0305 1.42365 14.8219 2.60857C15.4913 3.61089 15.8135 4.72745 15.7725 5.93043C15.7095 7.77054 14.9274 9.25473 13.4808 10.3908C13.4246 10.4348 13.3675 10.4767 13.2772 10.5446C15.2916 11.2725 16.9174 12.4868 18.1492 14.2092C19.3814 15.9326 19.9751 17.8635 20 19.9888C19.4747 19.9888 18.9694 19.9888 18.4489 19.9888C18.361 17.0585 17.1371 14.7174 14.735 13.0297C13.1825 11.939 11.4273 11.4786 9.53448 11.5748C5.23276 11.7935 1.57451 15.399 1.55254 19.998C1.03552 19.998 0.517515 19.998 0 19.998C0 19.8028 0 19.6075 0 19.4122C0.0112291 19.3565 0.0292933 19.3009 0.0327109 19.2442C0.10155 18.2107 0.325156 17.2098 0.725497 16.2558C1.8528 13.5687 3.77932 11.6944 6.49384 10.6315C6.56121 10.6052 6.62859 10.5778 6.71842 10.5422C6.63103 10.4763 6.57342 10.4343 6.51776 10.3903C5.07165 9.25424 4.28805 7.77054 4.22507 5.92994C4.18406 4.72696 4.5058 3.6104 5.17515 2.60808C5.96656 1.42317 7.04699 0.614183 8.42475 0.230441C8.81045 0.123032 9.21274 0.0751861 9.60771 0C9.86842 0.000488222 10.1291 0.000488222 10.3894 0.000488222ZM14.2165 5.77908C14.2146 3.46247 12.3252 1.57061 10.0066 1.56377C7.68656 1.55694 5.77957 3.46149 5.78152 5.78347C5.78347 8.10009 7.67289 9.99194 9.99146 9.99878C12.311 10.0056 14.2185 8.10106 14.2165 5.77908Z" fill="#484A54" />
                                        // </svg>
                                        // <div className='w-100'>
                                        // <input id="address2" name="address2" {...field} />
                                        // <label for="input__country" className="floating__label" data-content="Address2">
                                        //         </label>
                                        //     </div>
                                        //     </div>      
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="">
                                <Controller
                                    name="stateId"
                                    id="stateId"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <div className="floating position-relative">
                                            <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.47114 1C7.09556 1.06457 6.71532 1.10988 6.34494 1.19685C3.54971 1.85458 1.42043 4.22146 1.03239 7.07056C0.847463 8.42768 1.08174 9.72595 1.52952 10.9982C2.09469 12.6032 2.91856 14.078 3.86139 15.483C4.98395 17.1557 6.15066 18.7982 7.29816 20.4542C7.36101 20.5448 7.42023 20.6386 7.48568 20.7276C7.75113 21.0896 8.20825 21.0922 8.46799 20.7271C8.71681 20.3777 8.95524 20.021 9.19835 19.6679C10.2664 18.1155 11.3588 16.5787 12.3951 15.0055C13.2902 13.6468 14.0418 12.2069 14.5447 10.6482C15.0454 9.09478 15.1982 7.51998 14.6693 5.95144C13.7582 3.24606 11.8731 1.63013 9.07732 1.08593C8.88148 1.04791 8.682 1.02812 8.48409 1C8.14644 1 7.80879 1 7.47114 1ZM7.95008 19.4085C6.71064 17.5687 5.48419 15.7856 4.2993 13.9754C3.62607 12.9474 3.07648 11.8465 2.65831 10.6857C2.26196 9.58482 2.02664 8.45892 2.18144 7.28043C2.5939 4.14022 5.38237 1.91394 8.53967 2.20245C10.9006 2.41804 12.9406 4.11991 13.592 6.39878C13.9748 7.73923 13.8403 9.04999 13.4133 10.3498C12.9494 11.7616 12.2673 13.0703 11.4544 14.3035C10.4425 15.8392 9.37964 17.3406 8.33812 18.8565C8.22488 19.0216 8.10852 19.1836 7.95008 19.4085Z" fill="#484A54" stroke="#484A54" strokeWidth="0.2" />
                                                <path d="M7.9936 11.546C9.92288 11.5397 11.4901 9.954 11.4839 8.01466C11.4782 6.08106 9.89639 4.50991 7.96191 4.51564C6.03262 4.52137 4.4654 6.1071 4.47164 8.04643C4.47787 9.98055 6.05963 11.5522 7.9936 11.546ZM10.3151 8.03445C10.314 9.32283 9.25641 10.3774 7.96918 10.3743C6.69234 10.3711 5.64251 9.3171 5.64043 8.03654C5.63835 6.74556 6.69026 5.68788 7.97697 5.68736C9.26316 5.68684 10.3166 6.74452 10.3151 8.03445Z" fill="#484A54" stroke="#484A54" strokeWidth="0.2" />
                                            </svg>
                                            <div className='w-100 floting-select-block'>
                                                <Select
                                                    placeholder=''
                                                    id="input__state"
                                                    name="stateId"
                                                    onChange={(e) => {
                                                        onChange(e.value)
                                                        selectState(e)
                                                    }}
                                                    className={"react-select select-sm floating__input form-control floting_select" + (value ? " isSelectVal" : "") }
                                                    classNamePrefix="select"
                                                    options={allStatesData}
                                                    // value={value}
                                                    theme={selectThemeColors}
                                                    controlShouldRenderValue={true}
                                                />
                                                <label for="input__state" className="floating__label" data-content="State">
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="">
                                <Controller
                                    name="cityId"
                                    id="cityId"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <div className="floating position-relative">
                                            <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.47114 1C7.09556 1.06457 6.71532 1.10988 6.34494 1.19685C3.54971 1.85458 1.42043 4.22146 1.03239 7.07056C0.847463 8.42768 1.08174 9.72595 1.52952 10.9982C2.09469 12.6032 2.91856 14.078 3.86139 15.483C4.98395 17.1557 6.15066 18.7982 7.29816 20.4542C7.36101 20.5448 7.42023 20.6386 7.48568 20.7276C7.75113 21.0896 8.20825 21.0922 8.46799 20.7271C8.71681 20.3777 8.95524 20.021 9.19835 19.6679C10.2664 18.1155 11.3588 16.5787 12.3951 15.0055C13.2902 13.6468 14.0418 12.2069 14.5447 10.6482C15.0454 9.09478 15.1982 7.51998 14.6693 5.95144C13.7582 3.24606 11.8731 1.63013 9.07732 1.08593C8.88148 1.04791 8.682 1.02812 8.48409 1C8.14644 1 7.80879 1 7.47114 1ZM7.95008 19.4085C6.71064 17.5687 5.48419 15.7856 4.2993 13.9754C3.62607 12.9474 3.07648 11.8465 2.65831 10.6857C2.26196 9.58482 2.02664 8.45892 2.18144 7.28043C2.5939 4.14022 5.38237 1.91394 8.53967 2.20245C10.9006 2.41804 12.9406 4.11991 13.592 6.39878C13.9748 7.73923 13.8403 9.04999 13.4133 10.3498C12.9494 11.7616 12.2673 13.0703 11.4544 14.3035C10.4425 15.8392 9.37964 17.3406 8.33812 18.8565C8.22488 19.0216 8.10852 19.1836 7.95008 19.4085Z" fill="#484A54" stroke="#484A54" strokeWidth="0.2" />
                                                <path d="M7.9936 11.546C9.92288 11.5397 11.4901 9.954 11.4839 8.01466C11.4782 6.08106 9.89639 4.50991 7.96191 4.51564C6.03262 4.52137 4.4654 6.1071 4.47164 8.04643C4.47787 9.98055 6.05963 11.5522 7.9936 11.546ZM10.3151 8.03445C10.314 9.32283 9.25641 10.3774 7.96918 10.3743C6.69234 10.3711 5.64251 9.3171 5.64043 8.03654C5.63835 6.74556 6.69026 5.68788 7.97697 5.68736C9.26316 5.68684 10.3166 6.74452 10.3151 8.03445Z" fill="#484A54" stroke="#484A54" strokeWidth="0.2" />
                                            </svg>
                                            <div className='w-100 floting-select-block'>
                                                <Select
                                                    placeholder=''
                                                    id="input__city"
                                                    name="cityId"
                                                    onChange={(e) => {
                                                        onChange(e.value)
                                                        setValue("cityId", e)
                                                    }}
                                                    className={"react-select select-sm floating__input form-control floting_select" + (value ? " isSelectVal" : "") }
                                                    classNamePrefix="select"
                                                    options={stateSelectedVal?.length === 0 ? [] : allCityData}
                                                    // value={value}
                                                    theme={selectThemeColors}
                                                    controlShouldRenderValue={true}
                                                />
                                                <label for="input__city" className="floating__label" data-content="City">
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="">
                                <Controller
                                    name="zipCode"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <div className="floating position-relative">
                                            <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.47114 1C7.09556 1.06457 6.71532 1.10988 6.34494 1.19685C3.54971 1.85458 1.42043 4.22146 1.03239 7.07056C0.847463 8.42768 1.08174 9.72595 1.52952 10.9982C2.09469 12.6032 2.91856 14.078 3.86139 15.483C4.98395 17.1557 6.15066 18.7982 7.29816 20.4542C7.36101 20.5448 7.42023 20.6386 7.48568 20.7276C7.75113 21.0896 8.20825 21.0922 8.46799 20.7271C8.71681 20.3777 8.95524 20.021 9.19835 19.6679C10.2664 18.1155 11.3588 16.5787 12.3951 15.0055C13.2902 13.6468 14.0418 12.2069 14.5447 10.6482C15.0454 9.09478 15.1982 7.51998 14.6693 5.95144C13.7582 3.24606 11.8731 1.63013 9.07732 1.08593C8.88148 1.04791 8.682 1.02812 8.48409 1C8.14644 1 7.80879 1 7.47114 1ZM7.95008 19.4085C6.71064 17.5687 5.48419 15.7856 4.2993 13.9754C3.62607 12.9474 3.07648 11.8465 2.65831 10.6857C2.26196 9.58482 2.02664 8.45892 2.18144 7.28043C2.5939 4.14022 5.38237 1.91394 8.53967 2.20245C10.9006 2.41804 12.9406 4.11991 13.592 6.39878C13.9748 7.73923 13.8403 9.04999 13.4133 10.3498C12.9494 11.7616 12.2673 13.0703 11.4544 14.3035C10.4425 15.8392 9.37964 17.3406 8.33812 18.8565C8.22488 19.0216 8.10852 19.1836 7.95008 19.4085Z" fill="#484A54" stroke="#484A54" strokeWidth="0.2" />
                                                <path d="M7.9936 11.546C9.92288 11.5397 11.4901 9.954 11.4839 8.01466C11.4782 6.08106 9.89639 4.50991 7.96191 4.51564C6.03262 4.52137 4.4654 6.1071 4.47164 8.04643C4.47787 9.98055 6.05963 11.5522 7.9936 11.546ZM10.3151 8.03445C10.314 9.32283 9.25641 10.3774 7.96918 10.3743C6.69234 10.3711 5.64251 9.3171 5.64043 8.03654C5.63835 6.74556 6.69026 5.68788 7.97697 5.68736C9.26316 5.68684 10.3166 6.74452 10.3151 8.03445Z" fill="#484A54" stroke="#484A54" strokeWidth="0.2" />
                                            </svg>
                                            {/* <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.125 1.75C18.2908 1.75 18.4497 1.81585 18.5669 1.93306C18.6842 2.05027 18.75 2.20924 18.75 2.375V13.625C18.75 13.7908 18.6842 13.9497 18.5669 14.0669C18.4497 14.1842 18.2908 14.25 18.125 14.25H1.875C1.70924 14.25 1.55027 14.1842 1.43306 14.0669C1.31585 13.9497 1.25 13.7908 1.25 13.625V2.375C1.25 2.20924 1.31585 2.05027 1.43306 1.93306C1.55027 1.81585 1.70924 1.75 1.875 1.75H18.125ZM1.875 0.5C1.37772 0.5 0.900805 0.697544 0.549175 1.04917C0.197544 1.40081 0 1.87772 0 2.375L0 13.625C0 14.1223 0.197544 14.5992 0.549175 14.9508C0.900805 15.3025 1.37772 15.5 1.875 15.5H18.125C18.6223 15.5 19.0992 15.3025 19.4508 14.9508C19.8025 14.5992 20 14.1223 20 13.625V2.375C20 1.87772 19.8025 1.40081 19.4508 1.04917C19.0992 0.697544 18.6223 0.5 18.125 0.5H1.875Z" fill="#484A54" />
                                                <path d="M3.75 4.875C3.75 4.70924 3.81585 4.55027 3.93306 4.43306C4.05027 4.31585 4.20924 4.25 4.375 4.25H15.625C15.7908 4.25 15.9497 4.31585 16.0669 4.43306C16.1842 4.55027 16.25 4.70924 16.25 4.875C16.25 5.04076 16.1842 5.19973 16.0669 5.31694C15.9497 5.43415 15.7908 5.5 15.625 5.5H4.375C4.20924 5.5 4.05027 5.43415 3.93306 5.31694C3.81585 5.19973 3.75 5.04076 3.75 4.875ZM3.75 8C3.75 7.83424 3.81585 7.67527 3.93306 7.55806C4.05027 7.44085 4.20924 7.375 4.375 7.375H15.625C15.7908 7.375 15.9497 7.44085 16.0669 7.55806C16.1842 7.67527 16.25 7.83424 16.25 8C16.25 8.16576 16.1842 8.32473 16.0669 8.44194C15.9497 8.55915 15.7908 8.625 15.625 8.625H4.375C4.20924 8.625 4.05027 8.55915 3.93306 8.44194C3.81585 8.32473 3.75 8.16576 3.75 8ZM3.75 11.125C3.75 10.9592 3.81585 10.8003 3.93306 10.6831C4.05027 10.5658 4.20924 10.5 4.375 10.5H11.875C12.0408 10.5 12.1997 10.5658 12.3169 10.6831C12.4342 10.8003 12.5 10.9592 12.5 11.125C12.5 11.2908 12.4342 11.4497 12.3169 11.5669C12.1997 11.6842 12.0408 11.75 11.875 11.75H4.375C4.20924 11.75 4.05027 11.6842 3.93306 11.5669C3.81585 11.4497 3.75 11.2908 3.75 11.125Z" fill="#484A54" />
                                            </svg> */}
                                            <div className='w-100'>
                                                <input id="input__cardname" className="floating__input form-control" name="zipCode" type="text" placeholder='Subject' onChange={(e) => { onChange(e.target.value) }} />
                                                <label for="input__cardname" className="floating__label" data-content="Zip Code">
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                />
                            </Col>
                            <Col sm="6">
                                <Controller
                                    name="telephone"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        // <PhoneInput
                                        //     // country={'us'}
                                        //     inputProps={{
                                        //         name: "telephone",
                                        //         required: true,
                                        //     }}
                                        //     //   value={value}
                                        //     //   invalid={errors.telephone && true}
                                        //     onChange={(e, country) => {
                                        //         onChange(e)
                                        //         // PhoneSelect(e, country)
                                        //     }}
                                        // // {...field}
                                        // />
                                        <div className="floating position-relative">
                                            <Smartphone/>
                                            <div className='w-100 floting-select-block'>
                                                <PhoneInput
                                                    // country={'us'}
                                                    inputProps={{
                                                        name: "telephone",
                                                        required: true,
                                                    }}
                                                    placeholder=""
                                                    value={value}
                                                    onFocus={e => {focusHandler(e, true), flagshownHandler(e, true) }}
                                                    onBlur={e => {focusHandler(e, false), flagshownHandler(e, false) }}
                                                    className={"floating__input form-control floting_select" + (value || focus ? " isSelectVal" : "") + (value || flagshow ? " isFlagShown" : "")} 
                                                    // className={"react-select select-sm floating__input form-control floting_select" + (value ? " isSelectVal" : "") }
                                                    invalid={errors.telephone && true}
                                                    onChange={(e, country) => {
                                                        onChange(e)
                                                        PhoneSelect(e, country)
                                                    }}
                                                // {...field}
                                                />
                                                <label for="telephone" className="floating__label" data-content="Telephone">
                                                </label>
                                                {/* <Cleave
                                                    placeholder="Cvc"
                                                    options={{
                                                        phone: true,
                                                        phoneRegionCode: 'country'
                                                    }}
                                                    onChange={(e) => onChange(e.target.rawValue)}
                                                    className="form-field floating__input form-control"
                                                    id="input__cvc"
                                                /> */}
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
                                        UPDATE & SAVE
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

export default PaymentMethod

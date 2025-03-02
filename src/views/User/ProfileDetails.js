// ** React Imports
import { Fragment, useEffect, useState } from "react"

// ** Third Party Components
import Select from "react-select"
import { useForm, Controller } from "react-hook-form"
import "cleave.js/dist/addons/cleave-phone.us"

import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  FormFeedback,
} from "reactstrap"

// ** Utils
import { selectThemeColors } from "@utils"
import { useDispatch, useSelector } from "react-redux"
import {
  allCountry,
  getStates,
  getCity,
  getLoginUser,
  updateProfile,
} from "./store"
import isEmpty from "../../validation/is-empty"
import { Alert } from "../../Components"

import TinyFlag from "tiny-flag-react"
import PageLoader from "../../Components/PageLoader"

const AccountTabs = () => {
  const loginUserData = useSelector(
    (state) => state.accountSetting.loginUserdata
  )

  const defaultValues = {
    companyName: isEmpty(loginUserData) ? "" : loginUserData.companyName,
    firstName: isEmpty(loginUserData) ? "" : loginUserData.firstName,
    lastName: isEmpty(loginUserData) ? "" : loginUserData.lastName,
    telephone: isEmpty(loginUserData) ? "" : loginUserData.telephone,
    email: isEmpty(loginUserData) ? "" : loginUserData.email,
    address1: isEmpty(loginUserData) ? "" : loginUserData.address1,
    address2: isEmpty(loginUserData) ? "" : loginUserData.address2,
    cityId: isEmpty(loginUserData)
      ? ""
      : {
        value: loginUserData?.cityId?.id,
        label: loginUserData?.cityId?.name,
      },
    stateId: isEmpty(loginUserData)
      ? ""
      : {
        value: loginUserData?.stateId?.id,
        label: loginUserData?.stateId?.name,
      },
    postalCode: isEmpty(loginUserData) ? "" : loginUserData.postalCode,
    countryId: isEmpty(loginUserData)
      ? ""
      : {
        value: loginUserData?.countryId?.id,
        label: loginUserData?.countryId?.name,
      },
  }

  const {
    control,
    setError,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues })

  const dispatch = useDispatch()

  const [countryTelCode, setCountryTelCode] = useState("")
  const [countryOptions, setCountryOptions] = useState([])

  const countrySelectedVal = watch("countryId")
  const stateSelectedVal = watch("stateId")

  const allCountryData = useSelector(
    (state) => state.accountSetting.allCountrydata
  )

  const isLoading = useSelector((state) => state.accountSetting.loading)
  const stateData = useSelector((state) => state.accountSetting.states)
  const cityData = useSelector((state) => state.accountSetting.city)


  useEffect(() => {
    const obj = {
      options: {
        pagination: false,
      },
    }
    dispatch(allCountry(obj))
    dispatch(getLoginUser())
  }, [])

  const flagURL = (code) => {
    return `https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/${code}.svg`
  }

  useEffect(() => {
    if (loginUserData) {
      setValue(
        "companyName",
        loginUserData.companyName ? loginUserData.companyName : ""
      )
      setValue(
        "firstName",
        loginUserData.firstName ? loginUserData.firstName : ""
      )
      setValue(
        "lastName",
        loginUserData.lastName ? loginUserData.lastName : ""
      )
      setValue(
        "telephone",
        loginUserData.telephone ? loginUserData.telephone : ""
      )
      setValue("email", loginUserData.email ? loginUserData.email : "")
      setValue(
        "address1",
        loginUserData.address1 ? loginUserData.address1 : ""
      )
      setValue(
        "address2",
        loginUserData.address2 ? loginUserData.address2 : ""
      )
      setValue(
        "stateId",
        loginUserData.stateId
          ? {
            value: loginUserData?.stateId?.id,
            label: loginUserData?.stateId?.name,
          }
          : []
      )
      setValue(
        "cityId",
        loginUserData.cityId
          ? {
            value: loginUserData?.cityId?.id,
            label: loginUserData?.cityId?.name,
          }
          : []
      )
      setValue(
        "postalCode",
        loginUserData.postalCode ? loginUserData.postalCode : ""
      )
      setValue(
        "countryId",
        loginUserData.countryId
          ? {
            value: loginUserData?.countryId?.id,
            label: (
              <div className='table-flag-wrap gap-50'>
                <TinyFlag
                  country={loginUserData?.countryId?.code}
                  alt={loginUserData?.countryId?.code + " Flag"}
                  fallbackImageURL={flagURL(loginUserData?.countryId?.code)}
                  className="flag-img"
                />
                {loginUserData?.countryId?.name}{" "}
              </div>
            ),
          }
          : []
      )
      setCountryTelCode(loginUserData?.telephoneCountryCode)
      if (loginUserData?.countryId?.id && stateData.length == 0 && cityData.length == 0) {
        // setValue("country", { label: loginUserData.countryId.name, value: loginUserData.countryId.id })
        const stateObj = {
          query: {
            countryId: loginUserData.countryId.id,
          },
          options: {
            pagination: false,
          },
        }
        dispatch(getStates(stateObj))
        const cityObj = {
          query: {
            stateId: loginUserData.stateId.id,
          },
          options: {
            pagination: false,
          },
        }
        dispatch(getCity(cityObj))
      }
    }  
  }, [loginUserData])

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

  const allStatesData =
    stateData === null
      ? []
      : stateData.length === 0
        ? []
        : stateData?.data?.map((info) => {
          return { value: info.id, label: info.name }
        })

  const allCityData =
    cityData === null
      ? []
      : cityData.length === 0
        ? []
        : cityData?.data?.map((info) => {
          return { value: info.cityId, label: info.name }
        })

  const [phone, setPhone] = useState("")

  const onSubmit = (data) => {
    // TODO:
    if(data.firstName === ""){
      setError("firstName", {type: "manual"})
    }
    if(data.companyName === ""){
      setError("companyName", {type: "manual"})
    }
    if(data.lastName === ""){
      setError("lastName", {type: "manual"})
    }
    if(data.telephone === ""){
      setError("telephone", {type: "manual"})
    }
    if(data.email === ""){
      setError("email", {type: "manual"})
    }
    
    data.telephoneCountryCode = countryTelCode
    if (typeof data.countryId === "object") {
      data.countryId = data.countryId.value
    }
    if (typeof data.stateId === "object") {
      data.stateId = data.stateId.value
    }
    if (typeof data.cityId === "object") {
      data.cityId = data.cityId.value
    }
    const finaldata = { ...loginUserData, ...data }
    dispatch(updateProfile(finaldata))
      .then((res) => {
        if (res.payload.status === "SUCCESS") {
          Alert.success("Your data is successfully updated.")
          // toast.success("Your data is successfully updated.")
        }
      })
      .catch((err) => { })
  }

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
    setValue("stateId", [])
    setValue("cityId", [])
    setValue("postalCode", "")
  }

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

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <Fragment>
      <h4 className="profile-tab-heading mb-2">Profile Details</h4>
      <Card>
        <CardBody className="py-2">
          <Form
            className="profile-setting-page"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="companyName">
                  Company Name*
                </Label>
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="companyName"
                      invalid={errors.companyName && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.companyName && (
                  <FormFeedback>
                    Please enter a valid company name.
                  </FormFeedback>
                )}
              </Col>
              <Col sm="6" lg="6" className="mb-1">
                <Label className="form-label" for="firstName">
                  First Name*
                </Label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="firstName"
                      invalid={errors.firstName && true}
                      {...field}
                    />
                  )}
                />
                {errors.firstName && (
                  <FormFeedback>Please enter a valid First Name</FormFeedback>
                )}
              </Col>
              <Col sm="6" lg="6" className="mb-1">
                <Label className="form-label" for="lastName">
                  Last Name*
                </Label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="lastName"
                      invalid={errors.lastName && true}
                      {...field}
                    />
                  )}
                />
                {errors.lastName && (
                  <FormFeedback>Please enter a valid Last Name</FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="telephone">
                  Telephone*
                </Label>
                <Controller
                  name="telephone"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      // country={'us'}
                      inputProps={{
                        name: "telephone",
                        required: true,
                      }}
                      value={value}
                      invalid={errors.telephone && true}
                      onChange={(e, country) => {
                        onChange(e)
                        PhoneSelect(e, country)
                      }}
                    // {...field}
                    />
                  )}
                />
                {errors.telephone && (
                  <FormFeedback>Please enter a valid telephone</FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="email">
                  Email Address*
                </Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <FormFeedback>
                    Please enter a valid email address
                  </FormFeedback>
                )}
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="address1">
                  Address1
                </Label>
                <Controller
                  name="address1"
                  id="address1"
                  control={control}
                  render={({ field }) => (
                    <Input id="address1" name="address1" {...field} />
                  )}
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="address2">
                  Address2
                </Label>
                <Controller
                  name="address2"
                  control={control}
                  render={({ field }) => (
                    <Input id="address2" name="address2" {...field} />
                  )}
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="countryId">
                  Country
                </Label>
                <Controller
                  name="countryId"
                  id="countryId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                     <Select
                      placeholder=''
                      id="countryId"
                      name="countryId"
                      onChange={(e) => {
                        onChange(e.value)
                        selectCountry(e)
                      }}
                      className="react-select select-sm"
                      classNamePrefix="select"
                      options={
                        countrySelectedVal.length === 0 ? [] : countryOptions
                      }
                      value={value}
                      theme={selectThemeColors}
                      controlShouldRenderValue={true}
                    />                    
                  )}
                />
              </Col>
              <Col sm="4" className="mb-1">
                <Label className="form-label" for="stateId">
                  State
                </Label>
                <Controller
                  name="stateId"
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      placeholder=''
                      onChange={(e) => {
                        onChange(e.value)
                        selectState(e)
                      }}
                      className="react-select select-sm"
                      classNamePrefix="select"
                      options={allStatesData}
                      value={value}
                      theme={selectThemeColors}
                    />
                  )}
                />
              </Col>
              <Col sm="4" className="mb-1">
                <Label className="form-label" for="cityId">
                  City
                </Label>
                <Controller
                  name="cityId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      placeholder=''
                      id="cityId"
                      name="cityId"
                      // isClearable={true}
                      onChange={(e) => {
                        onChange(e.value)
                        setValue("cityId", e)
                      }}
                      className="react-select select-sm"
                      classNamePrefix="select"
                      options={stateSelectedVal.length === 0 ? [] : allCityData}
                      value={value}
                      theme={selectThemeColors}
                    />                                   
                  )}
                />
              </Col>
              <Col sm="4" className="mb-1">
                <Label className="form-label" for="postalCode">
                  Zip Code
                </Label>
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="postalCode"
                      name="postalCode"
                      maxLength="6"
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col className="mt-2 m-auto ms-lg-0" sm="12" md="4" lg="4">
                <Button
                  type="submit"
                  className="me-1 w-100 btn-lg"
                  color="primary"
                  outline
                >
                  Update & Save
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default AccountTabs

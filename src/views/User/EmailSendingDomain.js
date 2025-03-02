import React, { Fragment, useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { ChevronDown } from "react-feather"
import { useForm, Controller } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Label,
  Row,
  CardTitle,
  CardSubtitle,
  FormFeedback,
} from "reactstrap"
import { Toast } from "../../Components"
import { updateProfile } from "./store"

const EmailSendingDomain = () => {
  const loginUserData = useSelector(
    (state) => state.accountSetting.loginUserdata
  )

  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [dnsRecords, setDnsRecords] = useState([])

  useEffect(() => {
    if (loginUserData) {
      setValue("domain", loginUserData?.domain)
      setValue("replyToEmail", loginUserData?.replyToEmail)
      setDnsRecords(loginUserData?.dnsRecords)
    }
  }, [loginUserData])

  const dnsRecordColumns = [
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Host",
      selector: (row) => row.host,
    },
    {
      name: "Value",
      selector: (row) => row.value,
    },
  ]

  const dispatch = useDispatch()

  const updateProfileDispatch = (finaldata) => {
    dispatch(updateProfile(finaldata))
      .then((res) => {
        if (res.payload.status === "SUCCESS") {
          Toast.success("Your data is successfully updated.")
        }
      })
      .catch((err) => Toast.error("Update Failed."))
  }

  const onSubmit = (data) => {
    //   if (Object.values(data).every(field => field.length > 0)) {
    if (data.domain !== "") {
      const finaldata = {
        ...loginUserData,
        stateId: loginUserData?.stateId?.id,
        cityId: loginUserData?.cityId?.id,
        countryId: loginUserData?.countryId?.id,
        domain: data.domain,
        replyToEmail: data.replyToEmail,
      }
      updateProfileDispatch(finaldata)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          })
        }
      }
    }
  }

  const varifyDomainHandler = () => {
    const finaldata = {
      ...loginUserData,
      stateId: loginUserData?.stateId?.id,
      cityId: loginUserData?.cityId?.id,
      countryId: loginUserData?.countryId?.id,
      isDomainVerified: !loginUserData.isDomainVerified,
    }
    updateProfileDispatch(finaldata)
  }

  return (
    <Fragment>
      <h4 className="profile-tab-heading mb-2">Email Sending Domain</h4>
      <Card className="Api-key-card">
        <CardHeader className="fs-16">
          Set up your email sending domain and authenticate it for enhanced
          deliverability.
        </CardHeader>
        <CardBody className="pt-0">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm="12" className="mb-1 mt-1"></Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="domain">
                  Domain*
                </Label>
                <Controller
                  name="domain"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="domain"
                      invalid={errors.domain && true}
                      {...field}
                    />
                  )}
                />
                {errors.domain && (
                  <FormFeedback>Please enter a valid domain</FormFeedback>
                )}
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="replyToEmail">
                  Reply to Email Address
                </Label>
                <Controller
                  name="replyToEmail"
                  control={control}
                  render={({ field }) => (
                    <Input id="replyToEmail" type="email" {...field} />
                  )}
                />
              </Col>
              <Col className="mt-1" md="4">
                <Button className="btn-lg w-100" color="primary" outline>
                  Update & Save
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      {/* <Card className="email-send-domain card-table-wrapper ">
        <CardHeader className="d-block">
          <h4 className="mb-50">DNS Records</h4>
          <h6 className="fs-16 fw-normal">
            You will need to install the following records to complete the
            process.
          </h6>
        </CardHeader>
        <CardBody className="px-0 pt-0">
          <Row>
            <Col sm="12">
              <div className="react-dataTable position-relative">
                <DataTable
                  noHeader
                  pagination
                  paginationServer
                  className="react-dataTable"
                  columns={dnsRecordColumns}
                  sortIcon={<ChevronDown size={10} />}
                  //   paginationComponent={CustomPagination}
                  data={dnsRecords}
                />
              </div>
            </Col>
            <Col sm="4" xs="8" className="m-auto">
              <Button
                className="btn-lg w-100"
                color="primary"
                outline
                onClick={() => varifyDomainHandler()}
              >
                {loginUserData?.isDomainVerified ? "Verified" : "Verify Domain"}
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card> */}
    </Fragment>
  )
}

export default EmailSendingDomain

import React, { Fragment, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
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
} from "reactstrap"
import { Toast } from "../../Components"
import { regenrateApiKey } from "./store"

const APIKey = () => {
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

  //   const onSubmit = data => {}

  useEffect(() => {
    if (loginUserData) {
      setValue("apiKey", loginUserData?.apiKey)
    }
  }, [loginUserData])

  const dispatch = useDispatch()

  const genrateKey = () => {
    dispatch(regenrateApiKey())
      .then((res) => {
        Toast.success("API Key is Regenrated")
      })
      .catch((err) => {})
  }

  return (
    <Fragment>
      <h4 className="profile-tab-heading mb-2">API Key</h4>
      <Card className="Api-key-card">
        <CardHeader className="fs-16">
          LTV.ai offers a RESTful API to make it easy for you to sync data to
          the LTV.ai platform.
        </CardHeader>
        <CardBody className="pt-0">
          <Form>
            <Row>
              <Col sm="12" className="mb-1 mt-1">
                <h4 className="api-key-title">Your API Key:</h4>
              </Col>
              <Col sm="6" className="mb-1">
                {/* <Label className='form-label' for='apiKey'>
                Your API Key:
                </Label> */}
                <Controller
                  name="apiKey"
                  control={control}
                  render={({ field }) => (
                    <Input id="apiKey" {...field} disabled />
                  )}
                />
              </Col>
              <Col className="" sm="4">
                <Button
                  className="btn-lg"
                  color="primary"
                  outline
                  onClick={() => genrateKey()}
                >
                  Regenerate API Key
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default APIKey

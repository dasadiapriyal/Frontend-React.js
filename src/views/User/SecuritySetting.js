import React, { Fragment, useEffect, useState } from "react"
import { useForm, Controller, set } from "react-hook-form"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap"
import InputPasswordToggle from "../../@core/components/input-password-toggle"
import { Eye, EyeOff } from "react-feather"
import { useDispatch } from "react-redux"
import { changePassword } from "./store"
import { Toast } from "../../Components"

const SecuritySetting = () => {
  const defaultValue = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  }

  useEffect(() => {
    setValue("currentPassword", "")
    setValue("newPassword", "")
    setValue("confirmNewPassword", "")
  }, [])

  const [enteredPassword, setEnteredPassword] = useState("")

  const comparePassword = (e) => {
    if (enteredPassword !== e.target.value) {
      setError("confirmNewPassword", {
        type: "custom",
        message: "Password and Confirm Password does not match.",
      })
    } else {
      clearErrors("confirmNewPassword")
    }
  }

  const dispatch = useDispatch()

  const handlerPassword = (e) => {
    setEnteredPassword(e.target.value)
  }

  const [inputVisibility, setInputVisibility] = useState(false)

  // ** Renders Icon Based On Visibility
  const renderIcon = () => {
    const size = 14

    if (inputVisibility === false) {
      return <Eye size={size} />
    } else {
      return <EyeOff size={size} />
    }
  }

  const {
    control,
    setError,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({ defaultValue })

  const onSubmit = async (data) => {
    if (
      Object.values(data).every((field) => field.length > 0) &&
      data.newPassword === data.confirmNewPassword
    ) {
      const obj = {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      }
      try {
        const res = await dispatch(changePassword(obj))
        if (res.payload.status === "SUCCESS") {
          Toast.success(res.payload.message)
        }
        if (
          res.payload.status === "FAILURE" &&
          res.payload.message === "Incorrect old password"
        ) {
          if (res.payload.message === "Incorrect old password") {
            Toast.error("Incorrect current password")
          } else {
            Toast.error(res.payload.message)
          }
        }
      } catch (error) {
        if (error.request) {
          // Internet off
        } else if (error.response) {
          // api error
          Toast.error(error.response)
        }
      }
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          })
        }
      }
      if (data.newPassword !== data.confirmNewPassword) {
        setError("confirmNewPassword", {
          type: "custom",
          message: "Password and Confirm Password does not match.",
        })
      }
    }
  }

  return (
    <Fragment>
      <h4 className="profile-tab-heading mb-2">Security Settings</h4>
      <Card className="Api-key-card">
        <CardHeader className="fs-16">
          Update the password you use to login
        </CardHeader>
        <CardBody className="pt-0">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm="12" className="mb-1 mt-1">
                <h4 className="api-key-title">Update Password</h4>
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="currentPassword">
                  Current Password*
                </Label>
                <Controller
                  name="currentPassword"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="currentPassword"
                      invalid={errors.currentPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.currentPassword && (
                  <FormFeedback>Please Enter Current Password</FormFeedback>
                )}
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="newPassword">
                  New Password*
                </Label>
                {/* <Controller
                  name='newPassword'
                  control={control}
                  render={({ field }) => (
                    <Input id='newPassword' {...field} />
                  )}
                /> */}
                <Controller
                  id="newPassword"
                  name="newPassword"
                  control={control}
                  render={({ field: { onChange } }) => (
                    //   <InputGroup>
                    //   <Input
                    //     type={inputVisibility === false ? 'password' : 'text'}
                    //     onChange={(e) => {
                    //       onChange(e)
                    //       handlerPassword(e)}}
                    //     invalid={errors.newPassword && true}
                    //     // {...field}
                    //   />
                    //    <InputGroupText className='cursor-pointer' onClick={() => setInputVisibility(!inputVisibility)}>
                    //      {renderIcon()}
                    //    </InputGroupText>
                    //  </InputGroup>
                    <InputPasswordToggle
                      onChange={(e) => {
                        onChange(e)
                        handlerPassword(e)
                      }}
                      placeholder=" "
                      className="input-group-merge"
                      invalid={errors.newPassword && true}
                    />
                  )}
                />

                {/* <Controller
                  id='newPassword'
                  name='newPassword'
                  control={control}   
                  render={({ field }) => (
                    <InputPasswordToggle onChange={(e) => handlerPassword(e)} className='input-group-merge' invalid={errors.newPassword && true} {...field} />
                  )}
                /> */}
                {errors.newPassword && (
                  <FormFeedback>Please Enter New Password</FormFeedback>
                )}
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="confirmNewPassword">
                  Confirm New Password*
                </Label>
                <Controller
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      onChange={(e) => {
                        onChange(e)
                        comparePassword(e)       
                      }}
                      placeholder=" "
                      invalid={errors.confirmNewPassword && true}
                    />
                  )}
                />
                {errors?.confirmNewPassword?.type === "custom" ? (
                  <FormFeedback>
                    {errors?.confirmNewPassword?.message}
                  </FormFeedback>
                ) : (
                  <FormFeedback>Please Enter Current Password</FormFeedback>
                )}
                {/* {errors.confirmNewPassword && <FormFeedback>Please Enter Confirm Password</FormFeedback>} */}
                {/* <Controller
                  name='confirmNewPassword'
                  control={control}
                  render={({ field }) => (
                    <Input id='confirmNewPassword' {...field} />
                  )}
                /> */}
              </Col>
              <Col type="submit" className="" md="4">
                <Button className="btn-lg" color="primary" outline>
                  Update Password
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default SecuritySetting

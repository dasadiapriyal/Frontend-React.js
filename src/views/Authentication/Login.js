// ** React Imports
import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

// ** Custom Hooks
// import { useSkin } from '@hooks/useSkin'
import Axios from "../../configs/httpConfig"

// ** Third Party Components
import { useDispatch } from "react-redux"
import { useForm, Controller } from "react-hook-form"

// ** Actions
import { handleLogin } from "@store/authentication"

// ** Context
import { AbilityContext } from "@src/utility/context/Can"

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle"

// ** Utils
import { getHomeRouteForLoggedInUser } from "@utils"

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  CardText,
  CardTitle,
} from "reactstrap"

// ** Styles
import "@styles/react/pages/page-authentication.scss"
import { LoginRoute } from "../../Services/api/routes/APIRoutes"
import { Toast } from "../../Components"
import { getUserData } from "../../utility/Utils"
import { ACCOUNT_TYPE_DISPLAY } from "../../constant/user"

const defaultValues = {
  password: "",
  username: "",
}

const Login = () => {
  // ** Hooks
  // const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues })

  useEffect(() => {
    const user = getUserData()
    if (user) {
      navigate(getHomeRouteForLoggedInUser(user.role))
    }
  }, [])

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      Axios({
        ...LoginRoute,
        data: { username: data.username, password: data.password },
      })
        .then((res) => {
          const data = {
            ...res.data.data,
            accessToken: res.data.data.token,
            refreshToken: res.data.data.token,
            role: ACCOUNT_TYPE_DISPLAY[+res.data.data.userType],
            ability: [
              {
                action: "manage",
                subject: "all",
              },
            ],
          }
          dispatch(handleLogin(data))
          ability.update(data.ability)
          navigate(getHomeRouteForLoggedInUser(data.role))
          Toast.success(res.data.message)
          // Toast.success("You have successfully logged in.")
        })
        .catch((err) => {
          // console.log("err", err)
          // toast.error(err)
        })
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

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        {/* <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col> */}
        <Col className="m-auto" lg="6" xl="4" xxl="3" md="8" sm="10">
          <div className="auth-box">
            <div className="login-shape">
              <svg
                width="200"
                height="225"
                viewBox="0 0 200 225"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.05"
                  y="25"
                  width="200"
                  height="200"
                  rx="100"
                  fill="#58A6FF"
                />
                <rect
                  x="35"
                  y="1"
                  width="130"
                  height="130"
                  rx="65"
                  stroke="#58A6FF"
                  stroke-opacity="0.15"
                />
              </svg>
            </div>
            <Link
              className="brand-logo"
              to="/"
              onClick={(e) => e.preventDefault()}
            >
              <svg
                width="131"
                height="33"
                viewBox="0 0 131 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M53.9185 26C53.7132 26 53.5452 25.9347 53.4145 25.804C53.2838 25.6733 53.2185 25.5053 53.2185 25.3V7.1C53.2185 6.89467 53.2838 6.72667 53.4145 6.596C53.5452 6.46533 53.7132 6.4 53.9185 6.4H57.0265C57.2318 6.4 57.3998 6.46533 57.5305 6.596C57.6612 6.72667 57.7265 6.89467 57.7265 7.1V22.248H66.4065C66.6118 22.248 66.7798 22.3133 66.9105 22.444C67.0412 22.5747 67.1065 22.7427 67.1065 22.948V25.3C67.1065 25.5053 67.0412 25.6733 66.9105 25.804C66.7798 25.9347 66.6118 26 66.4065 26H53.9185ZM71.6016 26C71.3962 26 71.2282 25.9347 71.0976 25.804C70.9669 25.6733 70.9016 25.5053 70.9016 25.3V10.292H65.8056C65.6189 10.292 65.4602 10.2267 65.3296 10.096C65.1989 9.96533 65.1336 9.80667 65.1336 9.62V7.1C65.1336 6.89467 65.1989 6.72667 65.3296 6.596C65.4602 6.46533 65.6189 6.4 65.8056 6.4H80.4776C80.6829 6.4 80.8509 6.46533 80.9816 6.596C81.1122 6.72667 81.1776 6.89467 81.1776 7.1V9.62C81.1776 9.80667 81.1122 9.96533 80.9816 10.096C80.8509 10.2267 80.6829 10.292 80.4776 10.292H75.4096V25.3C75.4096 25.5053 75.3442 25.6733 75.2136 25.804C75.0829 25.9347 74.9149 26 74.7096 26H71.6016ZM89.5268 26C89.2282 26 88.9855 25.9253 88.7988 25.776C88.6308 25.608 88.5095 25.412 88.4348 25.188L82.5548 7.24C82.5362 7.14667 82.5268 7.06267 82.5268 6.988C82.5268 6.83867 82.5828 6.708 82.6948 6.596C82.8068 6.46533 82.9468 6.4 83.1148 6.4H86.0548C86.3348 6.4 86.5495 6.484 86.6988 6.652C86.8668 6.80133 86.9695 6.94133 87.0068 7.072L91.3748 20.764L95.7148 7.072C95.7708 6.94133 95.8735 6.80133 96.0228 6.652C96.1722 6.484 96.3868 6.4 96.6668 6.4H99.6068C99.7748 6.4 99.9148 6.46533 100.027 6.596C100.139 6.708 100.195 6.83867 100.195 6.988C100.195 7.06267 100.185 7.14667 100.167 7.24L94.2868 25.188C94.2308 25.412 94.1095 25.608 93.9228 25.776C93.7548 25.9253 93.5122 26 93.1948 26H89.5268ZM101.485 26C101.28 26 101.112 25.9347 100.981 25.804C100.851 25.6733 100.785 25.5053 100.785 25.3V22.164C100.785 21.9587 100.851 21.7907 100.981 21.66C101.112 21.5293 101.28 21.464 101.485 21.464H104.621C104.827 21.464 104.995 21.5293 105.125 21.66C105.256 21.7907 105.321 21.9587 105.321 22.164V25.3C105.321 25.5053 105.256 25.6733 105.125 25.804C104.995 25.9347 104.827 26 104.621 26H101.485ZM112.976 26.28C111.986 26.28 111.1 26.0933 110.316 25.72C109.532 25.328 108.906 24.8053 108.44 24.152C107.973 23.4987 107.74 22.7707 107.74 21.968C107.74 20.6427 108.272 19.5973 109.336 18.832C110.418 18.0667 111.837 17.544 113.592 17.264L117.26 16.732V16.228C117.26 15.5 117.092 14.94 116.756 14.548C116.42 14.156 115.832 13.96 114.992 13.96C114.376 13.96 113.881 14.0813 113.508 14.324C113.134 14.5667 112.845 14.884 112.64 15.276C112.49 15.5187 112.276 15.64 111.996 15.64H109.336C109.13 15.64 108.972 15.584 108.86 15.472C108.748 15.3413 108.701 15.192 108.72 15.024C108.72 14.7067 108.841 14.3333 109.084 13.904C109.326 13.4747 109.7 13.0547 110.204 12.644C110.708 12.2147 111.352 11.86 112.136 11.58C112.92 11.3 113.881 11.16 115.02 11.16C116.196 11.16 117.204 11.3 118.044 11.58C118.884 11.86 119.556 12.252 120.06 12.756C120.564 13.26 120.937 13.848 121.18 14.52C121.422 15.1733 121.544 15.8827 121.544 16.648V25.3C121.544 25.5053 121.478 25.6733 121.348 25.804C121.217 25.9347 121.049 26 120.844 26H118.1C117.913 26 117.754 25.9347 117.624 25.804C117.493 25.6733 117.428 25.5053 117.428 25.3V24.264C117.185 24.6187 116.858 24.9547 116.448 25.272C116.037 25.5707 115.542 25.8133 114.964 26C114.404 26.1867 113.741 26.28 112.976 26.28ZM114.096 23.368C114.712 23.368 115.262 23.2373 115.748 22.976C116.233 22.7147 116.616 22.3133 116.896 21.772C117.176 21.2307 117.316 20.5493 117.316 19.728V19.252L114.712 19.672C113.704 19.84 112.966 20.092 112.5 20.428C112.033 20.764 111.8 21.1747 111.8 21.66C111.8 22.0147 111.902 22.3227 112.108 22.584C112.332 22.8453 112.621 23.0413 112.976 23.172C113.33 23.3027 113.704 23.368 114.096 23.368ZM125.606 26C125.419 26 125.261 25.9347 125.13 25.804C124.999 25.6733 124.934 25.5053 124.934 25.3V12.14C124.934 11.9347 124.999 11.7667 125.13 11.636C125.261 11.5053 125.419 11.44 125.606 11.44H128.406C128.611 11.44 128.779 11.5053 128.91 11.636C129.041 11.7667 129.106 11.9347 129.106 12.14V25.3C129.106 25.5053 129.041 25.6733 128.91 25.804C128.779 25.9347 128.611 26 128.406 26H125.606ZM125.522 9.2C125.335 9.2 125.177 9.13467 125.046 9.004C124.915 8.87333 124.85 8.70533 124.85 8.5V6.26C124.85 6.05467 124.915 5.88667 125.046 5.756C125.177 5.60667 125.335 5.532 125.522 5.532H128.462C128.667 5.532 128.835 5.60667 128.966 5.756C129.115 5.88667 129.19 6.05467 129.19 6.26V8.5C129.19 8.70533 129.115 8.87333 128.966 9.004C128.835 9.13467 128.667 9.2 128.462 9.2H125.522Z"
                  fill="#484A54"
                />
                <path
                  opacity="0.34"
                  d="M9.81137 11.7656L15.0388 14.7848L5.61411 31.1081L0.386719 28.0889L9.81137 11.7656Z"
                  fill="url(#paint0_linear_901_128)"
                />
                <path
                  d="M3.0137 32.6016C4.67812 32.6016 6.0274 31.2523 6.0274 29.5879C6.0274 27.9235 4.67812 26.5742 3.0137 26.5742C1.34928 26.5742 0 27.9235 0 29.5879C0 31.2523 1.34928 32.6016 3.0137 32.6016Z"
                  fill="#58A6FF"
                />
                <path
                  opacity="0.34"
                  d="M24.1589 28.0889L18.9315 31.1081L9.50684 14.7848L14.737 11.7656L24.1589 28.0889Z"
                  fill="url(#paint1_linear_901_128)"
                />
                <path
                  d="M12.3291 16.4376C13.9935 16.4376 15.3428 15.0883 15.3428 13.4239C15.3428 11.7594 13.9935 10.4102 12.3291 10.4102C10.6647 10.4102 9.31543 11.7594 9.31543 13.4239C9.31543 15.0883 10.6647 16.4376 12.3291 16.4376Z"
                  fill="#58A6FF"
                />
                <path
                  opacity="0.34"
                  d="M34.3861 1.51172L39.6163 4.5309L24.1149 31.3802L18.8848 28.361L34.3861 1.51172Z"
                  fill="url(#paint2_linear_901_128)"
                />
                <path
                  d="M36.9864 6.0274C38.6508 6.0274 40.0001 4.67812 40.0001 3.0137C40.0001 1.34928 38.6508 0 36.9864 0C35.3219 0 33.9727 1.34928 33.9727 3.0137C33.9727 4.67812 35.3219 6.0274 36.9864 6.0274Z"
                  fill="#1180FF"
                />
                <path
                  d="M21.6436 32.6016C23.308 32.6016 24.6573 31.2523 24.6573 29.5879C24.6573 27.9235 23.308 26.5742 21.6436 26.5742C19.9792 26.5742 18.6299 27.9235 18.6299 29.5879C18.6299 31.2523 19.9792 32.6016 21.6436 32.6016Z"
                  fill="#58A6FF"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_901_128"
                    x1="3.00315"
                    y1="29.6065"
                    x2="12.4274"
                    y2="13.2833"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#58A6FF" stopOpacity="0" />
                    <stop offset="1" stopColor="#58A6FF" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_901_128"
                    x1="21.5431"
                    y1="29.5914"
                    x2="12.1188"
                    y2="13.2681"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#58A6FF" stopOpacity="0" />
                    <stop offset="1" stopColor="#58A6FF" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_901_128"
                    x1="21.5028"
                    y1="29.8747"
                    x2="37.005"
                    y2="3.02412"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#58A6FF" />
                    <stop offset="1" stopColor="#58A6FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </Link>
            <CardTitle tag="h2" className="mb-50">
              Welcome Back 👋
            </CardTitle>
            <CardText className="">
              Please sign into your account below
            </CardText>

            <Form className="auth-login-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1">
                <Label className="form-label" for="username">
                  Email Address
                </Label>
                <Controller
                  id="username"
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type="text"
                      placeholder="Enter Your Email"
                      invalid={errors.username && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                </div>
                <Controller
                  id="password"
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="d-flex justify-content-end">
                <Link to="/forgot-password" className="forgotpass-text">
                  Forgot Password?
                </Link>
              </div>
              <div className="d-flex justify-content-start">
                <div className="form-check mb-1">
                  <Input type="checkbox" id="remember-me" />
                  <Label className="form-check-label" for="remember-me">
                    Remember Me
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                color="primary"
                className="btn-lg text-uppercase"
                block
              >
                Sign in
              </Button>
            </Form>
            {/* <p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p> */}
            {/* <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div> */}
            {/* <div className='auth-footer-btn d-flex justify-content-center'>
              <Button color='facebook'>
                <Facebook size={14} />
              </Button>
              <Button color='twitter'>
                <Twitter size={14} />
              </Button>
              <Button color='google'>
                <Mail size={14} />
              </Button>
              <Button className='me-0' color='github'>
                <GitHub size={14} />
              </Button>
            </div> */}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Login
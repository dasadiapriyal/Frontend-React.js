import React from 'react'
import { Card, CardBody, CardText, Button, Row, Col, CardHeader, ListGroup, ListGroupItem, Spinner } from "reactstrap"
import UsdFlag from "../../../../assets/images/UsdFlag.png"
import gbp from "../../../../assets/images/gbp.png"
import eur from "../../../../assets/images/eur.png"
import Protection from "../../../../assets/images/Protection.png"
import AntiProtection from "../../../../assets/images/antiprotection.png"
import { toAbsoluteUrl } from '../../../../constant/common'

const GuardianRecoveryCampaign = ({ preventionRecoveryCampaignData, allCountryData }) => {
    return (
        <div className="protection-metrics-block">
            {preventionRecoveryCampaignData ? preventionRecoveryCampaignData?.data?.map((info, i) => (<>
                <h2 className="section-title">
                    Recovery Campaign
                    <span> <span><Button
                        className="btn-grey-primary rounded-pill pe-1 ps-1 filterbtn"
                    >
                        <span className="me-50">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.25 9.25C10.344 9.25 11.3932 8.8154 12.1668 8.04182C12.9404 7.26823 13.375 6.21902 13.375 5.125C13.375 4.03098 12.9404 2.98177 12.1668 2.20818C11.3932 1.4346 10.344 1 9.25 1C8.15598 1 7.10677 1.4346 6.33318 2.20818C5.5596 2.98177 5.125 4.03098 5.125 5.125C5.125 6.21902 5.5596 7.26823 6.33318 8.04182C7.10677 8.8154 8.15598 9.25 9.25 9.25ZM12 5.125C12 5.85435 11.7103 6.55382 11.1945 7.06954C10.6788 7.58527 9.97935 7.875 9.25 7.875C8.52065 7.875 7.82118 7.58527 7.30546 7.06954C6.78973 6.55382 6.5 5.85435 6.5 5.125C6.5 4.39565 6.78973 3.69618 7.30546 3.18046C7.82118 2.66473 8.52065 2.375 9.25 2.375C9.97935 2.375 10.6788 2.66473 11.1945 3.18046C11.7103 3.69618 12 4.39565 12 5.125ZM17.5 16.125C17.5 17.5 16.125 17.5 16.125 17.5H2.375C2.375 17.5 1 17.5 1 16.125C1 14.75 2.375 10.625 9.25 10.625C16.125 10.625 17.5 14.75 17.5 16.125ZM16.125 16.1195C16.1236 15.7812 15.9132 14.7638 14.981 13.8315C14.0845 12.935 12.3974 12 9.25 12C6.10125 12 4.4155 12.935 3.519 13.8315C2.58675 14.7638 2.37775 15.7812 2.375 16.1195H16.125Z" fill="#1180FF" stroke="#1180FF" strokeWidth="0.2" />
                            </svg>
                        </span>
                        {info.accountInRecoveryCampaign} Accounts Currently in Campaign
                    </Button></span></span>
                </h2>
                <Row className="match-height">
                    <Col xl="4" md="6" xs="12">
                        <Card className="protection-card">
                            <CardBody className="d-md-flex align-items-center justify-content-md-center justify-content-around flex-row">
                                <div className="text-center moniter-box py-xxl-2">
                                    <div className="ibox bg-success-light position-relative">
                                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.9099 5.00019H5.90994L7.20994 3.71019C7.39824 3.52188 7.50403 3.26649 7.50403 3.00019C7.50403 2.73388 7.39824 2.47849 7.20994 2.29019C7.02164 2.10188 6.76624 1.99609 6.49994 1.99609C6.23364 1.99609 5.97824 2.10188 5.78994 2.29019L2.78994 5.29019C2.69621 5.38315 2.62182 5.49375 2.57105 5.61561C2.52028 5.73747 2.49414 5.86817 2.49414 6.00019C2.49414 6.1322 2.52028 6.2629 2.57105 6.38476C2.62182 6.50662 2.69621 6.61722 2.78994 6.71019L5.78994 9.71019C5.8829 9.80391 5.9935 9.87831 6.11536 9.92908C6.23722 9.97985 6.36793 10.006 6.49994 10.006C6.63195 10.006 6.76266 9.97985 6.88452 9.92908C7.00637 9.87831 7.11698 9.80391 7.20994 9.71019C7.30367 9.61722 7.37806 9.50662 7.42883 9.38476C7.4796 9.2629 7.50574 9.1322 7.50574 9.00019C7.50574 8.86817 7.4796 8.73747 7.42883 8.61561C7.37806 8.49375 7.30367 8.38315 7.20994 8.29019L5.90994 7.00019H17.9099C18.1148 6.99621 18.3185 7.03263 18.5093 7.10737C18.7 7.18212 18.8742 7.29372 19.0219 7.4358C19.1695 7.57788 19.2878 7.74766 19.3698 7.93544C19.4518 8.12321 19.496 8.32531 19.4999 8.53019V11.0002C19.4999 11.2654 19.6053 11.5198 19.7928 11.7073C19.9804 11.8948 20.2347 12.0002 20.4999 12.0002C20.7652 12.0002 21.0195 11.8948 21.207 11.7073C21.3946 11.5198 21.4999 11.2654 21.4999 11.0002V8.53019C21.496 8.06267 21.4 7.60052 21.2175 7.1701C21.035 6.73968 20.7694 6.34943 20.4361 6.02163C20.1027 5.69384 19.708 5.43492 19.2746 5.25966C18.8412 5.0844 18.3774 4.99623 17.9099 5.00019ZM18.2099 14.2902C18.0216 14.1019 17.7662 13.9961 17.4999 13.9961C17.2336 13.9961 16.9782 14.1019 16.7899 14.2902C16.6016 14.4785 16.4958 14.7339 16.4958 15.0002C16.4958 15.2665 16.6016 15.5219 16.7899 15.7102L18.0899 17.0002H6.08994C5.88507 17.0042 5.68142 16.9677 5.49063 16.893C5.29983 16.8183 5.12564 16.7067 4.97798 16.5646C4.83033 16.4225 4.71212 16.2527 4.63009 16.0649C4.54807 15.8772 4.50384 15.6751 4.49994 15.4702V13.0002C4.49994 12.735 4.39458 12.4806 4.20705 12.2931C4.01951 12.1055 3.76516 12.0002 3.49994 12.0002C3.23472 12.0002 2.98037 12.1055 2.79283 12.2931C2.6053 12.4806 2.49994 12.735 2.49994 13.0002V15.4702C2.50386 15.9377 2.59983 16.3999 2.78237 16.8303C2.96492 17.2607 3.23045 17.6509 3.56382 17.9787C3.89718 18.3065 4.29185 18.5655 4.72528 18.7407C5.15872 18.916 5.62243 19.0041 6.08994 19.0002H18.0899L16.7899 20.2902C16.6962 20.3831 16.6218 20.4937 16.571 20.6156C16.5203 20.7375 16.4941 20.8682 16.4941 21.0002C16.4941 21.1322 16.5203 21.2629 16.571 21.3848C16.6218 21.5066 16.6962 21.6172 16.7899 21.7102C16.8829 21.8039 16.9935 21.8783 17.1154 21.9291C17.2372 21.9798 17.3679 22.006 17.4999 22.006C17.632 22.006 17.7627 21.9798 17.8845 21.9291C18.0064 21.8783 18.117 21.8039 18.2099 21.7102L21.2099 18.7102C21.3037 18.6172 21.3781 18.5066 21.4288 18.3848C21.4796 18.2629 21.5057 18.1322 21.5057 18.0002C21.5057 17.8682 21.4796 17.7375 21.4288 17.6156C21.3781 17.4937 21.3037 17.3831 21.2099 17.2902L18.2099 14.2902Z" fill="#28C76F" />
                                        </svg>


                                        <span className="protection-icon">
                                            <img src={Protection} alt="Protection" />
                                        </span>
                                    </div>
                                    <div className="grey-dark-text">
                                        <h5 className="mb-50">{info.recoveredSubscription}</h5>
                                        <p>Recovered Subscriptions</p>
                                    </div>
                                </div>
                                <div className="text-center moniter-box py-xxl-2">
                                    <div className="ibox bg-light-danger position-relative">
                                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.9099 5.00019H5.90994L7.20994 3.71019C7.39824 3.52188 7.50403 3.26649 7.50403 3.00019C7.50403 2.73388 7.39824 2.47849 7.20994 2.29019C7.02164 2.10188 6.76624 1.99609 6.49994 1.99609C6.23364 1.99609 5.97824 2.10188 5.78994 2.29019L2.78994 5.29019C2.69621 5.38315 2.62182 5.49375 2.57105 5.61561C2.52028 5.73747 2.49414 5.86817 2.49414 6.00019C2.49414 6.1322 2.52028 6.2629 2.57105 6.38476C2.62182 6.50662 2.69621 6.61722 2.78994 6.71019L5.78994 9.71019C5.8829 9.80391 5.9935 9.87831 6.11536 9.92908C6.23722 9.97985 6.36793 10.006 6.49994 10.006C6.63195 10.006 6.76266 9.97985 6.88452 9.92908C7.00637 9.87831 7.11698 9.80391 7.20994 9.71019C7.30367 9.61722 7.37806 9.50662 7.42883 9.38476C7.4796 9.2629 7.50574 9.1322 7.50574 9.00019C7.50574 8.86817 7.4796 8.73747 7.42883 8.61561C7.37806 8.49375 7.30367 8.38315 7.20994 8.29019L5.90994 7.00019H17.9099C18.1148 6.99621 18.3185 7.03263 18.5093 7.10737C18.7 7.18212 18.8742 7.29372 19.0219 7.4358C19.1695 7.57788 19.2878 7.74766 19.3698 7.93544C19.4518 8.12321 19.496 8.32531 19.4999 8.53019V11.0002C19.4999 11.2654 19.6053 11.5198 19.7928 11.7073C19.9804 11.8948 20.2347 12.0002 20.4999 12.0002C20.7652 12.0002 21.0195 11.8948 21.207 11.7073C21.3946 11.5198 21.4999 11.2654 21.4999 11.0002V8.53019C21.496 8.06267 21.4 7.60052 21.2175 7.1701C21.035 6.73968 20.7694 6.34943 20.4361 6.02163C20.1027 5.69384 19.708 5.43492 19.2746 5.25966C18.8412 5.0844 18.3774 4.99623 17.9099 5.00019ZM18.2099 14.2902C18.0216 14.1019 17.7662 13.9961 17.4999 13.9961C17.2336 13.9961 16.9782 14.1019 16.7899 14.2902C16.6016 14.4785 16.4958 14.7339 16.4958 15.0002C16.4958 15.2665 16.6016 15.5219 16.7899 15.7102L18.0899 17.0002H6.08994C5.88507 17.0042 5.68142 16.9677 5.49063 16.893C5.29983 16.8183 5.12564 16.7067 4.97798 16.5646C4.83033 16.4225 4.71212 16.2527 4.63009 16.0649C4.54807 15.8772 4.50384 15.6751 4.49994 15.4702V13.0002C4.49994 12.735 4.39458 12.4806 4.20705 12.2931C4.01951 12.1055 3.76516 12.0002 3.49994 12.0002C3.23472 12.0002 2.98037 12.1055 2.79283 12.2931C2.6053 12.4806 2.49994 12.735 2.49994 13.0002V15.4702C2.50386 15.9377 2.59983 16.3999 2.78237 16.8303C2.96492 17.2607 3.23045 17.6509 3.56382 17.9787C3.89718 18.3065 4.29185 18.5655 4.72528 18.7407C5.15872 18.916 5.62243 19.0041 6.08994 19.0002H18.0899L16.7899 20.2902C16.6962 20.3831 16.6218 20.4937 16.571 20.6156C16.5203 20.7375 16.4941 20.8682 16.4941 21.0002C16.4941 21.1322 16.5203 21.2629 16.571 21.3848C16.6218 21.5066 16.6962 21.6172 16.7899 21.7102C16.8829 21.8039 16.9935 21.8783 17.1154 21.9291C17.2372 21.9798 17.3679 22.006 17.4999 22.006C17.632 22.006 17.7627 21.9798 17.8845 21.9291C18.0064 21.8783 18.117 21.8039 18.2099 21.7102L21.2099 18.7102C21.3037 18.6172 21.3781 18.5066 21.4288 18.3848C21.4796 18.2629 21.5057 18.1322 21.5057 18.0002C21.5057 17.8682 21.4796 17.7375 21.4288 17.6156C21.3781 17.4937 21.3037 17.3831 21.2099 17.2902L18.2099 14.2902Z" fill="#FB3E56" />
                                        </svg>


                                        <span className="protection-icon">
                                            <img src={AntiProtection} alt="Protection" />
                                        </span>
                                    </div>
                                    <div className="grey-dark-text">
                                        <h5 className="mb-50">{info.suspendedSubscription}</h5>
                                        <p>Suspended Subscriptions</p>
                                    </div>
                                </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="4" md="6" xs="12">
                    <Card className="revenue-card">
                        <CardBody className="">
                            <ul className="inline-list align-items-center mb-1 flex-wrap">
                            {info?.suspendedRecurringRevenue?.map((risk, index) => (
                <li>
                  <img src={toAbsoluteUrl(`/assets/images/flags/${risk._id.toLowerCase()}.png`)} className="flag-round" />
                  <h5>{[...new Set(allCountryData?.data?.map((x) => {
                        if (x.currency === risk._id) {
                          return x.currency_symbol
                        }
                      }))].filter(Boolean)}{risk.suspendedSubscriptionCount}</h5>
                  <p>{risk._id}</p>
                </li>
              ))}  
                                {/* <li>
                                    <img src={UsdFlag} alt="usdflag" />
                                    <h5>$122,567</h5>
                                    <p>USD</p>
                                </li>
                                <li>
                                    <img src={gbp} alt="gbp" />
                                    <h5>£26,275</h5>
                                    <p>GBP</p>
                                </li>
                                <li>
                                    <img src={eur} alt="eur" />
                                    <h5>€18,534</h5>
                                    <p>EUR</p>
                                </li> */}
                                </ul>
                                <div className="d-flex justify-content-center align-items-center gap-1">
                                    <span className="ibox bg-success-light d-inline-block m-0">
                                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.9099 5.00019H5.90994L7.20994 3.71019C7.39824 3.52188 7.50403 3.26649 7.50403 3.00019C7.50403 2.73388 7.39824 2.47849 7.20994 2.29019C7.02164 2.10188 6.76624 1.99609 6.49994 1.99609C6.23364 1.99609 5.97824 2.10188 5.78994 2.29019L2.78994 5.29019C2.69621 5.38315 2.62182 5.49375 2.57105 5.61561C2.52028 5.73747 2.49414 5.86817 2.49414 6.00019C2.49414 6.1322 2.52028 6.2629 2.57105 6.38476C2.62182 6.50662 2.69621 6.61722 2.78994 6.71019L5.78994 9.71019C5.8829 9.80391 5.9935 9.87831 6.11536 9.92908C6.23722 9.97985 6.36793 10.006 6.49994 10.006C6.63195 10.006 6.76266 9.97985 6.88452 9.92908C7.00637 9.87831 7.11698 9.80391 7.20994 9.71019C7.30367 9.61722 7.37806 9.50662 7.42883 9.38476C7.4796 9.2629 7.50574 9.1322 7.50574 9.00019C7.50574 8.86817 7.4796 8.73747 7.42883 8.61561C7.37806 8.49375 7.30367 8.38315 7.20994 8.29019L5.90994 7.00019H17.9099C18.1148 6.99621 18.3185 7.03263 18.5093 7.10737C18.7 7.18212 18.8742 7.29372 19.0219 7.4358C19.1695 7.57788 19.2878 7.74766 19.3698 7.93544C19.4518 8.12321 19.496 8.32531 19.4999 8.53019V11.0002C19.4999 11.2654 19.6053 11.5198 19.7928 11.7073C19.9804 11.8948 20.2347 12.0002 20.4999 12.0002C20.7652 12.0002 21.0195 11.8948 21.207 11.7073C21.3946 11.5198 21.4999 11.2654 21.4999 11.0002V8.53019C21.496 8.06267 21.4 7.60052 21.2175 7.1701C21.035 6.73968 20.7694 6.34943 20.4361 6.02163C20.1027 5.69384 19.708 5.43492 19.2746 5.25966C18.8412 5.0844 18.3774 4.99623 17.9099 5.00019ZM18.2099 14.2902C18.0216 14.1019 17.7662 13.9961 17.4999 13.9961C17.2336 13.9961 16.9782 14.1019 16.7899 14.2902C16.6016 14.4785 16.4958 14.7339 16.4958 15.0002C16.4958 15.2665 16.6016 15.5219 16.7899 15.7102L18.0899 17.0002H6.08994C5.88507 17.0042 5.68142 16.9677 5.49063 16.893C5.29983 16.8183 5.12564 16.7067 4.97798 16.5646C4.83033 16.4225 4.71212 16.2527 4.63009 16.0649C4.54807 15.8772 4.50384 15.6751 4.49994 15.4702V13.0002C4.49994 12.735 4.39458 12.4806 4.20705 12.2931C4.01951 12.1055 3.76516 12.0002 3.49994 12.0002C3.23472 12.0002 2.98037 12.1055 2.79283 12.2931C2.6053 12.4806 2.49994 12.735 2.49994 13.0002V15.4702C2.50386 15.9377 2.59983 16.3999 2.78237 16.8303C2.96492 17.2607 3.23045 17.6509 3.56382 17.9787C3.89718 18.3065 4.29185 18.5655 4.72528 18.7407C5.15872 18.916 5.62243 19.0041 6.08994 19.0002H18.0899L16.7899 20.2902C16.6962 20.3831 16.6218 20.4937 16.571 20.6156C16.5203 20.7375 16.4941 20.8682 16.4941 21.0002C16.4941 21.1322 16.5203 21.2629 16.571 21.3848C16.6218 21.5066 16.6962 21.6172 16.7899 21.7102C16.8829 21.8039 16.9935 21.8783 17.1154 21.9291C17.2372 21.9798 17.3679 22.006 17.4999 22.006C17.632 22.006 17.7627 21.9798 17.8845 21.9291C18.0064 21.8783 18.117 21.8039 18.2099 21.7102L21.2099 18.7102C21.3037 18.6172 21.3781 18.5066 21.4288 18.3848C21.4796 18.2629 21.5057 18.1322 21.5057 18.0002C21.5057 17.8682 21.4796 17.7375 21.4288 17.6156C21.3781 17.4937 21.3037 17.3831 21.2099 17.2902L18.2099 14.2902Z" fill="#28C76F" />
                                        </svg>

                                </span>
                                <p className="mb-0 main-font">
                                    Recovered Recurring Revenue
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="4" md="6" xs="12">
                    <Card className="revenue-card">
                        <CardBody className="">
                            <ul className="inline-list align-items-center mb-1 flex-wrap">
                            {info?.atRiskRecurringRevenue?.map((risk, index) => (
                <li>
                  <img src={toAbsoluteUrl(`/assets/images/flags/${risk._id.toLowerCase()}.png`)} className="flag-round" />
                  <h5>{[...new Set(allCountryData?.data?.map((x) => {
                        if (x.currency === risk._id) {
                          return x.currency_symbol
                        }
                      }))].filter(Boolean)}{risk.suspendedSubscriptionCount}</h5>
                  <p>{risk._id}</p>
                </li>
              ))}  
                                {/* <li>
                                    <img src={UsdFlag} alt="usdflag" />
                                    <h5>$12,567</h5>
                                    <p>USD</p>
                                </li>
                                <li>
                                    <img src={gbp} alt="gbp" />
                                    <h5>£6,275</h5>
                                    <p>GBP</p>
                                </li>
                                <li>
                                    <img src={eur} alt="eur" />
                                    <h5>€8,534</h5>
                                    <p>EUR</p>
                                </li> */}
                                </ul>
                                <div className="d-flex justify-content-center align-items-center gap-1">
                                    <span className="ibox bg-light-danger d-inline-block m-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.53737 3.54197L0 7.08384V12.0015V16.9192L3.54047 20.4595L7.08084 24H12H16.9192L20.4595 20.4595L24 16.9192V12V7.08084L20.4595 3.54047L16.9192 0H11.997H7.07484L3.53737 3.54197ZM18.9604 5.0385L21.8438 7.92075V11.9989V16.077L18.9615 18.9604L16.0793 21.8438H12.0011H7.923L5.03963 18.9615L2.15625 16.0793V12.0011V7.923L5.0385 5.03963L7.92075 2.15625H11.9989H16.077L18.9604 5.0385Z" fill="#FB3E56" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.79525 5.79666L3.20117 8.39404V12.0003V15.6066L5.79752 18.2029L8.39379 20.7992H12.0012H15.6086L18.2048 18.2029L20.8012 15.6066V11.9992V8.39184L18.2048 5.79556L15.6086 3.19922H11.999H8.38939L5.79525 5.79666ZM17.1054 6.89412L19.2199 9.00777V11.9984V14.989L17.1063 17.1035L14.9926 19.218H12.002H9.01137L6.8969 17.1043L4.78242 14.9907V12V9.00942L6.89607 6.89494L9.00972 4.78047H12.0003H14.991L17.1054 6.89412Z" fill="#FB3E56" />
                                        </svg>

                                    </span>
                                    <p className="mb-0 main-font">
                                        Suspended Recurring Revenue
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </>)) : <>
                <h2 className="section-title">
                    Recovery Campaign
                </h2>
                <Row className="match-height">
                    <div className='d-flex justify-content-center my-1 gap-1'>
                        <Spinner size='sm' type='grow' color='primary' />
                        <span className=''>Loading...</span>
                    </div>
                </Row>
            </>}

        </div>
    )
}

export default GuardianRecoveryCampaign

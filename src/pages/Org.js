import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import OTPInput, { ResendOTP } from "otp-input-react";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setOrganizationAddform, sendCreateOrgOtp, createOrganization, setOrganizationButtonLoading, getOrganizations } from '../redux/reducers/organizationReducer';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';


function Org() {
    const dispatch = useDispatch()
    const [filterSearch, setFilter] = useState('')
    const addOrganizationForm = useSelector((state) => state.organization.showAddForm)
    const loading = useSelector((state) => state.organization.buttonLoading)
    const userId = useSelector((state) => state.auth.user_id)
    const userDetails = useSelector((state) => state.auth.userDetails)
    const [headQuarters, setHeadQuarters] = useState('')
    const available_organizations = useSelector((state) => state.auth.available_organizations)
    const organizationsList = useSelector((state) => state.organization.organizationsList)
    const [optLoading, setOtpLoading] = useState(false)
    const [createOrgObj, setCreateObj] = useState({
        name: '',
        email: '',
        address: '',
        district: '',
        state: '',
        pincode: '',
        language: '',
        contact_no: '',
        domain_name: '',
        segment_type: '',
        time_zone: '',
        bussiness_type: '',
        logo: ''
    })
    const [showVerifyDialog, setVerifyDialog] = useState(false)
    const [emailOtp, setEmailOtp] = useState('')
    const [phoneOtp, setPhoneOtp] = useState('')

    // const sendOtp = (event) => {
    //     event.preventDefault();
    //     setOtpLoading(true)
    //     console.log(optLoading)
    //     console.log('userDetails', userDetails)
    //     let body = {
    //         phone: userDetails.phone,
    //         email: createOrgObj.email
    //     }
    //     console.log('++++++++++++++++', body)
    //     dispatch(sendCreateOrgOtp(body)).then((response) => {
    //         console.log(response)
    //         if (response.payload.status) {
    //             toast.success(response.payload.message)

    //             setVerifyDialog(!showVerifyDialog)
    //         } else {
    //             toast.error(response.payload.message)

    //         }
    //         setOtpLoading(false)
    //         console.log(optLoading)
    //     })
    // }

    const addOrganization = (event) => {
        setOtpLoading(true)
        dispatch(setOrganizationButtonLoading(!loading))
        event.preventDefault();
        let body = {
            organization: createOrgObj,
            // headquarter_location_name: headQuarters,
            // user_id: userId,
            // subscription: {
            //     plan_type: "free",
            //     subscription_months: "6"
            // },
            // otps: {
            //     phoneotp: phoneOtp,
            //     emailotp: emailOtp,
                
            // }
        }
        dispatch((createOrganization(body))).then((res) => {
            // console.log(body, 'RES', addOrganizationForm);
            setOrganizationAddform(!addOrganizationForm);
            // setVerifyDialog(!showVerifyDialog)
            setOtpLoading(false)
        })
        //console.log('createOrgObj', body)
    }


    return (
      <div className="">
          <div>
            <section className='pt-3'>
                <div className='container'>
                    <div className='row pb-1'>
                        <h2>Organizations</h2>
                    </div>
                    <div className='row'>
                        <div className='col-md-3'>
                            <div className='aside_left'>
                                <form className="form-inline d-flex">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setFilter(e.target.value) }} />
                                </form>
                            </div>
                        </div>

                        <div className='col-md-9'>
                            <div className='aside_left d-flex align-items-center justify-content-end gap_05rm'>
                                <button type="button" className="btn btn-primary" onClick={() => dispatch(setOrganizationAddform(!addOrganizationForm))}>Create Organization</button>
                            </div>
                        </div>
                    </div>

                    {/* <div className='row mt-4'>
                        {
                            organizationsList.length > 0 ?
                                organizationsList.map((org,key) => {
                                    return (
                                        <div className='col-md-4' id={key} >
                                            <div className="card-grid-item mb-3">
                                                <div className='card-gt-body d-flex align-items-center justify-content-between gap_1rm'>
                                                    <Avatar color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]}
                                                        initials={org.name.substring(0, 2).toUpperCase()} />
                                                    <div className='content d-flex align-items-center justify-content-between '>
                                                        <h4>
                                                            {org.name}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                : <div className='col-md-12 center text-center'>
                                    <img src={NoDataFound} height='500px' />
                                </div>
                        }
                    </div> */}
                </div>
            </section>

            <Offcanvas show={addOrganizationForm} onHide={() => dispatch(setOrganizationAddform(!addOrganizationForm))} backdrop="static" placement='end'>
                <Offcanvas.Header closeButton >
                    <Offcanvas.Title>Create Organization</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='container'>
                        <div className='row'>
                            <Form onSubmit={addOrganization}>
                                <Row className="mb-1">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Organization Name</Form.Label>
                                        <Form.Control onChange={(e) => { setCreateObj({ ...createOrgObj, name: e.target.value }) }} type="text" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-1">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Organization Email</Form.Label>
                                        <Form.Control onChange={(e) => { setCreateObj({ ...createOrgObj, email: e.target.value }) }} type="email" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-1">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Head Quarters</Form.Label>
                                        <Form.Control onChange={(e) => { setHeadQuarters(e.target.value) }} type="text" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-1">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control onChange={(e) => { setCreateObj({ ...createOrgObj, address: e.target.value }) }} type="text" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-1">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>District</Form.Label>
                                        <Form.Control onChange={(e) => { setCreateObj({ ...createOrgObj, district: e.target.value }) }} type="text" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-1">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control onChange={(e) => { setCreateObj({ ...createOrgObj, state: e.target.value }) }} type="text" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-1">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Pincode</Form.Label>
                                        <Form.Control onChange={(e) => { setCreateObj({ ...createOrgObj, pincode: e.target.value }) }} type="number" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-1">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Contact no</Form.Label>
                                        <Form.Control onChange={(e) => { setCreateObj({ ...createOrgObj, contact_no: e.target.value }) }} type="text" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-1">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Domain Name</Form.Label>
                                        <Form.Control onChange={(e) => { setCreateObj({ ...createOrgObj, domain_name: e.target.value }) }} type="text" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-1">
                                    <Form.Group as={Col} controlId="formGridState" id="formGridCheckbox">
                                        <Form.Label>Segment Type</Form.Label>
                                        <Form.Select onChange={(e) => { setCreateObj({ ...createOrgObj, segment_type: e.target.value }) }} defaultValue="Choose...">
                                            <option value={'segment1'}>Segment 1</option>
                                            <option value={'segment2'}>Segment 2</option>
                                            <option value={'segment3'}>Segment 3</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-1">
                                    <Form.Group as={Col} controlId="formGridState" id="formGridCheckbox">
                                        <Form.Label>Time Zone</Form.Label>
                                        <Form.Select onChange={(e) => { setCreateObj({ ...createOrgObj, time_zone: e.target.value }) }} defaultValue="Choose...">
                                            <option value={'Asia/Kolkata'}>Asia/Kolkata</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState" id="formGridCheckbox">
                                        <Form.Label>Business Type</Form.Label>
                                        <Form.Select onChange={(e) => { setCreateObj({ ...createOrgObj, segment_type: e.target.value }) }} defaultValue="Choose...">
                                            <option value={'business1'}>Business 1</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Button variant="primary" type="submit" disabled={loading}>
                                    {optLoading ? <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    /> : <span> Create</span>}
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            {/* <Modal show={showVerifyDialog} centered backdrop="static" onHide={() => setVerifyDialog(!showVerifyDialog)}>
                <Modal.Header closeButton>
                    <Modal.Title>Verify Otp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email Otp</Form.Label>
                            <OTPInput value={emailOtp} onChange={setEmailOtp} autoFocus OTPLength={6} otpType="number" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone Otp</Form.Label>
                            <OTPInput value={phoneOtp} onChange={setPhoneOtp} autoFocus OTPLength={6} otpType="number" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setVerifyDialog(!showVerifyDialog)}>
                        Close
                    </Button>
                    <Button onClick={addOrganization} variant="primary" type="submit" disabled={loading}>
                        {loading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : <span> Verify</span>}
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </div>
      </div>
  
    )
  };
  
  export default Org;
  
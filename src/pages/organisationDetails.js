import { Button, Col, Container, Row } from "react-bootstrap";
import SignUpLayout from "./layout";
import Multiselect from 'multiselect-react-dropdown';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { sendCreateOrgOtp, getOrganizations } from '../redux/reducers/organizationReducer'
import { toast } from 'react-toastify';
import { setOrgCreateObj, setPlanDetails } from '../redux/reducers/organizationReducer'
import Form from 'react-bootstrap/Form';
import { useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';

function OrganisationDetails() {
    let business = ['business1', 'business2', 'business3'];
    let segment = ['segment1', 'segment2', 'segment3']
    const [headQuarters, setHeadQuarters] = useState('')
    const createUserObj = useSelector((state) => state.organization.createUserObj)
    const plan_details = useSelector((state) => state.organization.plan_details)
    const createOrgObj = useSelector((state) => state.organization.createOrgObj)

    const [selectMonths, setMonths] = useState('3')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [orgCreateObj, setOrgObj] = useState({
        name: "",
        email: "",
        address: "",
        district: "",
        state: "",
        pincode: "",
        language: "",
        contact_no: "",
        domain_name: "",
        segment_type: "",
        time_zone: "",
        business_type: "",
        logo: ""
    })

    useEffect(() => {
        if (createOrgObj.name) {
            setOrgObj(createUserObj)
        }
    }, [])

    const sendOtp = (e) => {
        console.log('afjsdgfjg')
        e.preventDefault();
        setLoading(true)
        let temp = plan_details
        let body = {
            headquarter_location_name: headQuarters,
            orgObj: orgCreateObj
        }
        let otpBody = {
            phone: createUserObj.phone,
            email: createUserObj.email
        }

        if (plan_details.plan_type === 'basic') {
            let temp = {
                plan_type: 'basic',
                subscription_months: selectMonths
            }
            dispatch(setPlanDetails(temp))
        }


        console.log(otpBody)


        dispatch(sendCreateOrgOtp(otpBody)).then((res) => {
            console.log(res)
            if (res.payload.status) {
                toast.success(res.payload.message);
                console.log(body)
                dispatch(setOrgCreateObj(body))
                navigate('/signup/otp')
                setLoading(false)
            } else {
                toast.error(res.payload.message);
                setLoading(false)
            }
        })
    }


    return (
        <SignUpLayout heading="Step 3: Organization Details">
            <Container id="organisation" className="mt-5">
                <Row className="text-center justify-content-center">
                    <h4>What is this Organization about?</h4>
                    <p>Manage better by adding all relevant Organization information</p>

                    <Col lg={4} className="mx-auto">
                        <form onSubmit={(e) => sendOtp(e)}>
                            <Row>
                                <Col>
                                    <input type="text" value={orgCreateObj.name} onChange={(e) => setOrgObj({ ...orgCreateObj, name: e.target.value })} className="form-control" placeholder="Organisation Name*" required></input>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col>
                                    <input type="email" value={orgCreateObj.email} onChange={(e) => setOrgObj({ ...orgCreateObj, email: e.target.value })} className="form-control" placeholder="Organisation Email*" required></input>
                                </Col>

                                <Col>
                                    <input type="text" value={orgCreateObj.contact_no} onChange={(e) => setOrgObj({ ...orgCreateObj, contact_no: e.target.value })} className="form-control" placeholder="Contact no.*" required></input>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col>
                                    <input type="text" value={headQuarters} onChange={(e) => setHeadQuarters(e.target.value)} className="form-control" placeholder="Head-Quaters Location*" required></input>
                                </Col>

                                <Col>
                                    <input type="text" value={orgCreateObj.address} onChange={(e) => setOrgObj({ ...orgCreateObj, address: e.target.value })} className="form-control" placeholder="Organisation Address*" required></input>

                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col>
                                    <input type="text" value={orgCreateObj.district} onChange={(e) => setOrgObj({ ...orgCreateObj, district: e.target.value })} className="form-control" placeholder="District*" required></input>
                                </Col>
                                <Col>
                                    <input type="text" value={orgCreateObj.state} onChange={(e) => setOrgObj({ ...orgCreateObj, state: e.target.value })} className="form-control" placeholder="State*" required></input>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col>
                                    <input type="text" value={orgCreateObj.pincode} onChange={(e) => setOrgObj({ ...orgCreateObj, pincode: e.target.value })} className="form-control" placeholder="Pincode*" required></input>
                                </Col>

                                <Col>
                                    <input type="text" value={orgCreateObj.domain_name} onChange={(e) => setOrgObj({ ...orgCreateObj, domain_name: e.target.value })} className="form-control" placeholder="Domain Name*" required></input>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col lg={6}>
                                    <Multiselect options={business} singleSelect={true} onChange={(e) => setOrgObj({ ...orgCreateObj, business_type: e.target.value })} avoidHighlightFirstOption={true} isObject={false} placeholder="business2"></Multiselect>
                                </Col>

                                <Col lg={6}>
                                    <Multiselect options={segment} singleSelect={true} onChange={(e) => setOrgObj({ ...orgCreateObj, segment_type: e.target.value })} avoidHighlightFirstOption={true} isObject={false} placeholder="Segment Type"></Multiselect>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col lg={6}>
                                    <Multiselect avoidHighlightFirstOption={true} onChange={(e) => setOrgObj({ ...orgCreateObj, time_zone: e.target.value })} singleSelect={true} placeholder="Time Zone"></Multiselect>
                                </Col>

                                <Col lg={6}>
                                    <Multiselect avoidHighlightFirstOption={true} singleSelect={true} placeholder="Select Language"></Multiselect>
                                </Col>
                            </Row>
                            {
                                plan_details.plan_type === 'basic' && <Row className="mt-3">
                                    <Col>
                                        <Form.Select aria-label="Default select example" value={selectMonths} onChange={(e) => { setMonths(e.target.value) }}>
                                            <option value="3" >3</option>
                                            <option value="6">6</option>
                                            <option value="9">9</option>
                                            <option value="12">12</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                            }


                            <Row className="mt-3">
                                <Col className="d-grid">
                                    <Button onClick={() => navigate('/signup/userdetails')}>Previous</Button>
                                </Col>
                                <Col className="d-grid">
                                    <Button variant="primary" type="submit" disabled={loading}>
                                        {loading ? <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        /> : <span> Next </span>}
                                    </Button>
                                </Col>
                            </Row>

                        </form>

                    </Col>
                </Row>
            </Container>
        </SignUpLayout>
    )
}

export default OrganisationDetails;
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SignUpLayout from "./layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { organizationRegistartion } from '../redux/reducers/authReducer'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';

function Otp() {
    const navigate = useNavigate();
    const createOrgObj = useSelector((state) => state.organization.createOrgObj)
    const createUserObj = useSelector((state) => state.organization.createUserObj)
    const plan_details = useSelector((state) => state.organization.plan_details)
    const [phoneotp, setPhoneOtp] = useState()
    const [emailotp, setEmailOtp] = useState()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    console.log(createOrgObj)
    const organizationCreate = (e) => {
        console.log(createOrgObj)
        e.preventDefault();
        setLoading(true)
        let body = {
            organization: createOrgObj.orgObj,
            subscription: plan_details,
            headquarter_location_name: createOrgObj.headquarter_location_name,
            user: createUserObj,
            otps: {
                phoneotp: phoneotp,
                emailotp: emailotp
            }
        }
        dispatch((organizationRegistartion(body))).then((res)=>{
            if (res.payload.status) {
                toast.success(res.payload.message);
                setLoading(false)
                navigate('/')
              } else {
                toast.error(res.payload.message);
                setLoading(false)
              }
        })
    }

    return (

        <SignUpLayout heading="Step 4: OTP">
            <Container className="mt-5">
                <Row className="text-center justify-content-center">
                    <p>Otp sent to Email & mobile no</p>

                    <Col lg={4} className="mx-auto">
                        <form onSubmit={(e) => organizationCreate(e)}>

                            <Card className="border-0 mt-3">
                                <Card.Body>
                                    <input type="text" onChange={(e) => setEmailOtp(e.target.value)} className="form-control" placeholder="Email Otp" required></input>
                                </Card.Body>
                            </Card>

                            <Card className="border-0 mt-3">
                                <Card.Body>
                                    <input type="tel" onChange={(e) => setPhoneOtp(e.target.value)} className="form-control" placeholder="Mobile Otp" required></input>
                                </Card.Body>
                            </Card>

                            <Row className="mt-3">
                                <Col className="d-grid">
                                    <Button onClick={() => navigate('/signup/organisationdetails')}>Previous</Button>
                                </Col>
                                <Col className="d-grid">
                                <Button variant="primary" type="submit" disabled={loading}>
                                        {loading ? <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        /> : <span> Submit </span>}
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

export default Otp;
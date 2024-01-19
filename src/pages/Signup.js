import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SignUpLayout from "./layout";
import './signUp.scss'
import { setPlanDetails } from '../redux/reducers/organizationReducer'
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const setPlanType = (type) => {
        let body = {
            plan_type: type,
            subscription_months: '1'
        }
        dispatch(setPlanDetails(body))
        navigate('/signup/userdetails')
        
    }

    return (
        <>
            <SignUpLayout heading={"Step 1 : Select Plan Type"}>
                <Container id="signupcontent" className="mt-5">
                    <Row className="text-center justify-content-center">
                        <h3 className="mb-4">Select a Plan type</h3>
                        <Col lg={4} className="offset-lg-2">
                            <Card className="text-center mx-auto p-3" style={{ width: '20rem' }}>
                                <Card.Img variant="top" src="../../public/signup/freetrial.svg"  />
                                <Card.Body>
                                    <Card.Title>Free Trail</Card.Title>
                                    <Card.Text>
                                        Some short explanation about the type goes here.
                                    </Card.Text>
                                    <Button color="primary" onClick={() => setPlanType('free')} className="rounded-pill px-5">Continue</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                        <Card className="text-center mx-auto p-3" style={{ width: '20rem' }}>
                                <Card.Img variant="top"  src='../../public/signup/basicplan.svg'/>
                                <Card.Body>
                                    <Card.Title>Basic Plan</Card.Title>
                                    <Card.Text>
                                    Some short explanation about the type goes here.
                                    </Card.Text>
                                    <Button color="primary" onClick={() => setPlanType('basic')} className="rounded-pill px-5">Continue</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                </Container>
            </SignUpLayout>
        </>
    )
}

export default SignUp;
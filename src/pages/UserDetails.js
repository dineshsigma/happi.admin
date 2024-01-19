import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SignUpLayout from "./layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {setUserObj} from '../redux/reducers/organizationReducer'
import CryptoJS  from 'crypto-js'

function UserDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        password: generatePassword(),
        login_type: "email",
    })
    const createUserObj = useSelector((state) => state.organization.createUserObj)
    const plan_details = useSelector((state) => state.organization.plan_details)

    const updateUserDetails = () => {
        dispatch(setUserObj(userDetails))
        navigate('/signup/organisationdetails')
    }
    useEffect(()=>{
        if(createUserObj.name){
            setUserDetails(createUserObj)
        }
    },[])

    function generatePassword() {
        var pass = '';
        const secret = "Y3llY29tbG9naW5lbmNyeXB0aW9u";
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
          'abcdefghijklmnopqrstuvwxyz0123456789@#';
    
        for (let i = 1; i <= 12; i++) {
          var char = Math.floor(Math.random()
            * str.length + 1);
    
          pass += str.charAt(char)
        }
        let password =  CryptoJS.AES.encrypt(pass,secret).toString();
    
        return password;
      }

    return (
        <SignUpLayout heading="Step 2: User details">
            <Container className="mt-5">
                <Row className="text-center justify-content-center">
                    <h4>User Details</h4>
                    <p>Manage better by adding all relevant Personal information</p>

                    <Col lg={4} className="mx-auto">
                        <form onSubmit={() => updateUserDetails() }>
                            <Card className="border-0">
                                <Card.Body>
                                    <Row>
                                        <label className="mb-3">Full Name</label>
                                        <Col>
                                            <input type="text" value={userDetails.name} onChange={(e) => setUserDetails({...userDetails , name: e.target.value})} className="form-control" placeholder="First Name" required></input>
                                        </Col>
                                        <Col>
                                            <input type="text" value={userDetails.lastname} onChange={(e) => setUserDetails({...userDetails , lastname: e.target.value})} className="form-control" placeholder="Last Name" required></input>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            <Card className="border-0 mt-3">
                                <Card.Body>
                                    <input type="email" value={userDetails.email} onChange={(e) => setUserDetails({...userDetails , email: e.target.value})} className="form-control" placeholder="Email*" required></input>
                                </Card.Body>
                            </Card>

                            <Card className="border-0 mt-3">
                                <Card.Body>
                                    <input type="tel" value={userDetails.phone} onChange={(e) => setUserDetails({...userDetails , phone: e.target.value})} className="form-control" placeholder="Phone*" required></input>
                                </Card.Body>
                            </Card>

                            <Card className="border-0 mt-3">
                                <Card.Body>
                                    <Row>
                                        <Col className="d-grid">
                                            <Button onClick={() => navigate('/signup')}>Previous</Button>
                                        </Col>
                                        <Col className="d-grid">
                                            <Button type="submit">Next</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </form>

                    </Col>
                </Row>
            </Container>
        </SignUpLayout>
    )
}

export default UserDetails;
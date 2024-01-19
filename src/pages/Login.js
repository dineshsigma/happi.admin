import React from "react";
import Form from "react-bootstrap/Form";
// import 'boxicons'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
import Frame18 from "../assets/Frame18.png";

import station from "../assets/station.svg";

import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { login, validateUser, otpVerify } from "../redux/reducers/authReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import HappiLogo from "../assets/HappiLogo.png";


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [phoneNo, setPhoneNo] = useState('')
  const [otp, setOtp] = useState('');
  const [otpField, setOtpField] = useState(false);
  const [otpStatus, setOtpStatus] = useState(true);
  const accessFor = useSelector((state) => state.auth.accessFor);
  const [resend, setResend] = useState(false);


  const userLogin = async (event) => {
    event.preventDefault();
    setLoading(true)

    const payload = {
      phone: phoneNo
    }

    dispatch(login(payload)).then((res) => {
      setOtpField(res.payload.status);
      setLoading(false)
    })
  };

  const verifyOTP = async (event) => {
    event.preventDefault();
    setLoading(true)

    const payload = {
      otp: otp
    }
    dispatch(otpVerify(payload)).then((res) => {
      setOtpStatus(res.payload.status)
      setLoading(false)
      // navigate('/')
    })
  };

  function signup() {
    navigate('/signup')
  }
//To resend OTP
  const  resendClicked = async (event) =>{
    setLoading(true)
    const payload = {
      phone: phoneNo
    }
    dispatch(login(payload)).then((res) => {
      setOtpField(res.payload.status);
      setLoading(false)
      setResend(true);
    })
  }

  // console.log('loginUser', loginUser)
  return (

    <div className="login-page login-page2 d-flex align-item-center justify-content-center " style={{ "display": "none" }}>
      <div className="container-fluid">

        <Row className="login-row d-flex align-item-center justify-content-center">
          {/* <Col lg={7} className="login-bg ">
            {" "}
            <div className="login-sliderimg ">

              <img src={station} />
            </div>
          </Col> */}
          <Col lg={5} className="login-col">
            <div className="login-form">
              <div className="login-card border-0 mt-5 mr-3 ml-3">
                <center>
                <img src='https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/045db0e5-67ee-40e2-a7f4-fddbce95468e.png' className="home-logo-image"/>
                </center>
              </div>
              {/* <div className="heading-cye">
                <h1>
                  <span>HAPPI </span>
                </h1>
              </div> */}
              <div className="login-card border-0 mt-5 mr-3 ml-3">
                <center><h1>Sign In</h1></center>
                <Form onSubmit={userLogin} className="login_form_input mt-4">
                  <Form.Group size="lg" controlId="email">
                    <div className="formgroup ">
                      <Form.Label className="form-lalbel-login">Enter Phone</Form.Label>
                      <Form.Control
                        autoFocus
                        type="text"
                        value={phoneNo}
                        onChange={(e) => {
                          setPhoneNo(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </Form.Group>
              
                <div className="formgroup mt-3">
                    {!otpField && <Button variant="primary" type="submit" className="btn-login" disabled={loading}>
                      {loading ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      /> : <span> Login </span>}
                    </Button>}
                  </div>
                </Form>
                <Form onSubmit={verifyOTP} className="login_form_input mt-4">
                  {otpField && <Form.Group size="lg" controlId="email">
                    <div className="formgroup ">
                      <Form.Label className="form-lalbel-login">Enter OTP</Form.Label>
                      <Form.Control
                        autoFocus
                        type="text"
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </Form.Group>}
                  {!otpStatus ? <p className="otp-invalid mt-2">Invalid OTP</p> : <></>}
                  {/* {!accessFor ? <p className="otp-invalid">Unauthorized User</p> : <></>} */}
              
              <div className="formgroup mt-3 mb-2">
                    {otpField && <Button variant="primary" type="submit" className="btn-login" disabled={loading} onClick={verifyOTP}>
                      {loading ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      /> : <span> Verify OTP </span>}
                    </Button>}
                    {/* <h3 className=" float-end signup-link-heading mt-2" size="lg" onClick={signup}> Don't have an account yet <b className="  signup-link ">Click Here</b></h3> */}
                  </div>
                  {otpField ? !resend ? <span className="resend-otp" onClick={(e) => !loading && resendClicked(e)}>Resend OTP</span> : <span>OTP re-sent</span> : <></>}
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* <div className="row">
        <div className="col-6 col-sm-1 col-xs-1"></div>
        <div className="col-6 col-sm-11">
      
          
          
        </div>

      </div>
       <ToastContainer /> */}
      {/* <div className="container-fluid">
        <div className="row d-flex align-items-center justify-content-center h-100vh">
          <div className='col-3 col-md-3'>
            <div className="card p-3 login-card border-0">
                {/* <div className="logo text-center">
                  <i className='bx bxs-cloud'></i>
                </div> */}
      {/* <h1>Sign In</h1> */}
      {/* <div>{accessToken}</div>
                {accessToken!==undefined ? <div>{accessToken}</div>: 'No Data Fount'} */}
      {/* <Form onSubmit={userLogin}> 
                  <Form.Group size="lg" controlId="email">
                    <div className="formgroup">
                      <Form.Label>Email/Username</Form.Label>
                      <Form.Control
                        autoFocus
                        type="text"
                        value={username}
                        onChange={(e)=>{setUsername(e.target.value)}}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group size="lg" controlId="password">
                    <div className="formgroup">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        required={true}
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                      />
                    </div>
                  </Form.Group>

                  <div className="formgroup mt-3">                    
                    <Button className="btn login-btn" size="lg" type="submit">Sign In</Button>
                    <Button className="btn login-btn float-end" size="lg" onClick={signup}>Sign up</Button>
                  </div>
                </Form>

                
                
                {/* <div className="d-flex align-items-center justify-content-between mb-15">
                  <div className="remember form-check d-flex align-items-center">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" for="flexCheckDefault">Remember Me</label>
                  </div>
                  
                  <div className="forgotlink">
                    <a href="#">forgot password</a>
                  </div>
                </div> */}
      {/* </div> 
          </div>
        </div>
      </div> */}
    </div>
  );
}

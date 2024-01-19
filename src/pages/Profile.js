/* eslint-disable jsx-a11y/heading-has-content */
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import Avatar from '../components/Avatar'
import { avatarBrColors } from '../environment'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/reducers/authReducer';
import { getUserOrgByid } from '../redux/reducers/authReducer'
import { getLocations } from '../redux/reducers/locationsReducer'
import { getDepartments } from '../redux/reducers/departmentReducer'
import { getRoles } from '../redux/reducers/rolesReducer'
import { getDesignations } from '../redux/reducers/designationReducers'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
function Profile() {
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.auth.userDetails)
    const userOrgDetails = useSelector((state) => state.auth.userOrgDetails)
    const current_organization = useSelector((state) => state.auth.current_organization)
    const orgList = useSelector((state) => state.organization.organizationsList)

    const locationsList = useSelector((state) => state.location.locationsList)
    const departmentsList = useSelector((state) => state.department.departmentsList)
    const rolesList = useSelector((state) => state.roles.rolesList)
    const designationList = useSelector((state) => state.designation.designationList)
    


    const LocationName = locationsList?.find((item) => item.id === userOrgDetails.location_id)
    const Designation_name = designationList.find((item) => item.id === userOrgDetails.designation_id)
    const Department_name = departmentsList?.find((item) => item.id === userOrgDetails.department_id)
    const orgDetails = orgList?.find((item)=> item.id === current_organization)
    console.log(orgDetails)

    useEffect(() => {
        //console.log('Getting Users+++++++++++++++++++++++++++++', usersList)
        dispatch((getDepartments('')))
        dispatch((getLocations('')))
        dispatch((getRoles('')))
        dispatch((getDesignations('')))
    }, [])

    return (
        <div className='container'>
            <>
                <div className="profile-title text-start">Profile</div>
                {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Tooltip!</Tooltip>}>
      <span className="d-inline-block">
        <Button disabled style={{ pointerEvents: 'none' }}>
          Disabled button
        </Button>
      </span>
    </OverlayTrigger> */}
                {/* {userDetails ? <h2>{userDetails.phone}</h2>:<h2></h2>} */}
                <Row>
                    <Card className='col-12 m-3 profile_card'>
                        <Card.Body>
                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <Row>
                                    <Col sm={3}>
                                        <Card variant="light" className='m-3 no-border-card'>
                                            <Nav variant="pills" className="flex-column profile-pills">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="first">General Info</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="second">Organization</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Card>
                                    </Col>
                                    <Col sm={9}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="first">
                                                <Card className='m-4'>
                                                    <Card.Header>
                                                        <div className='text-center '>
                                                            <h4>General Info</h4>
                                                            <span>Edit your Account's general Information</span>
                                                        </div>
                                                        {/* <div className='row'>
                                                            <div className="col-6 mt-2 text-end">
                                                                <Button variant="outline-secondary" size="md">
                                                                    Go Back
                                                                </Button>{' '}
                                                                <Button variant="primary" size="md">
                                                                    Save Changes
                                                                </Button>
                                                            </div>
                                                        </div> */}
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Form>
                                                            <div className='row'>
                                                                <div className='col-2'></div>
                                                                <div className='col-4'>
                                                                    <Form.Group className="mb-3 mt-3" controlId="formFname">
                                                                        {userDetails ? <Form.Control readOnly type="text" placeholder="First name" value={userDetails.name} /> : <Form.Control readOnly type="text" placeholder="First name" />}
                                                                    </Form.Group>
                                                                </div>
                                                                <div className='col-4'>
                                                                    <Form.Group className="mb-3 mt-3" controlId="formLname">
                                                                        {userDetails ? <Form.Control readOnly type="text" placeholder="Last Name" value={userDetails.lastname} /> : <Form.Control readOnly type="text" placeholder="Last name" />}
                                                                    </Form.Group>
                                                                </div>
                                                                <div className='col-2'></div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-2'></div>
                                                                <div className='col-8'>
                                                                    <Form.Group className="mb-3 mt-3" controlId="formDesignation">
                                                                        {userDetails ? <Form.Control readOnly type="text" placeholder="Last Name" value={userDetails.phone} /> : <Form.Control readOnly type="text" placeholder="Phone" />}
                                                                    </Form.Group>
                                                                </div>
                                                                <div className='col-2'></div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-2'></div>
                                                                <div className='col-8'>
                                                                    <Form.Group className="mb-3 mt-3" controlId="formDesignation">
                                                                        {userDetails ? <Form.Control readOnly type="text" placeholder="Designation" value={userDetails.email} /> : <Form.Control readOnly type="email" placeholder="email" />}
                                                                    </Form.Group>
                                                                </div>
                                                                <div className='col-2'></div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-2'></div>
                                                                <div className='col-8'>
                                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                                        <Form.Control readOnly as="textarea" rows={3} placeholder="About/Bio" />
                                                                    </Form.Group>
                                                                </div>
                                                                <div className='col-2'></div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-2'></div>
                                                                <div className='col-8'>
                                                                    <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
                                                                        <Form.Control readOnly type="text" placeholder="Change Password" />
                                                                    </Form.Group>
                                                                </div>
                                                                <div className='col-2'></div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-2'></div>
                                                                <div className='col-8'>
                                                                    <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
                                                                        <Form.Control readOnly type="text" placeholder="Re-Enter New Password" />
                                                                    </Form.Group>
                                                                </div>
                                                                <div className='col-2'></div>
                                                            </div>

                                                        </Form>
                                                    </Card.Body>
                                                </Card>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <Card className='m-4'>
                                                    <Card.Header>
                                                        <div className='text-center'>
                                                            <h4>Organization Info</h4>
                                                            <span>Edit your Organization's Information</span>
                                                        </div>
                                                        <div className='row'>

                                                            {/* <div className="col-6 mt-2 text-end">
                                                                <Button variant="outline-secondary" size="md">
                                                                    Go Back
                                                                </Button>{' '}
                                                                <Button variant="primary" size="md">
                                                                    Save Changes
                                                                </Button>
                                                            </div> */}
                                                        </div>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Form>
                                                            <div className='row'>
                                                                <div className='col-2'></div>
                                                                <div className='col-8'>
                                                                    <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                                                                    {orgDetails ? <Form.Control type="text" placeholder="Organization name" value={orgDetails.name} readOnly /> : <Form.Control readOnly type="text" placeholder="Organization name" />}
                                                                    </Form.Group>
                                                                </div>
                                                                <div className='col-2'></div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-2'></div>
                                                                <div className='col-8'>
                                                                    <Form.Group className="mb-3 mt-2" controlId="formLocation">
                                                                        {Department_name ? <Form.Control readOnly type="text" placeholder="Location" value={Department_name.name} /> : <Form.Control readOnly type="text" placeholder="Location" />}
                                                                    </Form.Group>
                                                                </div>
                                                                <div className='col-2'></div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-2'></div>
                                                                <div className='col-8'>
                                                                    <Form.Group className="mb-3 mt-3" controlId="formDesignation">
                                                                        {Designation_name ? <Form.Control readOnly type="text" placeholder="Designation" value={Designation_name.name} /> : <Form.Control readOnly type="text" placeholder="Designation" />}
                                                                    </Form.Group>
                                                                </div>
                                                                <div className='col-2'></div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-2'></div>
                                                                <div className='col-8'>
                                                                    <Form.Group className="mb-3 mt-2" controlId="formLocation">
                                                                        {LocationName ? <Form.Control readOnly type="text" placeholder="Location" value={LocationName.name} /> : <Form.Control readOnly type="text" placeholder="Location" />}
                                                                    </Form.Group>
                                                                </div>
                                                                <div className='col-2'></div>
                                                            </div>

                                                        </Form>
                                                    </Card.Body>
                                                </Card>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>

                                </Row>
                            </Tab.Container>
                        </Card.Body>
                    </Card>
                </Row>
            </>
        </div>
    );
}

export default Profile;
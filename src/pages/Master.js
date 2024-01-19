import React from "react";
import { useNavigate } from "react-router-dom";
import {FaNetworkWired,FaSearchLocation,FaUserAlt,FaUnlock,FaUsers,FaUserTie,FaBuilding} from "react-icons/fa";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Master = () => {
  const navigate = useNavigate()
  const gotoDepartments = () => {
    navigate('/Master/departments')
  }
  return (
    <>
   
<section>
  <div className='container'>
    <div className='row justify-content-md-center'>
      <div className='col-md-10 col-10'>
        <div className="card_style"> 
          <a href="#"  onClick = {() => navigate('/master/locations')}>
            <div className="icon"><FaSearchLocation/></div>
            <h6>
              {/* <span>Locations</span> */}
              Locations
            </h6>
          </a> 
          <a href="#"  onClick = {() => navigate('/master/users')}>
            <div className="icon"><FaUserAlt/></div>
            <h6>
              <span>Users</span>
              Users
            </h6>
          </a> 
          <a href="#"  onClick = {() => navigate('/master/departments')}>
            <div className="icon"><FaNetworkWired /></div>
            <h6>
              <span>Departments</span>
              Deapartments
            </h6>
          </a> 
          <a href="#"  onClick = {gotoDepartments}>
            <div className="icon"><FaUnlock/></div>
            <h6>
              <span>Roles</span>
              Roles
            </h6>
          </a> 
          <a href="#"  onClick = {() => navigate('/master/groups')}>
            <div className="icon"><FaUsers/></div>
            <h6>
              <span>Groups</span>
              Groups
            </h6>
          </a> 
          <a href="#"  onClick = {() => navigate('/master/organizations')}>
            <div className="icon"><FaNetworkWired /></div>
            <h6>
              <span>Organizations</span>
              Organizations
            </h6>
          </a> 
          <a href="#"  onClick = {() => navigate('/master/designations')}>
            <div className="icon"><FaBuilding/></div>
            <h6>
              <span>Designations</span>
              Designations
            </h6>
          </a> 
        </div>
      </div> 
    </div> 
  </div>
</section>

    

    

      {/* <div className = "settings-box" onClick = {gotoDepartments}>
         <div className = "icon-wrap">
         <FaNetworkWired />
         </div>
         <span>Organizations</span>
         <h5>Manage Organizations</h5>
      </div> */}

      {/* <Row className="justify-content-md-center">
        <Col xs lg="2">
          1 of 3
        </Col>
        <Col md="auto">Variable width content</Col>
        <Col xs lg="2">
          3 of 3
        </Col>
      </Row> */}
    </>
  )
};

export default Master;

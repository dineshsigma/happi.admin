import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import Avatar from '../components/Avatar'
import { avatarBrColors } from '../environment'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTicketAlt } from "react-icons/fa";


function Help(){
    const navigate = useNavigate();
    const goToTickets = () => {
        // 👇️ navigate to /contacts
        navigate('/tickets');
    };
    return(
        <div className='container'>
        <>
        {/* <div className='row'>
            <div className="profile-title text-start m-3 col-6">Help</div>
            <div className='text-end col-6'><Button variant="primary" size="md">Tickets</Button></div>
        </div> */}
        <div className='row m-4'>
            <div className='text-start mt-2 col-6'>
            <h4>Help</h4>
            </div>
            <div className="col-6 mt-2 text-end">
                <Button variant="primary" size="md" onClick={goToTickets}><FaTicketAlt />  Raised Tickets</Button>
            </div>
        </div>

        <Card className='m-4 no-border-card'>
            <Card.Header>
                <div className="faq-title text-start">FAQs</div> 
            </Card.Header>
            
            <center>
                <Card.Body className='m-4'>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>What is Cyepro?</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>What is Task Management?</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>How to create a Ticket?</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                </Card.Body>  
            </center>
        </Card>
        </>
        </div>
    );
}

export default Help;
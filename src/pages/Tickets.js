import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import Avatar from '../components/Avatar'
import { avatarBrColors } from '../environment'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';
import Accordion from 'react-bootstrap/Accordion';
import { FaEllipsisV, FiPlus, FaCloudUploadAlt, FaCloudDownloadAlt, FaSearch } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import {create_tickets, getAll_tickets,deleteTicket,setButtonLoading } from '../redux/reducers/supportTicketReducer.'



function Tickets(){
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.auth.userDetails)
    const orgId = useSelector((state) => state.auth.current_organization)
    const createTicketResponse =useSelector((state) => state.tickets.createTicketResponse)
    const deleteTicketResponse = useSelector((state) => state.tickets.deleteTicketResponse)
    const allTickets = useSelector((state) => state.tickets.tickets)
    const [AddTicketDialog, setDialog] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false);
    const [deleteId,setDeleteId] = useState();
    const loading = useSelector((state) => state.tickets.buttonLoading)
    const [newTicket,setNewTicket] = useState({title:"",
    type:"",
    comment:"",
    user_id:userDetails.id,
    org_id:orgId
})
 
    const showAddTicket = () => {
        setDialog(!AddTicketDialog)
    }
    
    const getTickets = () => {
        dispatch(getAll_tickets(""))
    }
    useEffect(() => {
    getTickets()
    },[createTicketResponse,deleteTicketResponse])

    const createTickets = async (event) => {
        event.preventDefault();
        dispatch(setButtonLoading(true))
      await  dispatch(create_tickets(newTicket))
      setDialog(!AddTicketDialog)
    }

    const deleteDialog = async (id, event) => {
        event.preventDefault();
        setDeleteId(id)
        setDeleteModal(!deleteModal)
    }
    const Delete_Ticket = async () => {
        //console.log('Deleting Location')
        // dispatch(setLocationButtonLoading(true))
        dispatch(setButtonLoading(true))
         await dispatch(deleteTicket(deleteId))
        // dispatch((getLocations(filterSearch)))
        setDeleteModal(!deleteModal) 
    }
    const redirectToRaisedTickets = (id,e) => {
      e.preventDefault();
      navigate(`/raisedtickets/${id}`)
    }
    return(
        <div className='container'>
        <>
        <div className='row m-4'>
            <div className='text-start mt-2 col-6'>
            <h4>Tickets</h4>
            </div>
            <div className="col-6 mt-2 text-end">
                <Button variant="primary" size="md" onClick={showAddTicket}>
                + Add Ticket
                </Button>
            </div>
        </div>

        <Card className=' no-border-card'>
            <Card.Header>
                <div className="faq-title text-start">Tickets</div> 
            </Card.Header>
            
            <center>
              {allTickets && allTickets.map((ticket,id) => {
                 return (
                    <Card.Body className='' key = {id} onClick = {(event) => {redirectToRaisedTickets(ticket.id,event)}}>
                    <div className='col-md-12'>
                        <div className="card-grid-item  ticket_card">
                            <div className='card-gt-body d-flex align-items-center justify-content-between gap_1rm'>
                                <div className='avatar d-flex align-items-center justify-content-center text-center'>
                                {/* <span>{item.name.substring(0, 2).toUpperCase()}</span> */}
                                </div>
                                <div className='content d-flex align-items-center justify-content-between '>
                                    <h4>
                                        {ticket.title}
                                        {/* <span>Software Engineer</span> */}
                                    </h4>
                                    {/* <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <FaEllipsisV id="dropdown-basic" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={(event) =>deleteDialog(ticket.id,event) }>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    </Card.Body>  
                 )
              })} 
            </center>
        </Card>

        <Modal
        show={AddTicketDialog}
        onHide={() => setDialog(!AddTicketDialog)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3 mt-3" controlId="formTicketTitle">
                <Form.Control type="text" placeholder="Ticket Title"  onChange={(e) => { setNewTicket({ ...newTicket, title: e.target.value }) }} />
            </Form.Group>
            <Form.Select className="mb-3 mt-3" aria-label="Select" onChange={(e) => { setNewTicket({ ...newTicket, type: e.target.value }) }}> 
                <option>Select Type</option>
                <option value="Testing">Testing</option>
                <option value="Testing">Testing</option>
                <option value="Review">Review</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={3} placeholder="Ticket Comments" onChange={(e) => { setNewTicket({ ...newTicket, comment: e.target.value }) }}/>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDialog(!AddTicketDialog)}>
            Close
          </Button>
          <Button variant="primary" onClick = {createTickets} disabled={loading}>{loading ? <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          /> : <span> Add ticket</span>}</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(!deleteModal)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={3}  placeholder="Add Announcement" />
            </Form.Group> */}
          

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() =>  setDeleteModal(!deleteModal)}>
            Close
          </Button>
          <Button variant="primary" onClick={Delete_Ticket} disabled={loading}>{loading ? <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          /> : <span>Delete</span>}</Button>
        </Modal.Footer>
      </Modal>
        </>
        </div>
    )
}

export default Tickets;

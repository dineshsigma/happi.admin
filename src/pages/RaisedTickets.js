import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import Avatar from '../components/Avatar'
import { avatarBrColors } from '../environment'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { FaEllipsisV, FiPlus, FaCloudUploadAlt, FaCloudDownloadAlt, FaSearch } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from "react-router-dom";
import { getAll_ticketsComments_byid, create_Comment } from '../redux/reducers/supportTicketReducer.'
import { getUsers } from "../redux/reducers/userReducer";



function RaisedTickets() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const [AddTicketDialog, setDialog] = useState(false)
    const allTickets = useSelector((state) => state.tickets.tickets)
    const getTicketsByid = useSelector((state) => state.tickets.getTicketsByid)
    const createCommentResponse = useSelector((state) => state.tickets.createCommentResponse)
    const usersList = useSelector((state) => state.users.usersList)
    const [getTicketComment_payload, setGetTicketComment_payload] = useState({ ticket_id: parseInt(id), user_type: "user" })
    const loading = useSelector((state) => state.groups.buttonLoading)



    const [createComment, setCreateComment] = useState({ user_type: "user", comment_type: "text", ticket_id: id });
    const showAddTicket = () => {
        setDialog(!AddTicketDialog)
    }
    useEffect(() => {
        // dispatch(getAll_ticketsComments_byid(getTicketComment_payload))
        dispatch(getUsers(""));
    }, [])



    let ticketDetails = allTickets?.find((ticket) => ticket.id == id)
    let user = usersList.find((usr) => usr.id === ticketDetails?.user_id)

    const submitComment = async () => {
        let payload = createComment;
        payload = { ...payload, user_id: user?.id }
        await dispatch(create_Comment(payload))
        //    setCreateComment({...createComment,comment : ""})
    }
    useEffect(() => {
        dispatch(getAll_ticketsComments_byid(getTicketComment_payload))
    }, [createCommentResponse])
    return (
        <div className='container'>
            <>
                <div className='row m-4'>
                    <div className='text-start mt-2 col-6'>
                        <h4> Raised Tickets</h4>
                    </div>
                    <div className="col-6 mt-2 text-end">
                        {/* <Button variant="primary" size="md" onClick={showAddTicket}> 
                + Add Tick
                </Button>*/}
                    </div>
                </div>

                <Card className='m-4 no-border-card'>
                    <Card.Header>
                        <div className="faq-title text-start">{ticketDetails?.title}</div>
                    </Card.Header>

                    <center>
                        <Card.Body className='m-4'>
                            <div className='col-md-12'>
                              {getTicketsByid && getTicketsByid.map((item) =>{
                                return (
                                    <div className="card-grid-item mb-3 ticket_card">
                                    <div className='card-gt-body d-flex align-items-center justify-content-between gap_1rm'>
                                        <div className='avatar d-flex align-items-center justify-content-center text-center'>
                                            {/* <span>{item.name.substring(0, 2).toUpperCase()}</span> */}
                                        </div>
                                        <div className='content d-flex align-items-center justify-content-between '>
                                            <h4>
                                                {user?.lastname} {user?.name}                         {/* <span>Software Engineer</span> */}
                                            </h4>
                                            {/* <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <FaEllipsisV id="dropdown-basic" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item >Update Ticket</Dropdown.Item>
                                        <Dropdown.Item >Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown> */}
                                        </div>
                                    </div>
                                    <div className='justify-content-between ticket-content p-3'>
                                        <p>{item.comment}</p>
                                        {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> */}

                                    </div>

                                </div>
                                )
                              } )}  
                               
                                <div className="  ticket_card_comments">
                                    <div className='gap_1rm'>

                                        <div className='content d-flex align-items-center justify-content-between '>
                                            <h4 className='your-comments'>
                                                Your Comments                                 </h4>
                                            {/* <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <FaEllipsisV id="dropdown-basic" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item >Update Ticket</Dropdown.Item>
                                        <Dropdown.Item >Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown> */}

                                        </div>

                                    </div>
                                    <div className=' ticket-content p-3'>

                                        <Form.Control as="textarea" onChange={(e) => setCreateComment({ ...createComment, comment: e.target.value })} />
                                        <Button className='mt-3' onClick={() => submitComment()} disabled={loading}>
                                            {loading ? <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            /> : <span> Add Comment</span>}
                                        </Button>
                                    </div>

                                </div>

                            </div>




                        </Card.Body>
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
                            <Form.Control type="text" placeholder="Ticket Title" />
                        </Form.Group>
                        <Form.Select className="mb-3 mt-3" aria-label="Select">
                            <option>Select Type</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3} placeholder="Ticket Comments" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setDialog(!AddTicketDialog)}>
                            Close
                        </Button>
                        <Button variant="primary" disabled={loading}>{loading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : <span> Add ticket</span>}</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    )
}

export default RaisedTickets;

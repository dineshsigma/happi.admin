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
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from 'react-toastify';
import { MdDateRange } from "react-icons/md";
import { createAnnouncement, getAllAnnouncements, deleteAnnouncements, updateAnnouncements, setButtonLoading } from "../redux/reducers/announcementsReducer"


function Announcements() {
  const dispatch = useDispatch()
  const [AddAnnouncementDialog, setDialog] = useState(false)
  const [updateAnnouncementDialog, setUpdateAnnouncementDialog] = useState(false)
  const loading = useSelector((state) => state.announcement.buttonLoading)
  const orgId = useSelector((state) => state.auth.current_organization)
  const allAnnoucements = useSelector((state) => state.announcement.announcements)
  const addAnnounceResponse = useSelector((state) => state.announcement.addAnnounceResponse)
  const deleteResponse = useSelector((state) => state.announcement.deleteResponse)
  const updateResponse = useSelector((state) => state.announcement.updateResponse)
  const [createAnnounce_obj, setCreateAnnounce_obj] = useState({
    description: "",
    start_date: new Date(),
    end_date: new Date(),
    is_active: true,
    image: "",
  })
  const [filter,setFilter] = useState('')

  const [updateAnnouncement, setUpdateAnnouncement] = useState({})

  useEffect(() => {
    dispatch(getAllAnnouncements(filter))
  }, [])

  const showAddAnnouncement = () => {
    setDialog(!AddAnnouncementDialog)
  }


  const addAnnouncement = async () => {
    dispatch(setButtonLoading(true))
    await dispatch(createAnnouncement(createAnnounce_obj))
    setDialog(!AddAnnouncementDialog)
  }
 
  const update = (data) => {
    setUpdateAnnouncement({
      description: data.description, id: data.id, start_date: data.start_date, end_date: data.end_date, is_active: true,
      image: "",
    })
    setUpdateAnnouncementDialog(!updateAnnouncementDialog)
  }

  const update_Announcement = async () => {
    dispatch(setButtonLoading(true))
    await dispatch(updateAnnouncements(updateAnnouncement))
    setUpdateAnnouncementDialog(!updateAnnouncementDialog)
  }

  return (
    <div className='container'>
      <>
        <div className='row m-4'>
          <div className='text-start mt-2 col-6'>
            <h4>Announcements</h4>
          </div>
          <div className="col-6 mt-2 text-end">
            <Button variant="primary" size="md" onClick={showAddAnnouncement}>
              + Add Announcement
            </Button>
          </div>
        </div>

        <Card className='m-4 no-border-card'>
          {/* <Card.Header>
                <div className="faq-title text-start">Announcements</div> 
            </Card.Header> */}

          <center>
            {allAnnoucements && allAnnoucements.map((item, id) => {
              return (
                <Card.Body className='announcements-card mt-4'>
                  <div className='col-md-12'>
                    <div className="card-grid-item mb-3 ticket_card">
                      <div className='card-gt-body d-flex align-items-center justify-content-between gap_1rm'>
                        <div className='avatar d-flex align-items-center justify-content-center text-center'>
                          {/* <span>{item.name.substring(0, 2).toUpperCase()}</span> */}
                        </div>
                        <div className='content d-flex align-items-center justify-content-between '>
                          <h4>
                            {item.description}
                            {/* <span>Software Engineer</span> */}
                          </h4>
                          <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                              <FaEllipsisV id="dropdown-basic" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => update(item)}>Update</Dropdown.Item>
                              <Dropdown.Item onClick={(() => dispatch(deleteAnnouncements(item.id)))}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
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
          show={AddAnnouncementDialog}
          onHide={() => setDialog(!AddAnnouncementDialog)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className='modal-title'>Add a Announcement</Modal.Title>
          </Modal.Header>
          <Modal.Body>


            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" rows={1} placeholder="Add Announcement" onChange={(e) => { setCreateAnnounce_obj({ ...createAnnounce_obj, description: e.target.value }) }} />
            </Form.Group>
            <Form.Control as="textarea" placeholder="Add Announcement Description" rows={3} />
            <Form.Group className="mb-3">
              <Form.Label><MdDateRange /> Start Date</Form.Label>
              <DatePicker className="form-control" selected={new Date(createAnnounce_obj.start_date)} timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                onChange={(date) => setCreateAnnounce_obj({ ...createAnnounce_obj, start_date: new Date(date).toISOString() })}
                showTimeInput />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><MdDateRange /> Due Date</Form.Label>
              <DatePicker className="form-control" selected={new Date(createAnnounce_obj.end_date)} timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                onChange={(date) => setCreateAnnounce_obj({ ...createAnnounce_obj, end_date: new Date(date).toISOString() })}
                showTimeInput />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Default file input example</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setDialog(!AddAnnouncementDialog)}>
              Close
            </Button>
            <Button variant="primary" disabled={loading} onClick={addAnnouncement}>{loading ? <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            /> : <span> Add Announcement</span>}</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={updateAnnouncementDialog}
          onHide={() => setUpdateAnnouncementDialog(!updateAnnouncementDialog)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Announcement</Modal.Title>
          </Modal.Header>
          <Modal.Body>


            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" rows={3} placeholder="Update Announcement" value={updateAnnouncement.description} onChange={(e) => { setUpdateAnnouncement({ ...updateAnnouncement, description: e.target.value }) }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><MdDateRange /> Start Date</Form.Label>
              <DatePicker className="form-control" timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                selected={new Date(updateAnnouncement.start_date)}
                onChange={(date) => setUpdateAnnouncement({ ...updateAnnouncement, start_date: new Date(date).toISOString() })}
                showTimeInput />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><MdDateRange /> Due Date</Form.Label>
              <DatePicker className="form-control" timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                selected={new Date(updateAnnouncement.end_date)}
                onChange={(date) => setUpdateAnnouncement({ ...updateAnnouncement, end_date: new Date(date).toISOString() })}
                showTimeInput />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setUpdateAnnouncementDialog(!updateAnnouncementDialog)}>
              Close
            </Button>
            <Button variant="primary" disabled={loading} onClick={update_Announcement}>{loading ? <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            /> : <span> Update</span>}</Button>
          </Modal.Footer>
        </Modal>


      </>
    </div>
  )
};

export default Announcements;

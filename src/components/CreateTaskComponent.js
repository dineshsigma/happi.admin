import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import { FaPlus, FaMinus ,FaEllipsisV } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations } from '../redux/reducers/locationsReducer'
import { getDepartments } from '../redux/reducers/departmentReducer'
import { getUsers, getExceptUsers, getOrgUsers } from '../redux/reducers/userReducer'
import { getGroups } from '../redux/reducers/groupReducer'
import Avatar from '../components/Avatar'
import { avatarBrColors } from '../environment'
import {setTemplateAddform} from '../redux/reducers/taskReducer'
import { setTaskAddform } from '../redux/reducers/taskReducer'
import { createTask } from "../redux/reducers/taskReducer"
import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { parseString } from 'rrule/dist/esm/parsestring';
import {MdDateRange } from "react-icons/md";

function CreateTaskComponent() {
    const dispatch = useDispatch()
    const [filterSearch, setFilter] = useState('')
    const loading = useSelector((state) => state.groups.buttonLoading)
    const [startDate, setStartDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(new Date());
    const [assignees, setAssignedUsres] = useState([])
    const [userSearch, setUserSearch] = useState('')
    const [individual, setIndividual] = useState(false);
    const [createTask_obj, setCreateTask_obj] = useState({
        name: "",
        description: "",
        assignee_type: "",
        start_date: new Date(),
        due_date: new Date(),
        status: "",
        priority: "",
        task_type: "Live",
        is_active: true,
        create_individualTask: false,
        assignee: []
    })
    const exceptedUsers = useSelector((state) => state.users.exceptedUsers)
    const locationsList = useSelector((state) => state.location.locationsList)
    const departmentsList = useSelector((state) => state.department.departmentsList)
    const usersList = useSelector((state) => state.users.usersList)
    const orgId = useSelector((state) => state.auth.current_organization)
    const userDetails = useSelector((state) => state.auth.userDetails)
    const orgUsersList = useSelector((state) => state.users.orgUsersList)
    const groupsList = useSelector((state) => state.groups.groupsList)
    const showAddform = useSelector((state) => state.tasks.showTask)
    const [showScheduleModel, setScheduleModel] = useState(false)
    const [scheduleDate, setScheduleDate] = useState(new Date())

    useEffect(() => {
        console.log('This is Create task component')
        dispatch((getUsers(filterSearch)))
        dispatch((getDepartments('')))
        dispatch((getLocations('')))
        dispatch(getGroups(''))
        dispatch(getOrgUsers())
        fetchExceptUsers()
    }, [filterSearch, assignees])

    const addAssignee = (item, event) => {
        event.preventDefault();
        console.log(item)
        setAssignedUsres(assigneedUsers => [...assigneedUsers, item])
        //console.log('assigneed users', assignees)
    }

    const fetchAssignees = (id) => {
        let user = usersList.find((user) => user.id === id)
        if (user) {
            console.log('user+++++++', user)
            return (
                <div className="card mb-1 assignees-cards">
                <div className='card-gt-body'>
                        <div className='row mt-2 mb-2'>
                            <div className='col-2'>
                                <Avatar color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]}
                                    initials={user.name.substring(0, 2).toUpperCase()} />
                            </div>
                            <div className='col-8'>
    
                                <h5 id={user}>{user.name} {user.lastname}</h5>
                            </div>
                            <div className='col-2' onClick={(event) => { removeAssignee(user.id, event) }} >
                               <Button className='icon-buttons-minus'><FaMinus /></Button> 
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    }

    const addGroupAssignees = (list, event) => {
        event.preventDefault();
        //console.log('GroupAssignees',list)
        list.map((item) => setAssignedUsres(assigneedUsers => [...assigneedUsers, item]))
    }

    const addDepartmentAssignees = (id, event) => {
        event.preventDefault();
        let usersIds = []
        orgUsersList.map((user) => {
            if (user.department_id === id) {
                usersIds.push(user.id)
            }
        })
        usersIds.map((item) => setAssignedUsres(assigneedUsers => [...assigneedUsers, item]))
    }

    const addLocationAssignees = (id, event) => {
        event.preventDefault();
        let usersIds = []
        orgUsersList.map((user) => {
            if (user.location_id === id) {
                usersIds.push(user.id)
            }
        })
        console.log('usersIds', usersIds)
        usersIds.map((item) => setAssignedUsres(assigneedUsers => [...assigneedUsers, item]))
    }

    const fetchExceptUsers = () => {
        let payload = {
            array: assignees,
            name: userSearch,
        }
        dispatch(getExceptUsers(payload))
    }

    const removeAssignee = (id, event) => {
        event.preventDefault();
        setAssignedUsres((assignees) =>
            assignees.filter((item) => item !== id)
        );
    }

    const createTasks = (type) => {
        console.log('type', type)
        const task_obj = {
            name: createTask_obj.name,
            description: createTask_obj.description,
            assignee_type: "",
            start_date: createTask_obj.start_date,
            due_date: createTask_obj.due_date,
            remainder_interval: 1800000,
            status: createTask_obj.status,
            priority: createTask_obj.priority,
            task_type: type,
            is_active: true,
            assignee:`{${assignees.join(',')}}`,
            create_individualTask : individual,
            org_id: orgId,
            createdby: userDetails.id.toString(),
            checklistprogress:0,
        }

        if(type ==='Schedule'){
            createTask_obj.schedule_time = scheduleDate   
        }

        dispatch(createTask(task_obj))

        
    }

    const createDraftTask = (event) => {
        event.preventDefault()
        createTasks('Draft')
    }

    const createScheduleTask = () => {
        setScheduleModel(!showScheduleModel)
        createTasks('Schedule')
    }

    return (
        <div>
           {/*--------------------------------------------------------showAddform  Modal started  Hear--------------------------------------------*/}

            <Modal
                show={showAddform}
                onHide={() => dispatch(setTaskAddform(!showAddform))}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    
                    <Modal.Title id="example-custom-modal-styling-title">
                        Create Task
                    </Modal.Title>
                    {/* <Button variant="primary" onClick={createTasks} className='modeal-btns'>
                        {loading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : <span > Create Task</span>}
                    </Button>
                    <DropdownButton id="dropdown-basic-button" title="Create Task">
                        <Dropdown.Item onClick={(e) => createTasks('Live')}>Manual Task</Dropdown.Item>

                        <Dropdown.Item onClick={(e) => createDraftTask(e)}>Draft</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setScheduleModel(!showScheduleModel)}>Schedule Task</Dropdown.Item>
                    </DropdownButton> */}
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-12 col-md-12   col-lg-7 col-sm-12'>
      {/*--------------------------------------------------------Form Starts Hear--------------------------------------------*/}
                          
                            <Form onSubmit={createTask}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Task Title</Form.Label>
                                    <Form.Control type="text" onChange={(e) => { setCreateTask_obj({ ...createTask_obj, name: e.target.value }) }} />
                                </Form.Group>

                                <div className='row mb-3'>
                                    <div className='col-6'>
                                        <Form.Select aria-label="Default select example" onChange={(e) => { setCreateTask_obj({ ...createTask_obj, priority: e.target.value }) }}>
                                            <option>Select Priority</option>
                                            <option value="high"> High</option>
                                            <option value="medium"> Medium</option>
                                            <option value="low"> Low</option>
                                        </Form.Select>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Select aria-label="Default select example" onChange={(e) => { setCreateTask_obj({ ...createTask_obj, status: e.target.value }) }}>
                                            <option>Select Status</option>
                                            <option value="open">Open</option>
                                            <option value="in-progress">In-Progress</option>
                                            <option value="in-review">In-Review</option>
                                            <option value="closed">Closed</option>
                                        </Form.Select>
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <div className='col-6'>
                                        {/* <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                            <Form.Control
                                                placeholder="Username"
                                                aria-label="Username"
                                                aria-describedby="basic-addon1"
                                            />
                                        </InputGroup> */}
                                        <Form.Group className="mb-3">
                                            <Form.Label><MdDateRange /> Start Date</Form.Label>
                                            {/* <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} timeInputLabel="Time:"
                                                dateFormat="MM/dd/yyyy h:mm aa"
                                                showTimeInput /> */}
                                            <DatePicker className="form-control" selected={new Date(createTask_obj.start_date)} onChange={(date) => setCreateTask_obj({ ...createTask_obj, start_date: new Date(date).toISOString() })} timeInputLabel="Time:"
                                                dateFormat="MM/dd/yyyy h:mm aa"
                                                showTimeInput />
                                        </Form.Group>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Group className="mb-3">
                                            <Form.Label><MdDateRange /> Due Date</Form.Label>
                                            <DatePicker className="form-control" selected={new Date(createTask_obj.due_date)} onChange={(date) => setCreateTask_obj({ ...createTask_obj, due_date: new Date(date).toISOString() })} timeInputLabel="Time:"
                                                dateFormat="MM/dd/yyyy h:mm aa"
                                                showTimeInput />
                                        </Form.Group>
                                    </div>
                                </div>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Task Description</Form.Label>
                                    <Form.Control as="textarea" rows={4} onChange={(e) => { setCreateTask_obj({ ...createTask_obj, description: e.target.value }) }} />
                                </Form.Group>

                                {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                            </Form.Group>*/}
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Individual" value={individual} onChange={() => setIndividual(!individual)} />
                                </Form.Group>
                            </Form>
       {/*--------------------------------------------------------Form closed Hear--------------------------------------------*/}
                           
                        </div>
       {/*--------------------------------------------------------Assignees Starts Hear--------------------------------------------*/}

                                                
                        <div className='col-12 col-md-12 col-lg-5 col-sm-12'> 
                            <div className='mb-3'>
                                <Card>
                                    <Card.Header>Assignees</Card.Header>
                                    <Card.Body className='assignes-card-body'>
                                        <Tabs
                                            defaultActiveKey="Users"
                                            transition={false}
                                            id="noanim-tab-example"
                                            className="mb-3"
                                        >
    {/*--------------------------------------------------------User  tabs Starts--------------------------------------------*/}
                                           
                                            <Tab eventKey="Users" title="Users" className='hctrl-200'>
                                                {
                                                    exceptedUsers?.length > 0 ?
                                                        exceptedUsers.map((item, key) => {
                                                            return (
                                                                <div className="card mb-1 assignees-cards">
                                                                    <div className='card-gt-body'>
                                                                        <div className='d-flex justify-content-between mt-2 mb-2' id={key}>
                                                                        <div className=' d-flex assignes-name'>
                                                                                <Avatar color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]}
                                                                                    initials={`${item.name.substring(0, 2).toUpperCase()}`} />
                                                                         

                                                                                <h5>{item.name} {item.lastname}</h5>
                                                                            </div>
                                                                            <div className='col-2'>
                                                                            <Button className='icon-buttons-plus'>
                                                                                <FaPlus onClick={(event) => addAssignee(item.id, event)} />
                                                                           
                                                                                </Button> </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* <hr ></hr> */}

                                                                </div>
                                                            );
                                                        })
                                                        : 'No Users Found'
                                                }
                                            </Tab>
    {/*--------------------------------------------------------User tab closed--------------------------------------------*/}
                                           
   {/*--------------------------------------------------------Groups tabs Starts Hear--------------------------------------------*/}
                                            <Tab eventKey="Groups" title="Groups" className='hctrl-200'>
                                                {
                                                    groupsList.length > 0 ?
                                                        groupsList.map((item, key) => {
                                                            return (
                                                                <div className="card mb-3 assignees-cards">
                                                                    <div className='card-gt-body'>
                                                                        <div className='d-flex justify-content-between mt-2 mb-2' id={key}>
                                                                        <div className=' d-flex assignes-name'>
                                                                                <Avatar color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]}
                                                                                    initials={`${item.title.substring(0, 2).toUpperCase()}`} />
                                                                           
                                                                            

                                                                                <h5>{item.title}</h5>
                                                                            </div>
                                                                            <div className='' onClick={(event) => addGroupAssignees(item.group_members, event)} >
                                                                            <Button className='icon-buttons-plus'>
  <FaPlus /></Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                        : 'No Groups  Found'
                                                }
                                            </Tab>
     {/*--------------------------------------------------------Groups tab closed --------------------------------------------*/}
   {/*--------------------------------------------------------Departments tabs Starts Hear--------------------------------------------*/}
                                          
                                            <Tab eventKey="Departments" title="Departments" className='hctrl-200'>
                                                {
                                                    departmentsList.length > 0 ?
                                                        departmentsList.map((item, key) => {
                                                            return (
                                                                <div className="card mb-3 assignees-cards">
                                                                    <div className='card-gt-body'>
                                                                        <div className='d-flex justify-content-between mt-2 mb-2' id={key}>
                                                                        <div className='d-flex assignes-name'>

                                                                                <Avatar color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]}
                                                                                    initials={`${item.name.substring(0, 2).toUpperCase()}`} />
                                                                          

                                                                                <h5>{item.name}</h5>
                                                                            </div>
                                                                            <div className='' onClick={(event) => addDepartmentAssignees(item.id, event)} >
                                                                            <Button className='icon-buttons-plus'>
 <FaPlus /></Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                        : 'No Departments  Found'
                                                }
                                            </Tab>
       {/*--------------------------------------------------------Departments tabs Closed--------------------------------------------*/}
   {/*--------------------------------------------------------Locations tabs Starts Hear--------------------------------------------*/}
                                        
                                            <Tab eventKey="Locations" title="Locations" className='hctrl-200'>
                                                {
                                                    locationsList.length > 0 ?
                                                        locationsList.map((item, key) => {
                                                            return (
                                                                <div className="card assignees-cards mb-3">
                                                                    <div className='card-gt-body '>
                                                                    <div className='d-flex justify-content-between mt-2 mb-2' id={key}>
                                                                        <div className='d-flex assignes-name'>
                                                                       
                                                                                <Avatar color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]}
                                                                                    initials={`${item.name.substring(0, 2).toUpperCase()}`} />
                                                                            
                                                                            

                                                                                <h5>{item.name}</h5>
                                                                            </div>
                                                                            <div className='' onClick={(event) => addLocationAssignees(item.id, event)}>
                                                                            <Button className='icon-buttons-plus'>
  <FaPlus /></Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                        : 'No Locations  Found'
                                                }
                                            </Tab>
  {/*--------------------------------------------------------Locations tabs closed Hear--------------------------------------------*/}

                                        </Tabs>
                                    </Card.Body>
                                </Card>

                            </div>
      {/*--------------------------------------------------------Assigned Users Starts Hear--------------------------------------------*/}
                         
                            <div className='mb-3'>
                                <Card>
                                    <Card.Header>Assigneed Users</Card.Header>
                                    <Card.Body className='hctrl-300'>
                                        {
                                            assignees.length > 0 ?
                                                assignees.map((item, key) => {
                                                    return (
                                                        <div id={key}>
                                                            {fetchAssignees(item)}
                                                        </div>
                                                    )
                                                })
                                                : 'No Assignees'
                                        }
                                    </Card.Body>
                                </Card>
                            </div>
        {/*--------------------------------------------------------Assigned Users closed Hear--------------------------------------------*/}
                          
                        </div>
          {/*--------------------------------------------------------Assignees Closed  Hear--------------------------------------------*/}
                     
                    </div>
                </Modal.Body>
                <Modal.Footer>
             
                    
                    <DropdownButton id="dropdown-basic-button" title="Create Template" >
       
                        <Dropdown.Item onClick={(e) => createTasks('Live')}>Manual Task</Dropdown.Item>

                        <Dropdown.Item onClick={(e) => createDraftTask(e)}>Draft</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setScheduleModel(!showScheduleModel)}>Schedule Task</Dropdown.Item>
                    </DropdownButton>
                    <Button variant="primary" onClick={createTasks} disabled={loading} className='modal-btns'>
                        {loading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : <span > Create Task</span>}
                    </Button>
                </Modal.Footer>

            </Modal>
          {/*-------------------------------------------------------- showAddform Modal Closed  Hear--------------------------------------------*/}

            <Modal show={showScheduleModel} onHide={()=>setScheduleModel(!showScheduleModel)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Schedule Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Schedule Date</Form.Label>
                        <DatePicker className="form-control" selected={scheduleDate} onChange={(date) => setScheduleDate(date)} timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeInput />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setScheduleModel(!showScheduleModel)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>setScheduleModel(!showScheduleModel)}>
                        Save Changes
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default CreateTaskComponent
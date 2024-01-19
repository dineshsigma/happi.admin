import { ToastContainer } from 'react-toastify';
import { FaRegFlag, FaFlag, FaEllipsisV, FaFilter } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import Avatar from '../components/Avatar'
import { avatarBrColors } from '../environment'
import { getLocations } from '../redux/reducers/locationsReducer'
import { getDepartments } from '../redux/reducers/departmentReducer'
import { getUsers, getOrgUsers } from '../redux/reducers/userReducer'
import { getGroups } from '../redux/reducers/groupReducer'
import Badge from 'react-bootstrap/Badge';
import { setTaskAddform, getAll_tasks, deleteTask, setButtonLoading } from '../redux/reducers/taskReducer'
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import moment from 'moment'
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { BsFlagFill } from "react-icons/bs";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from 'react-router-dom';
import {MdDateRange } from "react-icons/md";


function Taskslist() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [filterSearch, setFilter] = useState('')
    const [dueData, setDuedate] = useState()
    const [priority, setPriority] = useState('low')
    const [status, setStatus] = useState('in-progress')
    const showAddform = useSelector((state) => state.tasks.showTask)
    const loading = useSelector((state) => state.tasks.buttonLoading)
    const usersList = useSelector((state) => state.users.usersList)
    const deleteResponse = useSelector((state) => state.tasks.deleteTaskResponse)
    const tasks = useSelector((state) => state.tasks.tasks)
    const [showFilters, setShowFilter] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const statusList = [{ value: 'open', label: 'Open' }, { value: 'in-progress', label: 'In-Progress' }, { value: 'in-review', label: 'In-Review' }, { value: 'closed', label: 'Closed' }]

    const fetchCommentAvatar = (id) => {
        if (usersList && usersList.length > 0) {
          let user = usersList.find((item) => item.id === id)
          if(user){
            return  <Avatar className="avatar-img" color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]} initials={user.name.substring(0, 2).toUpperCase()} />
          }
    
      }
    }
    useEffect(() => {
        dispatch((getUsers(filterSearch)))
        dispatch((getDepartments('')))
        dispatch((getLocations('')))
        dispatch(getGroups(''))
        dispatch(getOrgUsers())
    }, [filterSearch, status])


    const updateStatus = (status, event) => {
        event.preventDefault();
        setStatus(status)
    }

    const get_tasks = () => {
        dispatch(getAll_tasks(filterSearch))
    }

    useEffect(() => {
        get_tasks();
    }, [filterSearch, deleteResponse])

    const deleteDialog = async (id, event) => {
        event.preventDefault();
        //console.log('Delete Location', id)
        setDeleteId(id)
        setDeleteModal(!deleteModal)
    }

    const Delete_Task = async () => {
        //console.log('Deleting Location')
        dispatch(setButtonLoading(true))
        await dispatch(deleteTask(deleteId))
        setDeleteModal(!deleteModal)


    }

    return (
        <div>


            <section className='mb-2 mt-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <div className='aside_left'>
                                <form className="form-inline d-flex">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setFilter(e.target.value) }} />
                                </form>
                            </div>
                        </div>

                        <div className='col-md-9'>
                            <div className='aside_left d-flex align-items-center justify-content-end gap_05rm'>
                                <Button variant="primary" className="filter-btn" onClick={() => setShowFilter(!showFilters)}><FaFilter /></Button>
                                <button type="button" className="btn btn-primary" onClick={() => dispatch(setTaskAddform(!showAddform))}>Add Task</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {showFilters && <section className='mb-5 mt-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <div className='aside_left'>
                                <p>Select Stauts</p>
                                <Select
                                    isMulti
                                    name="colors"
                                    options={statusList}
                                    className="basic-multi-select"
                                    classNamePrefix="select Status"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>}

            <section className='mb-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='aside_left'>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Priority</th>
                                            <th>Task Name</th>
                                            <th>Assignees</th>
                                            <th>Due Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks && tasks.length > 0 && tasks.map((task, id) => {

                                            return (
                                                <tr className='card-table' key = {id}>
                                                         <td>
                                                        <div>
                                                            {task.priority === 'high' && <h5> <Badge bg="light" text="dark"><BsFlagFill color='red' /></Badge></h5>}
                                                            {task.priority === 'medium' && <h5> <Badge bg="light" text="dark"><BsFlagFill color='orange' /></Badge></h5>}
                                                            {task.priority === 'low' && <h5> <Badge bg="light" text="dark"><BsFlagFill color='green' /></Badge></h5>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                    <OverlayTrigger overlay={<Tooltip id="tooltip-task-name"> {task.name}</Tooltip>}>
                                                    <p className='tn '>{task.name}</p>
    </OverlayTrigger> 
    </td>
                                                     
                                                    <td><div className='tn_assignees'>
                                                        {task.assignee.map((data) => {
                                                            return (
                                                                fetchCommentAvatar(data)
                                                            )
                                                            //     return (

                                                            //        <Avatar color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]} initials='SP' />
                                                            //    )  
                                                        })}
                                                    </div>
                                                    </td>
                                                    <td>
                                                        <div className='tn'>
                                                            {
                                                                moment(new Date(task.due_date), "YYYYMMDD").fromNow()

                                                                // dueData ? '2 Days ago' :
                                                                //     <div>
                                                                //         <input type='date' />
                                                                //         {/* <Dropdown>
                                                                //             <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                //                 <FaCalendarCheck />
                                                                //             </Dropdown.Toggle>

                                                                //             <Dropdown.Menu>

                                                                //             </Dropdown.Menu>
                                                                //         </Dropdown> */}
                                                                //     </div>

                                                            }
                                                        </div>
                                                    </td>
                                               
                                                    <td >
                                                        {task.status === 'open' && <h5><Badge className='status-badges'  pill bg="success">&nbsp;&nbsp;Open&nbsp;&nbsp;</Badge></h5>}
                                                        {task.status === 'in-progress' && <h5> <Badge  className='status-badges' pill bg="info">In-Progress</Badge></h5>}
                                                        {task.status === 'in-review' && <h5> <Badge className='status-badges'  pill bg="warning">In-Review</Badge></h5>}
                                                        {task.status === 'closed' && <h5> <Badge className='status-badges' pill bg="danger">Closed</Badge></h5>}
                                                    </td>
                                                    <td>
                                                        <Dropdown >
                                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                <FaEllipsisV id="dropdown-basic" />
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={(event) => navigate(`/taskdetails/${task.id}`)} >View</Dropdown.Item>
                                                                <Dropdown.Item onClick={(event) => deleteDialog(task.id, event)}>Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Modal
                show={deleteModal}
                onHide={() => setDeleteModal(!deleteModal)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    task will be Deleted Permanently
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDeleteModal(!deleteModal)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={Delete_Task} disabled={loading} >{loading ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> : <span> Delete</span>}</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Taskslist;
import { ToastContainer } from 'react-toastify';
import { FaPlus, FaMinus, FaEllipsisV } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import NoDataFound from '../assets/No_Data_File.png'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Avatar from '../components/Avatar'
import { avatarBrColors } from '../environment'
import { setGroupAddform, setGroupButtonLoading, createGroup, getGroups, deleteGroup, setGroupUpdateForm, updateGroup } from '../redux/reducers/groupReducer'
import { getUsers, getExceptUsers } from '../redux/reducers/userReducer'
import AvatarStack from '../components/AvatarStack'

function Groups() {
    const dispatch = useDispatch()
    const orgId = useSelector((state) => state.auth.current_organization)
    const userId = useSelector((state) => state.auth.user_id)
    const [filterSearch, setFilter] = useState('')
    const addGroupForm = useSelector((state) => state.groups.showAddForm)
    const editGroupForm = useSelector((state) => state.groups.showUpdateForm)
    const exceptedUsers = useSelector((state) => state.users.exceptedUsers)
    const usersList = useSelector((state) => state.users.usersList)
    const groupsList = useSelector((state) => state.groups.groupsList)
    const [userSearch, setUserSearch] = useState('')
    const [assigneedUsers, setAssignees] = useState([])
    const [groupName, setGroupName] = useState('')
    const [description, setDescription] = useState('')
    const loading = useSelector((state) => state.groups.buttonLoading)
    const [groupId, setGroupId] = useState('')
    const [showDeleteDialog, setDialog] = useState(false)
    const [groupDetails, setGroupDetails] = useState({})


    useEffect(() => {
        fetchExceptUsers()
        dispatch(getUsers(''))
        dispatch(getGroups(filterSearch))
    }, [filterSearch, assigneedUsers])

    const fetchExceptUsers = () => {
        //console.log('assigneed users', assigneedUsers)
        let userIds = []
        if (assigneedUsers.length > 0) {
            assigneedUsers.map((item) => {
                userIds.push(item.id)
            })
        }
        let payload = {
            array: userIds,
            name: userSearch,
        }
        dispatch(getExceptUsers(payload))
    }

    const addAssignee = (item, event) => {
        event.preventDefault();
        setAssignees(assigneedUsers => [...assigneedUsers, item])
        //console.log('assigneed users', assigneedUsers)
    }

    const removeAssignee = (id, event) => {
        event.preventDefault();
        setAssignees((assigneedUsers) =>
            assigneedUsers.filter((item) => item.id !== id)
        );
    }

    const addGroup = (event) => {
        dispatch(setGroupButtonLoading(!loading))
        let userIds = []
        if (assigneedUsers.length > 0) {
            assigneedUsers.map((item) => {
                userIds.push(item.id)
            })
        }
        let payload = {
            title: groupName,
            description: description,
            group_members: userIds,
            org_id: orgId,
            created_by: userId

        }
        event.preventDefault();
        //console.log('group created', payload)
        dispatch(createGroup(payload)).then(() => {
            dispatch(getGroups(filterSearch))
        })
    }

    const deleteDialog = async (id, event) => {
        event.preventDefault();
        setGroupId(id)
        setDialog(!showDeleteDialog)
    }

    const groupDelete = async () => {
        dispatch(setGroupButtonLoading(true))
        await dispatch(deleteGroup(groupId))
        dispatch((getGroups(filterSearch)))
        setDialog(!showDeleteDialog)
    }

    const editDialog = async (group, event) => {
        //console.log('list.group_members', group.group_members)
        event.preventDefault();
        let team = []
        for (let i = 0; i < group.group_members.length; i++) {
            let user = usersList.find((item) => item.id === group.group_members[i])
            team.push(user)
        }
        //console.log('assigneed users', team)

        fetchExceptUsers()
        setGroupDetails(group)
        dispatch(setGroupUpdateForm(!editGroupForm))
        //console.log('Group Details', groupDetails)
        setAssignees(team)
    }

    const openAddGroupDialog = (event) => {
        event.preventDefault();
        dispatch(setGroupAddform(!addGroupForm))
        setAssignees([])
    }

    const groupUpdate = (event) => {
        // dispatch(setGroupButtonLoading(!loading))
        let userIds = []
        if (assigneedUsers.length > 0) {
            assigneedUsers.map((item) => {
                userIds.push(item.id)
            })
        }

        setGroupDetails({ ...groupDetails, group_members: userIds })
        event.preventDefault();
        dispatch(updateGroup(groupDetails)).then(() => {
            dispatch(getGroups(filterSearch))
        })
    }

    const fetchUser = (id) => {
        //console.log('Hello fetch user+++++++++++++++++++++++++++++++++++++++++++')
        let user = usersList.find((user) => user.id === id)
        //console.log('user+++++++++++++++++++++++++++', user)
        return (
            <div className="card mb-3">
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
                            <FaMinus />
                        </div>
                    </div>

                </div>
            </div>
        );
    }


    return (
        <div>
            <section>
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
                                <button type="button" className="btn btn-primary" onClick={(event) => openAddGroupDialog(event)}>Create Groups</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='mt-5'>
                <div className='container'>
                    <div className='row'>
                        {
                            groupsList.length > 0 ?
                                groupsList.map((item) => {
                                    return (
                                        <div className='col-md-4'>
                                            <div className="card-grid-item mb-3">
                                                <div className='card-gt-body d-flex align-items-center justify-content-between gap_1rm'>
                                                    <div className='avatar d-flex align-items-center justify-content-center text-center'>
                                                        <span>{item.title.substring(0, 2).toUpperCase()}</span>
                                                    </div>
                                                    <div className='content d-flex align-items-center justify-content-between '>
                                                        <h4>
                                                            {item.title}
                                                            {/* <span>Software Engineer</span> */}
                                                        </h4>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                <FaEllipsisV id="dropdown-basic" />
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={(event) => editDialog(item, event)} >Edit</Dropdown.Item>
                                                                <Dropdown.Item onClick={(event) => deleteDialog(item.id, event)}>Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                : <div className='col-md-12 center text-center'>
                                    <img src={NoDataFound} height='500px' />
                                </div>
                        }
                    </div>

                </div>
            </section>

            <Modal
                show={addGroupForm}
                onHide={() => dispatch(setGroupAddform(!addGroupForm))}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                centered
                backdrop="static"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Create Group
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-7'>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Group Name</Form.Label>
                                    <Form.Control type="text" onChange={(e) => { setGroupName(e.target.value) }} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Group Description</Form.Label>
                                    <Form.Control as="textarea" rows={2} onChange={(e) => { setDescription(e.target.value) }} />
                                </Form.Group>
                            </Form>
                        </div>
                        <div className='col-5'>

                            <Card className='mb-3'>
                                <Card.Header>Assignees</Card.Header>
                                <Card.Body className='hctrl-300'>
                                    {
                                        exceptedUsers.length > 0 ?
                                            exceptedUsers.map((item, key) => {
                                                return (
                                                    <div className="card mb-3">
                                                        <div className='card-gt-body'>
                                                            <div className='row mt-2 mb-2'>
                                                                <div className='col-2'>
                                                                    <Avatar color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]}
                                                                        initials={`${item.name.substring(0, 2).toUpperCase()}`} />
                                                                </div>
                                                                <div className='col-8'>

                                                                    <h5 id={key}>{item.name} {item.lastname}</h5>
                                                                </div>
                                                                <div className='col-2' onClick={(event) => { addAssignee(item, event) }} >
                                                                    <FaPlus />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                            : 'No Users Found'
                                    }
                                </Card.Body>
                            </Card>

                            <div className='mb-3'>
                                <Card>
                                    <Card.Header>Assigneed Users</Card.Header>
                                    <Card.Body className='hctrl-300'>
                                        {
                                            assigneedUsers.length > 0 ?
                                                assigneedUsers.map((item, key) => {
                                                    return (
                                                        <div> {fetchUser(item.id)} </div>
                                                    )
                                                })
                                                : 'No Assignees'
                                        }
                                    </Card.Body>

                                </Card>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" disabled={loading}>
                        {loading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : <span onClick={addGroup}> Create</span>}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={editGroupForm}
                onHide={() => dispatch(setGroupUpdateForm(!editGroupForm))}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                centered
                backdrop="static"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Update Group
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-7'>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Group Name</Form.Label>
                                    <Form.Control type="text" onChange={(e) => { setGroupDetails({ ...groupDetails, title: e.target.value }) }} value={groupDetails.title} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Group Description</Form.Label>
                                    <Form.Control as="textarea" rows={2} onChange={(e) => { setGroupDetails({ ...groupDetails, description: e.target.value }) }} value={groupDetails.description} />
                                </Form.Group>
                            </Form>
                        </div>
                        <div className='col-5'>

                            <Card className='mb-3'>
                                <Card.Header>Assignees</Card.Header>
                                <Card.Body className='hctrl-300'>
                                    {
                                        exceptedUsers.length > 0 ?
                                            exceptedUsers.map((item, key) => {
                                                return (
                                                    <div className="card mb-3">
                                                        <div className='card-gt-body'>
                                                            <div className='row mt-2 mb-2'>
                                                                <div className='col-2'>
                                                                    <Avatar color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]}
                                                                        initials={`${item.name.substring(0, 2).toUpperCase()}`} />
                                                                </div>
                                                                <div className='col-8'>

                                                                    <h5 id={key}>{item.name}</h5>
                                                                </div>
                                                                <div className='col-2' onClick={(event) => { addAssignee(item, event) }} >
                                                                    <FaPlus />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                            : 'No Users Found'
                                    }
                                </Card.Body>
                            </Card>

                            <div className='mb-3'>
                                <Card>
                                    <Card.Header>Assigneed Users</Card.Header>
                                    <Card.Body className='hctrl-300'>
                                        {
                                            assigneedUsers.length > 0 ?
                                                assigneedUsers.map((item, key) => {
                                                    return (
                                                        <div className="card mb-3">
                                                            <div className='card-gt-body'>
                                                                <div className='row mt-2 mb-2'>
                                                                    <div className='col-2'>
                                                                        <Avatar color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]}
                                                                            initials={item.name.substring(0, 2).toUpperCase()} />
                                                                    </div>
                                                                    <div className='col-8'>

                                                                        <h5 id={key}>{item.name} {item.lastname}</h5>
                                                                    </div>
                                                                    <div className='col-2' onClick={(event) => { removeAssignee(item.id, event) }} >
                                                                        <FaMinus />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                                : 'No Assignees'
                                        }
                                    </Card.Body>

                                </Card>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" disabled={loading}>
                        {loading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : <span onClick={groupUpdate}> Update</span>}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showDeleteDialog}
                onHide={() => setDialog(!showDeleteDialog)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Items will be Deleted Permanently
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDialog(!showDeleteDialog)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={groupDelete} >{loading ? <Spinner
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

export default Groups;
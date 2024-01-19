import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import { FaPlus, FaMinus } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations } from '../redux/reducers/locationsReducer'
import { getDepartments } from '../redux/reducers/departmentReducer'
import { getUsers, getExceptUsers, getOrgUsers } from '../redux/reducers/userReducer'
import { getGroups } from '../redux/reducers/groupReducer'
import Avatar from '../components/Avatar'
import { avatarBrColors } from '../environment'
import { setTemplateAddform, createReccurssiveTask } from '../redux/reducers/taskReducer'
import { RRule, RRuleSet, rrulestr } from 'rrule'
import Select from 'react-select';
import { MultiSelect } from "react-multi-select-component";
import ms from 'ms'
import {MdDateRange } from "react-icons/md";


function CreateTemplateTask() {
    const dispatch = useDispatch()
    const [filterSearch, setFilter] = useState('')
    const loading = useSelector((state) => state.groups.buttonLoading)
    const [startDate, setStartDate] = useState(new Date());
    const [untilDate, setUntilDate] = useState(new Date());
    const [assignees, setAssignedUsres] = useState([])
    const [userSearch, setUserSearch] = useState('')
    const exceptedUsers = useSelector((state) => state.users.exceptedUsers)
    const orgId = useSelector((state) => state.auth.current_organization)
    const locationsList = useSelector((state) => state.location.locationsList)
    const departmentsList = useSelector((state) => state.department.departmentsList)
    const usersList = useSelector((state) => state.users.usersList)
    const orgUsersList = useSelector((state) => state.users.orgUsersList)
    const groupsList = useSelector((state) => state.groups.groupsList)
    const showAddform = useSelector((state) => state.tasks.showTemplateForm)
    const [taskDesc, setTaskDesc] = useState('')
    const [taskName, setTaskName] = useState('')
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState('')
    const [frequency, setfrequency] = useState()
    const [weekStart, setWeekStart] = useState('')
    const [weekDays, setWeekDays] = useState([])
    const [monthDays, setMonthDays] = useState([])

    const weekDayOptions = [
        {
            value: `${RRule.SU}`,
            label: 'Sun',
        },
        {
            value: `${RRule.MO}`,
            label: 'Mon',
        },
        {
            value: `${RRule.TU}`,
            label: 'Tue',
        },
        {
            value: `${RRule.WE}`,
            label: 'Wed',
        },
        {
            value: `${RRule.TH}`,
            label: 'Thu',
        },
        {
            value: `${RRule.FR}`,
            label: 'Fri',
        },
        {
            value: `${RRule.SA}`,
            label: 'Sat',
        },
    ]
    const byMonthOptions = [
        {
            value: 1,
            label: 'Jan',
        },
        {
            value: 2,
            label: 'Feb',
        },
        {
            value: 3,
            label: 'Mar',
        },
        {
            value: 4,
            label: 'Apr',
        },
        {
            value: 5,
            label: 'May',
        },
        {
            value: 6,
            label: 'Jun',
        },
        {
            value: 7,
            label: 'Jul',
        },
        {
            value: 8,
            label: 'Aug',
        },
        {
            value: 9,
            label: 'Sep',
        },
        {
            value: 10,
            label: 'Oct',
        },
        {
            value: 11,
            label: 'Nov',
        },
        {
            value: 12,
            label: 'Dec',
        },
    ]



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
        setAssignedUsres(assigneedUsers => [...assigneedUsers, item])
        //console.log('assigneed users', assignees)
    }

    const addfrequency = (event) => {
        console.log('event', event)
        let list = []
        if (event.length > 0) {
            event.map((item) =>
                list.push(item.value)
            )
        }
        setWeekDays(weekDays => [...weekDays, list])
        console.log('weekDays', weekDays)
    }

    const fetchAssignees = (id) => {
        let user = usersList.find((user) => user.id === id)
        if (user) {
            console.log('user+++++++', user)
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

    const generateRule = () => {
        const weekDaysId = []
        const months = []
        weekDays.map((item) => weekDaysId.push(item.value))
        monthDays.map((item) => months.push(item.value))

        const rule = new RRule({
            freq: frequency,
            dtstart: startDate,
            until: untilDate,
            count: 30,
            byweekday: weekDaysId,
            bymonth: months
        })
        return rule
    }
    const createTask = (e) => {
        e.preventDefault()
        var rule = generateRule()
        var rule_text = rule.toText();
        var ruleSet = rule.all();
        var rruleString = rule.toString();
        let payload_data = {
            name: taskName,
            description: taskDesc,
            assignee_type: '',
            start_date: startDate,
            untill_date: untilDate,
            status: status,
            priority: priority,
            next_trigger_time: ruleSet[0],
            rule_text: rule_text,
            task_type: 'reccurssive',
            locations: `{}`,
            rule_set: `{${ruleSet.join(',')}}`,
            is_active: true,
            due_date_duration: ms('2d'),
            remainder_interval: 1800000,// shuld do dynamic
            assignee: `{${assignees.join(',')}}`,
            next_notification: ruleSet[0],
            is_delete: false,
            org_id: orgId,
            recurring_rule : rruleString
        }

        console.log(payload_data)
        dispatch(createReccurssiveTask(payload_data))

    }


    return (
        <div>
            <Modal
                show={showAddform}
                onHide={() => dispatch(setTemplateAddform(!showAddform))}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Create Template
                    </Modal.Title>
                    <Button variant="primary" disabled={loading} onClick={(e) => createTask(e)}>
                        {loading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : <span> Create Task</span>}
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-12 col-md-8'>
                            <Form>
                                {/* <Form.Group className="mb-1">
                                    <Form.Label>Template Name</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setTemplateName(e.target.value)} />
                                </Form.Group> */}
                                <Form.Group className="mb-2">
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control onChange={(e) => setTaskName(e.target.value)} type="text" />
                                </Form.Group>

                                <div className='row mb-2'>
                                    <div className='col-6'>
                                        <Form.Select onChange={(e) => { setPriority(e.target.value) }} aria-label="Default select example">
                                            <option>Select Priority</option>
                                            <option value="high"> High</option>
                                            <option value="medium"> Medium</option>
                                            <option value="low"> Low</option>
                                        </Form.Select>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Select onChange={(e) => { setStatus(e.target.value) }} aria-label="Default select example">
                                            <option>Select Status</option>
                                            <option value="open">Open</option>
                                            <option value="in-progress">In-Progress</option>
                                            <option value="in-review">In-Review</option>
                                            <option value="closed">Closed</option>
                                        </Form.Select>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <Form.Group className="mb-1">
                                        <Form.Label>Frequency</Form.Label>
                                        <div>
                                            <Form.Check
                                                onChange={(e) => { setfrequency(RRule.YEARLY) }}
                                                inline
                                                label="Yearly"
                                                name="frequency"
                                                type='radio'
                                                value='0'
                                            />
                                            <Form.Check
                                                onChange={(e) => { setfrequency(RRule.MONTHLY) }}
                                                inline
                                                label="Montly"
                                                name="frequency"
                                                type='radio'
                                                value='1'
                                            />
                                            <Form.Check
                                                onChange={(e) => { setfrequency(RRule.WEEKLY) }}
                                                inline
                                                label="Weekly"
                                                name="frequency"
                                                type='radio'
                                                value='2'
                                            />
                                            <Form.Check
                                                onChange={(e) => { setfrequency(RRule.DAILY) }}
                                                inline
                                                label="Daily"
                                                name="frequency"
                                                type='radio'
                                                value='3'
                                            />
                                        </div>

                                    </Form.Group>
                                </div>

                                <div className='row mb-2'>
                                    <div className='col-6'>
                                        <Form.Group className="mb-3">
                                            <Form.Label><MdDateRange /> Start Date</Form.Label>
                                            <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} timeInputLabel="Time:"
                                                dateFormat="MM/dd/yyyy h:mm aa"
                                                showTimeInput />
                                        </Form.Group>
                                    </div>
                                    <div className='col-6'>
                                        <Form.Group className="mb-3">
                                            <Form.Label><MdDateRange /> Until Date</Form.Label>
                                            <DatePicker className="form-control" selected={untilDate} onChange={(date) => setUntilDate(date)} timeInputLabel="Time:"
                                                dateFormat="MM/dd/yyyy h:mm aa"
                                                showTimeInput />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <Form.Group className="mb-1">
                                        <Form.Label>Week Start</Form.Label>
                                        <div>
                                            <Form.Check
                                                onChange={(e) => { setWeekStart(e.target.value) }}
                                                inline
                                                label="Monday"
                                                name="weekStart"
                                                type='radio'
                                                value='0'
                                            />
                                            <Form.Check
                                                onChange={(e) => { setWeekStart(e.target.value) }}
                                                inline
                                                label="Tuesday"
                                                name="weekStart"
                                                type='radio'
                                                value='1'
                                            />
                                            <Form.Check
                                                onChange={(e) => { setWeekStart(e.target.value) }}
                                                inline
                                                label="Wednesday"
                                                name="weekStart"
                                                type='radio'
                                                value='2'
                                            />
                                            <Form.Check
                                                onChange={(e) => { setWeekStart(e.target.value) }}
                                                inline
                                                label="Thrusday"
                                                name="weekStart"
                                                type='radio'
                                                value='3'
                                            />
                                            <Form.Check
                                                onChange={(e) => { setWeekStart(e.target.value) }}
                                                inline
                                                label="Friday"
                                                name="weekStart"
                                                type='radio'
                                                value='4'
                                            />
                                            <Form.Check
                                                onChange={(e) => { setWeekStart(e.target.value) }}
                                                inline
                                                label="Saturday"
                                                name="weekStart"
                                                type='radio'
                                                value='5'
                                            />
                                            <Form.Check
                                                onChange={(e) => { setWeekStart(e.target.value) }}
                                                inline
                                                label="Sunday"
                                                name="weekStart"
                                                type='radio'
                                                value='6'
                                            />
                                        </div>

                                    </Form.Group>
                                </div>

                                <div className='row mb-2'>
                                    <Form.Group className="mb-1">
                                        <Form.Label>Week Days</Form.Label>
                                        <MultiSelect
                                            options={weekDayOptions}
                                            value={weekDays}
                                            onChange={setWeekDays}
                                            labelledBy="Select"
                                        />
                                    </Form.Group>
                                </div>
                                <div className='row mb-2'>
                                    <Form.Group className="mb-1">
                                        <Form.Label>By Months</Form.Label>
                                        <MultiSelect
                                            options={byMonthOptions}
                                            value={monthDays}
                                            onChange={setMonthDays}
                                            labelledBy="Select"
                                        />
                                    </Form.Group>
                                </div>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Task Description</Form.Label>
                                    <Form.Control as="textarea" rows={4} onChange={(e) => setTaskDesc(e.target.value)} />
                                </Form.Group>
                            </Form>
                        </div>
                        <div className='col-12 col-md-4'>
                            <div className='mb-3'>
                                <Card>
                                    <Card.Header>Assignees</Card.Header>
                                    <Card.Body>
                                        <Tabs
                                            defaultActiveKey="Users"
                                            transition={false}
                                            id="noanim-tab-example"
                                            className="mb-3 cust-tabed"
                                        >
                                            <Tab eventKey="Users" title="Users" className='hctrl-200'>
                                                {
                                                    exceptedUsers.length > 0 ?
                                                        exceptedUsers.map((item, key) => {
                                                            return (
                                                                <div className="card mb-3">
                                                                    <div className='card-gt-body'>
                                                                        <div className='row mt-2 mb-2' id={key}>
                                                                            <div className='col-2'>
                                                                                <Avatar color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]}
                                                                                    initials={`${item.name.substring(0, 2).toUpperCase()}`} />
                                                                            </div>
                                                                            <div className='col-8'>

                                                                                <h5>{item.name} {item.lastname}</h5>
                                                                            </div>
                                                                            <div className='col-2'>
                                                                                <FaPlus onClick={(event) => addAssignee(item.id, event)} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                        : 'No Users Found'
                                                }
                                            </Tab>
                                            <Tab eventKey="Groups" title="Groups" className='hctrl-200'>
                                                {
                                                    groupsList.length > 0 ?
                                                        groupsList.map((item, key) => {
                                                            return (
                                                                <div className="card mb-3">
                                                                    <div className='card-gt-body'>
                                                                        <div className='row mt-2 mb-2' id={key}>
                                                                            <div className='col-2'>
                                                                                <Avatar color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]}
                                                                                    initials={`${item.title.substring(0, 2).toUpperCase()}`} />
                                                                            </div>
                                                                            <div className='col-8'>

                                                                                <h5>{item.title}</h5>
                                                                            </div>
                                                                            <div className='col-2' onClick={(event) => addGroupAssignees(item.group_members, event)} >
                                                                                <FaPlus />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                        : 'No Groups  Found'
                                                }
                                            </Tab>
                                            <Tab eventKey="Departments" title="Departments" className='hctrl-200'>
                                                {
                                                    departmentsList.length > 0 ?
                                                        departmentsList.map((item, key) => {
                                                            return (
                                                                <div className="card mb-3">
                                                                    <div className='card-gt-body'>
                                                                        <div className='row mt-2 mb-2' id={key}>
                                                                            <div className='col-2'>
                                                                                <Avatar color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]}
                                                                                    initials={`${item.name.substring(0, 2).toUpperCase()}`} />
                                                                            </div>
                                                                            <div className='col-8'>

                                                                                <h5>{item.name}</h5>
                                                                            </div>
                                                                            <div className='col-2' onClick={(event) => addDepartmentAssignees(item.id, event)} >
                                                                                <FaPlus />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                        : 'No Departments  Found'
                                                }
                                            </Tab>
                                            <Tab eventKey="Locations" title="Locations" className='hctrl-200'>
                                                {
                                                    locationsList.length > 0 ?
                                                        locationsList.map((item, key) => {
                                                            return (
                                                                <div className="card mb-3">
                                                                    <div className='card-gt-body'>
                                                                        <div className='row mt-2 mb-2' id={key}>
                                                                            <div className='col-2'>
                                                                                <Avatar color={avatarBrColors[Math.floor(Math.random() * avatarBrColors.length)]}
                                                                                    initials={`${item.name.substring(0, 2).toUpperCase()}`} />
                                                                            </div>
                                                                            <div className='col-8'>

                                                                                <h5>{item.name}</h5>
                                                                            </div>
                                                                            <div className='col-2' onClick={(event) => addLocationAssignees(item.id, event)}>
                                                                                <FaPlus />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                        : 'No Locations  Found'
                                                }
                                            </Tab>
                                        </Tabs>
                                    </Card.Body>
                                </Card>

                            </div>
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
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )

}

export default CreateTemplateTask;
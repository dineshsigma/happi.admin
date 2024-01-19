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
import { setTodoAddform, setTodoDeleteform, getTodos, setTodoButtonLoading, createTodo, deleteTodo, updateTodo, setTodoUpdateForm, setStatus } from '../redux/reducers/todoReducer'
import { FaEllipsisV, FiPlus, FaCloudUploadAlt, FaCloudDownloadAlt, FaSearch } from "react-icons/fa";
import { MdMessage, MdTaskAlt } from "react-icons/md";
import { FaCircleNotch } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer } from 'react-toastify';
import NoDataFound from '../assets/No_Data_File.png'


function PersonalTodo(){
    const dispatch = useDispatch()
    const [filterSearch, setFilter] = useState('')
    const addTodoForm = useSelector((state) => state.todo.showAddForm)
    const deleteTodoForm = useSelector((state) => state.todo.showDeleteForm)
    const [AddTodoDialog, setDialog] = useState(false)
    const [UpdateTodoItem, setTodoItem] = useState(false)
    const loading = useSelector((state) => state.todo.buttonLoading)
    const TodoList = useSelector((state) => state.todo.todoList)
    const done = useSelector((state) => state.todo.is_done)
    const edit = useSelector((state) => state.todo.is_edit)
    const userId = useSelector((state) => state.auth.user_id)
    const [TodoName, setTodoName] = useState('')
    const [UpdatedTodoName, setUpdatedTodoName] = useState('')
    const orgId = useSelector((state) => state.auth.current_organization)
    // const [isChecked, setIsChecked] = useState(false);
    const [body, setBody] = useState({user_id: userId,org_id: orgId,}); 
    const [todoId, setTodoId] = useState(0)

    useEffect(() => {
        dispatch((getTodos(body)))
    },[])

    const onChangeTodo = (item) => {
        setTodoId(item.id)
        let payload = item;
        payload = {...item, is_done : !item.is_done}
        payload = {...payload, user_id : userId}
        dispatch(setTodoButtonLoading(true))
        dispatch(updateTodo(payload)).then(() => {
            dispatch((getTodos(body)))
        })
    };

    const updateInput = (item) => {
        setTodoId(item.id)
        setUpdatedTodoName(item.title)
        setTodoItem(!UpdateTodoItem)
    }

    const onUpdateTodo = (item) => {
        setTodoItem(!UpdateTodoItem)
        setTodoId(item.id)
        let payload = item;
        payload = {...item, title : UpdatedTodoName}
        payload = {...payload, user_id : userId}
        dispatch(setTodoButtonLoading(true))
        dispatch(updateTodo(payload)).then(() => {
            dispatch((getTodos(body)))
        })
    };

    

    const showAddTodo = () => {
        setDialog(!AddTodoDialog)
        dispatch(setTodoAddform(!addTodoForm))
    }

    const deleteTodoDialog = async (id, event) => {
        setTodoId(id)
        dispatch(setTodoDeleteform(!deleteTodoForm))
    }

    const addTodo = async () => {
        dispatch(setTodoButtonLoading(true))
        let body = {
            title: TodoName,
            is_done: done,
            org_id: orgId,
            user_id: userId,
            edit: edit,
        }
        dispatch(createTodo(body)).then(() => {
            dispatch((getTodos(body)))
            //console.log('createdLocationResponse', locationRes)
        })

    }

    const TodoDelete = async () => {
        dispatch(setTodoButtonLoading(true))
        await dispatch(deleteTodo(todoId))
        dispatch((getTodos(body)))
        dispatch(setTodoDeleteform(!deleteTodoForm))
        // setDialog(!showDeleteDialog)
    }

    

    return(
        <><div className='container'>
            <>
                <div className='row m-1'>
                    <div className='text-start mt-2 col-6'>
                        <h4>Personal Todo</h4>
                    </div>
                    <div className="col-6 mt-2 text-end">
                        <Button variant="primary" size="md" onClick={() => showAddTodo()}>
                            + Add Todo
                        </Button>
                    </div>
                </div>

                <Card className='m-4 no-border-card'>
                    {/* <Card.Header>
                        <div className="faq-title text-start">Personal Todo</div>
                    </Card.Header> */}

                    <center>
                        <Card.Body className='m-4'>
                            {TodoList.length > 0 &&
                                TodoList.map((item, id) => {
                                    return (
                                        <div className='col-md-12' key={id}>
                                            <div className="card-grid-item mb-3 ticket_card">
                                                <div className='card-gt-body d-flex align-items-center justify-content-between gap_1rm'>
                                                <div className=" Checklist-check">
                                                    <input
                                                        type="checkbox"
                                                        id={item.id}
                                                        name="todo"
                                                        value={item.id}
                                                        checked={item.is_done}
                                                        onChange={() => onChangeTodo(item)} />
                                                    </div>
                                                    <div className='content d-flex align-items-center justify-content-between '>

                                                        {UpdateTodoItem && item.id === todoId ?
                                                            <h4>
                                                                <input type="text" onChange={(e) => { setUpdatedTodoName(e.target.value); } } onBlur={() => onUpdateTodo(item)} className="form-control" value={UpdatedTodoName}></input>
                                                            </h4> :
                                                            <h4 onClick={() => updateInput(item)}>
                                                                {item.title}
                                                            </h4>}

                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                <FaEllipsisV id="dropdown-basic" />
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => deleteTodoDialog(item.id)}>Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            {TodoList && TodoList.length === 0 ? <div className='col-md-12 center text-center'>
                                <img src={NoDataFound} height='500px' />
                            </div> : ""}

                        </Card.Body>
                    </center>
                </Card>

                <Modal
                    show={addTodoForm}
                    onHide={() => showAddTodo()}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add a PersonalTodo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control onChange={(e) => { setTodoName(e.target.value); } } as="textarea" rows={3} placeholder="Enter Todo title" />
                            </Form.Group>
                            <div className='row'>
                                <div className='text-start col-6'>
                                    <Button variant="secondary" onClick={() => deleteTodoDialog()}>
                                        Close
                                    </Button>
                                </div>
                                <div className='text-end col-6'>
                                    <Button variant="primary" onClick={addTodo} disabled={loading}>{loading ? <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true" /> : <span> Add Todo</span>}</Button>
                                </div>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>

                <Modal
                    show={deleteTodoForm}
                    onHide={() => deleteTodoDialog()}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete PersonalTodo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className='text-start col-6'>
                                <Button variant="secondary" onClick={() => deleteTodoDialog()}>
                                    Close
                                </Button>
                            </div>
                            <div className='text-end col-6'>
                                <Button variant="primary" onClick={TodoDelete} disabled={loading}>{loading ? <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true" /> : <span> Delete Todo</span>}</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        </div></>
    )
  };
  
  export default PersonalTodo;
  
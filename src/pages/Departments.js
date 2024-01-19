
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { FaEllipsisV, FiPlus, FaCloudUploadAlt, FaCloudDownloadAlt, FaSearch } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import NoDataFound from '../assets/No_Data_File.png'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Offcanvas from 'react-bootstrap/Offcanvas';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { createDepartment, updateDepartment, getDepartments, setAddform, setUpdateForm, setButtonLoading, deleteDepartment, departmentsCsvUpload } from '../redux/reducers/departmentReducer'
import Modal from 'react-bootstrap/Modal';
import { baseUrl } from '../environment'


function Departments() {
  const dispatch = useDispatch()
  const [filterSearch, setFilter] = useState('')
  const orgId = useSelector((state) => state.auth.current_organization)
  const departmentsList = useSelector((state) => state.department.departmentsList)
  const addDepartmentForm = useSelector((state) => state.department.showAddForm)
  const updateDepartmentForm = useSelector((state) => state.department.showUpdateForm)
  const loading = useSelector((state) => state.department.buttonLoading)
  const [parent, setParent] = useState(0);
  const [name, setName] = useState('');
  const [deptDetails, setDeptDetails] = useState({})
  const [showDeleteDialog, setDialog] = useState(false)
  const [deptId, setDeptId] = useState(0)
  const [showUpload, setShowUploadModel] = useState(false)
  const token = useSelector((state) => state.auth.accessToken)
  const [file, setFile] = useState()
  const bulkDownloadUrl = `${baseUrl}api/download/department/${orgId}?token=${token}`

  useEffect(() => {
    //console.log('Getting Departments+++++++++++++++++++++++++++++', departmentsList)
    dispatch((getDepartments(filterSearch)))
  }, [filterSearch])

  const showAddForm = () => {
    dispatch(setAddform(!addDepartmentForm))
  }

  const showUpdateForm = (item, event) => {
    event.preventDefault()
    setDeptDetails(item)
    dispatch(setUpdateForm(!updateDepartmentForm))
  }

  const addDepartment = async (event) => {
    dispatch(setButtonLoading(true))
    event.preventDefault();
    let body = {
      name: name,
      parent: parent,
      org_id: orgId
    }
    dispatch(createDepartment(body)).then(() => {
      dispatch((getDepartments(filterSearch)))
      //console.log('createdDeptResponse', createdDeptResponse)
    })

  }

  const update = async (event) => {
    //setLoading(true)
    dispatch(setButtonLoading(true))
    event.preventDefault();
    //console.log('updating Details', deptDetails)
    dispatch(updateDepartment(deptDetails)).then(() => {
      dispatch((getDepartments(filterSearch)))
      //console.log('updateDepResponse', updateDepResponse)
    })
  }

  const deleteDialog = async (id, event) => {
    event.preventDefault();
    //console.log('Delete Dept', id)
    setDeptId(id)
    setDialog(!showDeleteDialog)
  }

  const deleteDept = async () => {
    //console.log('Deleting Department')
    dispatch(setButtonLoading(true))
    await dispatch(deleteDepartment(deptId))
    dispatch((getDepartments(filterSearch)))
    setDialog(!showDeleteDialog)
  }

  const uploadBulkUpload = (e) => {
    e.preventDefault()
    console.log(file)
    dispatch(departmentsCsvUpload(file))
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
                <button type="button" className="btn btn-primary" onClick={showAddForm}>Create Department</button>
                <a href={bulkDownloadUrl}><button type="button" className="btn btn-secondary"><FaCloudDownloadAlt /></button></a>
                <button onClick={() => setShowUploadModel(!showUpload)} type="button" className="btn btn-secondary"><FaCloudUploadAlt /></button>

              </div>
            </div>
          </div>
        </div>
      </section>


      <section className='mt-5'>
        <div className='container'>
          <div className='row'>
            {
              departmentsList.length > 0 ?
                departmentsList.map((item) => {
                  return (
                    <div className='col-md-4'>
                      <div className="card-grid-item mb-3">
                        <div className='card-gt-body d-flex align-items-center justify-content-between gap_1rm'>
                          <div className='avatar d-flex align-items-center justify-content-center text-center'>
                            <span>{item.name.substring(0, 2).toUpperCase()}</span>
                          </div>
                          <div className='content d-flex align-items-center justify-content-between '>
                            <h4>
                              {item.name}
                              {/* <span>Software Engineer</span> */}
                            </h4>
                            <Dropdown>
                              <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <FaEllipsisV id="dropdown-basic" />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={(event) => showUpdateForm(item, event)}>Edit</Dropdown.Item>
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


      <Offcanvas show={addDepartmentForm} onHide={showAddForm} backdrop="static" placement='end'>
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>Create Department</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='container'>
            <div className='row'>
              <Form onSubmit={addDepartment}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control onChange={(e) => { setName(e.target.value) }} type="text" placeholder="Enter Department" />
                  </Form.Group>
                </Row>
                <Form.Group as={Col} controlId="formGridState" id="formGridCheckbox">
                  <Form.Label>Parent</Form.Label>
                  <Form.Select onChange={(e) => { setParent(e.target.value) }} defaultValue="Choose...">
                    <option >Select Parent Deapartment</option>
                    {departmentsList.map((department) => {
                      return (
                        <option key={department.id} value={department.id}>{department.name}</option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> : <span> Create</span>}
                </Button>

              </Form>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas show={updateDepartmentForm} onHide={() => dispatch(setUpdateForm(!updateDepartmentForm))} backdrop="static" placement='end'>
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>Update Department</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='container'>
            <div className='row'>
              <Form onSubmit={update}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control onChange={(e) => { setDeptDetails({ ...deptDetails, name: e.target.value }) }} value={deptDetails.name} type="text" placeholder="Enter Department" />
                  </Form.Group>
                </Row>
                <Form.Group as={Col} controlId="formGridState" id="formGridCheckbox">
                  <Form.Label>Parent</Form.Label>
                  <Form.Select onChange={(e) => { setDeptDetails({ ...deptDetails, parent: e.target.value }) }} value={deptDetails.parent} >
                    <option >Select Parent Deapartment</option>
                    {departmentsList.map((department) => {
                      return (
                        <option key={department.id} value={department.id}>{department.name}</option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> : <span> Update</span>}
                </Button>

              </Form>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Modal
        show={showDeleteDialog}
        onHide={() => setDialog(!showDeleteDialog)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Items Will be Deleted Permanently
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDialog(!showDeleteDialog)}>
            Close
          </Button>
          <Button variant="primary" disabled={loading} onClick={deleteDept} >{loading ? <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          /> : <span> Delete</span>}</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpload} onHide={() => setShowUploadModel(!showUpload)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Departments bulk Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select File to Upload</Form.Label>
              <Form.Control type="file" accept='.csv' onChange={(e) => setFile(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadModel(!showUpload)}>
            Close
          </Button>
          <Button variant="primary" disabled={loading} onClick={(e) => uploadBulkUpload(e)} >{loading ? <Spinner
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

export default Departments;
import { useSelector, useDispatch, } from "react-redux";
import { useEffect, useState } from 'react';
import NoDataFound from '../assets/No_Data_File.png'
import { toast, ToastContainer } from 'react-toastify';
import { FaEllipsisV, FiPlus, FaCloudUploadAlt, FaCloudDownloadAlt, FaSearch } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { getDesignations, setAddform, setUpdateForm, setButtonLoading, deleteDesignation, createDesignation, updateDesignation,designationsCsvUpload } from '../redux/reducers/designationReducers'
import { baseUrl } from '../environment'


const Designations = () => {
  const dispatch = useDispatch()
  const designationList = useSelector((state) => state.designation.designationList)
  const addDepartmentForm = useSelector((state) => state.designation.showAddForm)
  const loading = useSelector((state) => state.designation.buttonLoading)
  const orgId = useSelector((state) => state.auth.current_organization)
  const updateDesignationForm = useSelector((state) => state.designation.showUpdateForm)
  const updateOrganizationResponse = useSelector((state) => state.designation.updatedepartmentResponse)
  const [filterSearch, setFilter] = useState('')
  const [name, setName] = useState('');
  const [deptId, setDeptId] = useState(0)
  const [degDetails, setDegDetails] = useState({})
  const [showDeleteDialog, setDialog] = useState(false)
  const [showUpload, setShowUploadModel] = useState(false)
  const token = useSelector((state) => state.auth.accessToken)
  const [file, setFile] = useState()
  const bulkDownloadUrl = `${baseUrl}api/download/desigination/${orgId}?token=${token}`

  //console.log(designationList)
  useEffect(() => {
    //console.log('Getting Departments+++++++++++++++++++++++++++++', designationList)
    dispatch((getDesignations(filterSearch)))
  }, [filterSearch])

  const showAddForm = () => {
    //console.log('Hello')
    dispatch(setAddform(!addDepartmentForm))
  }

  const showUpdateForm = (item, event) => {
    //console.log(item)
    event.preventDefault()
    setDegDetails(item)
    dispatch(setUpdateForm(!updateDesignationForm))
  }
  const addDesignation = async (event) => {
    dispatch(setButtonLoading(true))
    event.preventDefault();
    let body = {
      name: name,
      org_id: orgId
    }
    dispatch(createDesignation(body)).then(() => {
      dispatch((getDesignations(filterSearch)))
    })

  }

  const update = async (event) => {
    //setLoading(true)
    dispatch(setButtonLoading(true))
    event.preventDefault();
    //console.log('updating Details', degDetails)
    dispatch(updateDesignation(degDetails)).then(() => {
      dispatch((getDesignations(filterSearch)))
      //console.log('updateDepResponse', updateOrganizationResponse)
    })
  }
  const deleteDialog = async (id, event) => {
    event.preventDefault();
    //console.log('Delete Dept', id)
    setDeptId(id)
    setDialog(!showDeleteDialog)
  }

  const deleteDept = async () => {
    dispatch(setButtonLoading(true))
    await dispatch(deleteDesignation(deptId))
    dispatch((getDesignations(filterSearch)))
    setDialog(!showDeleteDialog)
  }

  const uploadBulkUpload = (e) => {
    e.preventDefault()
    console.log(file)
    dispatch(designationsCsvUpload(file))
  }
  return (
    <>
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
                <button type="button" className="btn btn-primary" onClick={showAddForm}>Create Designation</button>
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
              designationList.length > 0 ?
                designationList.map((item) => {
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
          <Offcanvas.Title>Create Designation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='container'>
            <div className='row'>
              <Form onSubmit={addDesignation}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Designation Name</Form.Label>
                    <Form.Control onChange={(e) => { setName(e.target.value) }} type="text" placeholder="Enter Department" />
                  </Form.Group>
                </Row>
                {/* <Form.Group as={Col} controlId="formGridState" id="formGridCheckbox">
                  <Form.Label>Parent</Form.Label>
                  <Form.Select onChange={(e) => { setParent(e.target.value) }} defaultValue="Choose...">
                    <option >Select Parent Deapartment</option>
                    {departmentsList.map((department) => {
                      return (
                        <option key={department.id} value={department.id}>{department.name}</option>
                      )
                    })}
                  </Form.Select>
                </Form.Group> */}

                <Button variant="primary" disabled={loading} type="submit">
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

      <Offcanvas show={updateDesignationForm} onHide={() => dispatch(setUpdateForm(!updateDesignationForm))} backdrop="static" placement='end'>
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
                    <Form.Control onChange={(e) => (setDegDetails({ ...degDetails, name: e.target.value }))} value={degDetails.name} type="text" placeholder="Enter Organization" />
                  </Form.Group>
                </Row>
                <Button variant="primary" disabled={loading} type="submit">
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
          <Button variant="primary" onClick={deleteDept} disabled={loading} >{loading ? <Spinner
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
          <Modal.Title>Designations bulk Upload</Modal.Title>
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
          <Button variant="primary" onClick={(e) => uploadBulkUpload(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default Designations;
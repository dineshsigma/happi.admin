import { ToastContainer } from 'react-toastify';
import { FaEllipsisV, FiPlus, FaCloudUploadAlt, FaCloudDownloadAlt, FaSearch } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocationAddform, getLocations, setLocationButtonLoading, createLocation, deleteLocation, updateLocation, setLocationUpdateForm,locationsCsvUpload,downloadCSVLocation } from '../redux/reducers/locationsReducer'
import Dropdown from 'react-bootstrap/Dropdown';
import NoDataFound from '../assets/No_Data_File.png'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import {baseUrl} from '../environment'


function Locations() {
    const dispatch = useDispatch()
    const [filterSearch, setFilter] = useState('')
    const orgId = useSelector((state) => state.auth.current_organization)
    const addLocationForm = useSelector((state) => state.location.showAddForm)
    const updateLocationForm = useSelector((state) => state.location.showUpdateForm)
    const locationRes = useSelector((state) => state.location.locationResponse)
    const loading = useSelector((state) => state.location.buttonLoading)
    const locationsList = useSelector((state) => state.location.locationsList)
    const token = useSelector((state) => state.auth.accessToken)
    const [locationName, setLoactionName] = useState('')
    const [parent, setParent] = useState(0);
    const [locationDetails, setLocationDetails] = useState({})
    const [showDeleteDialog, setDialog] = useState(false)
    const [locationId, setLocationId] = useState(0)
    const [showUpload, setShowUploadModel] = useState(false)
    const bulkDownloadUrl = `${baseUrl}api/download/location/${orgId}?token=${token}`
    const [file, setFile] = useState()

    useEffect(() => {
        //console.log('Getting Locations+++++++++++++++++++++++++++++', locationsList)
        dispatch((getLocations(filterSearch)))
    }, [filterSearch])

    const showAddForm = () => {
        dispatch(setLocationAddform(!addLocationForm))
    }

    const addLocation = async (event) => {
        dispatch(setLocationButtonLoading(true))
        event.preventDefault();
        let body = {
            name: locationName,
            parent: parent,
            org_id: orgId
        }
        dispatch(createLocation(body)).then(() => {
            dispatch((getLocations(filterSearch)))
            //console.log('createdLocationResponse', locationRes)
        })

    }
    const showUpdateForm = (item, event) => {
        event.preventDefault()
        setLocationDetails(item)
        dispatch(setLocationUpdateForm(!updateLocationForm))
    }

    const update = async (event) => {
        //setLoading(true)
        dispatch(setLocationButtonLoading(true))
        event.preventDefault();
        //console.log('updating Details', locationDetails)
        dispatch(updateLocation(locationDetails)).then(() => {
            dispatch((getLocations(filterSearch)))
            //console.log('updateLocationResponse', locationRes)
        })
    }

    const deleteDialog = async (id, event) => {
        event.preventDefault();
        //console.log('Delete Location', id)
        setLocationId(id)
        setDialog(!showDeleteDialog)
    }

    const locationDelete = async () => {
        //console.log('Deleting Location')
        dispatch(setLocationButtonLoading(true))
        await dispatch(deleteLocation(locationId))
        dispatch((getLocations(filterSearch)))
        setDialog(!showDeleteDialog)
    }

    const uploadFile = async(e) => {
        e.preventDefault()
        dispatch(setLocationButtonLoading(true))
        console.log(file)
        await dispatch(locationsCsvUpload(file)).then((res)=>{
            console.log(res)
        })
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
                                <button type="button" className="btn btn-primary" onClick={showAddForm}>Create Location</button>
                                <a ><button onClick={()=> dispatch(downloadCSVLocation())} type="button" className="btn btn-secondary" ><FaCloudDownloadAlt /></button></a>
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
                            locationsList?.length > 0 ?
                                locationsList.map((item) => {
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

            <Offcanvas show={addLocationForm} onHide={showAddForm} backdrop="static" placement='end'>
                <Offcanvas.Header closeButton >
                    <Offcanvas.Title>Create Location</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='container'>
                        <div className='row'>
                            <Form onSubmit={addLocation}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Location Name</Form.Label>
                                        <Form.Control onChange={(e) => { setLoactionName(e.target.value) }} type="text" placeholder="Enter Department" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState" id="formGridCheckbox">
                                        <Form.Label>Parent</Form.Label>
                                        <Form.Select onChange={(e) => { setParent(e.target.value) }} defaultValue="Choose...">
                                            <option >Select Parent Deapartment</option>
                                            {locationsList?.map((location) => {
                                                return (
                                                    <option key={location.id} value={location.id}>{location.name}</option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Form.Group>

                                </Row>
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
            <Offcanvas show={updateLocationForm} onHide={() => dispatch(setLocationUpdateForm(!updateLocationForm))} backdrop="static" placement='end'>
                <Offcanvas.Header closeButton >
                    <Offcanvas.Title>Update Location</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='container'>
                        <div className='row'>
                            <Form onSubmit={update}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Location Name</Form.Label>
                                        <Form.Control onChange={(e) => { setLocationDetails({ ...locationDetails, name: e.target.value }) }} value={locationDetails.name} type="text" placeholder="Enter Department" />
                                    </Form.Group>
                                </Row>
                                <Form.Group as={Col} controlId="formGridState" id="formGridCheckbox">
                                    <Form.Label>Parent</Form.Label>
                                    <Form.Select onChange={(e) => { setLocationDetails({ ...locationDetails, parent: e.target.value }) }} value={locationDetails.parent} >
                                        <option >Select Parent Location</option>
                                        {locationsList?.map((department) => {
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
                    <Modal.Title>Delete Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Items will be Deleted Permanently
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDialog(!showDeleteDialog)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={locationDelete} disabled={loading} >{loading ? <Spinner
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
                    <Modal.Title>Location Bulk Upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Select File to Upload</Form.Label>
                            <Form.Control type="file" accept='.csv' onChange={(e)=> setFile(e.target.files[0])} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUploadModel(!showUpload)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => uploadFile(e)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Locations;
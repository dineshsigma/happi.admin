import { ToastContainer } from "react-toastify";
import {
  FaCloudUploadAlt,
  FaCloudDownloadAlt,
  FaUserEdit, FaRegTrashAlt, FaRegEdit,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import NoDataFound from "../assets/No_Data_File.png";
import UserIcon from "../assets/user-icon.png";

import Usersimg from "../assets/users.png";
import { TiUserDelete } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { GoDeviceMobile } from "react-icons/go";

import Offcanvas from "react-bootstrap/Offcanvas";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Badge from 'react-bootstrap/Badge';

import Card from "react-bootstrap/Card";
import {
  getUsers,
  setUserAddform,
  setUserButtonLoading,
  createUser,
  setUserUpdateForm,
  getOrgUsers,
  updateUser,
  deleteUser,
} from "../redux/reducers/userReducer";
import { getLocations } from "../redux/reducers/locationsReducer";
import { getDepartments } from "../redux/reducers/departmentReducer";
import { getRoles } from "../redux/reducers/rolesReducer";
import { getDesignations } from "../redux/reducers/designationReducers";
import CryptoJS  from 'crypto-js'

function Users() {
  const dispatch = useDispatch();
  const [filterSearch, setFilter] = useState("");
  const orgId = useSelector((state) => state.auth.current_organization);
  const usersList = useSelector((state) => state.users.usersList);
  const addUserForm = useSelector((state) => state.users.showAddForm);
  const locationsList = useSelector((state) => state.location.locationsList);
  const departmentsList = useSelector(
    (state) => state.department.departmentsList
  );
  const rolesList = useSelector((state) => state.roles.rolesList);
  const designationList = useSelector(
    (state) => state.designation.designationList
  );
  const updateUserForm = useSelector((state) => state.users.showUpdateForm);
  const loading = useSelector((state) => state.users.buttonLoading);
  const [userCreateData, setCreateData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    login_type: "",
    password: generatePassword(),
  });
  const [userOrgData, setUserOrgData] = useState({
    location_id: 0,
    department_id: 0,
    role_id: 0,
    reporting_manager: 0,
    designation_id: 0,
    org_id: orgId,
  });
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedOrgUser, setSelectedOrgUser] = useState({});
  const orgUsersList = useSelector((state) => state.users.orgUsersList);
  const [showDeleteDialog, setDialog] = useState(false);

  useEffect(() => {

    dispatch(getUsers(filterSearch));
    dispatch(getDepartments(""));
    dispatch(getLocations(""));
    dispatch(getRoles(""));
    dispatch(getDesignations(""));
    dispatch(getOrgUsers());
  }, [filterSearch]);

  const showAddForm = () => {
    dispatch(setUserAddform(!addUserForm));
  };
  const addUser = (event) => {
    dispatch(setUserButtonLoading(true));
    setCreateData({...userCreateData, password:generatePassword()})
    event.preventDefault();
    let body = {
      user: userCreateData,
      location_id: parseInt(userOrgData.location_id),
      department_id: parseInt(userOrgData.department_id),
      role_id: parseInt(userOrgData.role_id),
      reporting_manager: parseInt(userOrgData.reporting_manager),
      designation_id: parseInt(userOrgData.designation_id),
      org_id: orgId,
    };
    //console.log('create user object', body)
    dispatch(createUser(body)).then(() => {
      dispatch(getUsers(filterSearch));
      //console.log('users', usersList)
    });
  };

  const showUpdateFrom = (id, event) => {
    console.log("orgUsersList", orgUsersList);
    console.log("userDetails", id);
    event.preventDefault();
    let orgData = {
      location_id: 0,
      department_id: 0,
      role_id: 0,
      reporting_manager: 0,
      designation_id: 0,
      org_id: orgId,
    };
    let userData = {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      login_type: "",
      password: "",
      pin: "",
    };
    let userDetails = usersList.find((item) => item.id === id);
    let userOrgDetails = orgUsersList.find((item) => item.user_id === id);
    if (userOrgDetails !== undefined) {
      setSelectedOrgUser(userOrgDetails);
    } else {
      setSelectedOrgUser(orgData);
    }
    if (userDetails) {
      setSelectedUser(userDetails);
    } else {
      setSelectedOrgUser(userData);
    }

    console.log("userDetails", userDetails, userOrgDetails);
    dispatch(setUserUpdateForm(!updateUserForm));
  };

  const userUpdate = (event) => {
    dispatch(setUserButtonLoading(true));
    event.preventDefault();
    console.log("updating user", selectedUser, selectedOrgUser);
    let payload = {
      user: selectedUser,
      userOrg: selectedOrgUser,
    };
    dispatch(updateUser(payload)).then(() => {
      dispatch(getUsers(filterSearch));
      //console.log('users', usersList)
    });
  };


  function generatePassword() {
    var pass = '';
    const secret = "Y3llY29tbG9naW5lbmNyeXB0aW9u";
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789@#';

    for (let i = 1; i <= 12; i++) {
      var char = Math.floor(Math.random()
        * str.length + 1);

      pass += str.charAt(char)
    }
    let password =  CryptoJS.AES.encrypt(pass,secret).toString();

    return password;
  }


  const deleteDialog = async (user, event) => {
    event.preventDefault();
    setSelectedUser(user);
    setDialog(!showDeleteDialog);
  };

  const userDelete = async () => {
    dispatch(setUserButtonLoading(true));
    await dispatch(deleteUser(selectedUser.id));
    dispatch(getUsers(filterSearch));
    setDialog(!showDeleteDialog);
  };

  return (
    <div>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="aside_left">
                <form className="form-inline d-flex">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => {
                      setFilter(e.target.value);
                    }}
                  />
                </form>
              </div>
            </div>

            <div className="col-md-9">
              <div className="aside_left d-flex align-items-center justify-content-end gap_05rm">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={showAddForm}
                >
                  Create User
                </button>
                <button type="button" className="btn btn-secondary">
                  <FaCloudUploadAlt />
                </button>
                <button type="button" className="btn btn-secondary">
                  <FaCloudDownloadAlt />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div className="container">
          <div className="row">
            {usersList.length > 0 ? (
              usersList.map((item, key) => {
                return (
                  <div className="col-md-3 mb-3 pb-1">
                    <Card style={{ width: "100%" }} className="users-card">
                      {/* <Card.Img variant="top" src="holder.js/100px180" />
                        :  */}

                      <Card.Body>
                        <Card.Title>
                          {/* <Card.Img
                        className="users-dummy-img"
                        variant="top"
                        src={Usersimg}
                      /> */}
                          {/* <img className="users-dummy-img" src={Usersimg} />
                          {item.name} {item.lastname} */}
                        </Card.Title>
                        <div className="row">
                          <div className="col-3">
                            <img className="users-dummy-img" src={UserIcon} />

                          </div>
                          <div className="col-9">
                            <Card.Title>
                              {item.name} {item.lastname}
                            </Card.Title>
                            <Card.Text>
                              <label className="user-tags-label">
                                <HiOutlineMail />{" "}
                              </label>{" "}
                              &nbsp;
                              <span className="user-tags-label-item-email">
                                {item.email}
                              </span>{" "}
                            </Card.Text>
                            <Card.Text>
                              <label className="user-tags-label">
                                {" "}
                                <GoDeviceMobile />
                              </label>{" "}
                              &nbsp;
                              <label className="user-tags-label-item">
                                {item.phone}
                              </label>
                            </Card.Text>
                          </div>

                        </div>

                        {/* <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                              <Button onClick={(event) => showUpdateFrom(item.id, event)} variant="primary">Edit User</Button>
                            </ButtonGroup>
                            <ButtonGroup className="me-2 float-end " aria-label="First group">
                              <Button className='btn-delete' onClick={(event) => deleteDialog(item, event)}><TiUserDelete /></Button>
                            </ButtonGroup>
                          </ButtonToolbar> */}
                      </Card.Body>
                      <Card.Footer className="user-foter ">

                        <ButtonToolbar aria-label="Toolbar with button groups">
                          <div className="row">
                            <div className="col-4 user-foter-details">
                              <Badge pill bg="light" text="dark" className="users-badge">
                                Designation
                              </Badge>
                              {" "}
                            </div>
                            {/* <div className='col-1 user-foter-details'>
    <div class="vl"></div>

</div> */}

                            <div className="col-8 user-foter-details">

                              <ButtonGroup
                                className="me-2 float-end "
                                aria-label="First group"
                              >
                                <Button
                                  className="btn-delete"
                                  onClick={(event) => deleteDialog(item, event)}
                                >
                                  <FaRegTrashAlt className="btn-icons" />
                                </Button>
                              </ButtonGroup>
                              <ButtonGroup
                                className="me-2 float-end"
                                aria-label="First group"
                              >
                                <Button
                                  className="btn-edit"
                                  onClick={(event) =>
                                    showUpdateFrom(item.id, event)
                                  }
                                  variant="primary"
                                >
                                  <FaRegEdit className="btn-icons" />
                                </Button>
                              </ButtonGroup>
                            </div>
                          </div>
                        </ButtonToolbar>
                      </Card.Footer>
                    </Card>
                  </div>
                );
              })
            ) : (
              <div className="col-md-12 center text-center">
                <img src={NoDataFound} height="500px" />
              </div>
            )}
          </div>
        </div>
      </section>

      <Offcanvas
        show={addUserForm}
        onHide={showAddForm}
        backdrop="static"
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Create User</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container">
            <div className="row">
              <Form onSubmit={addUser}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required
                      onChange={(e) => {
                        setCreateData({
                          ...userCreateData,
                          name: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required
                      onChange={(e) => {
                        setCreateData({
                          ...userCreateData,
                          lastname: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required
                      onChange={(e) => {
                        setCreateData({
                          ...userCreateData,
                          email: e.target.value,
                        });
                      }}
                      type="email"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Phone no</Form.Label>
                    <Form.Control required
                      onChange={(e) => {
                        setCreateData({
                          ...userCreateData,
                          phone: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    controlId="formGridState"
                    id="formGridCheckbox"
                  >
                    <Form.Label>Reporting Manager</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setUserOrgData({
                          ...userOrgData,
                          reporting_manager: e.target.value,
                        });
                      }}
                      defaultValue="Choose..."
                    >
                      <option>Select Reporting Manager</option>
                      {usersList.length > 0 && usersList.map((user) => {
                        return (
                          <option key={user.id} value={user.id}>
                            {user.name} {user.lastname}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    controlId="formGridState"
                    id="formGridCheckbox"
                  >
                    <Form.Label>Designation</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setUserOrgData({
                          ...userOrgData,
                          designation_id: e.target.value,
                        });
                      }}
                      defaultValue="Choose..."
                    >
                      <option>Select Designation</option>
                      {designationList.map((designation) => {
                        return (
                          <option key={designation.id} value={designation.id}>
                            {designation.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    controlId="formGridState"
                    id="formGridCheckbox"
                  >
                    <Form.Label>Location</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setUserOrgData({
                          ...userOrgData,
                          location_id: e.target.value,
                        });
                      }}
                      defaultValue="Choose..."
                    >
                      <option>Select Location</option>
                      {locationsList.map((location) => {
                        return (
                          <option key={location.id} value={location.id}>
                            {location.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    controlId="formGridState"
                    id="formGridCheckbox"
                  >
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setUserOrgData({
                          ...userOrgData,
                          department_id: e.target.value,
                        });
                      }}
                      defaultValue="Choose..."
                    >
                      <option>Select Department</option>
                      {departmentsList &&
                        departmentsList.map((dept) => {
                          return (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          );
                        })}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    controlId="formGridState"
                    id="formGridCheckbox"
                  >
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setUserOrgData({
                          ...userOrgData,
                          role_id: e.target.value,
                        });
                      }}
                      defaultValue="Choose..."
                    >
                      <option>Select Role</option>
                      {rolesList.map((role) => {
                        return (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <span> Create</span>
                  )}
                </Button>
              </Form>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas
        show={updateUserForm}
        onHide={() => dispatch(setUserUpdateForm(!updateUserForm))}
        backdrop="static"
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Update User</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container">
            <div className="row">
              <Form onSubmit={userUpdate}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required
                      onChange={(e) => {
                        setSelectedUser({
                          ...selectedUser,
                          name: e.target.value,
                        });
                      }}
                      value={selectedUser.name}
                      type="text"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required
                      onChange={(e) => {
                        setSelectedUser({
                          ...selectedUser,
                          lastname: e.target.value,
                        });
                      }}
                      value={selectedUser.lastname}
                      type="text"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required
                      onChange={(e) => {
                        setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        });
                      }}
                      value={selectedUser.email}
                      type="email"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Phone no</Form.Label>
                    <Form.Control required
                      onChange={(e) => {
                        setSelectedUser({
                          ...selectedUser,
                          phone: e.target.value,
                        });
                      }}
                      value={selectedUser.phone}
                      type="text"
                    />
                  </Form.Group>
                </Row>
                {/* <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    controlId="formGridState"
                    id="formGridCheckbox"
                  >
                    <Form.Label>Reporting Manager</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setSelectedOrgUser({
                          ...selectedOrgUser,
                          reporting_manager: e.target.value,
                        });
                      }}
                      value={selectedOrgUser.reporting_manager}
                      defaultValue="Choose..."
                    >
                      <option>Select Reporting Manager</option>
                      {usersList.map((user) => {
                        return (
                          <option key={user.id} value={user.id}>
                            {user.name} {user.lastname}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Row> */}
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    controlId="formGridState"
                    id="formGridCheckbox"
                  >
                    <Form.Label>Designation</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setSelectedOrgUser({
                          ...selectedOrgUser,
                          designation_id: e.target.value,
                        });
                      }}
                      value={selectedOrgUser.designation_id}
                      defaultValue="Choose..."
                    >
                      <option>Select Designation</option>
                      {designationList.map((designation) => {
                        return (
                          <option key={designation.id} value={designation.id}>
                            {designation.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    controlId="formGridState"
                    id="formGridCheckbox"
                  >
                    <Form.Label>Location</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setSelectedOrgUser({
                          ...selectedOrgUser,
                          location_id: e.target.value,
                        });
                      }}
                      value={selectedOrgUser.location_id}
                      defaultValue="Choose..."
                    >
                      <option>Select Location</option>
                      {locationsList.map((location) => {
                        return (
                          <option key={location.id} value={location.id}>
                            {location.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    controlId="formGridState"
                    id="formGridCheckbox"
                  >
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setSelectedOrgUser({
                          ...selectedOrgUser,
                          department_id: e.target.value,
                        });
                      }}
                      value={selectedOrgUser.department_id}
                      defaultValue="Choose..."
                    >
                      <option>Select Department</option>
                      {departmentsList &&
                        departmentsList.map((dept) => {
                          return (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          );
                        })}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    controlId="formGridState"
                    id="formGridCheckbox"
                  >
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setSelectedOrgUser({
                          ...selectedOrgUser,
                          role_id: e.target.value,
                        });
                      }}
                      value={selectedOrgUser.role_id}
                      defaultValue="Choose..."
                    >
                      <option>Select Role</option>
                      {rolesList.map((role) => {
                        return (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <span> Create</span>
                  )}
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
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>User will be Deleted Permanently</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setDialog(!showDeleteDialog)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={userDelete} disabled={loading}>
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <span> Delete</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Users;
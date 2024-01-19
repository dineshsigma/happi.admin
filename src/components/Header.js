import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FaBars, FaBell } from "react-icons/fa";
import { getOrganizations } from '../redux/reducers/organizationReducer'
import Avatar from './Avatar'
import { avatarBrColors } from '../environment'
import { changeCurrentOrg, setToggleMenu } from '../redux/reducers/authReducer'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import { getUserNotificatinos } from '../redux/reducers/userReducer'
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import announcemnetsimg from "../assets/announcemnets.jfif";
// import { MdOutlineNotificationsNone } from "react-icons/md";
// import { HiOutlineSpeakerphone } from "react-icons/hi";
// import { getTodayAnnouncements } from '../redux/reducers/announcementsReducer'
import { logOut } from '../redux/reducers/authReducer';
// import { TbLogout } from "react-icons/tb";
// import { AnimatePresence, motion } from "framer-motion";



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showSwapOrg, setSwapOrg] = useState(false)
  const [showNotification, setNotifications] = useState(false)
  const [showAnnouncements, setAnnouncements] = useState(false)
  const orgList = useSelector((state) => state.organization.organizationsList)
  const available_organizations = useSelector((state) => state.auth.available_organizations)
  const userDetails = useSelector((state) => state.auth.userDetails)
  const current_organization = useSelector((state) => state.auth.current_organization)
  const orgDetails = orgList.find((item) => item.id == current_organization)
  const notificationList = useSelector((state) => state.users.notificationList)
  const isOpen = useSelector((state) => state.auth.toggleSideMenu)
  const toggle = () => dispatch(setToggleMenu(!isOpen))
  const headLine = useSelector((state => state.auth.pageHeading));

  const changeOrganization = (id) => {
    // console.log('changeOrganization', id)
    dispatch(changeCurrentOrg(id)).then((res) => {
      window.location.reload()
      dispatch(getOrganizations(available_organizations))
    })

  }
//lOGOUT FUNCITON
  const userLogout = (event) => {
    event.preventDefault()
    dispatch(logOut())
    navigate('/')
  }

  return (
    <div>
      <Navbar className="nav-fix">
        <Container fluid>
          <Navbar.Brand>
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <h4>{headLine}</h4>
          <Navbar.Collapse className="justify-content-end">
            <p className="link_text logout-btn" onClick={(e) => userLogout(e)}>
              Logout
            </p>
            {/* <a variant="light" className="navbar-btn" onClick={() => setNotifications(!showNotification)}><MdOutlineNotificationsNone />
              <span class="notifi-indicator pulsate"></span>

            </a>
            <a variant="light" className="navbar-btn" onClick={() => setAnnouncements(!showAnnouncements)}>
              <HiOutlineSpeakerphone />
              <span class="notifi-indicator pulsate"></span>
            </a> */}
            {/* <a onClick={() => setSwapOrg(!showSwapOrg)}>
              {orgDetails && (
                <Avatar
                  className="nav-avatar"
                  color="--br-danger"
                  initials={orgDetails.name.substring(0, 2).toUpperCase()}
                />
              )}
            </a> */}
            {/* <Button variant="light" className="navbar-btn" onClick={() => setNotifications(!showNotification)}><FaBell /></Button> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* {children} */}

      <Offcanvas
        show={showAnnouncements}
        onHide={() => setAnnouncements(!showAnnouncements)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Announcements</Offcanvas.Title>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body>
          <Card className=" announcemnts-cards mt-3">
            <Card.Img
              className="announcemnt-image text-center p-2"
              variant="top"
              src={announcemnetsimg}
            />
            <Card.Body>
              <Card.Title className="an-card-title">
                {" "}
                Announcements Title{" "}
              </Card.Title>
              <Card.Text className="an-card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
          <Card className=" announcemnts-cards mt-3">
            <Card.Body>
              <Card.Title className="an-card-title">
                {" "}
                Announcements Title 2
              </Card.Title>
              <Card.Text className="an-card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas
        show={showSwapOrg}
        onHide={() => setSwapOrg(!showSwapOrg)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Organizations</Offcanvas.Title>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body>
          <Container>
            <div className="row">
              <div className="col-md-12">
                <div className="checkbox-container">
                  {orgList.length > 0 &&
                    orgList.map((org, key) => {
                      return (
                        <div class="checkbox">
                          <label class="checkbox-wrapper">
                            <input
                              onChange={() => changeOrganization(org.id)}
                              type="checkbox"
                              class="checkbox-input"
                              checked={current_organization == org.id}
                            />
                            <span class="checkbox-tile">
                              <Avatar
                                color={
                                  avatarBrColors[
                                    Math.floor(
                                      Math.random() * avatarBrColors.length
                                    )
                                  ]
                                }
                                initials={org.name
                                  .substring(0, 2)
                                  .toUpperCase()}
                              />
                            </span>
                          </label>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas
        show={showNotification}
        onHide={() => setNotifications(!showNotification)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body>
          <Tabs
            defaultActiveKey="new"
            id="fill-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="new" title="New">
              <div>
                <div className="row">
                  {notificationList.length > 0
                    ? notificationList.map((item) => {
                        return (
                          !item.read && (
                            <div className="col-md-12 mb-2">
                              <Card>
                                <Card.Body>{item.message}</Card.Body>
                              </Card>
                            </div>
                          )
                        );
                      })
                    : "No Notifications"}
                </div>
              </div>
            </Tab>
            <Tab eventKey="cleared" title="Cleared">
              {notificationList.length > 0
                ? notificationList.map((item) => {
                    return (
                      item.read && (
                        <div className="col-md-12 mb-2">
                          <Card>
                            <Card.Body>{item.message}</Card.Body>
                          </Card>
                        </div>
                      )
                    );
                  })
                : "No Notifications"}
            </Tab>
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Header
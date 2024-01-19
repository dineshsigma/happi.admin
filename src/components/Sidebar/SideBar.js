import { NavLink } from "react-router-dom";
import { FaBars, FaBell, FaDotCircle, FaRegDotCircle } from "react-icons/fa";
import { MdMessage, MdTaskAlt, MdOutlineDashboard, MdOutlinePermMedia, MdCategory, MdBarChart, MdAddShoppingCart, MdUpdate, MdLocalOffer, MdOutlineLocalOffer, MdAddchart, MdPhoneIphone, MdPieChart} from "react-icons/md";
import { BiAnalyse, BiSearch, BiStar, BiStore, BiStoreAlt, BiCreditCard, BiHash } from "react-icons/bi";
import { BiCog, BiHelpCircle, BiRupee, BiCodeAlt, BiUserCheck, BiUserVoice } from "react-icons/bi";
import { GrAnnounce, GrProductHunt, GrCreditCard } from "react-icons/gr";
import { TbLogout, TbHome2, TbDeviceMobileMessage, TbShoppingCartDiscount, TbShoppingCartX, TbShoppingCartPlus, TbArrowDownRightCircle } from "react-icons/tb";
import { FaTasks, FaRegUser, FaUserShield } from "react-icons/fa";
import { TfiLoop, TfiAnnouncement, TfiPulse, TfiCreditCard, TfiLayoutMediaOverlay, TfiGallery, TfiShoppingCartFull, TfiPieChart } from "react-icons/tfi";
import { CgList, CgUserList, CgViewList, CgDisplayGrid, CgMediaLive, CgReorder, CgProductHunt, CgShapeCircle } from "react-icons/cg";
import announcemnetsimg from "../../assets/announcemnets.jfif";
import { HiOutlineSpeakerphone, HiDotsCircleHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { logOut, setHeader, setActiveMenu } from '../../redux/reducers/authReducer';
import { useNavigate } from "react-router-dom";
import { BiTask } from "react-icons/bi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck, BsHeadset, BsDot } from "react-icons/bs";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../../assets/Cypro_logo.png"
import HappiLogo from "../../assets/HappiLogo.png";
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getOrganizations } from '../../redux/reducers/organizationReducer'
import Avatar from '../../components/Avatar'
import { avatarBrColors } from '../../environment'
import { changeCurrentOrg, setToggleMenu } from '../../redux/reducers/authReducer'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getUserNotificatinos } from '../../redux/reducers/userReducer'
import Card from 'react-bootstrap/Card';


// CYE-CHAMP routes
const routes = [
  {
    id:1,
    path: "/",
    name: "Dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    id:2,
    path: "",
    name: "CMS",
    icon: <MdOutlinePermMedia />,
    subRoutes: [
      {
        path: "/categories",
        name: "Categories",
        icon: <MdCategory />,
      },
      {
        path: "/Products",
        name: "Products",
        icon: <GrProductHunt />,
      },
      {
        path: "/media",
        name: "Media",
        icon: <TfiGallery />,
      },
      {
        path: "/banners",
        name: "Banners",
        icon: <TfiLayoutMediaOverlay />,
      },
      {
        path: "/relatedproducts",
        name: "Related Product",
        icon: <CgProductHunt />,
      },
      {
        path: "/productStock",
        name: "ProductStock & Price Update",
        icon: <BiRupee />,
      },
      {
        path: "/homepage",
        name: "Home Page",
        icon: <TbHome2 />,
      },
      // {
      //   path: "/happipages",
      //   name: "Happi Pages",
      //   icon: <TfiLoop />,
      // },
      {
        path: "/blogs",
        name: "Blogs",
        icon: <TbDeviceMobileMessage />,
      },
      {
        path: "/reviews",
        name: "Reviews",
        icon: <BiStar />,
      },
      {
        path: "/stores",
        name: "Stores",
        icon: <BiStoreAlt />,
      },
      {
        path: "/campaignbuilders",
        name: "Campaign Builders",
        icon: <TfiAnnouncement />,
      },
      {
        path: "/productcodes",
        name: "Product Codes",
        icon: <BiHash />,
      },
      {
        path: "/landingpages",
        name: "Landing Pages",
        icon: <TfiGallery />,
      },
    ]
  },
  {
    id:3,
    path: "",
    name: "Orders & Stock",
    icon: <TfiShoppingCartFull />,
    subRoutes: [
      {
        path: "/orders",
        name: "Orders",
        icon: <MdAddShoppingCart />,
      },
      {
        path: "/storesstockpage",
        name: "Store Stock Page",
        icon: <BiStore />,
      },
      {
        path: "/stockpriceupdate",
        name: "Stock & Price Updating",
        icon: <MdUpdate />,
      },
      {
        path: "/cartuserdetails",
        name: "Cart User Details",
        icon: <TbShoppingCartDiscount />,
      },
      {
        path: "/abandonedcart",
        name: "Abandoned Cart",
        icon: <TbShoppingCartX />,
      },
      {
        path: "/ingramordershappi",
        name: "Ingram Orders Happi",
        icon: <TbShoppingCartPlus />,
      },
      {
        path: "/bajajorders",
        name: "Bajaj Orders",
        icon: <BiCreditCard />,
      }
    ]
  },
  {
    id:4,
    path: "/",
    name: "User Management",
    icon: <CgUserList />,
    subRoutes: [
      {
        path: "/usershappi",
        name: "Users",
        icon: <BiUserCheck />,
      },
      {
        path: "/merchantdetails",
        name: "Merchant Details",
        icon: <BiUserVoice />,
      }
    ]
  },
  {
    id:5,
    path: "",
    name: "Offers & Vouchers",
    icon: <MdLocalOffer />,
    subRoutes: [
      {
        path: "/offers",
        name: "Offers",
        icon: <MdOutlineLocalOffer />,
      },
      {
        path: "/storeoffers",
        name: "Store Offers",
        icon: <MdOutlineLocalOffer />,
      },
      {
        path: "/couponcode",
        name: "OneTime CouponCode",
        icon: <MdOutlineLocalOffer />,
      },
      {
        path: "/vouchers",
        name: "Vouchers",
        icon: <MdOutlineLocalOffer />,
      },
    ]
  },
  {
    id:6,
    path: "",
    name: "Leads",
    icon: <MdAddchart />,
    subRoutes: [
      {
        path: "/campaignleads",
        name: "Campaign Leads",
        icon: <MdAddchart />,
      },
      {
        path: "/exportfilter",
        name: "Report & Export Filter ",
        icon: <MdAddchart />,
      },
      {
        path: "/employeeleads",
        name: "Employee Leads",
        icon: <MdAddchart />,
      },
    ]
  },
  // {
  //   path: "",
  //   name: "Following",
  //   icon: <TfiPulse />,
  //   subRoutes: [
  //     {
  //       path: "/followers",
  //       name: "Followers",
  //       icon: <CgList />,
  //     }
  //   ]
  // },
  // {
  //   path: "",
  //   name: "Global Settings",
  //   icon: <TfiPulse />,
  //   subRoutes: [
  //     {
  //       path: "/settings",
  //       name: "settings",
  //       icon: <CgList />,
  //     },
  //     {
  //       path: "/DeliveryIntegrations",
  //       name: "To Our Delivery Integrations",
  //       icon: <CgList />,
  //     },
  //     {
  //       path: "/Notification",
  //       name: "Notification Template",
  //       icon: <CgList />,
  //     },
  //     {
  //       path: "/CouponCodeTemplate",
  //       name: "CouponCode Template",
  //       icon: <CgList />,
  //     }
  //   ]
  // },
  {
    id:7,
    path: "",
    name: "Reports",
    icon: <MdPieChart />,
    subRoutes: [
      {
        path: "/BajajStock",
        name: "Bajaj Stock",
        icon: <CgList />,
      },
      {
        path: "/BajajStockMaster",
        name: "Bajaj Stock Master",
        icon: <CgList />,
      },
      {
        path: "/BajajStockReport",
        name: "Bajaj Stock Report",
        icon: <CgList />,
      },
      {
        path: "/AkshayaPatra",
        name: "Akshaya Patra",
        icon: <CgList />,
      },
      {
        path: "/FlipkartStockSync",
        name: "Flipkart Stock Sync",
        icon: <CgList />,
      },
      {
        path: "/StoreStockReport",
        name: "Store Stock Report",
        icon: <CgList />,
      },
      {
        path: "/EcomStockreport",
        name: "Ecom Stock report",
        icon: <CgList />,
      },
      {
        path: "/LeadsMISReports",
        name: "Leads MIS Reports",
        icon: <CgList />,
      },
      {
        path: "/OrdersReport",
        name: "Orders Report",
        icon: <CgList />,
      },
      {
        path: "/VoucherCodeReport",
        name: "Coupon & Voucher Code Report",
        icon: <CgList />,
      },
      {
        path: "/MobilesLeadsReports",
        name: "Laptop & Mobiles Leads Reports",
        icon: <CgList />,
      },
      {
        path: "/InfluencerLeads",
        name: "Influencer Leads",
        icon: <CgList />,
      },
      // {
      //   path: "/DashboardReports",
      //   name: "Dashboard Reports",
      //   icon: <TfiLoop />,
      // },
      {
        path: "/IngramStockReport",
        name: "Ingram Stock Report",
        icon: <CgList />,
      },
      {
        path: "/world-cup-moment",
        name: "World Cup Moment",
        icon: <CgList />,
      }
    ]
  },
  {
    id:8,
    path: "",
    name: "Logs",
    icon: <TfiLoop />,
    subRoutes: [
      {
        path: "/AkshayaPatraParticipation",
        name: "Akshaya patra Participation",
        icon: <TfiLoop />,
      },
      {
        path: "/AkshayaPatraCustomerMessages",
        name: "Akshaya patra customer messages",
        icon: <TfiLoop />,
      },
      {
        path: "/AkshayaPatraStoreManager",
        name: "Akshaya patra store manager",
        icon: <TfiLoop />,
      },
      {
        path: "/OneAssistSync",
        name: "One Assist Sync",
        icon: <TfiLoop />,
      },
      {
        path: "/employeeapplogs",
        name: "Employee Management App Logs",
        icon: <TfiLoop />,
      },
    ]
  },
  {
    id:9,
    path: "",
    name: "Orders Ingram",
    icon: <CgList />,
    subRoutes: [
      {
        path: "/IngramOrders",
        name: "Ingram Orders",
        icon: <CgList />,
      },
      {
        path: "/IngramStockReport",
        name: "Ingram Stock Report",
        icon: <TfiLoop />,
      }
    ]
  },
  {
    id:10,
    path: "",
    name: "New Ingram Stock",
    icon: <CgList />,
    subRoutes: [
      {
        path: "/IngramOrders",
        name: "New Ingram Stock",
        icon: <CgList />,
      }
    ]
  },
  {
    id:11,
    path: "/iphoneterminallogs",
    name: "iPhone Terminal Logs",
    icon: <MdPhoneIphone />,
    subRoutes: []
  },
  {
    id:12,
    path: "",
    name: "Dashboards",
    icon: <CgList />,
    subRoutes: [
      {
        path: "/dashboardtargetvsachievement",
        name: "Target vs achievement",
        icon: <CgList />,
      },
      {
        path: "/happipremierleague",
        name: "Happi Premier League",
        icon: <CgList />,
      },
    ]
  },
  {
    id:13,
    path: "",
    name: "MIS Reports",
    icon: <CgList />,
    subRoutes: [
      {
        path: "/bajajexcelupload",
        name: "Bajaj Excel Upload",
        icon: <CgList />,
      },
      {
        path: "/misreports",
        name: "Accessories",
        icon: <CgList />,
      },
      {
        path: "/targetandachievements",
        name: "Targets Vs Achievements",
        icon: <CgList />,
      },
      {
        path: "/happicare",
        name: "Happi Care",
        icon: <CgList />,
      },
      {
        path: "/flashguardreport",
        name: "Flash Guard Report",
        icon: <CgList />,
      },
      {
        path: "/branchandbrandwisevalue",
        name: "Branch and Brand Wise Value",
        icon: <CgList />,
      },
      {
        path: "/branchandbrandwisequantity",
        name: "Branch and Brand Wise Qty",
        icon: <CgList />,
      },
      {
        path: "/accessoriesbranch-productmtd-vs-lmtd",
        name: "Accessories Branch,Product MTD vs LMTD",
        icon: <CgList />,
      },
      {
        path: "/itemmodelwise-mtd-vs-lmtd-qty",
        name: "Item Model wise MTD Vs LMTD qty",
        icon: <CgList />,
      },
      {
        path: "/brand-wise-asp-mobiles",
        name: "Brand Wise ASP-Mobiles",
        icon: <CgList />,
      },
      {
        path: "/datewise-qty-and-valuedata",
        name: "Date wise Qty and Value Data",
        icon: <CgList />,
      },
      {
        path: "/branch-wise-qty-and-valuedata",
        name: "Branch wise Qty and Value Data",
        icon: <CgList />,
      },
      {
        path: "/brand-wise-asp-accessories",
        name: "Brand Wise ASP- Accessories",
        icon: <CgList />,
      },
      {
        path: "/vivoandoppo",
        name: "Vivo and Oppo",
        icon: <CgList />,
      },
      {
        path: "/tvs",
        name: "Tvs",
        icon: <CgList />,
      },
      {
        path: "/brandwise-happicare-data",
        name: "Brand Wise HappiCare Data",
        icon: <CgList />,
      },
      {
        path: "/ftdandmtdgrowth",
        name: "4 Pillars",
        icon: <CgList />,
      },
      {
        path: "/gpreports",
        name: "GP Reports",
        icon: <CgList />,
      },
      {
        path: "/growthpricereports",
        name: "Gross Profit",
        icon: <CgList />,
        id: 'sub-1',
        childRoutes: [
          {
            path: "/brandwisemobiles",
            name: "Brand Wise - Mobiles",
            icon: <CgList />,
          },
          {
            path: "/productwiseaccessories",
            name: "Product Wise - Accessories",
            icon: <CgList />,
          },
          {
            path: "/branchwisemobiles",
            name: "Branch Wise - Mobiles",
            icon: <CgList />,
          },
          {
            path: "/branchwiseaccessories",
            name: "Branch Wise - Accessories",
            icon: <CgList />,
          },
          {
            path: "/itemmodelwisemobiles",
            name: "Item Model Wise - Mobiles",
            icon: <CgList />,
          },
          {
            path: "/itemmodelwiseaccessories",
            name: "Item Model Wise - Accessories",
            icon: <CgList />,
          }
        ]
      },
      {
        path: "/purchasereports",
        name: "Purchase Reports",
        icon: <CgList />,
      },
      {
        path: "/branch-targets",
        name: "Branch Targets",
        icon: <CgList />,
      }
    ]
  },
  {
    id:14,
    path: "/manufacturingproducts",
    name: "Manufacturing Products",
    icon: <CgList />,
    subRoutes: []
  },
  {
    id:15,
    path: "/salereturn",
    name: "Sale Return",
    icon: <CgList />,
    subRoutes: []
  },
]
const SideBar = ({ children }) => {
  const isOpen = useSelector((state)=> state.auth.toggleSideMenu)
  const toggle = () => dispatch(setToggleMenu(!isOpen))
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userLogout = (event) => {
    event.preventDefault()
    dispatch(logOut())
    navigate('/')
  }
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const [showSwapOrg, setSwapOrg] = useState(false)
  const [showNotification, setNotifications] = useState(false)
  const [showAnnouncements, setAnnouncements] = useState(false)
  const orgList = useSelector((state) => state.organization.organizationsList)
  const available_organizations = useSelector((state) => state.auth.available_organizations)
  const userDetails = useSelector((state) => state.auth.userDetails)
  const current_organization = useSelector((state) => state.auth.current_organization)
  const orgDetails = orgList.find((item) => item.id == current_organization)
  const notificationList = useSelector((state) => state.users.notificationList)
  const accessFor = useSelector((state) => state.auth.accessFor);
  const headLine = useSelector((state => state.auth.pageHeading));
 
  useEffect(() => {
    // dispatch(getOrganizations(available_organizations))
    // dispatch(getUserNotificatinos(userDetails.id))
  }, [])


  const changeOrganization = (id) => {
    // console.log('changeOrganization', id)
    dispatch(changeCurrentOrg(id)).then((res) => {
      window.location.reload()
      dispatch(getOrganizations(available_organizations))
    })

  }

  function isAccess(name){
    if(accessFor.includes(name)){
      return true
    }
  }

  const navLinkClicked = (name) => {
    dispatch(setActiveMenu(null))
    dispatch(setHeader(name))
  }

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "400px" : "64px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            {/* Changing the LOGO */}

            {isOpen ? (
              <div>
                <img
                  src={HappiLogo}
                  width="42px"
                  onClick={() => navigate("/")}
                />
              </div>
            ) : (
              <div className="logo_img">
                <img
                  className=""
                  src={HappiLogo}
                  onClick={() => navigate("/")}
                />
              </div>
            )}
          </div>

          <section className="routes nav_auto_scroll" style={{ "paddingLeft": !isOpen ? "0.8rem" : "" }}>
            {routes.map((route, index) => {
              if (isAccess(route.name)) {
                if (route?.subRoutes.length > 0) {
                  return (
                    <SidebarMenu
                      key={index}
                      setIsOpen={() => dispatch(setToggleMenu(!isOpen))}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                      className="sm-item"
                    />
                  );
                }else {
                  return(
                    <NavLink to={route?.path} className={route.name == headLine ? "link link-new-nav active-link" : "link link-new-nav"} onClick={() => navLinkClicked(route.name)}>
                      <div className="icon" key={index}>
                        {route?.icon}
                      </div>
                      <motion.div className={route.name == headLine ? "link_text" : "link_text"} style={{marginLeft: "6px"}}>
                        {route?.name}
                      </motion.div>
                  </NavLink>
                  )
                }

                // return (
                //   <NavLink
                //     to={route.path}
                //     key={index}
                //     className="link"
                //     activeclassname="side-active"
                //   >
                //     <div className="icon_svg">{route.icon}</div>
                //     <AnimatePresence>
                //       {isOpen && (
                //         <motion.div
                //           variants={showAnimation}
                //           initial="hidden"
                //           animate="show"
                //           exit="hidden"
                //           className="link_text"
                //         >
                //           {route.name}A
                //         </motion.div>
                //       )}
                //     </AnimatePresence>
                //   </NavLink>
                // );
              }
            })}
            {/* <div class="bottom-nav link" onClick={(e) => userLogout(e)}>
              <div className="icon_svg">
                <TbLogout />{" "}
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    Logout
                  </motion.div>
                )}
              </AnimatePresence>
            </div> */}
          </section>
        </motion.div>

        <main>
          {/* <Navbar className="nav-fix">
            <Container fluid>
              <Navbar.Brand><div className="bars">
                <FaBars onClick={toggle} />
              </div> </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse>
              <Navbar.Collapse className="justify-content-end">
              <a variant="light" className="navbar-btn" onClick={() => setNotifications(!showNotification)}><MdOutlineNotificationsNone />
              <span class="notifi-indicator pulsate"></span>

</a>
              <a variant="light" className="navbar-btn" onClick={() => setAnnouncements(!showAnnouncements)}>
                <HiOutlineSpeakerphone />
                <span class="notifi-indicator pulsate"></span>
</a>

                <a onClick={() => setSwapOrg(!showSwapOrg)}>{
                    orgDetails && <Avatar className='nav-avatar' color='--br-danger' initials={orgDetails.name.substring(0, 2).toUpperCase()} />
                  }</a>
              </Navbar.Collapse>
            </Container>
          </Navbar> */}
          {children}
        </main>
        {/* 
        <Offcanvas show={showAnnouncements} onHide={() => setAnnouncements(!showAnnouncements)} placement='end'>
          <Offcanvas.Header closeButton >
            <Offcanvas.Title>Announcements</Offcanvas.Title>
          </Offcanvas.Header>
          <hr />
          <Offcanvas.Body>
         <Card className=" announcemnts-cards mt-3">
         <Card.Img  className="announcemnt-image text-center p-2" variant="top" src={announcemnetsimg}  />
      <Card.Body>
      <Card.Title className="an-card-title"> Announcements Title </Card.Title>
        <Card.Text className="an-card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
          
         </Card>
         <Card className=" announcemnts-cards mt-3">
      <Card.Body>
        <Card.Title className="an-card-title"> Announcements Title 2</Card.Title>
        <Card.Text className="an-card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
          
         </Card>
         
         
          </Offcanvas.Body>
        </Offcanvas> */}

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
      </div>
    </>
  );
};

export default SideBar;

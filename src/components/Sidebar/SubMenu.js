import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setActiveSubMenu, setHeader} from '../../redux/reducers/authReducer';

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};
const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SubMenu = ({ route, showAnimation, isOpen, setIsOpen, key }) => {
  const dispatch = useDispatch();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSubMenu = useSelector((state => state.auth.activeSubMenu));
  const headLine = useSelector((state => state.auth.pageHeading));
  const toggleMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  // useEffect(()=>{
  //   dispatch(setActiveSubMenu(route.id))
  // }, [])

  // const [activeParent, setActiveParent] = useState(null);
  const handleParentClick = (parentId) => {
    // toggleMenu();
    if(parentId == activeSubMenu){
      toggleMenu()
      dispatch(setActiveSubMenu(null));
    } else {
      toggleMenu();
      dispatch(setActiveSubMenu(parentId));
    }
  };
  // console.log(activeSubMenu, 'ACTIVE', isSubMenuOpen, route.id, activeSubMenu != route.id);

  const activePage = (name) => {
    dispatch(setHeader(name));
  }

  return (
    <>
      <div className={activeSubMenu == route.id ? "sub_menu active_sub_menu" : "sub_menu"} onClick={() => handleParentClick(route.id)}>
        <div className="sub_child">
          <div className="icon">{route.icon}</div>
          <AnimatePresence>
            {(
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="link_text child_link"
                onClick={() => handleParentClick(route.id)}
              >
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {(
          <motion.div
            animate={
              !isSubMenuOpen
                ? {
                    rotate: -90,
                  }
                : { rotate: 0 }
            }
            className="sub-menu-arrow"
          >
            <FaAngleDown
              className={`parent ${activeSubMenu == route.id ? "active" : ""}`}
              onClick={() => handleParentClick(route.id)}
            />
          </motion.div>
        )}
      </div>{" "}
      <AnimatePresence>
        {isSubMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="sub_container"
          >
            {route?.childRoutes?.map((subRoute, i) => (
              <motion.div variants={menuItemAnimation} key={i} custom={i} className="second-child-menu" onClick={() => activePage(subRoute.name)}>
                <NavLink to={subRoute.path} className={
                      subRoute.name == headLine ? "link active-link" : "link"
                    }>
                  <div className="icon" key={i}>
                    {subRoute.icon}
                  </div>
                  <motion.div className="link_text">{subRoute.name}</motion.div>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}{" "}
      </AnimatePresence>
    </>
  );
};

export default SubMenu;

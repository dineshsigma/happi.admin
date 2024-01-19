import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SubMenu from "./SubMenu";
import { useDispatch, useSelector } from "react-redux";
import { setHeader, setActiveMenu, setActiveSubMenu } from "../../redux/reducers/authReducer";

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

const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen, key }) => {
  const dispatch = useDispatch();
  const headLine = useSelector((state => state.auth.pageHeading));
  const activeMenu = useSelector((state => state.auth.activeMenu));
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // setIsOpen(true);
  };
  useEffect(() => {
    dispatch(setActiveMenu(null));
  }, [isOpen])

  // const [activeParent, setActiveParent] = useState(null);
  const handleParentClick = (parentId) => {
    toggleMenu();
    // setActiveParent(parentId == activeParent ? null : parentId);
    dispatch(setActiveMenu(parentId == activeMenu ? null : parentId));
    dispatch(setActiveSubMenu(null));
  };

  const activePageHeader = (name) => {
    dispatch(setHeader(name))
    // setActivePage(name)
  }


  // useEffect(() => {
  //   if (!isOpen) {
  //     setIsMenuOpen(false);
  //   }
  // }, [isOpen]);
  // console.log(route.id, '-AAA', activeMenu, activeMenu == route.id)

  return (
    <>
      <div className={activeMenu == route.id ? "menu menu-active" : "menu"} onClick={() => handleParentClick(route.id)}>
        <div className="menu_item">
          <div className="icon">{route.icon}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="link_text"
                // onClick={() => handleParentClick(route.id)}
              >
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isOpen && (
          <motion.div
            animate={
              activeMenu != route.id
                ? {
                    rotate: -90,
                  }
                : { rotate: 0 }
            }
          >
            <FaAngleDown
              className={`parent ${activeMenu == route.id
                  ? "active"
                  : ""
              }`}
              // onClick={() => handleParentClick(route.id)}
            />
          </motion.div>
        )}
      </div>{" "}
      <AnimatePresence>
        {activeMenu == route.id && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            //animate={isOpen}
            exit="hidden"
            className="menu_container"
          >
            {route.subRoutes.map((subRoute, i) => (
              <motion.div variants={menuItemAnimation} key={i} custom={i} className="first-child-menu">
                {subRoute?.childRoutes && subRoute?.childRoutes?.length > 0 ? (
                  <SubMenu
                    key={i}
                    // setIsOpen={() => dispatch(setToggleMenu(!isOpen))}
                    route={subRoute}
                    showAnimation={showAnimation}
                    // isOpen={false}
                  />
                ) : (
                  <NavLink
                    to={subRoute.path}
                    className={
                      subRoute.name == headLine ? "link active-link" : "link"
                    }
                    onClick={() => activePageHeader(subRoute.name)}
                  >
                    <div className="icon" key={i}>
                      {subRoute.icon}
                    </div>
                    <motion.div
                      className={
                        subRoute.name == headLine
                          ? "link_text active-link"
                          : "link_text"
                      }
                    >
                      {subRoute.name}
                    </motion.div>
                  </NavLink>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}{" "}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;

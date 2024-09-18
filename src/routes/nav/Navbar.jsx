import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav
        className={`custom-sidebar ${isOpen ? "open" : ""} ${
          !isOpen ? "icons-only" : ""
        }`}
      >
        <Menu
          mode="inline"
          className="menu-container"
          style={{ width: isOpen ? "200px" : "60px", textAlign: "center" }}
        >
          <Menu.Item
            key="home"
            icon={<FontAwesomeIcon icon={faHome} />}
            onClick={toggleSidebar}
          >
            <NavLink to="/" exact activeClassName="active">
              {isOpen && <span>Home</span>}
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key="profile"
            icon={<FontAwesomeIcon icon={faUser} />}
            onClick={toggleSidebar}
          >
            <NavLink to="/profile" activeClassName="active">
              {isOpen && <span>Profile</span>}
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key="login"
            icon={<FontAwesomeIcon icon={faSignInAlt} />}
            onClick={toggleSidebar}
          >
            <NavLink to="/auth/login" activeClassName="active">
              {isOpen && <span>Login</span>}
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key="signup"
            icon={<FontAwesomeIcon icon={faUserPlus} />}
            onClick={toggleSidebar}
          >
            <NavLink to="/auth/signup" activeClassName="active">
              {isOpen && <span>Sign Up</span>}
            </NavLink>
          </Menu.Item>
        </Menu>
      </nav>

      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Navbar;

import logo from "../assets/images/logo.png";
import "../assets/css/header.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = ({ userName, protectedNav }) => {
  const [logoutBtn, setlogoutBtn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove auth token from localStorage or sessionStorage
    localStorage.removeItem("authToken"); // If token is in sessionStorage, use sessionStorage.removeItem('authToken')

    // Clear any other stored user information if needed
    // e.g., localStorage.removeItem('userData');

    // Redirect user to login page
    navigate("/login");

    // Optionally: you can display a logout success message
    console.log("User logged out successfully");
  };
  return (
    <>
      <nav className="navBar">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="butonDiv">
          <button>Contact</button>
          {protectedNav && (
            <>
              {" "}
              <div className="yourName">
                <div className="nameImg"></div>
                <p>{userName ? userName?.split(" ")[0] : "Name"}</p>
                <MdOutlineArrowDropDown
                  className="iconDown"
                  onClick={() => setlogoutBtn(!logoutBtn)}
                />

                <div
                  style={logoutBtn ? { display: "flex" } : { display: "none" }}
                  className="hoverDiv"
                >
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>{" "}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;

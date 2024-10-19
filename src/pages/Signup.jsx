import "../assets/css/signup.css";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import axios from "axios";
import { endPoints } from "../config/appConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    companyName: "",
    companyEmail: "",
    employeeSize: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const url = endPoints().signupUrl;
    try {
      const response = await axios.post(url, formData);
      if (response.status == 201) {
        toast.success("User registered successfully");
        navigate("/verify", {
          state: { email: formData.companyEmail, phone: formData.phoneNumber },
        });
      }
    } catch (error) {
      console.error("Error registering user", error.response.data);
      toast.error(error.response.data?.message);
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="leftBox">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, error
            vitae! Eaque adipisci odio nemo tempora id eveniet explicabo cum
            temporibus qui laudantium quo modi sequi.
          </p>
        </div>
        <div className="rightBox">
          <div className="textRight">
            <h2>Sign Up</h2>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="inputBox">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <div className="iconBox">
              <FiUser />
            </div>
          </div>
          <div className="inputBox">
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone no."
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <div className="iconBox">
              <LuPhone />
            </div>
          </div>
          <div className="inputBox">
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleInputChange}
            />
            <div className="iconBox">
              <FiUser />
            </div>
          </div>
          <div className="inputBox">
            <input
              type="text"
              name="companyEmail"
              placeholder="Company Email"
              value={formData.companyEmail}
              onChange={handleInputChange}
            />
            <div className="iconBox">
              <MdOutlineMailOutline />
            </div>
          </div>
          <div className="inputBox">
            <input
              type="text"
              name="employeeSize"
              placeholder="Employee Size"
              value={formData.employeeSize}
              onChange={handleInputChange}
            />
            <div className="iconBox">
              <GrGroup />
            </div>
          </div>
          <div className="conditionBox">
            <span>
              By clicking on proceed you will accept our <a href="">Terms</a> &{" "}
              <a href="">Conditions</a>
            </span>
          </div>
          <button
            className="proceedBtn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed"}
          </button>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default Signup;

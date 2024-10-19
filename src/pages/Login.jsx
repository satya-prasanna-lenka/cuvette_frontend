import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (email && phone) {
      // Navigate to the OTP page and pass email and phone as state
      navigate("/verify", { state: { email, phone } });
    } else {
      alert("Please fill in both email and phone number.");
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
        <div className="rightBox loginRight">
          <div className="textRight">
            <h2>Login</h2>
            <p>Enter your email and phone to proceed.</p>
          </div>

          <div className="inputBox">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
            <div className="iconBox">
              <MdOutlineMailOutline />
            </div>
          </div>

          <div className="inputBox">
            <input
              type="text"
              placeholder="Mobile"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} // Update phone state
            />
            <div className="iconBox">
              <LuPhone />
            </div>
          </div>

          <button className="proceedBtn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;

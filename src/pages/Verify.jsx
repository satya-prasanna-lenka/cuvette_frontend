import { useEffect, useState } from "react";
import { FcOk } from "react-icons/fc";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { endPoints } from "../config/appConfig";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendOtpFunc = async () => {
    setLoading(true);
    setError(null);
    const url = endPoints().sendOtpUrl;
    const formData = {
      email: location.state?.email,
      phoneNumber: location.state?.phone,
    };
    try {
      const response = await axios.post(url, formData);
      if (response.status === 200) {
        toast.success("OTP sent");
      }
    } catch (error) {
      console.error(error.response?.data);
      toast.error(error.response?.data?.message);
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError(null);

    const url = endPoints().verifyOtpUrl;
    const formData = {
      email: location.state?.email,
      phoneNumber: location.state?.phone,
      emailOtp: emailOtp || undefined, // Send email OTP if it's provided
      phoneOtp: phoneOtp || undefined, // Send phone OTP if it's provided
    };

    try {
      const response = await axios.post(url, formData);

      if (response.status === 200) {
        const { emailVerified, phoneVerified, token } = response.data;

        // If both are verified, handle token (e.g., save it, log the user in, etc.)
        if (emailVerified && phoneVerified) {
          setEmailVerified(true);
          setPhoneVerified(true);
          if (token) {
            // Store token or use it for session creation
            localStorage.setItem("authToken", JSON.stringify(token));
            toast.success("Both OTPs verified, session created");
            navigate("/"); // Redirect to dashboard or home page
          }
        } else if (emailVerified) {
          setEmailVerified(true);
          toast.success("Email OTP verified");
        } else if (phoneVerified) {
          setPhoneVerified(true);
          toast.success("Phone OTP verified");
        }
      }
    } catch (error) {
      console.error(error.response?.data);
      toast.error(error.response?.data?.message);
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.phone && location.state?.email) {
      sendOtpFunc();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container">
      <div className="leftBox">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, error
          vitae! Eaque adipisci odio nemo tempora id eveniet explicabo cum
          temporibus qui laudantium quo modi sequi.
        </p>
      </div>
      <div className="rightBox loginRignt">
        <div className="textRight">
          <h2>Verify OTP</h2>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>

        {/* Email OTP Input */}
        <div className="inputBox">
          <input
            type="text"
            placeholder="Email OTP"
            value={emailOtp}
            onChange={(e) => setEmailOtp(e.target.value)}
            disabled={emailVerified}
          />
          <div className="iconBox">
            <MdOutlineMailOutline />
          </div>
          <div className="verifiedIcon">{emailVerified && <FcOk />}</div>
        </div>
        <button
          className="proceedBtn"
          onClick={() => verifyOtp("email")}
          disabled={emailVerified}
        >
          {emailVerified ? "Verified" : "Verify"}
        </button>

        {/* Phone OTP Input */}
        <div className="inputBox">
          <input
            type="text"
            placeholder="Mobile OTP"
            value={phoneOtp}
            onChange={(e) => setPhoneOtp(e.target.value)}
            disabled={phoneVerified}
          />
          <div className="iconBox">
            <LuPhone />
          </div>
          <div className="verifiedIcon">{phoneVerified && <FcOk />}</div>
        </div>
        <button
          className="proceedBtn"
          onClick={() => verifyOtp("phone")}
          disabled={phoneVerified}
        >
          {phoneVerified ? "Verified" : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default Verify;

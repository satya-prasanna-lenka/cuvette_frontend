import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { endPoints } from "../config/appConfig";
import axios from "axios";
import Loading from "../components/Loading";

const ProtectedLayout = () => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const getData = (token) => {
    setLoading(true);
    const url = endPoints().testUrl;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          // positionId: positionId,
        },
      })
      .then((res) => {
        setUserName(res.data.name);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Autentication failed, Please login again");
        navigate("/signup");
      });
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authToken"));

    getData(token);
  }, []);
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      <header className="myHeader">
        <Header userName={userName} protectedNav={true} />
      </header>

      <main>
        <Sidebar />
        <div className="defaultStyle">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default ProtectedLayout;

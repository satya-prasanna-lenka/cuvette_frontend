import "./App.css";

import { Routes, Route } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import ProtectedLayout from "./layout/ProtectedLayout";
import Home from "./pages/Home";
import AddInterview from "./pages/AddInterview";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<ProtectedLayout />}>
          <Route index element={<Home />} />
          <Route path="/addInterview" element={<AddInterview />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

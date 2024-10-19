import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const UserLayout = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;

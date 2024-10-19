import { BiSolidHome } from "react-icons/bi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <BiSolidHome className="homeIcon" />
      </Link>
    </div>
  );
};

export default Sidebar;

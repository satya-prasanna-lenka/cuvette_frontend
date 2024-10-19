import { Link } from "react-router-dom";
import "../assets/css/home.css";
const Home = () => {
  return (
    <div className="homePage">
      <Link to="/addInterview">
        <button>Create Interview</button>
      </Link>
    </div>
  );
};

export default Home;

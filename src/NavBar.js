import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar=() => {

    return(
        <nav className="navbar">
            <div>
                <ul>
                <Link to="/"><li>Home</li></Link>
                <Link to="/form"><li>Create Certificate</li></Link>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
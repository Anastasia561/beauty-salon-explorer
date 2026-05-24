import "./NavBar.css";
import logo from "../../../public/salon.png";

const NavBar = () => {
    return (
        <div className="header">
            <div className="header-left">
                <img src={logo} alt="Salon Logo" className="logo"/>
                <h1 className="title">Beauty Salon Explorer</h1>
            </div>
        </div>
    );
};

export default NavBar;
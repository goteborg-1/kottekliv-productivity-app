import { NavLink } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import menuItems from "./navData"
import logo from "../../assets/kottekliv-logo.png"
import "./Header.css"

function Header() {

  return (
    <header>
      <div className="main-part">

        <div className="logo-container">
          <img src={logo} alt="logo" className="logo"/>
          <h1>Kottekliv</h1>
        </div>
        
        <nav>
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              /* Adds the "active" class if the item matches the current page */
              className={({ isActive }) => (isActive ? "active nav-item" : "nav-item")}
              aria-label={item.title}
            >
              {/* Calls changePage to switch views in the main component when clicked */}
              <span className="icon">{item.icon}</span>
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="theme-part">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
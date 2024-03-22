import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return <nav>
    <NavLink to="/">
      Study <span>Blog</span>
    </NavLink>
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/About">Sobre</NavLink>
      </li>
    </ul>
  </nav>;
};

export default Navbar;
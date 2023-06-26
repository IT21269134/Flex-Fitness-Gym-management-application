import React from "react";

function NavBar() {
    return(
    // navBar
    <nav className="navbar navbar-light bg-light px-3">
    <a className="navbar-brand" href="#">Navbar</a>
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a className="nav-link" href="./login">Add user</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="./reg">RegisterForm</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</a>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#scrollspyHeading3">Third</a></li>
          <li><a className="dropdown-item" href="#scrollspyHeading4">Fourth</a></li>
          <li><hr className="dropdown-divider"/></li>
          <li><a className="dropdown-item" href="#scrollspyHeading5">Fifth</a></li>
        </ul>
      </li>
    </ul>
  </nav>



    );
}

export default NavBar;
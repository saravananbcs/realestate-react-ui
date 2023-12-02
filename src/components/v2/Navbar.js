import React from "react";

import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const Navbar = (props) => {
  const { listOfRentals } = props;
  const scrollToAbout = () => {
    scroll.scrollTo("aboutSection", {
      duration: 800,
      offset: -50, // Adjust this value to fine-tune the scroll position
      smooth: "easeInOutQuad",
    });
  };

  return (
    <div className="container-fluid nav-bar bg-transparent">
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
        <a
          href="index.html"
          className="navbar-brand d-flex align-items-center text-center"
        >
          <div className="icon p-2 me-2">
            <img
              className="img-fluid"
              src="img/icon-deal.png"
              alt="Icon"
              style={{ width: "30px", height: "30px" }}
            />
          </div>
          <h1 className="m-0 text-primary">Cozy Rentals</h1>
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {listOfRentals.length == 0 && (
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto">
              {" "}
              <ScrollLink
                to="homeSection"
                className="nav-item nav-link active"
                spy={true}
                smooth={true}
                duration={500}
              >
                Home
              </ScrollLink>
              <ScrollLink
                to="searchSection"
                className="nav-item nav-link"
                spy={true}
                smooth={true}
                duration={500}
              >
                Search
              </ScrollLink>
              <ScrollLink
                to="aboutSection"
                className="nav-item nav-link"
                spy={true}
                smooth={true}
                duration={500}
              >
                About
              </ScrollLink>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import routes from "routes.js";
import SearchComponent from "./SearchComponent";

function Header({ isLogin }) {
  const location = useLocation();
  const navigate = useHistory();

  // Function to toggle mobile sidebar
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  // Function to get the brand text based on the current route
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  // Check if the current route is either /deployment/data_view or /deployment/map_view
  const showSearchComponent =
    location.pathname === "/deployment/data_view" ||
    location.pathname === "/deployment/map_view";

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            <Nav.Item>
              <Nav.Link
                data-toggle="dropdown"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                className="m-0"
              >
                <span className="d-lg-none ml-1">Dashboard</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {/* Conditionally render the SearchComponent */}
          {showSearchComponent && (
            <Nav className="ml-auto" navbar>
              <Nav.Item>
                <SearchComponent />
              </Nav.Item>
            </Nav>
          )}
          <Nav className="ml-auto" navbar>
            {isLogin === "yes" && (
              <Nav.Item>
                <Nav.Link
                  className="m-0"
                  onClick={() => {
                    localStorage.setItem("is_login", "no");
                    localStorage.removeItem("currentUser");
                    window.location.replace("/deployment/map_view");
                  }}
                >
                  <span className="no-icon">Log out</span>
                </Nav.Link>
              </Nav.Item>
            )}
            {localStorage.getItem("is_login") === "no" && (
              <Nav.Item>
                <Nav.Link
                  className="m-0"
                  onClick={() => {
                    window.location.replace("/pages/login");
                  }}
                >
                  <span className="no-icon">Login</span>
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
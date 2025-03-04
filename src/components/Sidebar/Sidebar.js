/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component,useState,useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav, Button, Card } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import logo from "assets/img/reactlogo.png";
// import AddPostModal from "../../views/pages/posts/AddPostModal";
import AddPostModal from "views/pages/posts/AddPostModal";

function Sidebar({ color, image, routes,deployment,user,isLogin }) {
  const [modalShow, setModalShow] = useState(false);
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // console.log('sidbared deployment');
  // console.log(deployment);
  // console.log('sidbared user');
  // console.log(user);
    useEffect(() => {
  let deployment = localStorage.getItem('deployment');
    if (deployment && deployment !== undefined) {
    //  alert('seting exit')
    }else{
      // alert('not seting exit')
      window.location.replace('/pages/login');
    }
  }, [location]);

  return (<>
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")"
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="/pages/welcome"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img src={require("assets/img/reactlogo.png")} alt="..." />
            </div>
          </a>
          <a className="simple-text" href="">
            Overwatch
          </a>
        </div>
        {/* <li className="nav-link"><Button variant="warning">Warning</Button></li> */}
        <Nav>
          {/* <Card.Header>
        <Card.Title as="h4">100 Awesome Nucleo Icons</Card.Title> */}
          <div className="flex-1 items-center" style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: "20px", paddingRight: 20 }}>
            <p className="card-category text-sm uppercase" style={{ fontStyle: "italic" }}>
              {deployment?.name}

            </p>
            <a href="https://nucleoapp.com/?ref=1712" style={{ fontSize: "0.9em", color: "#FF9500" }}> {deployment?.email}</a>
          </div>
          <hr style={{ backgroundColor: "#fff", color: "#fff" }} />

          {/* </Card.Header> */}
          <li>
            {/* <Button

              className="nav-link"
              activeClassName="active"
              variant="warning"
              onClick={() => setModalShow(true)}
            >
              <i className='nc-icon nc-simple-add' />
              <p>Add New Post</p>
            </Button> */}
            <NavLink
              to='post'
              className="nav-link border" style={{border:'2px solid red'}}
              activeClassName="active"
              variant="warning"
            >
              <i className="nc-icon nc-simple-add" />
              <p className="text-[#FF9500]">Add New Post</p>
            </NavLink>
          </li>
          <hr style={{ backgroundColor: "#fff", color: "#fff" }} />
          
           
           
             <li className={
            activeRoute('deployment/map_view')
          }>
            <NavLink
              to='map_view'
              className="nav-link"
              activeClassName="active"
            >
              <i className="nc-icon nc-pin-3" />
              <p>Map View</p>
            </NavLink>
          </li>
          <li className={
            activeRoute('deployment/data_view')
          }>
            <NavLink
              to='data_view'
              className="nav-link"
              activeClassName="active"
            >
              <i className="nc-icon nc-layers-3" />
              <p>Data View</p>
            </NavLink>
          </li>
          
          <li className={
            activeRoute('deployment/activity')
          }>
            <NavLink
              to='activity'
              className="nav-link"
              activeClassName="active"
            >
              <i className="nc-icon nc-bullet-list-67" />
              <p>Activity</p>
            </NavLink>
          </li>
          {isLogin == 'yes' && 
          <li className={
            activeRoute('deployment/settings')
          }>
           
            <NavLink
              to='settings'
              className="nav-link"
              activeClassName="active"
            >
              <i className="nc-icon nc-settings-gear-64" />
              <p>Settings</p>
            </NavLink>
           
          </li>
          
          }
          
          {/* {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })} */}
          <hr style={{ backgroundColor: "#fff", color: "#fff" }} />
          <li className={
            activeRoute('deployment/collections')
          }>
            <NavLink
              to='collections'
              className="nav-link"
              activeClassName="active"
            >
              <i className="nc-icon nc-grid-45" />
              <p>Collections</p>
            </NavLink>
          </li>
          <li className={
            activeRoute('deployment/help')
          }>
            <NavLink
              to='help'
              className="nav-link"
              activeClassName="active"
            >
              <i className="nc-icon nc-caps-small" />
              <p>Help</p>
            </NavLink>
          </li>
          {isLogin == 'yes' && 
          <li className={
            activeRoute('deployment/user')
          }>
            <NavLink
              to='user'
              className="nav-link"
              activeClassName="active"
            >
              <i className="nc-icon  nc-circle-09" />
              <p>User Profile</p>
            </NavLink>
          </li>
}
        </Nav>
      </div>
    </div>
    {/* <AddPostModal
    show={modalShow}
    onHide={() => setModalShow(false)}
  /> */}
  </>);
}

export default Sidebar;

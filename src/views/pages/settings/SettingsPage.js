import { React, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Tab
} from "react-bootstrap";
import { useLocation, NavLink } from "react-router-dom";
import GeneralSettingsPage from "./GeneralSettingsPage";
import SurveysPage from "./SurveysPage";
import CategoryPage from "./CategoryPage";
import UsersPage from "./UsersPage";
import RolesPage from "./RolesPage";

function SettingsPage() {
  const [currentPage, setCurrentPage] = useState('general');
  const toggleCurrentPage = (page) => {
    setCurrentPage(page);

}
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="3">
            <Card className="card-SettingsPage p-2 pr-4 grid grid-cols-2 gap-1 max-h-[570px] overflow-y-auto scrollbar scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400">
              <div onClick={() => toggleCurrentPage('general')} className={`min-h-[110px] shadow-sm rounded-sm cursor-pointer border border-1  border-gray-500 py-3 px-2 hover:text-[#FF9500] hover:border-y-yellow-600  ${currentPage == 'general' ? 'text-[#FF9500]' : 'text-[#000]' }`} >
                <div className="flex items-start gap-3">

                  <i className="nc-icon nc-pin-3 " style={{ fontSize: "30px" }} />
                  <h style={{ fontSize: "1.4em" }}>General</h>

                </div>
                <p className="text-gray-500 mt-2 " style={{ fontSize: "13px" }}>Change your deployment name, description, logo and other details</p>
              </div>
              
              <div onClick={() => toggleCurrentPage('surveys')} className={`min-h-[110px] shadow-sm rounded-sm cursor-pointer border border-1  border-gray-500 py-3 px-2 hover:text-[#FF9500] hover:border-y-yellow-600  ${currentPage == 'surveys' ? 'text-[#FF9500]' : 'text-[#000]' }`} >
                <div className="flex items-start gap-3">

                  <i className="nc-icon nc-pin-3 " style={{ fontSize: "30px" }} />
                  <h style={{ fontSize: "1.4em" }}>Surveys</h>

                </div>
                <p className="text-gray-500 mt-2 " style={{ fontSize: "13px" }}>Change your deployment name, description, logo and other details</p>
              </div>
              <div onClick={() => toggleCurrentPage('category')} className={`min-h-[110px] shadow-sm rounded-sm cursor-pointer border border-1  border-gray-500 py-3 px-2 hover:text-[#FF9500] hover:border-y-yellow-600  ${currentPage == 'category' ? 'text-[#FF9500]' : 'text-[#000]' }`} >
                <div className="flex items-start gap-3">

                  <i className="nc-icon nc-pin-3 " style={{ fontSize: "30px" }} />
                  <h style={{ fontSize: "1.4em" }}>Category</h>

                </div>
                <p className="text-gray-500 mt-2 " style={{ fontSize: "13px" }}>Change your deployment name, description, logo and other details</p>
              </div>
              <div onClick={() => toggleCurrentPage('users')} className={`min-h-[110px] shadow-sm rounded-sm cursor-pointer border border-1  border-gray-500 py-3 px-2 hover:text-[#FF9500] hover:border-y-yellow-600  ${currentPage == 'users' ? 'text-[#FF9500]' : 'text-[#000]' }`} >
                <div className="flex items-start gap-3">

                  <i className="nc-icon nc-pin-3 " style={{ fontSize: "30px" }} />
                  <h style={{ fontSize: "1.4em" }}>Users</h>

                </div>
                <p className="text-gray-500 mt-2 " style={{ fontSize: "13px" }}>Change your deployment name, description, logo and other details</p>
              </div>
              <div onClick={() => toggleCurrentPage('roles')} className={`min-h-[110px] shadow-sm rounded-sm cursor-pointer border border-1  border-gray-500 py-3 px-2 hover:text-[#FF9500] hover:border-y-yellow-600  ${currentPage == 'roles' ? 'text-[#FF9500]' : 'text-[#000]' }`} >
                <div className="flex items-start gap-3">

                  <i className="nc-icon nc-pin-3 " style={{ fontSize: "30px" }} />
                  <h style={{ fontSize: "1.4em" }}>Roles</h>

                </div>
                <p className="text-gray-500 mt-2 " style={{ fontSize: "13px" }}>Change your deployment name, description, logo and other details</p>
              </div>

            </Card>

          </Col>
          <Col md="9">
            {currentPage == 'general' &&
              <GeneralSettingsPage />
            }
            {currentPage == "surveys" &&
              <SurveysPage />
            }
            {currentPage == "category" &&
              <CategoryPage />
            }
            {currentPage == "users" &&
              <UsersPage />
            }
            {currentPage == "roles" &&
              <RolesPage />
            }
            


          </Col>

        </Row>
      </Container>
    </>
  );
}

export default SettingsPage;

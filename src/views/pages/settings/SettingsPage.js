import { React, useState,useEffect } from "react";

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

import { useLocation,useHistory } from "react-router-dom";

import {toggleLoadingBar,selectLoadingBar,toggleToaster,selectToasterData,selectToasterStatus} from 'provider/features/helperSlice';
import { useSelector, useDispatch } from 'react-redux';
import LoadingIcon from 'others/icons/LoadingIcon';
import  axiosInstance  from "services/axios";
import {login,logout, selectUser} from 'provider/features/userSlice';


import GeneralSettingsPage from "./general/GeneralSettingsPage";
import SurveysPage from "./surveys/SurveysPage";
import CategoryPage from "./categories/CategoryPage";
import UsersPage from "./users/UsersPage";
import RolesPage from "./roles/RolesPage";

function SettingsPage() {
  const [pending, setPending] = useState(false);
  const [pendingComplete, setPendingComplete] = useState(false);
  const [deploymentData, setDeploymentData] = useState(false);
  let locat = useLocation();
   const dispatch = useDispatch();
  let navigate = useHistory();
  const [currentPage, setCurrentPage] = useState('general');

  const toggleCurrentPage = (page) => {
    setCurrentPage(page);
}
useEffect(()=>{
  let deployment = localStorage.getItem('deployment');
  if (deployment && deployment !== undefined) { 
    // let dData = JSON.parse(localStorage.getItem('deployment') ?? '{}');
     getDeploymentData(JSON.parse(deployment).id);
   
    // console.log(JSON.parse(deployment));
    // console.log(JSON.parse(deployment).id);
  }
  
},[]);

const getDeploymentData = async (deployment_id)=>{
  try {
    setPending(true);
      const response = await axiosInstance.get('getDeploymentData/'+deployment_id,
        {
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem('access')}`
           },
          //   withCredentials: true
        }
    );
    // console.log(response)
    
    // console.log(JSON.stringify(response?.data));
   if(response?.data){
    let dData = response?.data?.deployment_data;
    setDeploymentData(dData);
    // console.log(dData);
    setPending(false);

   }
    } catch (err) {
      
      if (!err?.response) {
      dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:"Loading Failed, Check your internet and try again"}}))
    } else if (err.response?.status === 400) {
       dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:loginErrors}}))
    } else if (err.response?.status === 401) {
      dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:err?.response.data['detail']}}))

    } else {
      
      dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:"Loading Failed, Check your internet and try again"}}))
      
    }
  
    }



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
                <p className="text-gray-500 mt-2 " style={{ fontSize: "13px" }}>Create and configure the surveys your deployment collects</p>
              </div>
              <div onClick={() => toggleCurrentPage('category')} className={`min-h-[110px] shadow-sm rounded-sm cursor-pointer border border-1  border-gray-500 py-3 px-2 hover:text-[#FF9500] hover:border-y-yellow-600  ${currentPage == 'category' ? 'text-[#FF9500]' : 'text-[#000]' }`} >
                <div className="flex items-start gap-3">

                  <i className="nc-icon nc-pin-3 " style={{ fontSize: "30px" }} />
                  <h style={{ fontSize: "1.4em" }}>Category</h>

                </div>
                <p className="text-gray-500 mt-2 " style={{ fontSize: "13px" }}>Create categories that your post can be grouped under</p>
              </div>
              <div onClick={() => toggleCurrentPage('users')} className={`min-h-[110px] shadow-sm rounded-sm cursor-pointer border border-1  border-gray-500 py-3 px-2 hover:text-[#FF9500] hover:border-y-yellow-600  ${currentPage == 'users' ? 'text-[#FF9500]' : 'text-[#000]' }`} >
                <div className="flex items-start gap-3">

                  <i className="nc-icon nc-pin-3 " style={{ fontSize: "30px" }} />
                  <h style={{ fontSize: "1.4em" }}>Users</h>

                </div>
                <p className="text-gray-500 mt-2 " style={{ fontSize: "13px" }}>Manage People contributing to your deployment</p>
              </div>
              <div onClick={() => toggleCurrentPage('roles')} className={`min-h-[110px] shadow-sm rounded-sm cursor-pointer border border-1  border-gray-500 py-3 px-2 hover:text-[#FF9500] hover:border-y-yellow-600  ${currentPage == 'roles' ? 'text-[#FF9500]' : 'text-[#000]' }`} >
                <div className="flex items-start gap-3">

                  <i className="nc-icon nc-pin-3 " style={{ fontSize: "30px" }} />
                  <h style={{ fontSize: "1.4em" }}>Roles</h>

                </div>
                <p className="text-gray-500 mt-2 " style={{ fontSize: "13px" }}>Create and manage user permissions</p>
              </div>

            </Card>

          </Col>
          <Col md="9">
            {currentPage == 'general' &&
              <GeneralSettingsPage  organizationSizes ={deploymentData?.organization_sizes} deploymentCategories={deploymentData?.deployment_categories} />
            }
            {currentPage == "surveys" &&
              <SurveysPage surveys={deploymentData?.surveys}/>
            }
            {currentPage == "category" &&
              <CategoryPage categories={deploymentData?.categories}/>
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

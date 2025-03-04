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
import Spinner from 'react-bootstrap/Spinner';

import { CiEdit } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import SinglePostListCard from "./SinglePostListCard";
import PostList from "./PostList";


function DataViewPage() {
    const [pending, setPending] = useState(false);
    
    const [postData, setPostData] = useState([]);
    let locat = useLocation();
     const dispatch = useDispatch();
    let navigate = useHistory();
   
  useEffect(()=>{
    let deployment = localStorage.getItem('deployment');
    if (deployment && deployment !== undefined) { 
      
       getPostData(JSON.parse(deployment).id);
    }
    
  },[]);
  
  const getPostData = async (deployment_id)=>{
    try {
      setPending(true);
        const response = await axiosInstance.get('getPostData/'+deployment_id,
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
      let dData = response?.data?.posts;
      setPostData(dData);
      // console.log(dData);
      setPending(false);
  
     }
      } catch (err) {
        
      //   if (!err?.response) {
      //   dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:"Loading Failed, Check your internet and try again"}}))
      // } else if (err.response?.status === 400) {
      //    dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:loginErrors}}))
      // } else if (err.response?.status === 401) {
      //   dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:err?.response.data['detail']}}))
  
      // } else {
        
      //   dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:"Loading Failed, Check your internet and try again"}}))
        
      // }
    
      }
  
  
  
  }
  return (
    <>
      {/* <Container fluid>
        <Row>
          <Col md="12"> */}
      <Card className="strpied-tabled-with-hover pr-3">
        <Card.Header>
          <Card.Title as="h4">Data View</Card.Title>
          <p className="card-category">
            Display posts Results : {postData?.length}
          </p>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <Row>
            <Col md="3" className="md:min-h[400px]">


              <div className="text-sm pl-2 font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px ">

                  <li className="me-2">
                    <a href="#" className="inline-block p-4 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Surveys</a>
                  </li>
                  <li className="me-2">
                    <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Source</a>
                  </li>

                </ul>

              </div>
              <div className="p-2 py-4">
                <div className="flex items-start mb-2 p-2 pt-3 bg-gray-100 cursor-pointer">
                  <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-5 h-5 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                  </div>
                  <label for="remember" className="ms-2 text-sm font-medium text-black">Basic
                  </label>
                </div>
                <div className="flex items-start mb-2 p-2 pt-3 bg-gray-100 cursor-pointer">
                  <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-5 h-5 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                  </div>
                  <label for="remember" className="ms-2 text-sm font-medium text-black">Survey 1
                  </label>
                </div>
                <div className="flex items-start mb-2 p-2 pt-3 bg-gray-100 cursor-pointer">
                  <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-5 h-5 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                  </div>
                  <label for="remember" className="ms-2 text-sm font-medium text-black">Survey 2
                  </label>
                </div>
                <div className="flex items-start  mb-2 p-2 pt-3 bg-gray-100 cursor-pointer">
                  <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-5 h-5 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                  </div>
                  <label for="remember" className="ms-2 text-sm font-medium text-black">Survey 3
                  </label>
                  {/* <div>1</div> */}
                </div>
              </div>
            </Col>
            <Col md="9">
            {pending && (<div className="flex items-center justify-center mb-4">
              <Spinner animation="grow" variant="warning" className="h-[100px]"/>
            </div>)}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PostList posts={postData} pending={pending}/>
                
                

              </div>
            </Col>

          </Row>

        </Card.Body>
      </Card>
      {/* </Col> */}

      {/* </Row>
      </Container> */}
    </>
  );
}

export default DataViewPage;

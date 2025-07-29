

import React, { useRef,useContext,useState } from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


import { useLocation,useHistory } from "react-router-dom";

import {toggleLoadingBar,selectLoadingBar,toggleToaster,selectToasterData,selectToasterStatus} from 'provider/features/helperSlice';
import { useSelector, useDispatch } from 'react-redux';
import LoadingIcon from 'others/icons/LoadingIcon';
import  axiosInstance  from "services/axios";
import {login,logout, selectUser} from 'provider/features/userSlice';
import { Audio,Blocks } from 'react-loader-spinner';

export default function LoginPage() {
    const [pending, setPending] = useState(false);
    const [pendingComplete, setPendingComplete] = useState(false);
    let locat = useLocation();
    let navigate = useHistory();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const dispatch = useDispatch();
    const [formValue,setFormValue] = useState(
      {
          email:'',
          password:'',
      }
  );

      const handleChange=(event)=>{
        setFormValue({
           ...formValue,
           [event.target.name]:event.target.value
        });
       }

    const signIn = async (e)=>{
      // alert('am here');
      e.preventDefault();
      console.log(formValue);
      let email = formValue.email;
      let pass = formValue.password;
      if(email == "" || pass == ""){
            alert("some fields are empty");
      }else{


      try {

        //  alert('about posting')
          setPending(true);
          const response = await axiosInstance.post('login',
            JSON.stringify({ email: formValue.email, password: formValue.password }),
            {
                headers: { 'Content-Type': 'application/json' },
              //   withCredentials: true
            }
        );
        // console.log(response)
        setPendingComplete(true);
        // setProgress(80)
        // console.log(JSON.stringify(response?.data));
        // console.log(JSON.stringify(response?.data.token));
        // console.log(JSON.stringify(response?.data.result));
        // console.log(JSON.stringify(response?.data.permissions));
        const accessToken = response?.data?.access_token;
        // const accessRefreshToken = response?.data?.refresh;
        localStorage.setItem('access',accessToken)
      //  localStorage.setItem('refresh', accessRefreshToken)
       if(response?.data?.access_token){
       localStorage.setItem('is_login', 'yes');
       localStorage.setItem('currentUser',JSON.stringify(response?.data.user));
       let deployment_id = response?.data?.user?.deployment;
      //  alert(deployment_id);
       getDeploymentData(deployment_id);
       }
      setPending(false);

          // window.location.href="/";
        } catch (err) {
          console.log(err);
          // console.log(err?.response);
          // console.log(err?.response.data);
          // console.log(err?.response.data['detail']);

          if (!err?.response) {
          
          console.log('no server response');
          dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:"Login Failed, Check your internet and try again"}}))
        } else if (err.response?.status === 400) {
         
          loginErrors = err?.response.data?.email+' '+err?.response.data.password;
          // alert(loginErrors);
          dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:loginErrors}}))
        } else if (err.response?.status === 401) {
          console.log('Un authorized');
          // alert(err.response.data['message']);
          dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:err?.response.data['message']}}))

        } else {
          
          dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:"Login Failed, Check your internet and try again"}}))
          
        }
        setPending(false);
        }
      }


   }

   const getDeploymentData = async (deployment_id)=>{
    // e.preventDefault();

    try {

      //  alert('about posting')
        const response = await axiosInstance.get('getDeployment/'+deployment_id,
          {
              headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('access')}`
             },
            //   withCredentials: true
          }
      );
      console.log(response)
      // setProgress(80)
      console.log(JSON.stringify(response?.data));


    //  localStorage.setItem('refresh', accessRefreshToken)
     if(response?.data){
      
      localStorage.setItem('deployment',JSON.stringify(response?.data?.deployment))
      localStorage.setItem('settings',JSON.stringify(response?.data?.settings))
     localStorage.setItem('is_login', 'yes');
     

    let uData = response?.data?.deployment;
     dispatch(login(uData));
    navigate.push('/deployment/map_view');
     }

        // window.location.href="/";
      } catch (err) {
        // console.log(err?.response);
        // console.log(err?.response.data);
        // console.log(err?.response.data['detail']);

        if (!err?.response) {
        //   setErrMsg('No Server Response');
        //   onCallToast('success','');
        console.log('no server response');
        dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:"Login Failed, Check your internet and try again"}}))
      } else if (err.response?.status === 400) {
        //   setErrMsg('Missing Username or Password');
        //   onCallToast('success','Email or password is Incorrect');
        loginErrors = err?.response.data?.email+' '+err?.response.data.password;
        // alert(loginErrors);
        dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:loginErrors}}))
      } else if (err.response?.status === 401) {
        console.log('Un authorized');
        //   setErrMsg('Unauthorized');
        //   onCallToast('success','Unauthorized');
        dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:err?.response.data['detail']}}))

      } else {
        // console.log('login failed');
        dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:"Login Failed, Check your internet and try again"}}))
        //   setErrMsg('Login Failed');
        //   onCallToast('success','Login Failed');
      }

      }



 }
  return (
    <>
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.75,
        }}
        className="nav-bar"
      >
        <main>
          <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-75 bg-black"
              ></span>
            </div>

            <div className="container relative mx-auto md:mt-8">
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-5/12 py-2 px-4 ml-auto mr-auto text-center shadow-md rounded-md min-h[400px]:">

                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-md bg-white border-0">
                  {pendingComplete ? (<>
                          <div className='py-6'>
                          <p className="font-bold text-2xl text-green-700">Login Succesfull</p>
                          <hr className="mt-6 border-b-1 border-blueGray-300" />
                          <p className="text-xs mt-4 text-[#002D74]">Preparing Deployment Dashboard.....</p>
                          <div className='flex items-center justify-center'>
                          <Blocks
                          height="180"
                          width="180"
                          color="#002D74"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          visible={true}
                          />
                          </div>
                          </div>
                       </> ): <> 
                    <div className="rounded-t mb-0 px-6 py-6">
                      <div className="text-center mb-3">
                        <h6 className="text-blueGray-500 text-sm font-bold">
                          Sign in to your deployment
                        </h6>
                      </div>
                      <hr className="mt-6 border-b-1 border-blueGray-300" />
                    </div>
                    
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                        <small>Or sign in with credentials</small>
                      </div> */}
                      <form>
                        <div className="relative w-full mb-3 items-start justify-start">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" style={{ textAlign: "left" }}
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="border-1 px-3 py-3 placeholder-blueGray-300 text-gray-600 bg-white rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Email"
                            onChange={handleChange}  name="email" id="email"
                            style={{ border: "1px solid #f5f5f5" }}
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" style={{ textAlign: "left" }}
                            htmlFor="grid-password"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            onChange={handleChange}  name="password" id="password"
                            className="border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Password"
                            style={{ border: "1px solid #f5f5f5" }}
                            
                          />
                        </div>
                        <div className="block" style={{ textAlign: "left" }}>
                          <label className="inline-flex items-center cursor-pointer" >
                            <input
                              id="customCheckLogin"
                              type="checkbox"
                              className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                            />
                            <span className="ml-2 text-sm font-semibold text-blueGray-600">
                              Remember me
                            </span>
                          </label>
                        </div>

                        <div className="text-center mt-6">
                        {pending ? (
                       <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                       <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                       </path>
                   </svg>
                      ): <> </>}
                          <button
                          /* <Link
                          to="/deployment/map_view" */
                            className="bg-[#3B404C] hover:bg-slate-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={signIn}
                          >
                            Sign In
                            {/* </Link> */}
                          </button>
                         
                        </div>
                      </form>
                    </div>
                    </>}


                  </div>
                  {/* <div className="flex flex-wrap mt-6 relative">
                    <div className="w-1/2">
                      <a
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        className="text-blueGray-200"
                      >
                        <small>Forgot password?</small>
                      </a>
                    </div>
                    <div className="w-1/2 text-right">
                      <Link to="/auth/register" className="text-blueGray-200">
                        <small>Create new account</small>
                      </Link>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </div>
        

        </main>
      </motion.div>



    </>
  );
}

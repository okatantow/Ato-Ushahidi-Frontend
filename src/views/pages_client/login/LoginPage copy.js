
import React, { useRef,useContext,useState } from 'react'


import { useLocation } from "react-router-dom";

import {toggleLoadingBar,selectLoadingBar,toggleToaster,selectToasterData,selectToasterStatus} from 'provider/features/helperSlice';
import { useSelector, useDispatch } from 'react-redux';
import LoadingIcon from 'others/icons/LoadingIcon';
import  axiosInstance  from "services/axios";
import {login,logout, selectUser} from 'provider/features/userSlice';
import { Audio,Blocks } from 'react-loader-spinner';

function LoginPage() {

    const [pending, setPending] = useState(false);
    const [pendingComplete, setPendingComplete] = useState(false);
    let navigate = useLocation();
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
          const response = await axiosInstance.post('token/',
            JSON.stringify({ username: formValue.email, password: formValue.email }),
            {
                headers: { 'Content-Type': 'application/json' },
              //   withCredentials: true
            }
        );
        console.log(response)
        setPendingComplete(true);
        // setProgress(80)
        // console.log(JSON.stringify(response?.data));
        // console.log(JSON.stringify(response?.data.token));
        // console.log(JSON.stringify(response?.data.result));
        // console.log(JSON.stringify(response?.data.permissions));
        const accessToken = response?.data?.access;
        const accessRefreshToken = response?.data?.refresh;
        localStorage.setItem('access',accessToken)
       localStorage.setItem('refresh', accessRefreshToken)
       if(response?.data?.access){
       localStorage.setItem('is_login', 'yes');
       getUserData(accessToken);
       }
      setPending(false);

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
        setPending(false);
        }
      }


   }

   const getUserData = async (accessToken)=>{
    // e.preventDefault();

    try {

      //  alert('about posting')
        const response = await axiosInstance.get('getUser/',
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
      localStorage.setItem('currentUser',JSON.stringify(response?.data.user))
      localStorage.setItem('company',JSON.stringify(response?.data.company))
     localStorage.setItem('is_login', 'yes');
      // setAuth(JSON.parse(localStorage.getItem('currentUser')));
      // setUser(JSON.parse(localStorage.getItem('currentUser')));

      // let currentUserData = {token:accessToken, user:response?.data.user}
      // localStorage.setItem('currentUser', JSON.stringify(currentUserData));
      // setAuth(response?.data.user);
      // setUser(response?.data.user);

    let uData = response?.data.user;
     dispatch(login(uData));
    router.push('/admin/dashboard');
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
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
  {/* <!-- login container --> */}
  <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
    {/* <!-- form --> */}
    <div className="md:w-1/2 px-8 md:px-16">
    <form action="">

      
      {pendingComplete ? (<>
      <p className="font-bold text-2xl text-[#002D74]">Login Succesfull</p>
      <p className="text-xs mt-4 text-[#002D74]">Preparing Dashboard.....</p>
      <Blocks
      height="180"
      width="180"
      color="#002D74"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      visible={true}
      />
   </> ): <> 
   <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
      <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>
      <div  className="flex flex-col gap-4">
        {/* <input className="p-2 mt-8 rounded-xl border"  ref={emailRef} type="email" name="email" placeholder="Email"/> */}
        {/* <input className="p-2 mt-8 rounded-xl border"  onChange={handleChange}  type="text" name="email" id="email" placeholder="Email"/> */}
        <input className="p-2 mt-8 rounded-xl border"  onChange={handleChange}  type="text" name="email" id="email" placeholder="Username"/>
        {/* <input onChange={handleChange} name="first_name" type="text" value={formValue.first_name} placeholder='First Name' className="input input-bordered w-full max-w-lg"/> */}

        <div className="relative">
          {/* <input className="p-2 rounded-xl border w-full" ref={passwordRef} type="password" name="password" placeholder="Password"/> */}
          <input className="p-2 rounded-xl border w-full"  onChange={handleChange} type="password" name="password" id="password" placeholder="Password"/>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
          </svg>
        </div>
        {pending ? (
                       <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                       <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                       </path>
                   </svg>
                      ): <> </>}

        <button  className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" type="submit" onClick={signIn}>Login</button>
      </div>
     
    
    </>}


      {/* <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
        <hr className="border-gray-400"/>
        <p className="text-center text-sm">OR</p>
        <hr className="border-gray-400"/>
      </div> */}

      {/* <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
        <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
        </svg>
        Login with Google
      </button>

      <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
        <a href="#">Forgot your password?</a>
      </div> */}
      </form>
<div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]"></div>
      <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
        {/* <p>Dont have an account? </p> */}
        {/* <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</button> */}
      </div>
    </div>

    <div className="md:block hidden w-1/2 min-w-5">
      {/* <img className="rounded-2xl" src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"/> */}
      {/* <img  src={loginBg}/> */}
      <img src='/login_bg.png'
            alt='logo'
            width={400}
            height={500}
            className="rounded-2xl"
            />
    </div>
  </div>
</section>
    </>
  )
}

export default LoginPage
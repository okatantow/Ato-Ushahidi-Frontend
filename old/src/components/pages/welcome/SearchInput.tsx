import React,{useState,useRef} from 'react'
import { UserCircleIcon,ArrowRightIcon } from '@heroicons/react/24/solid'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import  axiosInstance  from "../../../services/axios";
import {toggleToaster,selectToasterData,selectToasterStatus,toggleLoginChange,selectLoginChange} from '../../../provider/features/helperSlice';
import {login,logout, selectUser} from '../../../provider/features/userSlice';

import { useSelector, useDispatch } from 'react-redux';

function SearchInput() {
    const [pending, setPending] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const applicantIdRef = useRef(null);
    let navigate = useNavigate();


    const dispatch = useDispatch();
    const [formValue,setFormValue] = useState(
      {
          applicant_id:'',
         
      }
  );
  let loginErrors = "";
  const handleChange=(event:any)=>{
    setFormValue({
       ...formValue,
       [event.target.name]:event.target.value
    });
   }
  const findApplicant = async (e:any)=>{
    // alert('am here');
    e.preventDefault();
    console.log(formValue);
    let applicant_id = formValue.applicant_id;
    if(applicant_id == "" ){
          alert("some fields are empty");
    }else{


    // try {

        setPending(true);
        const response = await axiosInstance.get('getApplicant/'+formValue.applicant_id)
      console.log(response)


     const userData = response?.data?.data;
     console.log("main data");
     console.log(userData);
     if(response?.data?.status=="success"){
        // alert('there is data');
        dispatch(login(userData));
        dispatch(toggleToaster({isOpen:true,toasterData:{type:"success",msg:"Applicant Found"}}))
        localStorage.setItem('is_login', 'no');
        localStorage.setItem('currentUser', JSON.stringify(userData));
        // redirect('/welcome_auth');
        // router.push('/welcome_auth');
        navigate("/welcome_auth", { replace: true });
    
    //  dispatch(toggleLoginChange(1));
     }else{
        dispatch(logout());
        dispatch(toggleToaster({isOpen:true,toasterData:{type:"error",msg:"Applicant Not found"}}))
     }
    setPending(false);
    
  
    }


 }
  return (
    <div className="mt-5 ">
        <h2 className='text-center text-[16px] text-gray-600 mb-3'>
             Search For Your Application
        </h2>
        <form action="">
        <div className='flex justify-center mx-4'>
            <div className='flex bg-gray-100 p-1  pl-4 pr-0 gap-1
            rounded-full '>
            <div className='flex items-center'>
            <UserCircleIcon className="h-5 w-5 text-black" />
                <input type="number" onChange={handleChange} id="applicant_id" name="applicant_id" placeholder='Applicant ID'
                className='p-2 outline-none bg-transparent'/>
            </div>
            <div className='p-0'>
            <button className='banner_button rounded-full bg-gray-100 flex items-center' onClick={findApplicant}>
                <span className='text-black'>Continue</span>
            <ArrowRightIcon className="h-5 w-5 text-black ml-2" />
            </button>
            </div>
            
            </div>
        </div>
        </form>
        <div className='flex items-center justify-center pt-4'>
        {pending ? (
                       <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                       <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                       </path>
                   </svg>
                      ): <> </>}
        </div>
        
        <br/>
        <h2 className='text-center text-[16px] text-[#923d41] mb-3 mt-8'>
             Already Have OTP ? <Link to="/welcome_auth" className=' underline'>Enter Code</Link>
        </h2>
    </div>
  )
}

export default SearchInput
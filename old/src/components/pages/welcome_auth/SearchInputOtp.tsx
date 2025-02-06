
import { LockOpenIcon, CheckCircleIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'
// import Link from 'next/link'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react'
import axiosInstance from "../../../services/axios";
import { toggleToaster, selectToasterData, selectToasterStatus, toggleLoginChange, selectLoginChange } from '../../../provider/features/helperSlice';
import { useSelector, useDispatch } from 'react-redux';


function SearchInputOtp() {
  const [pending, setPending] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<any>();

  const applicantIdRef = useRef(null);
  // const router = useRouter();
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      let uData: string = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
      setUser(uData);
    }
  }, []);

  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState(
    {
      otp: '',
      applicant_id: '15592',

    }
  );
  let loginErrors = "";
  const handleChange = (event: any) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }
  const authenticateApplicant = async (e: any) => {

    e.preventDefault();
    console.log(formValue);
    let otp = formValue.otp;
    let applicantID = user?.applicant_id;

    if (otp == "") {
      alert("some fields are empty");
    } else {

      if (applicantID == "" || applicantID == null) {
        alert("No Applicant Found Yet");
      } else {

        setPending(true);
        const response = await axiosInstance.get('checkOtp/' + applicantID + '/' + otp);
        const userData = response?.data?.data;
        console.log("main data");
        console.log(userData);
        if (response?.data?.status == "success") {

          dispatch(toggleToaster({ isOpen: true, toasterData: { type: "success", msg: "Successfully Authenticated" } }))
          localStorage.setItem('is_login', 'yes');
          navigate("/invoices", { replace: true });
        } else {

          dispatch(toggleToaster({ isOpen: true, toasterData: { type: "error", msg: "Wrong Otp entered" } }))
        }
        setPending(false);

      }

    }


  }
  return (
    <div className="mt-5 ">

      <button className='bg-gray-100 flex items-center hover:bg-gray-50 text-gray-600 p-1 px-2'>
        <ChevronLeftIcon className="h-5 w-5 text-black ml-2" /> <Link to="/welcome">Cancel</Link>

      </button>
      <br />
      <h2 className='text-center text-[16px] text-green-700 mb-3 mt-2'>
        Enter OTP Sent To Your Application Email
      </h2>
      <form action="">
        <div className='flex justify-center mx-4'>
          <div className='flex bg-gray-100 p-1  pl-4 pr-0 gap-1
            rounded-full  divider-x'>
            <div className='flex items-center'>
              <LockOpenIcon className="h-5 w-5 text-black" />
              <input type="text" placeholder='OTP' onChange={handleChange} id="otp" name="otp"
                className='p-2 outline-none bg-transparent' />
            </div>
            <div className='p-0'>
              <button className='banner_button rounded-full bg-gray-100 flex items-center' onClick={authenticateApplicant}>
                <span className='text-black'>Submit</span>
                <CheckCircleIcon className="h-5 w-5 text-black ml-2" />
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
        ) : <> </>}
      </div>
      <br />
      <h2 className='text-center text-[16px] text-[#923d41] mb-3 mt-8'>
        Did Not Receive OTP ? <Link to="/welcome" className=' underline'>Start Process</Link>
      </h2>
    </div>
  )
}

export default SearchInputOtp
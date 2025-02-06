import React, { useState, useEffect } from 'react';
// import Image from 'next/image'
// import { useRouter } from 'next/navigation';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../../../provider/features/userSlice';
import { UserCircleIcon } from '@heroicons/react/24/solid'



function NavBarClient() {
  const dispatch = useDispatch();
  // const router = useRouter();
  let navigate = useNavigate();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      let uData: string = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
      setUser(uData);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Your function to be called after 5 seconds
      if (localStorage.getItem('currentUser')) {
        let uData: string = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
        setUser(uData);
      }
    }, 5000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, [])

  const handleLogout = () => {
    try {
      dispatch(logout());
        localStorage.setItem('is_login','no');
      localStorage.removeItem('currentUser');
      // router.push('/welcome');
      navigate("/welcome", { replace: true });
      // window.location.href="/";
    } catch (err) {
      // console.log(err?.response.data);
    }
  }
  return (
    <>
      <div className="bg-[#923d41] grid grid-cols-1 justify-center pl-2  ">
        {/* text-[#ffffb7] */}
        <span className='banner_title text-[0.9rem] md:text-[0.9rem] lg:text-[1.10rem] text-center m-0 p-0  text-[#fff] pb-1'>
          Fee Payment Portal
        </span>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 items-start shadow-sm rounded-xl border-t-2 border-white rounded-t-none  bg-[#923d41]'>
        <div id="logo" className="  flex items-center md:items-start justify-center md:justify-start bg-color pl-4">
          <div className="ui raised logo mt-0 mb-0 segment alpha bg-gray-900" style={{ backgroundColor: '#923d41' }}>
            {/* <Image src="https://svcs-image.dreamapply.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkcmVhbS1hcHBseSIsImF1ZCI6ImRyZWFtLWltYWdlIiwicGxkIjp7InBhdGgiOiJkcmVhbS1hcHBseTpzaGFyZDgxMy9pbnN0YW5jZV9sb2dvcy9kMjZmYzFiZC1hN2NiLTRhYzktYmFmZC0xNTk2ZmFiZWU1YjEiLCJ0cmFuc2Zvcm1hdGlvbnMiOlt7Im5hbWUiOiJmaXQiLCJwYXJhbXMiOnsid2lkdGgiOiI0MjAiLCJoZWlnaHQiOiIyMDAiLCJxdWFsaXR5IjoiOTUiLCJleHRlbmQiOiIyNTUsMjU1LDI1NSJ9fV0sImNhY2hlIjoibWF4LWFnZT0zMTUzNjAwMCwgcHVibGljIiwib3V0cHV0X2Zvcm1hdCI6InNhbWUiLCJhdHRhY2giOm51bGwsInNka192ZXJzaW9uIjoiMS4wIn19.NKQnUlTNK9rV-QhV8NFMtzSixM6Gtn4pjC2B3t9_Pb2N2Vtwq7-dnKzAzDJd8OINXq5jrfmibHwN3aNrTs4LyLeAm9v-Gufl9KpRYZ7WtqLq5bhlaUuGSzdPp1B9DAONj91S1reRfuxk1zEvfJXnOv5cGA01zJ2uomDnamp1ZACkt8L7Su3e_9cuEu15rgTIN8Z3Ezux1O7ZKqjRO-fm7qZSNG3NW8SMMixtux7TcRHYySzH7glIbvbgvIfGTPj2A8rS0jMlBbtY6e5wdKmGBV2wGwKr1LwhzpvQsqsqtW8m8Ax6UKyEfHBLLmZ9vYtTkH6tFDu0kyTk2vkqGWa5qw"
              alt='logo'
              width={200}
              height={100}
            /> */}
            <img src="https://svcs-image.dreamapply.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkcmVhbS1hcHBseSIsImF1ZCI6ImRyZWFtLWltYWdlIiwicGxkIjp7InBhdGgiOiJkcmVhbS1hcHBseTpzaGFyZDgxMy9pbnN0YW5jZV9sb2dvcy9kMjZmYzFiZC1hN2NiLTRhYzktYmFmZC0xNTk2ZmFiZWU1YjEiLCJ0cmFuc2Zvcm1hdGlvbnMiOlt7Im5hbWUiOiJmaXQiLCJwYXJhbXMiOnsid2lkdGgiOiI0MjAiLCJoZWlnaHQiOiIyMDAiLCJxdWFsaXR5IjoiOTUiLCJleHRlbmQiOiIyNTUsMjU1LDI1NSJ9fV0sImNhY2hlIjoibWF4LWFnZT0zMTUzNjAwMCwgcHVibGljIiwib3V0cHV0X2Zvcm1hdCI6InNhbWUiLCJhdHRhY2giOm51bGwsInNka192ZXJzaW9uIjoiMS4wIn19.NKQnUlTNK9rV-QhV8NFMtzSixM6Gtn4pjC2B3t9_Pb2N2Vtwq7-dnKzAzDJd8OINXq5jrfmibHwN3aNrTs4LyLeAm9v-Gufl9KpRYZ7WtqLq5bhlaUuGSzdPp1B9DAONj91S1reRfuxk1zEvfJXnOv5cGA01zJ2uomDnamp1ZACkt8L7Su3e_9cuEu15rgTIN8Z3Ezux1O7ZKqjRO-fm7qZSNG3NW8SMMixtux7TcRHYySzH7glIbvbgvIfGTPj2A8rS0jMlBbtY6e5wdKmGBV2wGwKr1LwhzpvQsqsqtW8m8Ax6UKyEfHBLLmZ9vYtTkH6tFDu0kyTk2vkqGWa5qw"
              alt='logo'
              width={200}
              height={100}
            />

          </div>

        </div>
        <div className='min-h-[100px] bg-[#923d41] px-4 md:p-0'>
          <div className='flex  md:items-center justify-around md:mt-4  p-1 bg-[#fff] rounded-full md:rounded-r-none'>
            {/* <Image src='/user2.webp' */}

            {/* <Image src='/user.png'
              alt='logo'
              width={60}
              height={60}
            /> */}
            <UserCircleIcon className="h-[60px] w-[60px] text-gray-400 ml-2"/>
            <div className='grid grid-cols-1 bg-white text-[0.85rem] '>
              <p ><span className='font-bold capitalize'>Applicant</span>:  {user?.full_name}</p>
              <p><span className='font-bold '>ID</span>:  {user?.applicant_id}</p>
              <p><span className='font-bold '>Email</span>:  {user?.email}</p>
            </div>
            <div className='flex items-center justify-center'>
            <button className='btn btn-xs shadow  rounded-full text-[0.85rem] max-h-[26px] px-6 md:px-2 p-1 bg-[#fff] hover:bg-[#e6e6e6] text-black' onClick={() => handleLogout()} >Logout</button>
              
            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export default NavBarClient
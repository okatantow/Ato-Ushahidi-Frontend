import React from 'react'
// import Image from 'next/image'

import { UserCircleIcon,ArrowRightIcon } from '@heroicons/react/24/solid'
// import Link from 'next/link'

function NavBar() {
  return (
    <>
     <div className="bg-[#923d41] flex items-center justify-center pl-2 border-b">
    <h1 className='banner_title text-[0.9rem] md:text-[0.9rem] lg:text-[1.0rem] text-[#fff]'>
           Fee Payment Portal 
        </h1>
        </div>
    <div id="logo" className="shadow-sm rounded-xl rounded-t-none flex items-start justify-start bg-color pl-4 bg-[#923d41]">
    <a  className="ui raised logo mt-0 mb-6 segment alpha bg-gray-900" style={{backgroundColor:'#923d41'}}>
    <img  src="https://svcs-image.dreamapply.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkcmVhbS1hcHBseSIsImF1ZCI6ImRyZWFtLWltYWdlIiwicGxkIjp7InBhdGgiOiJkcmVhbS1hcHBseTpzaGFyZDgxMy9pbnN0YW5jZV9sb2dvcy9kMjZmYzFiZC1hN2NiLTRhYzktYmFmZC0xNTk2ZmFiZWU1YjEiLCJ0cmFuc2Zvcm1hdGlvbnMiOlt7Im5hbWUiOiJmaXQiLCJwYXJhbXMiOnsid2lkdGgiOiI0MjAiLCJoZWlnaHQiOiIyMDAiLCJxdWFsaXR5IjoiOTUiLCJleHRlbmQiOiIyNTUsMjU1LDI1NSJ9fV0sImNhY2hlIjoibWF4LWFnZT0zMTUzNjAwMCwgcHVibGljIiwib3V0cHV0X2Zvcm1hdCI6InNhbWUiLCJhdHRhY2giOm51bGwsInNka192ZXJzaW9uIjoiMS4wIn19.NKQnUlTNK9rV-QhV8NFMtzSixM6Gtn4pjC2B3t9_Pb2N2Vtwq7-dnKzAzDJd8OINXq5jrfmibHwN3aNrTs4LyLeAm9v-Gufl9KpRYZ7WtqLq5bhlaUuGSzdPp1B9DAONj91S1reRfuxk1zEvfJXnOv5cGA01zJ2uomDnamp1ZACkt8L7Su3e_9cuEu15rgTIN8Z3Ezux1O7ZKqjRO-fm7qZSNG3NW8SMMixtux7TcRHYySzH7glIbvbgvIfGTPj2A8rS0jMlBbtY6e5wdKmGBV2wGwKr1LwhzpvQsqsqtW8m8Ax6UKyEfHBLLmZ9vYtTkH6tFDu0kyTk2vkqGWa5qw"
            alt='logo'
            width={200}
            height={100}
            />
            {/* <img style={{maxHeight: '7.7em', maxWidth: '77%'}} 
             alt="Logo"/> */}
        </a>
        
      </div>
    </>
  )
}

export default NavBar
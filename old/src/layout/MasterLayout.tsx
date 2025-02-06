import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import NavBarClient from "../components/pages/includes/NavBarClient";
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../components/pages/includes/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toggleToaster, selectToasterData, selectToasterStatus } from '../provider/features/helperSlice';



interface MasterLayoutProps {};


const MasterLayout: React.FC<MasterLayoutProps> = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useDispatch();
  const onToast = useSelector(selectToasterStatus);
  const toastData = useSelector(selectToasterData);
  const callToast = (type: string, msg: String) => {
    if (type == 'success') {
      toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (type == 'error') {
      toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (type == 'warning') {
      toast.warn(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (type == 'info') {
      toast.info(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // toast(msg);
    }
    dispatch(toggleToaster({ isOpen: false, toasterData: { type: "", msg: "" } }))

  }
  useEffect(() => {
    //  callToast('success',"ndessage");
    callToast(toastData.type, toastData.msg);
  }, [onToast]);
 
  
  return ( <>
    <ToastContainer position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover />
  <AnimatePresence mode='wait'>
      <motion.div
        key={pathname}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 0.75,
        }}
        variants={{
          initialState: {
            opacity: 1,
            // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          animateState: {
            opacity: 1,
            // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          exitState: {
            // clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          },
        }}
        className="base-page-size"
      >
        <div className="bg-image-container"></div>
        <div className="bg-[#923d41] p-1 sticky top-0"></div>
        {pathname === "/" || pathname === "/welcome" || pathname === "/welcome_auth" ? (
          <div className="w-full md:w-1/3 sm:w-full px-2 mx-auto  min-h-[400px] grid grid-cols-1">
            <NavBar />
            <Outlet />

          </div>

        ) :
          <>
            <div className="w-full md:w-1/2 sm:w-full px-2 mx-auto  min-h-[400px] grid grid-cols-1">
              <NavBarClient />
              <Outlet />

            </div>
          </>
        }
      </motion.div>
    </AnimatePresence>
</>
  );
};

export default MasterLayout;
'use client'
import { Link } from 'react-router-dom';
import { useNavigate ,useSearchParams} from "react-router-dom";
import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { motion } from "framer-motion";
import axiosInstance from "../../../services/axios";
import swal from 'sweetalert';
import { toggleToaster, selectToasterData, selectToasterStatus, toggleLoginChange, selectLoginChange } from '../../../provider/features/helperSlice';
import { useSelector, useDispatch } from 'react-redux';
import {baseURL,merchantID,apiKEY, baseURLApp} from '../../../others/env';
import { FolderMinusIcon } from '@heroicons/react/24/solid'


function InvoiceItemPage() {
  const dispatch = useDispatch();
  // const searchParams = useSearchParams();
  const [pending, setPending] = useState(true);
  const [pending2, setPending2] = useState(true);
  const [collectionReady, setCollectionReady] = useState(false);
  const [orderData, setOrderData] = useState<any>();
  const [data, setData] = useState<any>();
  const [user, setUser] = useState<any>(null);
  const [search, SetSearch] = useState('');
  const [filter, setFilter] = useState<any>([]);
  const [amountDue, setAmountDue] = useState(0);
  const [amountTotal, setAmountTotal] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);

  // console.log('invoice : ' + searchParams.get('invoice'));
  const [selectedInvoice, setSelectedInvoice] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedInvoiceId, setSelectedInvoiceId] = useState(searchParams.get('invoice') || '');

  const getDate = (dateString: string) => {
    const isoDateString = "2024-11-12T09:53:49+00:00";
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'long',
      timeZoneName: 'short'
    });
    return formattedDate;
  }
  const columns = [
    {
      name: 'Trans ID',
      selector: (row: any) => row.id,
    },
    {
      name: 'Date Paid',
      selector: (row: any) => row.collected,
    },
    {
      name: 'Amount Paid',
      selector: (row: any) => data?.currency + " " + row.amount,
    },
    {
      name: 'Collected At',
      selector: (row: any) => row.inserted,
      // selector: (row: any) => getDate(row.inserted),
    },


  ];

  const handlePayInvoice = () => {
    // alert('deleting')
    swal({
      title: "Confirm Payment",
      text: "Once Confirmed, Payment Will Be Recorded",
      icon: "warning",
      buttons: ["Cancel", "Confirm"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {

          localStorage.setItem('selected_invoice', selectedInvoiceId);
          // let amount = 2;
          let amount = orderData?.amount;
         
           window.location.href = baseURL+`requestPayment?merchant-id=${merchantID}&api-key=${apiKEY}&firstname=${orderData?.full_name}&lastname=lh&email=supportcentre.ashesi.edu.gh&phonenumber=${orderData?.phone}&currency=${orderData?.currency}&amount=${amount}&order-id=${selectedInvoiceId}&redirect-url=${baseURLApp}complete_payment`;
 } else {
          
        }
      });

  }

 



 
  const getRecords = async () => {
    setPending(true);
    setPending2(true);
    const results = await axiosInstance.get('getApplicantInvoice/' + selectedInvoiceId,
      {
        headers: {
          'Content-Type': 'application/json',
          //   "Authorization": `Bearer ${localStorage.getItem('access')}`
        },
        //   withCredentials: true
      }

    );
    let uData = results?.data;
    // console.log(results);
    setData(uData?.data);

    setFilter(Object.values(uData?.collections));
    setAmountDue(parseFloat(uData?.data?.price) - parseFloat(uData?.data?.total))
    setAmountTotal(parseFloat(uData?.data?.price));
    setAmountPaid(parseFloat(uData?.data?.total));
    if (uData?.data) {
      setPending(false);
      setPending2(false);
    }

    

    if (user == null && uData?.applicant?.full_name) {
      // dispatch(toggleToaster({isOpen:true,toasterData:{type:"success",msg:"Applicant Found"}}))
      localStorage.setItem('is_login', 'yes');
      localStorage.setItem('currentUser', JSON.stringify(uData?.applicant));
      setUser(uData?.applicant);
    }
    let phoneNumber = "";
    if(uData?.applicant?.phone == null){
      phoneNumber = '0244000000';
    }else{
      phoneNumber = uData?.applicant?.phone;
    }

    let order = {
      amount : uData?.data?.price,
      name: uData?.applicant?.full_name,
      applicant_id: uData?.applicant?.applicant_id,
      phone: phoneNumber,
      email: uData?.applicant?.email,
      invoice: uData?.data?.invoice,
      invoice_id: uData?.data?.invoice_id,
      currency: uData?.data?.currency,
      deadline: uData?.data?.deadline,
      invoice_total: parseFloat(uData?.data?.price)
    };
    localStorage.setItem('orderData', JSON.stringify(order));
    setOrderData(order);
  }

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {

      let uData: any = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
      setUser(uData);

    }
    localStorage.setItem('orderData', "");
    getRecords();

  }, []);

  return (<>
    <motion.div
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.75,
      }}
      className="nav-bar"
    >
      <div className="min-h-[300px] md:min-h-[570px] md:max-h-[570px] p-2 px-4 bg-white mt-3 py-3 rounded grid grid-cols-1 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thin scrollbar-track-[#fff] scrollbar-thumb-[#d3d7da] overflow-y-auto">
        <div className="flex items-center justify-center">
          <div className='bg-[#edf0f2] py-3 shadow rounded-lg min-h-[280px] min-w-[350px] my-5 grid grid-cols-1 p1'>
            <div className='grid grid-cols-1 items-center justify-center'>
              <div className='flex items-center justify-center'>
              <FolderMinusIcon className="h-[60px] w-[60px] text-gray-400 ml-2"/>
                {/* <img src='/invoice.svg'
                  alt='logo'
                  width={60}
                  height={60}
                /> */}
              </div>

              <div className='text-center text-[14px] text-gray-800 font-bold mb-1 mt-[-3px] border-b pb-1'>
                {data?.invoice}
                <div className='flex items-center justify-center pt-4'>
                  {pending ? (
                    <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                      </path>
                    </svg>
                  ) : <> </>}
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 items-center justify-center gap-0'>
              <div className='text-center text-[30px] text-gray-900 font-bold'>{amountDue} {data?.currency}</div>
              <div className='text-center text-[14px] text-gray-700 mb-1 mt-[-3px] border-b pb-1'>
                BALANCE DUE
              </div>
            </div>

            <div className='flex items-center justify-center'>
              <Link to="/invoices" className='shadow banner_button rounded-full bg-[#fff] hover:bg-[#e6e6e6] text-black'>Cancel</Link>
              <button onClick={() => handlePayInvoice()} className='shadow banner_button bg-blue-500 rounded-full hover:bg-blue-600 hover:text-white text-white'>Pay</button>

            </div>

          </div>
        </div>
        <div className='shadow-lg border rounded'>

          <h2 className='flex items-start justify-between text-center text-[13px] text-gray-900 mb-2 mt-2 border-b pb-2 px-3'>
            <div className='font-bold'>
              Total Amount: {amountTotal} {data?.currency}
            </div>

            <div className='font-bold'>
              Paid Amount: {amountPaid} {data?.currency}
            </div>

          </h2>
          <div className=' text-center text-[15px] text-gray-700 mb-1 mt-1 border-b pb-1'>
            Invoice Payment History
          </div>
          {/* <SearchInput/> */}

          <DataTable
            columns={columns}
            data={filter}
            selectableRows
            pagination
            dense
            progressPending={pending2}
            responsive={true}
            paginationRowsPerPageOptions={[50, 75, 100]}

          />
        </div>
      </div>


    </motion.div>
  </>)
}
export default InvoiceItemPage
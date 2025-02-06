
import React,{useState,useEffect} from 'react'
import DataTable from 'react-data-table-component';
import { motion } from "framer-motion"; 
import { UserCircleIcon,ArrowRightIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import  axiosInstance  from "../../../services/axios";
import {toggleToaster,selectToasterData,selectToasterStatus,toggleLoginChange,selectLoginChange} from '../../../provider/features/helperSlice';
import {login,logout, selectUser} from '../../../provider/features/userSlice';

import { useSelector, useDispatch } from 'react-redux';

function InvoicePage() {
    const [pending, setPending] = useState(true);
    const [data, setData]= useState([]);
    const [user,setUser] = useState<any>();
    const [search, SetSearch]= useState('');
    const [filter, setFilter]= useState<any>([]);

    const columns = [
        {
            name: 'Ivoice',
            selector: (row:any) => row.invoice,
        },
        {
            name: 'Amount',
            selector: (row:any) => row.currency+" "+row.price,
        },
        {
            name: 'Deadline',
            selector: (row:any) => row.deadline,
        },
        {
            name:"Action",
            cell:(row:any)=>(<>
                 <Link className="btn btn-xs btn-danger text-blue underline" to={`/invoice_item/?invoice=${row.invoice_id}`} key={row.invoice_id}>
                     Payment
                    </Link>
                   {/* <button className="btn btn-xs btn-danger bg-red-500 text-white" onClick={()=>handleDelete(row.id)}>UnAssign Vehicle</button> */}
                  </>
            )
        },
        
    ];
    
    const data1 = [
          {
            id: 1,
            invoice: 'Application Fee',
            currency: 'GHS',
            price: '3500',
            deadline: 'Pending',
        },
        {
            id: 2,
            invoice: 'Processing Fee',
            currency: 'USD',
            price: '3500',
            deadline: 'Paid',
        },
        {
            id: 3,
            invoice: 'Applicantion Fee',
            currency: 'USD',
            price: '500',
            deadline: 'Pending',
        },
    ]


    const getRecords=async($applicant_id:any)=>{
        setPending(true);
        const results = await axiosInstance.get('getApplicantInvoices/'+$applicant_id,
        {
            headers: {
              'Content-Type': 'application/json',
            //   "Authorization": `Bearer ${localStorage.getItem('access')}`
          },
          //   withCredentials: true
        }
  
        );
        let uData = results?.data;
        console.log(results);
        setData(uData?.data);
         setFilter(uData?.data);
         if(uData?.data){
          setPending(false);
  
         }
         console.log('filter');
         console.log(filter);
         console.log(data1);
         console.log(results?.data?.data);

      }
      useEffect(()=>{
        // alert('here')
        if(localStorage.getItem('currentUser')){
            // alert('gotten user')
            // let uData:JSON = JSON.parse(localStorage.getItem('currentUser'));
            let uData: any = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
            setUser(uData);
            getRecords(uData?.applicant_id);
        //    console.log(user);
        //    console.log(uData);
          }
         
          // setData(dummyData);
          // setFilter(dummyData);
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
        
   
     <div id="form" className="min-h-[300px]  md:min-h-[570px] md:max-h-[570px] p-2 px-4  py-5 bg-white mt-3 rounded overflow-y-auto scrollbar scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 ">
        <br/>
     <div className='shadow-lg border rounded  py-3'>
     <h2 className='text-center text-[15px] text-gray-700 mb-2 mt-2 border-b pb-2'>
             List Of Applicant Invoices
        </h2>
      {/* <SearchInput/> */}
      
      <DataTable
			columns={columns}
			data={filter}
			selectableRows
            pagination
            dense
            progressPending={pending}
            responsive={true}
            paginationRowsPerPageOptions={[50, 75, 100]}
		/>
    </div>
    </div>
    </motion.div>
     </>)
}
export default InvoicePage
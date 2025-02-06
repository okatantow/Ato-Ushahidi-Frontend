import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { motion } from "framer-motion";
import axiosInstance from "../../../services/axios";
import { useNavigate ,useSearchParams,Link} from "react-router-dom";
import swal from 'sweetalert';
import { toggleToaster, selectToasterData, selectToasterStatus, toggleLoginChange, selectLoginChange } from '../../../provider/features/helperSlice';
import { useSelector, useDispatch } from 'react-redux';
import { baseURL, merchantID, apiKEY } from '../../../others/env';
import LoadingIcon from '../../../others/icons/LoadingIcon';
import { LockOpenIcon, CheckIcon, CheckCircleIcon } from '@heroicons/react/24/solid'

function CompletePaymentPage() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pending, setPending] = useState(true);
  const [step1, setStep1] = useState(true);
  const [step1Red, setStep1Red] = useState(false);
  const [step2Red, setStep2Red] = useState(false);
  const [step3Red, setStep3Red] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [pending2, setPending2] = useState(true);
  const [data, setData] = useState<any>();
  const [transactionData, setTransactionData] = useState<any>();
  const [orderData, setOrderData] = useState<any>();
  const [processingText, setProcessingText] = useState<any>('Initiating');
  const [user, setUser] = useState<any>(null);
  const [filter, setFilter] = useState<any>([]);
  const [amountDue, setAmountDue] = useState(0);
  const [amountTotal, setAmountTotal] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);

  console.log('invoice : ' + searchParams.get('invoice'));
  const [selectedInvoice, setSelectedInvoice] = useState<any>();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(searchParams.get('invoice') || '');
  const [orderId, setOrderId] = useState(searchParams.get('order-id') || '');
  const [token, setToken] = useState(searchParams.get('token') || '');
  // const [paymentResult, setPaymentResult] = useState(searchParams.get('results') || '');

 

  

  const handleCheckStatus = () => {
    checkPayment();
  }

  const checkPayment = async () => {
    let name = 'Joseph Okata';
    let amount = 20;
    const results = await axiosInstance.get(`payment/checkTransactionStatus?merchant-id=${merchantID}&api-key=${apiKEY}&token=${token}&name=${name}&card_code=${orderId}&amount=${amount}&url=http://localhost:3000/complete_payment`,
      {
        headers: {
          'Content-Type': 'application/json',
          //   "Authorization": `Bearer ${localStorage.getItem('access')}`
        },
        //   withCredentials: true
      }

    );
    let uData = results?.data?.data;
    let result = uData.result;
    let oid = uData.orderid;
    console.log(uData["transaction-id"])
    
    let transData = {
        result: uData.result,
        result_text: uData["result-text"],
        order_id: uData["order-id"],
        token:uData.token,
        currency: uData.currency,
        amount: uData.amount,
        transaction_id:uData["transaction-id"],
        date_processed: uData["date-processed"]
      }
      setTransactionData(transData);
    
    if (result == 1) {
      
      // dispatch(toggleToaster({ isOpen: true, toasterData: { type: "success", msg: "Payment Confirmed" } }))
      
      setStep2(true);
      

        let uData: any = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
        // setUser(uData);
        let orderData: any = JSON.parse(localStorage.getItem('orderData') ?? '{}');
        // setOrderData(orderData);
        let invoice: any = localStorage.getItem('selected_invoice') ?? '{}';
        // setSelectedInvoice(invoice);
  
      
      payInvioice(transData,uData,orderData);
      
    } else{
      let i = 0;
      do {
        
        setTimeout(() => {
          // checkPayment();
        }, 8000);
       
        
        i++;
      } while (result == 4 && i < 10);
       if(result == 2 || result == 3){
      // alert('payment not success');
      // alert('result 4');
      }
      if(result == 4){
        // alert('result 4');
        checkPayment();
      }
  }
    console.log('results');
    console.log(results);

  }

  const payInvioice = async (tData:any,user:any,orderData:any) => {
    // alert('started recording');
    setProcessingText('Recording Transaction');
    // alert('payment start')
    setPending(true);
   
    let amt = tData?.amount;
    // alert('amount= '+amt);
    let payload = {
      amount: amt, type: "pay", currency: tData?.currency, invoice_id: tData?.order_id, transaction_id:tData?.transaction_id,date_processed:tData?.date_processed, applicant_id: user?.applicant_id, email: user?.email, phone: user?.phone,
      applicant_name: user?.full_name, invoice_name: orderData?.invoice, invoice_amount: orderData?.invoice_amount
    };

    const results = await axiosInstance.post('payApplicantInvoice',
      JSON.stringify(payload),
      {
        headers: {
          'Content-Type': 'application/json',
          //   'Access-Control-Allow-Origin':'*'
          //   "Authorization": `Bearer ${localStorage.getItem('access')}`
        },
        //   withCredentials: true
      }
    );
    let uData = results?.data;
    let totalPaid = results?.data?.total;

    if(uData){
      dispatch(toggleToaster({ isOpen: true, toasterData: { type: "success", msg: "Payment Completed" } }))
      setProcessingText("Transaction Complete");
      setStep3(true);
    setPending(false);

      setTimeout(() => {
        // router.push('/invoice_item?invoice='+tData?.order_id);
        navigate('/invoice_item?invoice='+tData?.order_id, { replace: true });
      }, 8000);
      
    }


  }


  useEffect(() => {
    // alert(orderId);
    if (localStorage.getItem('currentUser')) {

      let uData: any = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
      setUser(uData);
      let orderData: any = JSON.parse(localStorage.getItem('orderData') ?? '{}');
      setOrderData(orderData);
      let invoice: any = localStorage.getItem('selected_invoice') ?? '{}';
      setSelectedInvoice(invoice);

    }
    // handleCheckStatus();
    

  }, []);

  useEffect(() => {
    setProcessingText('Confirming Payment');
    checkPayment();
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
      <div className="min-h-[300px] md:min-h-[570px] md:max-h-[570px] p-2 px-4 bg-[#fff] border mt-3 py-3 rounded grid grid-cols-1 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thin scrollbar-track-[#fff] scrollbar-thumb-[#d3d7da] overflow-y-auto">
        <div className="flex items-center justify-center">
          {/* <div className='bg-[#edf0f2] py-3 shadow rounded-lg min-h-[280px] min-w-[350px] my-5 grid grid-cols-1 p1'> */}
          <div className='bg-[#fff] py-3 shadow rounded-lg min-h-[280px] min-w-[450px] my-5 grid grid-cols-1 p1'>

            <div className='grid grid-cols-1 items-center justify-center'>
              <div className='text-center text-[14px] text-gray-800 font-bold mb-1 mt-[-3px] border-b pb-1'>
                {orderData?.invoice} 

              </div>
              <div className='grid grid-cols-1 items-center justify-center gap-0'>
                <div className='text-center text-[30px] text-gray-900 font-bold'>{orderData?.amount} {orderData?.currency}</div>
                <div className='text-center text-[14px] text-gray-700 mb-1 mt-[-3px] border-b pb-1'>
                  AMOUNT PAID
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <div className='p-0 px-16'>
              <hr className='border-green-700 border-2'/>
              </div>
              
              <div className='flex items-start justify-around relative z-10 top-[-31px]'>
                <div className=' text-center'>
                 
                  <CheckCircleIcon className={`h-14 w-14 rounded-full p-0 mb-2  border-none ${step1 === true
                    ? ' bg-white text-green-600'
                    : '  bg-white text-gray-300'
                    }`} />
                  <span className={`${step1 === true
                    ? 'text-green-700'
                    : ' '
                    }`}>
                    Initiated
                  </span>
                </div>
                <div className=' text-center'>
                  <CheckCircleIcon className={`h-14 w-14 rounded-full p-0 mb-2 border-none ${step2 === true
                    ? ' bg-white text-green-600'
                    : '  bg-white text-gray-300'
                    }`} />
                  <span className={`${step2 === true
                    ? 'text-green-700'
                    : ' '
                    }`}>
                    Confirmed
                  </span>
                </div>
                <div className=' text-center'>

                  <CheckCircleIcon className={`h-14 w-14 rounded-full p-0 mb-2 ${step3 === true
                    ? ' bg-white text-green-600'
                    : '  bg-white text-gray-300'
                    }`} />
                  <span className={`${step3 === true
                    ? 'text-green-700'
                    : ' '
                    }`}>
                    Completed
                  </span>
                </div>
              </div>
             
              <br/>
              

              <div className="flex items-center justify-center bg-[#f5f5f5] p-3">
                <div className='items-center'>
                {pending ? (
                  <LoadingIcon />
                ) : <> </>}
                  <p color="colorPalette.600">{processingText}...</p>
                </div>

              </div>
              


            </div>
<br/>
<br/>

            <div className='flex items-center justify-center'>
              {/* <Link to="/invoices" className='shadow banner_button rounded-full bg-[#fff] hover:bg-[#e6e6e6] text-black'>Cancel</Link> */}
              {/* <button onClick={() => handlePayInvoice('')} className='shadow banner_button bg-blue-500 rounded-full hover:bg-blue-600 hover:text-white text-white'>Pay</button> */}
              {/* <button onClick={() => handleCheckStatus()} className='shadow banner_button bg-blue-500 rounded-full hover:bg-blue-600 hover:text-white text-white'>Check Status</button> */}

            </div>

          </div>
        </div>

      </div>


    </motion.div>
  </>)
}
export default CompletePaymentPage
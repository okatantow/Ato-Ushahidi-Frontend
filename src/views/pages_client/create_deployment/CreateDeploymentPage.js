import { React, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
    Form
} from "react-bootstrap";
import DeploymentInfo from "./DeploymentInfo";
import OrganizationInfo from "./OrganizationInfo";
import AccountInfo from "./AccountInfo";
import PreviewInfo from "./PreviewInfo";

function CreateDeploymentPage(props) {
    const [pending, setPending] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const toggleCurrentPage = (type) => {

        if (type === 'add') {
            if (currentPage === 4) {

            } else {
                setCurrentPage(parseInt(currentPage) + 1);
            }

        } else {
            if (currentPage === 1) {

            } else {
                setCurrentPage(parseInt(currentPage) - 1);
                // alert(currentPage)

            }

        }
    }
    const handleSubmit = () => { };
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
                        <div className="container relative mx-auto">
                            <div className="items-center flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                                    <div className="pr-12">
                                        <h1 className="text-white font-semibold text-5xl">
                                            Deployment Creation.
                                        </h1>
                                        <p className="mt-4 text-lg text-gray-200">
                                            Create Your Own Deployment
                                        </p>
                                    </div>
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
                    <section className="pb-5 bg-gray-200 -mt-24">
                        <div className="container mx-auto px-2 md:px-4">
                            <div className="flex flex-wrap">
                                <div className="lg:pt-12 pt-2 md:pt-6 w-full md:w-12/12 px-0 md:px-4 text-center">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-md rounded-md">
                                        <div className="p-2 md:p-4">

                                            <div className="grid grid-cols-1 md:flex md:items-start md:justify-between p-2 gap-2">
                                                {/* #3B404C,bg-blue-500 */}
                                                <div className="md:min-h-[450px] w-full md:w-4/12 bg-[#3B404C] shadow-md rounded-md p-2">
                                                    <div className="p-4 grid grid-cols-4 gap-2 md:grid-cols-1">
                                                        <div className="flex items-start justify-start mb-3">

                                                            <div className={`border-1 border-white rounded-full text-white p-[4px] h-[35px] w-[35px] ${parseInt(currentPage) > 0 ? 'bg-blue-300' : ''
                                                                }`} style={{ border: "1px solid white" }}>1</div>
                                                            <div className=" grid-cols-1 pl-4 hidden md:block">
                                                                <div className="text-left font-bold text-gray-400">STEP 1</div>
                                                                <div className="text-left font-bold text-gray-100 uppercase">Your Deployment</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start justify-start mb-3">

                                                            <div className={`border-1 border-white rounded-full text-white p-[4px] h-[35px] w-[35px] ${parseInt(currentPage) > 1 ? 'bg-blue-300' : ''
                                                                }`} style={{ border: "1px solid white" }}>2</div>
                                                            <div className="hidden grid-cols-1 pl-4 items-start justify-start md:block">
                                                                <div className="text-left font-bold text-gray-400 uppercase">Step 2</div>
                                                                <div className="text-left font-bold text-gray-100 uppercase">Your Organisation</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start justify-start mb-3">

                                                            <div className={`border-1 border-white rounded-full text-white p-[4px] h-[35px] w-[35px] ${parseInt(currentPage) > 2 ? 'bg-blue-300' : ''
                                                                }`} style={{ border: "1px solid white" }}>3</div>
                                                            <div className="hidden grid-cols-1 pl-4 md:block">
                                                                <div className="text-left font-bold text-gray-400 uppercase">Step 3</div>
                                                                <div className="text-left font-bold text-gray-100 uppercase">Your Account</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start justify-start">

                                                            <div className={`border-1 border-white rounded-full text-white p-[4px] h-[35px] w-[35px] ${parseInt(currentPage) > 3 ? 'bg-blue-300' : ''
                                                                }`} style={{ border: "1px solid white" }}>4</div>
                                                            <div className="hidden grid-cols-1 pl-4 md:block">
                                                                <div className="text-left font-bold text-gray-400 uppercase">Step 4</div>
                                                                <div className="text-left font-bold text-gray-100 uppercase">Confirm</div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="md:min-h-[150px] w-full md:w-8/12 bg-white md:pl-5 md:p-3">
                                                    {parseInt(currentPage) == 1 &&
                                                         <DeploymentInfo />
                                                    }
                                                    {parseInt(currentPage) == 2 &&
                                                        <OrganizationInfo />
                                                    }
                                                    {parseInt(currentPage) == 3 &&
                                                         <AccountInfo />
                                                    }
                                                    {parseInt(currentPage) == 4 &&
                                                         <PreviewInfo />
                                                    }
                                                   
                                                    <div className='flex items-center justify-between mt-4'>



                                                        {parseInt(currentPage) > 1 &&
                                                            // <a className="btn  px-4 flex justify-between" onClick={() => toggleCurrentPage('substract')}>
                                                            //     <span className="p-1 mr-2 rounded-md">
                                                            //         <FaArrowLeft className="w-4 h-4" />

                                                            //     </span>
                                                            //     Back
                                                            // </a>
                                                            <a onClick={() => toggleCurrentPage('substract')}
                                                                className="bg-white btn text-black active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                                                                type="button" variant="warning"
                                                            >
                                                                <i className="fas fa-arrow-alt-circle-left"></i> Back
                                                            </a>
                                                        }
                                                        {parseInt(currentPage) == 1 &&
                                                            <a></a>
                                                        }
                                                        {parseInt(currentPage) < 4 &&
                                                            <a onClick={() => toggleCurrentPage('add')}
                                                                className="bg-white btn text-black active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                                                                type="button" variant="warning"
                                                            >
                                                                Next  <i className="fas fa-arrow-alt-circle-right"></i>
                                                            </a>
                                                            // <a className="btn flex  px-4 justify-between" onClick={() => toggleCurrentPage('add')}>
                                                            //     Next
                                                            //     <span className="p-1 ml-2 rounded-md">
                                                            //         <FaArrowRight className="w-4 h-4" />

                                                            //     </span>

                                                            // </a>
                                                        }
                                                        {parseInt(currentPage) == 4 &&
                                                            <>
                                                                {/* {invalidFields !== "" && (<p className='bg-red-700 shadow text-left p-3 rounded-xl text-white'>{invalidFields}</p>)} */}
                                                                {/* <div className="modal-action"> */}
                                                                {/* <button className="btn" onClick={() => { setCurrentPage(1); props.closeModal(); setPending(false) }}>Cancel</button> */}

                                                                {pending ? <button className="btn bg-blue-500 text-black hover:bg-blue-700" disabled={true}><LoadingIcon /> processing..</button> : <>
                                                                    {/* <a onClick={handleSubmit} className="btn bg-blue-500 text-black hover:bg-blue-700">Submit </a>  */}
                                                                    <Link
                                                                        //  onClick={() => toggleCurrentPage('add')}
                                                                        to="/deployment/map_view"
                                                                        className="bg-white btn text-black active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                                                                        type="button" variant="warning"
                                                                    >
                                                                        Submit  <i className="fas fa-arrow-alt-circle-ok"></i>
                                                                    </Link>
                                                                    {/* <a onClick={handleUpdate} className="btn bg-green-500 text-white hover:bg-green-700">Update </a> */}

                                                                </>
                                                                }

                                                                {/* </div> */}
                                                            </>
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>


                        </div>
                    </section>



                </main>
            </motion.div>
        </>
    );
}

export default CreateDeploymentPage;

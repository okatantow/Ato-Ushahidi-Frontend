import React from "react";
import { motion } from "framer-motion";
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
} from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import { propTypes } from "react-bootstrap/esm/Image";


function PopupSinglePost(props) {
    return (
        <>

            <div className="min-h-[50px] rounded shadow-sm  grid grid-cols-1 gap-1 items-start justify-start py-2" style={{ border:'1px solid #f5f5f5', borderLeft: '10px solid black' , width:"500px"}}>
                <div className="flex justify-end gap-6 px-2">
                    <span ><CiEdit className="h-7 w-7 cursor-pointer" /></span>
                    <span><FaShare className="h-6 w-6 cursor-pointer" /></span>
                    <span>...</span>
                </div>
                <div className="">
                    <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{props?.post?.title }</h2>
                    <p>{props?.post?.description}</p>

                </div>
                <div className="flex justify-start gap-6">
                    <div className="min-h-[50px] min-w-[50px] rounded-full bg-gray-400 shadow flex items-center justify-center">2</div>
                    <div className="grid grid-cols-1">
                        <div>{props?.post?.deployment_name }</div>
                        <div className="flex justify-start gap-6 text-sm text-gray-500">
                            <div>2 days ago</div>
                            <div className="bg-slate-100 px-1 rounded-sm">published</div>
                            <div>via web</div>
                        </div>
                    </div>


                </div>


            </div>
          

        </>
    );
}

export default PopupSinglePost;

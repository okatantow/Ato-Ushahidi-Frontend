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
import SinglePostListCard from "./SinglePostListCard";
import Spinner from 'react-bootstrap/Spinner';

function PostList(props) {
    return (
        <>
       
           {props?.posts?.map((record,index)=>(
                     
                      <SinglePostListCard key={index} post={record}/>
                      
                    ))}
        </>
    );
}

export default PostList;

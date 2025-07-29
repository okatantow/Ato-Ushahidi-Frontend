import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SinglePostListCard from "./SinglePostListCard";
import UpdatePostModal from "./UpdatePostModal";
import AddToCollection from "./AddToCollection";

function PostList(props) {
  const [show, setShow] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation of children
      },
    },
  };

  // Variants for each card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 }, // Start hidden and slightly below
    visible: { opacity: 1, y: 0 }, // Animate to visible and original position
  };

  return (
    <>
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 220px)" }} // Adjust maxHeight as needed
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {props?.posts?.map((record, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            transition={{ duration: 0.5, delay: index * 0.2 }} // Add delay based on index
          >
            <SinglePostListCard post={record} showCollection={showCollection} setShowCollection={setShowCollection} show={show} setShow={setShow} setSelectedRecord={setSelectedRecord} removeFromCollection={props.removeFromCollection} deletePost={props.deletePost} updatePostStatus={props.updatePostStatus}/>
          </motion.div>
        ))}
      </AnimatePresence>
      
    </motion.div>
    <AddToCollection show={showCollection} setShow={setShowCollection} selectedRecord={selectedRecord}/>

    <UpdatePostModal show={show} setShow={setShow} selectedRecord={selectedRecord}/> 
  </>);
}

export default PostList;
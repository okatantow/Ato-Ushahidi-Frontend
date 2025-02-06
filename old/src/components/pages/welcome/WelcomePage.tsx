// import Link from "next/link"
import { motion } from "framer-motion";
import SearchInput from "./SearchInput"


function WelcomePage() {
    return (<>
    
      <motion.div
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.75,
      }}
      className="nav-bar"
    >
<div id="form" className="min-h-[300px] p-2 px-4 bg-white mt-3 rounded">
      {/*<SearchInput/>*/}
  <div className="mt-5 ">
        <h2 className='text-center text-[16px] text-gray-600 mb-3'>
            Welcome to ....
        </h2>
        </div>
    </div>
    </motion.div>

    
    



  
   
    </>)
}
export default WelcomePage
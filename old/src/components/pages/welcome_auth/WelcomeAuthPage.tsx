// import Link from "next/link"
import { motion } from "framer-motion";
import SearchInputOtp from "./SearchInputOtp"


function WelcomeAuthPage() {
    return (<>
<motion.div
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.75,
      }}
      className="nav-bar"
    >
<div id="form" className="min-h-[350px] p-2 px-4 bg-white mt-3 rounded">
      <SearchInputOtp/>
    </div>
    </motion.div>
    
   
    </>)
}
export default WelcomeAuthPage
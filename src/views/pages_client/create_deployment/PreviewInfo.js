import React from "react";

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
import { motion } from "framer-motion";

function PreviewInfo(props) {
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
                     <Form className="md:min-h-[387px]">
                     <div className='grid grid-cols-1'>
          <div className='grid grid-cols-1 md:grid-cols-1 gap-5 p-4 '>
            <div>
             
              <div className="flex px-4 bg-gray-100  py-1 rounded-xl items-center justify-between italic mt-0 mb-2">
                <span>
                  <b>Deployment Name : </b>
                  {/* <br /> */}
                  <span className="ml-2">{props.formValue.name}sss</span>
                </span>
              </div>

              <div className="flex px-4 bg-gray-100  py-1 rounded-xl items-center justify-between italic">
                <span>
                  <b>Deployment URL : </b>
                  {/* <br /> */}
                  <span className="ml-2">{props.formValue.url}</span>
                </span>
              </div>
              <hr />
              <div className="flex px-4 bg-gray-100  py-1 rounded-xl items-center justify-between italic mt-0 mb-2">
                <span>
                  <b>Organization Name : </b>
                  {/* <br /> */}
                  <span className="ml-2">{props.formValue.organization_name}</span>
                </span>
              </div>

              <div className="flex px-4 bg-gray-100  py-1 rounded-xl items-center justify-between italic mb-2">
                <span>
                  <b>Size Of Organization : </b>
                  {/* <br /> */}
                  <span className="ml-2">{props.formValue.size_of_organization}</span>
                </span>
              </div>
              <div className="flex px-4 bg-gray-100  py-1 rounded-xl items-center justify-between italic mt-0 mb-2">
                <span>
                  <b>Catchment Area : </b>
                  {/* <br /> */}
                  <span className="ml-2">{props.formValue.deployment_category}</span>
                </span>
              </div>
              <hr/>
              <div className="flex px-4 bg-gray-100  py-1 rounded-xl items-center justify-between italic mt-0 mb-2">
                <span>
                  <b>Display Name : </b>
                  {/* <br /> */}
                  <span className="ml-2">{props.formValue.display_name}</span>
                </span>
              </div>

              <div className="flex px-4 bg-gray-100  py-1 rounded-xl items-center justify-between italic mb-2">
                <span>
                  <b>Site Admin : </b>
                  {/* <br /> */}
                  <span className="ml-2">{props.formValue.admin_name}</span>
                </span>
              </div>
              <div className="flex px-4 bg-gray-100  py-1 rounded-xl items-center justify-between italic mt-0 mb-2">
                <span>
                  <b>Email : </b>
                  {/* <br /> */}
                  <span className="ml-2">{props.formValue.email}</span>
                </span>
              </div>

              {/* <div className="flex px-4 bg-gray-100  py-1 rounded-xl items-center justify-between italic">
                <span>
                  <b>Password : </b>
                  <span className="ml-2">{props.formValue.url}</span>
                </span>
              </div> */}
              
            </div>
            
          </div>
        </div>
                </Form>
            </motion.div>
        </>
    );
}

export default PreviewInfo;

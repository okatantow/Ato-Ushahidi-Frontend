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

function AccountInfo() {
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
                <Form className="md:min-h-[367px]">
                    <h3 className="block items-start text-blue-900 font-bold text-[17px] md:text-[20px] pt-0 mt-0" style={{ textAlign: "left" }}>Account Information</h3>
                    <p className="hidden md:block items-start text-gray-500" style={{ textAlign: "left" }}>Please provide your display name, email, login password</p>

                    <Form.Group className="mb-3 grid grid-cols-1  items-start justify-start mt-1" controlId="exampleForm.ControlInput1">
                        <div className="block items-start text-blue-900" style={{ textAlign: "left" }}>Display Name<span className="pl-2 text-sm text-[0.7em] text-gray-500">Display Name</span></div>
                        <Form.Control
                            type="text"
                            placeholder="Title of your deployment  "
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 grid grid-cols-1  items-start justify-start" >
                        <Form.Label className="block items-start text-blue-900" style={{ textAlign: "left" }}>Email<span className="pl-2 text-sm text-[0.6em] text-gray-500">You will use this email to login</span></Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Login Email  "
                            autoFocus
                        />
                    </Form.Group>

                     <Form.Group className="mb-3 grid grid-cols-1  items-start justify-start" >
                                            <Form.Label className="block items-start text-blue-900" style={{ textAlign: "left" }}>Password<span className="pl-2 text-sm text-[0.6em] text-gray-500">You will use this password to login</span></Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Login Password  "
                                                autoFocus
                                            />
                                        </Form.Group>
                </Form>
            </motion.div>
        </>
    );
}

export default AccountInfo;

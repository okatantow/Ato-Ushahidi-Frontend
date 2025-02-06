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

function PreviewInfo() {
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
                <p>Preview</p>
                </Form>
            </motion.div>
        </>
    );
}

export default PreviewInfo;

import {React,useState,useEffect} from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Tab
} from "react-bootstrap";
import { useLocation, NavLink } from "react-router-dom";

function GeneralSettingsPage(props) {
  const [settingsData, setSettingsData] = useState();
  const [deploymentData, setDeploymentData] = useState([]);
// console.log('settingsData');
// console.log(settingsData);
useEffect(()=>{
  // console.log('settingsData');
  // console.log(props?.settingsData)
  setSettingsData(props?.settingsData);
  setDeploymentData(props?.deploymentData);
  // console.log(dData);
},[]);
   
  return (
    <>

            <Card>
              <Card.Header>
                <Card.Title as="h4">General</Card.Title>
              </Card.Header>
              <Card.Body>
                
                <Form>
                <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Deployment Name {deploymentData?.name}</label>
                        <Form.Control
                          defaultValue="deployment."
                          disabled
                          placeholder="Deployment Name"
                          type="text"
                          name="name"
                          value={props?.deploymentData?.name}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                   
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About </label>
                        <Form.Control
                          cols="80"
                          
                          placeholder="Describe Your Site Or Deployment"
                          rows="4"
                          as="textarea"
                          value={props?.deploymentData?.about}
                        >
                          
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Display Name</label>
                        <Form.Control
                        
                          placeholder="Company"
                          type="text"
                          value={props?.deploymentData?.display_name}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Contact Email address
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                          disabled
                          value={props?.deploymentData?.email}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
<br/>
<br/>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
         
    </>
  );
}

export default GeneralSettingsPage;

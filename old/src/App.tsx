import React from 'react';
// import logo from './logo.svg'; // Assuming logo.svg is an image
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MasterLayout from './layout/MasterLayout';
import WelcomePage from './components/pages/welcome/WelcomePage';
import WelcomeAuthPage from './components/pages/welcome_auth/WelcomeAuthPage';
import InvoicePage from './components/pages/invoice/InvoicePage';
import InvoiceItemPage from './components/pages/invoice_item/InvoiceItemPage';
import CompletePaymentPage from './components/pages/complete_payment/CompletePaymentPage';


interface AppProps {} // Empty interface for App component

function App(props: AppProps) {
  return (<>
    <Router>
          
         <Routes>
        

            <Route path="admin/"  element= {<MasterLayout/>}
            >
             {/*<Route path="/"  element= {<WelcomePage />}></Route>
             <Route path="/welcome"  element= {<WelcomePage />}></Route>
             <Route path="/welcome_auth"  element= {<WelcomeAuthPage />}></Route>
             <Route path="/invoices"  element= {<InvoicePage />}></Route>
             <Route path="/invoice_item"  element= {<InvoiceItemPage />}></Route>
             <Route path="/complete_payment"  element= {<CompletePaymentPage />}></Route>*/}
            {/* <Route  path="/admin/rooms"  element= {<RoomScreen />}>
            </Route> */}
            


         </Route>
         
        
        

             <Route path="/"  element= {<WelcomePage />}>
            </Route> 
            {/* <Route path="/welcome"  element= {<WelcomePage />}>
            </Route> */}
            <Route path="/welcome_auth"  element= {<WelcomeAuthPage />}>
            </Route>
         </Routes>
         

      </Router>
    </>
  );
}

export default App;
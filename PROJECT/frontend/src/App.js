import "bulma/css/bulma.min.css";

import {BrowserRouter}from 'react-router-dom';


import 'react-toastify/dist/ReactToastify.css'

import Navigation from "./components/Online-shopping-components/Navigation";
import ThemeProvider from './components/Online-shopping-components/theme';
import Onlineshop_routes from "./routes/Onlineshop_routes";
import Footer from "./components/Online-shopping-components/Footer";

import ScrollToTop from './components/Online-shopping-components/components/scroll-to-top';
import Router from './components/Online-shopping-components/routes'

function App() {
  //header
 
return(
    <BrowserRouter>
  
      
    
   <Navigation/>
   <Router/>


  {/* <center><div id="tttt">
    Flex Fitness private limited
  </div></center> */}
    <footer id = "tttt">
          <div className="text-center">All rights reserved</div>
        </footer>
  
  
   
    


   </BrowserRouter>
  
  
)

}

export default App;

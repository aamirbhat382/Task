import React  from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Test from "./Test";




function AllRoutes() {
 
  return (
   
    <Router>
      <Routes>
      <Route path="/test" element={<Test/>}/>
        <Route path="/" element={<App/>}/>
       
      </Routes>
    </Router>
    
  );
}


export default AllRoutes;
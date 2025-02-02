import React, { useState } from "react";


import SignUpDetailsForm from "./components/SignUpDetailsForm";
import ProfileSetup from "./components/WelcomeProfile";
import SignUpPage from "./components/SignUp_OTP";



const App = () => {

  return (
      <div className="min-h-screen flex items-center justify-center ">    

   
        
     <ProfileSetup/>
      
    </div>
  );
};

export default App;
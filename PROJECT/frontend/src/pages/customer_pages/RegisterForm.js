import React from 'react';
import './RegisterFormStyle.css';

import {motion} from 'framer-motion'
import {Link} from "react-router-dom";

import Customer_Reg_Background from '../../assets/images/CustomerReg.jpg';

function RegisterForm() {

return(
<motion.div 
className="container"

initial= {{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0 ,transition:{duration:0.1}}}
>
<div className="Title">
<p className="text-uppercase text-center">  
  <p className="display-4">Register</p>
  <img src="https://icon-library.com/images/username-icon-vector/username-icon-vector-15.jpg" class="rounded " alt="..."/>
</p>
</div>
<div className="CustomerReg-bannerImage-container">
        <img src={Customer_Reg_Background} alt="" />
</div>
<form className="row g-3 w-75 needs-validation " novalidate>
  <div className="RegisterForm ">
  <div className="col-md-12 font-weight-bold">
    <label for="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" placeholder="Enter name"required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-12 font-weight-bold">
    <label for="age" className="form-label">Age</label>
    <input type="text" className="form-control" id="age" placeholder="Enter age" required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-12 font-weight-bold">
    <label for="UserName" className="form-label">Username</label>
    <div className="input-group has-validation">
      <span className="input-group-text" id="inputGroupPrepend">@</span>
      <input type="text" className="form-control" id="UserName" placeholder="Enter username"aria-describedby="inputGroupPrepend" required/>
      <div className="invalid-feedback">
        Please choose a username.
      </div>
    </div>
  </div>

  <div className="col-md-12 font-weight-bold">
    <label for="password" className="form-label">Password</label>
    <input type="password" className="form-control"placeholder="Enter password" id="password" required/>
    <div className="invalid-feedback">
      Please provide a valid password.
    </div>
  </div>

  <div className="col-md-12 font-weight-bold">
    <label for="confirmPwd" className="form-label">Confirm Password</label>
    <input type="text" className="form-control" placeholder="Re-Enter password"id="confirmPwd" required/>
    <div className="invalid-feedback">
      Please provide a valid zip.
    </div>
  </div>

  <div className="col-md-3 font-weight-bold">
    <label for="Gender" className="form-label">Gender</label>
    <select className="form-select" id="validationCustom04" required>
      <option selected disabled value="">Choose...</option>
      <option>Male</option>
      <option>Female</option>
      <option>Not perefer to tell</option>
    </select>
    <div className="invalid-feedback">
      Please select a valid option.
    </div>
  </div>
 
  <div className="col-12 ">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
      <label className="form-check-label" for="invalidCheck">
        Agree to terms and conditions
      </label>
      <div className="invalid-feedback">
        You must agree before submitting.
      </div>
    </div>
  </div>
  <div className="text-center">
                 <div> <button type="submit" className="btn btn-success  p-2 py-1">Register</button></div>
        </div>

  <div className="text-center">
        <p class="h6">Already a member?
        <Link to="/login">
        <a href="#" class="link-primary">Login now</a>
        </Link>
        </p>
  </div>
  </div>
</form>
<Link to="/">
    <button className="secondary-button"> Home</button>
</Link>
</motion.div>
    );
}

export default RegisterForm;
import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form } from 'react-bootstrap'
import {Helmet} from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import { Store } from './Store';
function Shipping() {
    const {state , dispatch : ctxDispatch} = useContext(Store);
    const navigate = useNavigate();
    const {
      userInfo,
        cart: { shippingAddress} ,
    } = state;
    const[fullName , setFullName] = useState(shippingAddress.fullName || '');
    const[Address , setAddress] = useState(shippingAddress.Address || '');
    const[city , setcity] = useState(shippingAddress.city || '');
    const[postalCode , setPostalCode] = useState(shippingAddress.postalCode || '');
    const[Country , setCountry] = useState(shippingAddress.Country || '');
   
    useEffect(() => {
      if(!userInfo){
        navigate('/signin')
      }
    } , [userInfo , navigate])
    const submitHandler = (e) =>{
       e.preventDefault();
       ctxDispatch({
        type: 'SHIPPING_ADDRESS',
        payload:{
            fullName,
            Address,
            city,
            postalCode,
            Country,
        },
       });
       localStorage.setItem(
        'shippingAddress' , 
          JSON.stringify({
            fullName,
            Address,
            city,
            postalCode,
            Country,
          })

       );
       navigate('/payment');

    }
  return (
    <div>
      <Helmet>
         <title>Shipping Address</title>
      </Helmet>
      <h1 className='my-3'>Shipping Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Label>Full Name</Form.Label>
        <Form.Control
            value = {fullName}
            onChange = {(e) => setFullName(e.target.value)}
            required
    />
        <Form.Label>Address</Form.Label>
        <Form.Control
            value = {Address}
            onChange = {(e) => setAddress(e.target.value)}
            required
    />
        <Form.Label>City</Form.Label>
        <Form.Control
            value = {city}
            onChange = {(e) => setcity(e.target.value)}
            required
    />
        <Form.Label>PostalCode</Form.Label>
        <Form.Control
            value = {postalCode}
            onChange = {(e) => setPostalCode(e.target.value)}
            required
    />
        <Form.Label>Country</Form.Label>
        <Form.Control
            value = {Country}
            onChange = {(e) => setCountry(e.target.value)}
            required
    /><div className='mt-3'>
        <Button variant='primary' type = "submit">
           continue▶️
        </Button>
    </div>

      </Form>
    </div>
  )
}

export default Shipping

import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Payment_home from '../pages/Payment_pages/Payment_home';

export default function Payment_routes() {
  return (
    <Routes>
    <Route  path="/payment_home" element={<Payment_home/>}/>
    </Routes>
  )
}

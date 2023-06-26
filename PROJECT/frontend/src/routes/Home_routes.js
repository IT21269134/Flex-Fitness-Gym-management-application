import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from "../pages/homepage/Home";


export default function Home_routes() {
  return (
    <Routes>
        <Route  path="/" element={<Home />}/>
    </Routes>
  )
}

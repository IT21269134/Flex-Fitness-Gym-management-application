import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Trainer_home from '../pages/trainer_pages/Trainer_home';
import TrainerAD from '../pages/trainer_pages/Traner_ads';
import Dashboardfunction from '../pages/trainer_pages/Trainer_Dashboard';
import WorkoutPage from '../pages/trainer_pages/TrainerWokouts';
export default function Trainer_routes() {
  return (
    <Routes>
    <Route  path="/trainer_home" element={<Trainer_home/>}/>
    <Route  path="/trainerAD" element={<TrainerAD/>}/>
    <Route  path="/dash" element={<Dashboardfunction/>}/>
    <Route  path="/wpage" element={<WorkoutPage/>}/>
    </Routes>
  )
}

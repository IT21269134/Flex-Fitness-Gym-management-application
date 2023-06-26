import React from "react";
import { Route, Routes } from "react-router-dom";
import Fitness_home from "../pages/fitness_pages/Fitness_home";
import Fitness_log from "../pages/fitness_pages/Fitness_log";
import Fitness_LogD from "../pages/fitness_pages/Fitness_LogD";
import UpdateFitnessGoal from "../pages/fitness_pages/UpdateFitnessGoal";

export default function Fitness_routes() {
  return (
    <Routes>
      <Route path="/fitness_home" element={<Fitness_home userID="A1" />} />
      <Route path="/fitness_goals" element={<Fitness_log />} />
      <Route path="/fitness_log" element={<Fitness_LogD />} />
      <Route path="/updateFitness_goals" element={<UpdateFitnessGoal />} />
    </Routes>
  );
}

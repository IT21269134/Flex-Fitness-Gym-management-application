import React from "react";
import { Route, Routes } from "react-router-dom";
import Inventory_home from "../pages/inventory_mgt/Inventory_home";
import { ItemsContextProvider } from "../contexts/inventory-contexts/ItemContext";

export default function Inventory_routes() {
  return (
    <ItemsContextProvider>
      <Routes>
        <Route path="/inventory_home" element={<Inventory_home />} />
      </Routes>
    </ItemsContextProvider>
  );
}

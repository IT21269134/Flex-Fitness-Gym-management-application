import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css'
import App from './App';
import {HelmetProvider} from 'react-helmet-async'
import { StoreProvider } from './components/Online-shopping-components/Store';
import { ItemsContextProvider } from "./contexts/inventory-contexts/ItemContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ItemsContextProvider>
    <StoreProvider>
    <HelmetProvider>
    <App />
    </HelmetProvider>
    </StoreProvider>
    </ItemsContextProvider>
  
);

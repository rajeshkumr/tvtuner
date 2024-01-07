import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import "@ionic/react/css/core.css";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
      <App />
      <Analytics />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

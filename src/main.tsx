import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from "./global/AuthContext";
import { socket, SocketContext } from "@/contexts/socket"
import { ToastContainer } from "react-toastify";


ReactDOM.createRoot(document.getElementById('root')!).render(
      <>
      <SocketContext.Provider value={socket}>
            <App />
      </SocketContext.Provider>
      <ToastContainer />
      </>
)

postMessage({ payload: 'removeLoading' }, '*')

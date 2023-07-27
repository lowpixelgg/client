import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from "./global/AuthContext";
import { socket, SocketContext } from "@/contexts/socket"


ReactDOM.createRoot(document.getElementById('root')!).render(
      <SocketContext.Provider value={socket}>
            <App />
      </SocketContext.Provider>
)

postMessage({ payload: 'removeLoading' }, '*')

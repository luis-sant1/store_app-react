import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './components/Context/AuthContext';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render( // Root
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BlogContextProvider } from './context.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BlogContextProvider >
    <App />
    </BlogContextProvider>
  </React.StrictMode>,
)

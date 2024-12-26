import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/home/Home'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Workspace from './pages/workspace/workspace';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/workspace" element={<Workspace/>} />
      </Routes>
      <ToastContainer position='top-right' />
    </Router>
  )
}


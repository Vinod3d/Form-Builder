import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/home/Home'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Workspace from './pages/workspace/workspace';
import withAuth from './components/withAuth';
import Settings from './pages/settings/Settings';
import FormBuilder from './pages/formBuilder/FormBuilder';
import ChatbotForm from './pages/formBuilder/components/chatbot-form/ChatbotForm';


export default function App() {
  const ProtectedWorkspace = withAuth(Workspace); 
  const ProtectedSettings = withAuth(Settings); 
  const ProtectedFormBuilder = withAuth(FormBuilder); 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/workspace" element={<ProtectedWorkspace/>} />
        <Route path="/settings" element={<ProtectedSettings/>} />
        <Route path="/form-builder/:formId" element={<ProtectedFormBuilder/>} />
        <Route path="/form/:formId" element={<ChatbotForm/>} />
      </Routes>
      <ToastContainer position='top-right' />
    </Router>
  )
}


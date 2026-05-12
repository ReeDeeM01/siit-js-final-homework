import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Videos from './pages/Videos'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#1a1a1a',
          color: '#ffffff',
          border: '1px solid #2a2a2a'
        },
        success: { iconTheme: { primary: '#4dff80', secondary: '#1a1a1a' } },
        error: { iconTheme: { primary: '#ff4d4d', secondary: '#1a1a1a' } }
      }} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/videos" element={<Videos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

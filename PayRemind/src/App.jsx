import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ActiveService from './pages/ActivePage'
import OverduePage from './pages/OverduePage'
import PaidService from './pages/PaidService'
import FormService from './pages/FormService'

import ProtectedRoute from './pages/ProtectedRoute'
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute/>} >
            <Route path="/service" element={<FormService />} />
            <Route path="/service/active" element={<ActiveService />} />
            <Route path="/service/overdue" element={<OverduePage />} />
            <Route path="/service/paid" element={<PaidService />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App
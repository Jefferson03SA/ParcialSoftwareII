import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {
 return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<h1>Home page</h1>} />
       <Route path="/login" element={<LoginPage/>}/>
       <Route path="/register" element={<RegisterPage/>} />
       <Route path="/service" element={<h1>Añadir Servicio</h1>} />
       <Route path="/service/active" element={<h1>Servicios activos</h1>} />
       <Route path="/service/overdue" element={<h1>Servicios vencidos</h1>} />
       <Route path="/service/paid" element={<h1>Servicios pagados</h1>} />
     </Routes>
   </BrowserRouter>
 )
}

export default App
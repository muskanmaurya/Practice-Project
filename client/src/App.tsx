import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomaPage from './pages/HomaPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar.tsx'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomaPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
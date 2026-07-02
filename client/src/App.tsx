import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomaPage from './pages/HomaPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <>
    <BrowserRouter>
  
    <Routes>
      <Route path="/" element={<HomaPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/select-role" element={<LoginPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
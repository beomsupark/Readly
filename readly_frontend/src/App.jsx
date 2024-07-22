import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import OnBoard from './pages/OnBoard.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}>Login</Route>
      <Route path='/onboard' element={<OnBoard />}>OnBoard</Route>
    </Routes>
  )
}

export default App

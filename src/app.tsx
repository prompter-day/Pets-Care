import { Route, Routes } from 'react-router-dom'
import Mainpage from './pages/mainpage/page'
import Start from './pages/start/page'
import Login from './pages/login/page'
import Signup from './pages/signup/page'

declare global {
  interface Window {
    kakao: any;
  }
  const kakao: any;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/main" element={<Mainpage />} />
    </Routes>
  )
}
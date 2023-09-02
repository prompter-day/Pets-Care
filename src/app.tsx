import { Route, Routes } from 'react-router-dom'
import Mainpage from './pages/mainpage/page'
import Start from './pages/start/page'

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
      <Route path="/main" element={<Mainpage />} />
    </Routes>
  )
}
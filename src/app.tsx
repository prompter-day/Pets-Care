import { Route, Routes } from 'react-router-dom'
import Mainpage from './pages/mainpage/page'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
    </Routes>
  )
}
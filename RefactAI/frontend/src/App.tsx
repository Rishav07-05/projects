
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Dashboard from './Dashboard'
import Docs from './Docs'



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/docs" element={<Docs />} />
    </Routes>
  )
}

export default App

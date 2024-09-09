import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainLayout from './Layouts/mainLayout.js'
import Home from './Pages/Home.js'

function App() {
  

  return (
    <>
    <Router>
     <MainLayout>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route/>
        <Route/>
        <Route/>
      </Routes>
     </MainLayout>
     </Router>
    </>
  )
}

export default App

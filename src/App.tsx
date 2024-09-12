import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout.js'
import Home from './Pages/Home.js'
import Contact from './Pages/Contact.js'

function App() {
  

  return (
    <>
    <Router>
     <MainLayout>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route/>
        <Route/>
      </Routes>
     </MainLayout>
     </Router>
    </>
  )
}

export default App

import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout.js'
import Home from './Pages/Home.js'
import Contact from './Pages/Contact.js'
import About from './Pages/About.js'
import Gallery from './Components/Gallery.js'
import Blog from './Pages/Blog.js'
import Donate from './Pages/Donate.js'
import ScrollToHash from './Components/ScrollToHash.js'
import ScrollToTop from './Components/ScrollToTop.js'

function App() {
  

  return (
    <>
    <Router>
     <ScrollToHash />
     <ScrollToTop />
     <MainLayout>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/gallery' element={<Gallery/>} />
        <Route path='/work' element={<Home/>} />
        <Route path='/blogs' element={<Blog/>} />
        <Route path='/donate' element={<Donate/>} />
      </Routes>
     </MainLayout>
     </Router>
    </>
  )
}

export default App

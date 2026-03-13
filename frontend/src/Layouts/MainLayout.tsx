import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";



const MainLayout = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-grow">{children}</main>
      <Footer/>
    </div>
  )
}

export default MainLayout

 
import { useState } from 'react';
import About from './components/About'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero';

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // State to handle search query 
   

  return (
    <>
     <Header onSearch={setSearchQuery} />
     <Hero onSearch={setSearchQuery}/>
    <About searchQuery={searchQuery}/>
    <Footer/>
       
    </>
  )
}

export default App

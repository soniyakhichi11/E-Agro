import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Navbar} from "./components/Navbar";
import {Register} from "./components/Register";
import {FormRental} from "./components/FormRental";
import {Rental} from "./components/Rental";
import { BookingPage } from './components/BookingPage';
import {Home} from "./components/Home";
import {Footer} from "./components/Footer";
import {About} from "./components/About";
import {ContactPage} from "./components/Contact";
import {Login} from "."

function App() {
 
  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
     <Route path="/register" element={<Register />} /> 
     <Route path ="/FormRental" element={<FormRental />} />
     <Route path ="/Rental" element={<Rental />} />
     <Route path ="/Booking/:id" element={<BookingPage />} />
     <Route path ="/" element={<Home />} />
     <Route path ="/About" element ={<About/>}/>
     <Route path ="/Contact-us" element ={<ContactPage/>}/>
    
     </Routes>
     <Footer/>
     </BrowserRouter>
    </>
  )
}

export default App

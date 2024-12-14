import './App.css';
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Contact from './pages/Contact.jsx'
import Etkinlikler from './pages/Etkinlikler.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EtkinlikDetay from './pages/EtkinlikDetay.jsx';
import Topluluklar from './pages/Topluluklar.jsx';
import SporTopluluklari from './pages/SporTopluluklari.jsx';
import KulturSanatTopluluklari from './pages/KulturSanatTopluluklari.jsx';
import UzmanlıkTopluluklari from './pages/UzmanlikTopluluklari.jsx';
import ToplulukDetay from './pages/ToplulukDetay.jsx';
import AnaSayfa from './pages/AnaSayfa.jsx';





function App() {
  return (

    <Router>
      
      <div className='App'>
      <Navbar/>
      
      <Routes>
      
        <Route path='/' element={<AnaSayfa/>}/>
        <Route path='/etkinlikler' element={<Etkinlikler/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/etkinlikdetay/:etkinlikId' element={<EtkinlikDetay/>}/>
        <Route path='/topluluklar' element={<Topluluklar/>}/>
        <Route path='/uzmanlik-topluluklari' element={<UzmanlıkTopluluklari/>}/>
        <Route path='/kultur-sanat-topluluklari' element={<KulturSanatTopluluklari/>}/>
        <Route path='/spor-topluluklari' element={<SporTopluluklari/>}/>
        <Route path='/toplulukdetay/:toplulukId' element={<ToplulukDetay/>}/>




      </Routes>

     

      <Footer/>

      </div>
      
      
      </Router>
    
      
  
    
  );
}

export default App;

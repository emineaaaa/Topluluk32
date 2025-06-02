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
import LoginPage from "./pages/LoginPage.jsx";
import YoneticiEtkinlikİstek from "./pages/YoneticiEtkinlikİstek.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";




function App() {
  return (

    <Router>
      
      <div className='App'>
      <Navbar/>
      
      <Routes>
      
        <Route path='/' element={<AnaSayfa/>}/>
        <Route path='/etkinlikler' element={<Etkinlikler/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/etkinlikdetay' element={<EtkinlikDetay/>}/>
        <Route path='/topluluklar' element={<Topluluklar/>}/>
        <Route path='/uzmanlik-topluluklari' element={<UzmanlıkTopluluklari/>}/>
        <Route path='/kultur-sanat-topluluklari' element={<KulturSanatTopluluklari/>}/>
        <Route path='/spor-topluluklari' element={<SporTopluluklari/>}/>
        <Route path='/toplulukdetay/:duzenleyen' element={<ToplulukDetay />} />
        <Route path='/toplulukdetay' element={<ToplulukDetay />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/etkinlik-talep"
          element={
            <PrivateRoute>
              <YoneticiEtkinlikİstek />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />






      </Routes>

     

      <Footer/>

      </div>
      
      
      </Router>
    
      
  
    
  );
}

export default App;

import React, { useEffect, useState } from 'react'
import { CgSearchLoading } from "react-icons/cg";
import { FaMoon, FaSun } from "react-icons/fa"; 
import { AllButtons } from './AllButtons';





const Navbar = () => {
    const [isActive, setIsActive] = useState(false);



    const [topluluklar, setTopluluklar]=useState([])

    const [showAll, setShowAll] = useState(false);

    const handleShowAll = () => {
      setShowAll(!showAll);
    };
  
  


/*KARANLIK MOD */
    // Kullanıcı teması kaydedilsin
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Temayı değiştirme fonksiyonu
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);  // Tercihi sakla

    document.documentElement.classList.toggle('dark-theme');

  };

  // Temayı HTML'e uygula
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const topluluklar=process.env.REACT_APP_TOPLULUKLAR;
    fetch(topluluklar)
      .then((response) => response.json())
      .then((data) => setTopluluklar(data))
      .catch((error) => console.error('Veri çekme hatası:', error));
  }, []);

  const uzmanlikTopluluklari = topluluklar.filter(
    (topluluk) => topluluk.toplulukKategorisi === 'Uzmanlık Topluluğu'
);

const kulturSanatTopluluklari = topluluklar.filter(
  (topluluk) => topluluk.toplulukKategorisi === 'Kültür-Sanat Topluluğu'
);

const sporTopluluklari = topluluklar.filter(
  (topluluk) => topluluk.toplulukKategorisi === 'Spor Topluluğu'
);


const visibleUzmanlikTopluluklari = showAll
? uzmanlikTopluluklari
: uzmanlikTopluluklari.slice(0, 3); // İlk 6 topluluğu göster
const visibleKulturSanatTopluluklari = showAll
? kulturSanatTopluluklari
: kulturSanatTopluluklari.slice(0, 3); // İlk 6 topluluğu göster
const visibleSporTopluluklari = showAll
? sporTopluluklari
: sporTopluluklari.slice(0, 6); // İlk 6 topluluğu göster
  
  const {
    handleContact,
    handleEtkinlikler2,
    handleUzmanlikT,
    handleKulturSanatT,
    handleSporT,
    handleTopluluklar,
    handleAnaSayfa
} = AllButtons();
  

 
  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <button class="navbar-item" onClick={handleAnaSayfa} >
      TOPLULUK32
    </button>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu level-left-20px">
    <div class="navbar-start">
      <a class="navbar-item">
        <button onClick={handleEtkinlikler2}>Etkinlikler</button>
      </a>
  
      <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link" onClick={handleTopluluklar}>
        Topluluklar
      </a>
      <div className="navbar-dropdown">
        <div className="columns is-multiline">
          <div className="column is-one-third">
            <h4 className="title nav-title is-4 underline">
              <button onClick={handleUzmanlikT}>Uzmanlık Toplulukları</button>
            </h4>
            {visibleUzmanlikTopluluklari.map((topluluk, index) => (
              <a href="#" className="navbar-item" key={index}>
                {topluluk.toplulukAdi}
              </a>
            ))}
          </div>

          <div className="column is-one-third">
            <h4 className="title is-4 underline">
              <button onClick={handleKulturSanatT}>Kültür-Sanat Toplulukları</button>
            </h4>
            {visibleKulturSanatTopluluklari.map((topluluk, index) => (
              <a href="#" className="navbar-item" key={index}>
                {topluluk.toplulukAdi}
              </a>
            ))}
          </div>

          <div className="column is-one-third">
            <h4 className="title is-4 underline">
              <button onClick={handleSporT}>Spor Toplulukları</button>
            </h4>
            {visibleSporTopluluklari.map((topluluk, index) => (
              <a href="#" className="navbar-item" key={index}>
                {topluluk.toplulukAdi}
              </a>
            ))}
          </div>
        </div>

        <button className="button button-navbar center-class " onClick={handleShowAll}>
          {showAll ? 'Daha Az Göster' : 'Daha Fazlası'}
        </button>
      </div>
    </div>

      <a class="navbar-item" onClick={handleContact}>
        İletişim
      </a>
    

      

      
    </div>

    
  </div>



  <div>
      <button class='mode-button' onClick={toggleTheme}>
        {theme === 'light' ? <FaSun/> : <FaMoon/>}
      </button>
    </div>




  <div class="level-right">
   
    <div class="level-item">
      <div class="field has-addons">
        <p class="control">
          <input class="input" type="text" placeholder="Arama" />
        </p>
        <p class="button">
         <CgSearchLoading />

        </p>
      </div>
    </div>
  </div>
</nav>
  )
}

export default Navbar

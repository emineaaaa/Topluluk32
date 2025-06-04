import React, { useEffect, useState } from 'react';
import { CgSearchLoading } from "react-icons/cg";
import { FaMoon, FaSun } from "react-icons/fa";
import { AllButtons } from './AllButtons';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [topluluklar, setTopluluklar] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [searchTerm, setSearchTerm] = useState('');

  const handleShowAll = () => setShowAll(!showAll);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark-theme');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const topluluklarURL = process.env.REACT_APP_TOPLULUKLAR;
    fetch(topluluklarURL)
      .then((res) => res.json())
      .then((data) => setTopluluklar(data))
      .catch((err) => console.error('Veri çekme hatası:', err));
  }, []);

  const uzmanlikTopluluklari = topluluklar.filter(t => t.toplulukKategorisi === 'Uzmanlık Topluluğu');
  const kulturSanatTopluluklari = topluluklar.filter(t => t.toplulukKategorisi === 'Kültür-Sanat Topluluğu');
  const sporTopluluklari = topluluklar.filter(t => t.toplulukKategorisi === 'Spor Topluluğu');

  const visibleUzmanlik = showAll ? uzmanlikTopluluklari : uzmanlikTopluluklari.slice(0, 3);
  const visibleKulturSanat = showAll ? kulturSanatTopluluklari : kulturSanatTopluluklari.slice(0, 3);
  const visibleSpor = showAll ? sporTopluluklari : sporTopluluklari.slice(0, 6);

  const filteredTopluluklar = topluluklar.filter((t) =>
    t.toplulukAdi.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <button className="navbar-item navbar-logo" onClick={handleAnaSayfa}>
          <img src="/Topluluk-kopyasi.png" alt="Topluluk32" />
        </button>
        <a role="button" className="navbar-burger" aria-label="menu">
          <span></span><span></span><span></span><span></span>
        </a>
      </div>

      <div className="navbar-menu level-left-20px">
        <div className="navbar-start">
          <a className="navbar-item"><button onClick={handleEtkinlikler2}>Etkinlikler</button></a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link" onClick={handleTopluluklar}>Topluluklar</a>
            <div className="navbar-dropdown">
              <div className="columns is-multiline">
                <div className="column is-one-third">
                  <h4 className="title nav-title is-4 underline"><button onClick={handleUzmanlikT}>Uzmanlık Toplulukları</button></h4>
                  {visibleUzmanlik.map((t, i) => <a key={i} className="navbar-item">{t.toplulukAdi}</a>)}
                </div>
                <div className="column is-one-third">
                  <h4 className="title is-4 underline"><button onClick={handleKulturSanatT}>Kültür-Sanat Toplulukları</button></h4>
                  {visibleKulturSanat.map((t, i) => <a key={i} className="navbar-item">{t.toplulukAdi}</a>)}
                </div>
                <div className="column is-one-third">
                  <h4 className="title is-4 underline"><button onClick={handleSporT}>Spor Toplulukları</button></h4>
                  {visibleSpor.map((t, i) => <a key={i} className="navbar-item">{t.toplulukAdi}</a>)}
                </div>
              </div>
              <button className="button button-navbar center-class" onClick={handleShowAll}>
                {showAll ? 'Daha Az Göster' : 'Daha Fazlası'}
              </button>
            </div>
          </div>

          <a className="navbar-item" onClick={handleContact}>İletişim</a>
        </div>
      </div>

      <div><button className="mode-button" onClick={toggleTheme}>{theme === 'light' ? <FaSun /> : <FaMoon />}</button></div>

      <div className="level-right">
        <div className="level-item">
          <div style={{ position: 'relative', width: '300px' }}>
            <div className="field has-addons">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Topluluk ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </p>
              <p className="button"><CgSearchLoading /></p>
            </div>

            {searchTerm && (
              <div className="search-dropdown">
                {filteredTopluluklar.length > 0 ? (
                  filteredTopluluklar.map((topluluk, index) => (
                    <div
                      key={index}
                      className="navbar-item"
                      onClick={() => navigate(`/toplulukdetay/${topluluk._id}`)}
                    >
                      {topluluk.toplulukAdi}
                    </div>
                  ))
                ) : (
                  <div className="navbar-item">Sonuç bulunamadı.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

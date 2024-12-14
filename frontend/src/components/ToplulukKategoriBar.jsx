import React, { useState } from 'react';
import { AllButtons } from './AllButtons';

const ToplulukKategoriBar = () => {
  const [activeTab, setActiveTab] = useState('Tüm Topluluklar'); // Aktif sekme için durum

  const {
    handleUzmanlikT,
    handleKulturSanatT,
    handleSporT,
    handleTopluluklar
  } = AllButtons();

  // Sekme tıklandığında çalışacak fonksiyon
  const handleClick = (tabName, callback) => {
    setActiveTab(tabName); // Aktif sekmeyi güncelle
    if (callback) callback(); // İlgili işlemi çalıştır
  };

  return (
    <div>
      <div className="tabs is-centered is-boxed">
        <ul>
          {/* Tüm Topluluklar */}
          <li className={activeTab === 'Tüm Topluluklar' ? 'is-active' : ''}>
            <a onClick={() => handleClick('Tüm Topluluklar', handleTopluluklar)}>
              <span className="icon is-small">
                <i className="fas fa-image" aria-hidden="true"></i>
              </span>
              <span>Tüm Topluluklar</span>
            </a>
          </li>

          {/* Uzmanlık Toplulukları */}
          <li className={activeTab === 'Uzmanlık Toplulukları' ? 'is-active' : ''}>
            <a onClick={() => handleClick('Uzmanlık Toplulukları', handleUzmanlikT)}>
              <span className="icon is-small">
                <i className="fas fa-music" aria-hidden="true"></i>
              </span>
              <span>Uzmanlık Toplulukları</span>
            </a>
          </li>

          {/* Kültür-Sanat Toplulukları */}
          <li className={activeTab === 'Kültür-Sanat Toplulukları' ? 'is-active' : ''}>
            <a onClick={() => handleClick('Kültür-Sanat Toplulukları', handleKulturSanatT)}>
              <span className="icon is-small">
                <i className="fas fa-film" aria-hidden="true"></i>
              </span>
              <span>Kültür-Sanat Toplulukları</span>
            </a>
          </li>

          {/* Spor Toplulukları */}
          <li className={activeTab === 'Spor Toplulukları' ? 'is-active' : ''}>
            <a onClick={() => handleClick('Spor Toplulukları', handleSporT)}>
              <span className="icon is-small">
                <i className="far fa-file-alt" aria-hidden="true"></i>
              </span>
              <span>Spor Toplulukları</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ToplulukKategoriBar;

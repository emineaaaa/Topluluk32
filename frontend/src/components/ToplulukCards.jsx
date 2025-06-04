import React, { useEffect, useState } from 'react';
import { TbWorldShare } from "react-icons/tb";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import { FaSync } from "react-icons/fa";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const ToplulukCards = () => {
  const [topluluklar, setTopluluklar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isSortedAZ, setIsSortedAZ] = useState(false);

  const navigate = useNavigate();

  const fetchTopluluklar = async () => {
    try {
      const topluluk = process.env.REACT_APP_TOPLULUKLAR;
      const response = await fetch(topluluk);
      const data = await response.json();
      setTopluluklar(data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
      setTopluluklar([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopluluklar();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTopluluklar();
    setTimeout(() => {
      setRefreshing(false);
      setPullDistance(0);
      setIsPulling(false);
    }, 500);
  };

  const handleSortAZ = () => {
    const sorted = [...topluluklar].sort((a, b) =>
      a.toplulukAdi.localeCompare(b.toplulukAdi, 'tr')
    );
    setTopluluklar(sorted);
    setIsSortedAZ(true);
  };

  //  pull-to-refresh
  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].pageY);
    }
  };

  const handleTouchMove = (e) => {
    if (window.scrollY === 0 && !refreshing) {
      const currentY = e.touches[0].pageY;
      const distance = currentY - startY;
      
      if (distance > 0 && distance < 120) {
        e.preventDefault();
        setPullDistance(distance);
        setIsPulling(true);
      }
    }
  };

  const handleTouchEnd = () => {
    if (isPulling && pullDistance > 80) {
      handleRefresh();
    } else {
      setPullDistance(0);
      setIsPulling(false);
    }
  };

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ position: 'relative' }}
    >
      {/* Pull to Refresh Indicator */}
      {(isPulling || refreshing) && (
        <div 
          className="pull-refresh-indicator"
          style={{
            transform: `translateY(${Math.min(pullDistance, 80)}px)`,
            opacity: refreshing ? 1 : Math.min(pullDistance / 80, 1)
          }}
        >
          <div className="refresh-content">
            <FaSync className={refreshing ? 'spinning' : ''} />
            <span>
              {refreshing 
                ? 'Yenileniyor...' 
                : pullDistance > 80 
                  ? 'Bırakarak yenile' 
                  : 'Yenilemek için çek'
              }
            </span>
          </div>
        </div>
      )}

      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">🏛️ Tüm Topluluklar</h1>
          <p className="page-subtitle">Süleyman Demirel Üniversitesi'nin tüm toplulukları</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem 0' }}>
          <button className='view-all-btn' onClick={handleSortAZ}>
            <FaSync className="mr-2" />
            A-Z Sırala
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner">
              <FaSync className="spinning" />
            </div>
            <p>Topluluklar yükleniyor...</p>
          </div>
        ) : topluluklar.length === 0 ? (
          <div className="notification is-warning has-text-centered mt-5">
            <h3>❌ Hiç topluluk bulunamadı.</h3>
            <p>Yeni topluluklar yakında eklenecek!</p>
            <button onClick={handleRefresh} className="view-all-btn">
              <FaSync className="mr-2" />
              Yenile
            </button>
          </div>
        ) : (
          <div className="columns is-multiline">
            {topluluklar.map((topluluk, index) => (
              <div className="column is-one-third" key={index}>
                <div className="topl-box enhanced-card">
                  <figure className="image is-custom-size">
                    <img className="is-rounded" src={topluluk.logo} alt={topluluk.toplulukAdi} />
                  </figure>
                  <div className="topl-satir">
                    <div className="topluluk-adi" onClick={() => navigate('/toplulukdetay', { state: { topluluk } })}>
                      <button className="topluluk-adi">{topluluk.toplulukAdi}</button>
                    </div>
                    <div className="topluluk-icons">
                      <button
                        className="social-icon-btn"
                        onClick={() => window.open(topluluk.sosyalMedya?.web, '_blank')}
                        disabled={!topluluk.sosyalMedya?.web}
                      >
                        <TbWorldShare />
                      </button>
                      <button
                        className="social-icon-btn"
                        onClick={() => window.open(topluluk.sosyalMedya?.x, '_blank')}
                        disabled={!topluluk.sosyalMedya?.x}
                      >
                        <RiTwitterXFill />
                      </button>
                      <button
                        className="social-icon-btn"
                        onClick={() => window.open(topluluk.sosyalMedya?.instagram, '_blank')}
                        disabled={!topluluk.sosyalMedya?.instagram}
                      >
                        <FaInstagram />
                      </button>
                      <button
                        className="social-icon-btn"
                        onClick={() => window.open(topluluk.sosyalMedya?.youtube, '_blank')}
                        disabled={!topluluk.sosyalMedya?.youtube}
                      >
                        <TbBrandYoutubeFilled />
                      </button>
                      <button
                        className="social-icon-btn"
                        onClick={() => window.open(topluluk.sosyalMedya?.linkedIn, '_blank')}
                        disabled={!topluluk.sosyalMedya?.linkedIn}
                      >
                        <FaLinkedin />
                      </button>
                    </div>
                  </div>
                 
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToplulukCards;

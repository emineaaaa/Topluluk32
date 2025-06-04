import React, { useEffect, useState } from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaSync } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { TbBrandYoutubeFilled, TbWorldShare } from 'react-icons/tb';

const SporTopluluklari = () => {
  const [topluluklar, setTopluluklar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  const fetchTopluluklar = async () => {
    try {
      const topluluk = process.env.REACT_APP_TOPLULUK_KATEGORI + "/Spor";
      const response = await fetch(topluluk);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setTopluluklar(data);
      } else {
        console.warn("Gelen veri dizi değil:", data);
        setTopluluklar([]);
      }
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

  // Touch events için pull-to-refresh
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
          <h1 className="page-title">⚽ Spor Toplulukları</h1>
          <p className="page-subtitle">Sportif etkinlikler ve rekabet odaklı topluluklar</p>
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
            <h3>❌ Hiç spor topluluğu bulunamadı.</h3>
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
                    <img className="is-rounded" src={topluluk.logo} alt="Topluluk logosu" />
                  </figure>
                  <div className="topl-satir">
                    <div className="topluluk-adi">{topluluk.toplulukAdi}</div>
                    <div className="topluluk-icons">
                      <button className="social-icon-btn"><TbWorldShare /></button>
                      <button className="social-icon-btn"><RiTwitterXFill /></button>
                      <button className="social-icon-btn"><FaInstagram /></button>
                      <button className="social-icon-btn"><TbBrandYoutubeFilled /></button>
                      <button className="social-icon-btn"><FaLinkedin /></button>
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

export default SporTopluluklari;

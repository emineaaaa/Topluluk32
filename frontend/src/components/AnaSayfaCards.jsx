import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaInfoCircle, FaCalendarAlt } from "react-icons/fa";

const AnaSayfaCards = () => {
  return (
    <div className="ana-sayfa-container">
      {/* Hero Section - Ana Kart */}
      <div className="hero-section">
        <div className="columns is-centered is-vcentered">
          <div className="column is-10">
            <div className="hero-card">
              <div 
                className="hero-background"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(56, 158, 114, 0.9), rgba(40, 82, 64, 0.9)), url('/sdu2.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="hero-content">
                  <div className="hero-text">
                    <h1 className="hero-title">
                      <FaInfoCircle className="hero-icon" />
                      Süleyman Demirel Üniversitesi
                    </h1>
                    <p className="hero-subtitle">
                      Türkiye'nin öncü üniversitelerinden biri olan SDÜ'de eğitim, araştırma ve 
                      toplumsal katkı alanlarında mükemmellik hedefliyoruz.
                    </p>
                    <div className="hero-buttons">
                      <a
                        href="https://www.sdu.edu.tr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-btn primary-btn"
                      >
                        🌐 Resmi Web Sitesi
                      </a>
                      <div className="social-links">
                        <a href="https://www.facebook.com/sdu" target="_blank" rel="noopener noreferrer" className="social-btn">
                          <FaFacebook />
                        </a>
                        <a href="https://www.linkedin.com/sdu" target="_blank" rel="noopener noreferrer" className="social-btn">
                          <FaLinkedin />
                        </a>
                        <a href="https://www.twitter.com/sdu" target="_blank" rel="noopener noreferrer" className="social-btn">
                          <FaTwitter />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="info-cards-section">
        <div className="columns is-centered">
          <div className="column is-10">
            <div className="columns is-multiline">
              
              {/* Topluluk Hakkında Kartı */}
              <div className="column is-6">
                <div className="info-card about-card">
                  <div className="card-header-modern">
                    <h3 className="card-title">
                      🏛️ Topluluk32 Hakkında
                    </h3>
                  </div>
                  <div className="card-content-modern">
                    <div className="about-content">
                      <div className="about-item">
                        <div className="about-icon">🎯</div>
                        <div className="about-text">
                          <h4>Misyonumuz</h4>
                          <p>Öğrenci topluluklarını bir araya getiren dijital platform</p>
                        </div>
                      </div>
                      <div className="about-item">
                        <div className="about-icon">🚀</div>
                        <div className="about-text">
                          <h4>Vizyonumuz</h4>
                          <p>Kampüs yaşamını zenginleştiren etkinlik merkezi</p>
                        </div>
                      </div>
                      <div className="about-item">
                        <div className="about-icon">🤝</div>
                        <div className="about-text">
                          <h4>Değerlerimiz</h4>
                          <p>İşbirliği, yaratıcılık ve toplumsal fayda</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaSayfaCards;

import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaInfoCircle, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const AnaSayfaCards = () => {

  const navigate = useNavigate();

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
                  backgroundImage: `linear-gradient(135deg, rgba(56, 158, 114, 0.9), rgba(40, 82, 64, 0.7)), url('/sdu2.jpg')`,
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
                          <p>Üniversite topluluklarını tek bir dijital çatı altında toplayarak, etkinliklerin görünürlüğünü artırmak ve öğrenciler arası etkileşimi güçlendirmek.</p>
                        </div>
                      </div>
                      <div className="about-item">
                        <div className="about-icon">🚀</div>
                        <div className="about-text">
                          <h4>Vizyonumuz</h4>
                          <p>Kampüs yaşamını teknolojiyle entegre ederek; öğrenci inisiyatiflerinin daha görünür, erişilebilir ve sürdürülebilir hale geldiği bir ekosistem oluşturmak.</p>

                        </div>
                      </div>
                      <div className="about-item">
                        <div className="about-icon">🤝</div>
                        <div className="about-text">
                          <h4>Değerlerimiz</h4>
                          <p>Şeffaflık, gönüllülük, katılımcılık, teknolojiye uyum ve öğrenci odaklılık temelinde çalışan bir paylaşım ağı oluşturmak.</p>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column is-6">
                <div className="info-card contact-card">
                  <div className="card-header-modern">
                    <h3 className="card-title">📩 Bize Ulaş</h3>
                  </div>
                  <div className="card-content-modern">
                    <p style={{ marginBottom: "1rem" }}>
                      Etkinlik paylaşımı, iş birliği ve diğer tüm talepleriniz için bizimle iletişime geçin.
                    </p>

                    <ul style={{ marginBottom: "1rem" }}>
                      <li>📞 +90 246 211 11 11</li>
                      <li>✉️ info@topluluk32.com</li>
                    </ul>

                    <button
                      className="button is-primary is-rounded"
                      onClick={() => navigate('/contact')}
                    >
                      Bizimle İletişime Geçin
                    </button>

                    <div
                      className="social-links"
                      style={{
                        marginTop: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '0.5rem'
                      }}
                    >
                      <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Sosyal Medyada Biz</p>

                      <a href="https://instagram.com/topluluk32" target="_blank" rel="noreferrer">
                        📸 Instagram
                      </a>
                      <a href="https://x.com/topluluk32" target="_blank" rel="noreferrer">
                        🐦 X (Twitter)
                      </a>
                      <a href="https://linkedin.com/company/topluluk32" target="_blank" rel="noreferrer">
                        💼 LinkedIn
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
  );
};

export default AnaSayfaCards;

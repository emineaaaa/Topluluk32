import React from 'react';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="footer"
      style={{
        backgroundColor: '#f8f8f8',
        padding: '2rem 1.5rem',
        borderTop: '1px solid #ddd'
      }}
    >
      <div className="content has-text-centered">
        <h2 style={{ fontWeight: 'bold', fontSize: '1.4rem', color: '#369e72' }}>
          Topluluk32
        </h2>

        <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '0.95rem', color: '#444' }}>
          Süleyman Demirel Üniversitesi öğrenci topluluklarını bir araya getiren dijital etkinlik platformudur.
        </p>

        <div style={{ marginTop: '1rem', fontSize: '1.4rem' }}>
          <a href="https://instagram.com/topluluk32" target="_blank" rel="noreferrer" style={{ margin: '0 10px', color: '#C13584' }}>
            <FaInstagram />
          </a>
          <a href="https://x.com/topluluk32" target="_blank" rel="noreferrer" style={{ margin: '0 10px', color: '#1DA1F2' }}>
            <FaTwitter />
          </a>
          <a href="https://linkedin.com/company/topluluk32" target="_blank" rel="noreferrer" style={{ margin: '0 10px', color: '#0A66C2' }}>
            <FaLinkedin />
          </a>
        </div>

        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#888' }}>
          © {currentYear} Topluluk32 • Tüm Hakları Saklıdır
        </p>
      </div>
    </footer>
  );
};

export default Footer;

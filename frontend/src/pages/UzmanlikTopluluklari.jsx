import React, { useEffect, useState } from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { TbBrandYoutubeFilled, TbWorldShare } from 'react-icons/tb';

const UzmanlikTopluluklari = () => {
  const [topluluklar, setTopluluklar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const topluluk = process.env.REACT_APP_TOPLULUK_KATEGORI + "/Uzmanlik";
    fetch(topluluk)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTopluluklar(data);
        } else {
          console.warn("Gelen veri dizi değil:", data);
          setTopluluklar([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Veri çekme hatası:", error);
        setTopluluklar([]);
        setLoading(false);
      });
  }, []);

  return (
    <div>

      <div className="page-container">
        {loading ? (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>Yükleniyor...</p>
        ) : topluluklar.length === 0 ? (
          <div className="notification is-warning has-text-centered mt-5">
            Hiç uzmanlık topluluğu bulunamadı.
          </div>
        ) : (
          <div className="columns is-multiline">
            {topluluklar.map((topluluk, index) => (
              <div className="column is-one-third" key={index}>
                <div className="topl-box">
                  <figure className="image is-custom-size">
                    <img className="is-rounded" src={topluluk.logo} alt="Topluluk logosu" />
                  </figure>
                  <div className="topl-satir">
                    <div className="topluluk-adi">{topluluk.toplulukAdi}</div>
                    <div className="topluluk-icons">
                      <button><TbWorldShare /></button>
                      <button><RiTwitterXFill /></button>
                      <button><FaInstagram /></button>
                      <button><TbBrandYoutubeFilled /></button>
                      <button><FaLinkedin /></button>
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

export default UzmanlikTopluluklari;

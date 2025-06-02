import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ToplulukGelecekEtkCard from './ToplulukGelecekEtkCard';
import { TbWorldShare } from "react-icons/tb";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import { TbBrandYoutubeFilled } from "react-icons/tb";

const ToplulukBilgisi = () => {
  const location = useLocation();
  const { duzenleyen } = useParams();

  const [topluluklar, setTopluluk] = useState(null);
  const toplulukFromNav = location?.state?.topluluk;

  // Eğer state'den gelen veri yoksa fetch ile topluluk bul
  useEffect(() => {
    if (!toplulukFromNav) {
      const endpoint = process.env.REACT_APP_TOPLULUK_NAME+"/"+duzenleyen;
      console.log(endpoint);
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          const found = data.find(item => item.toplulukAdi === duzenleyen);
          if (found) {
            setTopluluk(found);
          } else {
            console.error("Topluluk bulunamadı!");
          }
        })
        .catch((error) => console.error("Veri çekme hatası:", error));
    }
  }, [duzenleyen, toplulukFromNav]);

  const aktifTopluluk = toplulukFromNav || topluluklar;

  // Eğer hala veri yoksa
  if (!aktifTopluluk) {
    return (
      <div className="container has-text-centered mt-6">
        <h2 className="title">Topluluk verisi yükleniyor veya bulunamadı 😕</h2>
        <p>Bu sayfaya yönlendirme ile gelinmediği için veri alınamadı.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="columns is-vcentered">
        <div className="column is-one-third card-image-topluluk">
          <div className="card-image">
            <figure className="image is-4by3 topluluk-image">
              <img
                src={aktifTopluluk.logo}
                alt="Topluluk Logosu"
              />
            </figure>
          </div>

          <div className="card topluluk-aktiflik">
            <div className="card-content">
              <div className="content">
                <h6>Genel Aktiflik Sıralaması:</h6>
                <h6>{aktifTopluluk.toplulukKategorisi} Aktiflik Sıralaması:</h6>
                <h6>Topluluk32 Aktiflik Puanı:</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="column column-right">
          <div className="card card-etkinlik">
            <div className="card-content">
              <div className="content">
                <h1>{aktifTopluluk.toplulukAdi || duzenleyen}</h1>
                <p>
                  <strong>Topluluk Başkanı: </strong> {aktifTopluluk.toplulukBaskani} <br />
                  <strong>İletişim: </strong> {aktifTopluluk.iletisim}
                </p>

                <div className="topluluk-icons" style={{ marginTop: "1rem" }}>
                  {aktifTopluluk.sosyalMedya?.web && (
                    <button onClick={() => window.open(aktifTopluluk.sosyalMedya.web, '_blank')}>
                      <TbWorldShare />
                    </button>
                  )}
                  {aktifTopluluk.sosyalMedya?.x && (
                    <button onClick={() => window.open(aktifTopluluk.sosyalMedya.x, '_blank')}>
                      <RiTwitterXFill />
                    </button>
                  )}
                  {aktifTopluluk.sosyalMedya?.instagram && (
                    <button onClick={() => window.open(aktifTopluluk.sosyalMedya.instagram, '_blank')}>
                      <FaInstagram />
                    </button>
                  )}
                  {aktifTopluluk.sosyalMedya?.youtube && (
                    <button onClick={() => window.open(aktifTopluluk.sosyalMedya.youtube, '_blank')}>
                      <TbBrandYoutubeFilled />
                    </button>
                  )}
                  {aktifTopluluk.sosyalMedya?.linkedIn && (
                    <button onClick={() => window.open(aktifTopluluk.sosyalMedya.linkedIn, '_blank')}>
                      <FaLinkedin />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="content mt-4">
            {aktifTopluluk.hakkinda}
          </div>

          <div className="box mt-5">
            Topluluğun Önümüzdeki Etkinliği
          </div>

          <ToplulukGelecekEtkCard />
        </div>
      </div>
    </div>
  );
};

export default ToplulukBilgisi;

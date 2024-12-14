import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ToplulukGelecekEtkCard = () => {
  const [etkinlik, setEtkinlik] = useState(null); // Tek bir etkinlik için state
  const { toplulukId } = useParams();

  useEffect(() => {
    const etkinlikURL = process.env.REACT_APP_ETKINLIKLER; // Etkinlik verilerinin URL'si

    fetch(etkinlikURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Veri alınamadı");
        }
        return response.json();
      })
      .then((data) => {
        // Topluluk ID'sine göre filtrele
        const filteredEtkinlikler = data.filter((item) => item.toplulukId === Number(toplulukId));

        // Şimdiki tarihi al
        const currentDate = new Date();

        // Gelecek etkinlikleri filtrele
        const futureEtkinlikler = filteredEtkinlikler.filter((item) => new Date(item.tarih) > currentDate);

        // En yakın etkinliği bul
        const enYakinEtkinlik = futureEtkinlikler.sort((a, b) => new Date(a.tarih) - new Date(b.tarih))[0];

        // State'e ata
        setEtkinlik(enYakinEtkinlik);
      })
      .catch((error) => console.error("Veri çekme hatası:", error));
  }, [toplulukId]);

  if (!etkinlik) {
    return <p>Gelecek bir etkinlik bulunamadı.</p>;
  }

  return (
    <div className="box box-t">
      <div className="columns">
        <div className="column">
          <article className="media">
            <div className="media-left afis-gorsel">
              <img src={etkinlik.gorsel} alt="Etkinlik Afişi" />
            </div>
            <div className="media-content">
              <div className="content top-gelecek-card">
                <h3>
                  <strong>{etkinlik.etkinlik}</strong>
                </h3>
                <p>
                  <strong>Tarih:</strong> {new Date(etkinlik.tarih).toLocaleDateString()} <br /><br />
                  <strong>Konum:</strong> {etkinlik.konum} <br /><br />
                  <strong>Etkinlik Türü:</strong> {etkinlik.etkinlikTuru} <br /><br />
                  <strong>Ayrıntılı Bilgi:</strong>{" "}
                  <a href={etkinlik.etkinlikAyrintiFormu} target="_blank" rel="noopener noreferrer">
                    Etkinlik Ayrıntı Formu
                  </a>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ToplulukGelecekEtkCard;

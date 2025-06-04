import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ToplulukGecmisEtk = () => {
  const [etkinlikler, setEtkinlikler] = useState([]);
  const navigate = useNavigate();
  const { toplulukAdi } = useParams();

  useEffect(() => {
    const etkinlikEndpoint = process.env.REACT_APP_ETKINLIKLER;
    fetch(etkinlikEndpoint)
      .then(response => response.json())
      .then(data => {
        const bugun = new Date();

        const filteredEtkinlikler = data
          .filter(item => new Date(item.tarih) < bugun) // geçmiş etkinlikler
          .filter(item => item.duzenleyen.toLowerCase() === decodeURIComponent(toplulukAdi).toLowerCase());

        setEtkinlikler(filteredEtkinlikler);
      })
      .catch(error => console.error("Veri çekme hatası:", error));
  }, [toplulukAdi]);

  return (
    <div className="container mt-5">
      <div className="box has-text-centered has-text-weight-semibold is-size-4 mb-4">
        Topluluğun Geçmiş Etkinlikleri
      </div>

      <div className="card-display topluluk-detay-gecmis columns is-multiline is-centered">
        {etkinlikler.length === 0 && (
          <p className="has-text-centered has-text-grey is-size-5">Henüz geçmiş etkinlik bulunmamaktadır.</p>
        )}

        {etkinlikler.map((etkinlik, index) => (
          <div className="card column is-4 m-2" key={index}>
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={etkinlik.gorsel} alt={etkinlik.etkinlik} />
              </figure>
            </div>

            <div className="card-content">
              <div className="content">
                <h4 className="title is-5 mb-2">
                  <button
                    className="button is-link is-light is-small"
                    onClick={() => navigate(`/etkinlikdetay/${etkinlik._id}`)}
                  >
                    {etkinlik.etkinlik}
                  </button>
                </h4>

                <p className="has-text-weight-medium mb-2">
                  Düzenleyen:{" "}
                  <button
                    className="button is-text is-small"
                    onClick={() => navigate(`/toplulukdetay/${encodeURIComponent(etkinlik.duzenleyen)}`)}
                  >
                    {etkinlik.duzenleyen}
                  </button>
                </p>

                <p className="has-text-grey">
                  Tarih: {new Date(etkinlik.tarih).toLocaleDateString("tr-TR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToplulukGecmisEtk;

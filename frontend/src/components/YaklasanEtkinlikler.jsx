import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { AllButtons } from './AllButtons';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = date.toLocaleString('tr-TR', { day: '2-digit' });
  const month = date.toLocaleString('tr-TR', { month: '2-digit' });
  const year = date.toLocaleString('tr-TR', { year: 'numeric' });
  const hour = date.toLocaleString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  return `${day}.${month}.${year} - ${hour}`;
};

const YaklasanEtkinlikler = () => {
  const [etkinlikler, setEtkinlikler] = useState([]);
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const etkinlikURL = process.env.REACT_APP_ETKINLIKLER_GELECEK;
    fetch(etkinlikURL)
      .then(response => response.json())
      .then(data => setEtkinlikler(data))
      .catch(error => console.error("Veri çekme hatası:", error));
  }, []);

  const scrollLeft = () => {
    if (sliceStart !== 0) {
      setSliceStart(sliceStart - 1);
      setSliceEnd(sliceEnd - 1);
    }
  };

  const scrollRight = () => {
    if (sliceEnd < etkinlikler.length) {
      setSliceStart(sliceStart + 1);
      setSliceEnd(sliceEnd + 1);
    }
  };

  return (
    <div>
      <div className="card-display">
        <button className="button button-container level-left-20px" onClick={scrollLeft}>
          <FaArrowLeft />
        </button>

        {etkinlikler.slice(sliceStart, sliceEnd).map((etkinlik, index) => (
          <div className="card yaklasan-card left-60px" key={index}>
            <div className="card-image">
              <figure className="image is-4by3">
                <img
                  src={etkinlik.gorsel}
                  alt={etkinlik.etkinlik}
                />
              </figure>
            </div>

            <div className="card-details padding-20px">
              <div className="event-detail">
                <button onClick={() => navigate(`/etkinlikdetay`, { state: { etkinlik } })}>
                  {etkinlik.etkinlik}
                </button>
              </div>
              <div className="community-detail">
                <button className="community-detail" onClick={() => navigate(`/toplulukdetay/${etkinlik.duzenleyen}`)}>
                  {etkinlik.duzenleyen}
                </button>
              </div>
              <div className="date-detail">
                {formatDate(etkinlik.tarih)}
              </div>
            </div>
          </div>
        ))}

        <button className="button button-container level-right left-60px" onClick={scrollRight}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default YaklasanEtkinlikler;

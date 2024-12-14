import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { AllButtons } from './AllButtons';
 

const GecmisEtkinlikler = () => {
  const [etkinlikler, setEtkinlikler] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; 

  const navigate = useNavigate();


  useEffect(() => {
    const etkinlikler=process.env.REACT_APP_ETKINLIKLER;
    fetch(etkinlikler)
      .then((response) => response.json())
      .then((data) => setEtkinlikler(data))
      .catch((error) => console.error('Veri çekme hatası:', error));
  }, []);

  const handlePageChange=(page)=>{setCurrentPage(page)}


  // Etkinlikleri sayfaya göre filtrele
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = etkinlikler.slice(indexOfFirstItem, indexOfLastItem);

  // Sayfa sayısını hesapla
  const totalPages = Math.ceil(etkinlikler.length / itemsPerPage);

  return (
    <div className="gecmis">
      <div className="columns header">
        <div className="column">TARİH</div>
        <div className="column">ETKİNLİK</div>
        <div className="column">DÜZENLEYEN</div>
      </div>

      {/* Yalnızca mevcut sayfadaki etkinlikleri göster */}
      {currentItems.map((etkinlik, index) => (
        <div className="columns row" key={index}>
          <div className="column column-gecmis-etk">{etkinlik.tarih}</div>
          <div className="column column-gecmis-etk">
            <button onClick={() => navigate(`/etkinlikdetay/${etkinlik.etkinlikId}`)}>{etkinlik.etkinlik }</button>
    </div>
          <div className="column column-gecmis-etk">
            <button onClick={() => navigate(`/toplulukdetay/${etkinlik.toplulukId}`)}>{etkinlik.duzenleyen}</button></div>
        </div>
      ))}

      <nav className="pagination" role="navigation" aria-label="pagination">
        <button
          className="pagination-previous"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="pagination-next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next page
        </button>
        <ul className="pagination-list">
          {[...Array(totalPages)].map((_, page) => (
            <li key={page}>
              <button
                onClick={() => handlePageChange(page + 1)}
                className={`pagination-link ${currentPage === page + 1 ? 'is-current' : ''}`}
                aria-label={`Goto page ${page + 1}`}
                aria-current={currentPage === page + 1 ? 'page' : undefined}
              >
                {page + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default GecmisEtkinlikler;

import React, { useEffect, useState } from 'react';
import { TbWorldShare } from "react-icons/tb";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const ToplulukCards = () => {
  const [topluluklar, setTopluluklar] = useState([]);
  const [isSortedAZ, setIsSortedAZ] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const topluluk = process.env.REACT_APP_TOPLULUKLAR;
    fetch(topluluk)
      .then(response => response.json())
      .then(data => {
        setTopluluklar(data);
      })
      .catch(error => console.error("Veri çekme hatası:", error));
  }, []);

  const handleSortAZ = () => {
    const sorted = [...topluluklar].sort((a, b) =>
      a.toplulukAdi.localeCompare(b.toplulukAdi, 'tr')
    );
    setTopluluklar(sorted);
    setIsSortedAZ(true);
  };

  return (
    <div className='page-container'>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem' }}>
        <button className='button is-link' onClick={handleSortAZ}>
          A-Z Sırala
        </button>
      </div>

      <div className='columns is-multiline'>
        {topluluklar.map((topluluk, index) => (
          <div className='column is-one-third' key={index}>
            <div className='topl-box'>
              <figure className='image is-custom-size'>
                <img className='is-rounded' src={topluluk.logo} alt={topluluk.toplulukAdi} />
              </figure>
              <div className='topl-satir'>
                <div className="topluluk-adi" onClick={() => navigate('/toplulukdetay', { state: { topluluk } })}>
                  <button className="topluluk-adi">{topluluk.toplulukAdi}</button>
                </div>
                <div className="topluluk-icons">
                  <button
                    onClick={() => window.open(topluluk.sosyalMedya?.web, '_blank')}
                    disabled={!topluluk.sosyalMedya?.web}
                  >
                    <TbWorldShare />
                  </button>
                  <button
                    onClick={() => window.open(topluluk.sosyalMedya?.x, '_blank')}
                    disabled={!topluluk.sosyalMedya?.x}
                  >
                    <RiTwitterXFill />
                  </button>
                  <button
                    onClick={() => window.open(topluluk.sosyalMedya?.instagram, '_blank')}
                    disabled={!topluluk.sosyalMedya?.instagram}
                  >
                    <FaInstagram />
                  </button>
                  <button
                    onClick={() => window.open(topluluk.sosyalMedya?.youtube, '_blank')}
                    disabled={!topluluk.sosyalMedya?.youtube}
                  >
                    <TbBrandYoutubeFilled />
                  </button>
                  <button
                    onClick={() => window.open(topluluk.sosyalMedya?.linkedIn, '_blank')}
                    disabled={!topluluk.sosyalMedya?.linkedIn}
                  >
                    <FaLinkedin />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToplulukCards;

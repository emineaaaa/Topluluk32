import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ToplulukGecmisEtk = () => {

    const [etkinlikler, setEtkinlikler] = useState([]);
    const navigate=useNavigate();

    const { toplulukId } = useParams();

    useEffect(() => {
        const etkinlik=process.env.REACT_APP_ETKINLIKLER;
        fetch(etkinlik)
          .then(response => response.json()) 
          .then(data => {
            const fileredEtkinlik=  data.filter(item=> item.toplulukId==toplulukId)
            setEtkinlikler(fileredEtkinlik);
          })
          .catch(error => console.error("Veri çekme hatası:", error));
      }, [toplulukId]);

  return (
    <div>

      <div class="box">
        Topluluğun Geçmiş Etkinlikleri
      </div>
      
      <div class='card-display topluluk-detay-gecmis'>
    {etkinlikler.map((etkinlik, index) => (
        <div class="card left-60px" key={index}>
        <div class="card-image">
          <figure class="image is-4by3">
            <img
              src={etkinlik.gorsel}
              alt={etkinlik.etkinlik}            />
          </figure>
        </div>

        <div class="card-details padding-20px">
        <div class="event-detail">
        <button  onClick={() => navigate(`/etkinlikdetay/${etkinlik.etkinlikId}`)}>{etkinlik.etkinlik }</button>
        </div>
        <div class="community-detail ">
        <button class="bold-type" onClick={() => navigate(`/toplulukdetay/${etkinlik.toplulukId}`)}>{etkinlik.duzenleyen}</button>
        </div>
        <div class="date-detail">
          {etkinlik.tarih}
        </div>
          
        </div>
        
      </div>
      )
      )}

     
      
    </div>

    </div>
  )
}

export default ToplulukGecmisEtk

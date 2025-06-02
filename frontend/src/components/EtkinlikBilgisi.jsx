import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';

const EtkinlikBilgisi = () => {


  const [etkinlikler, setetkinlik] = useState({});
  const { etkinlikId } = useParams(); // URL'deki :id parametresini alıyoruz
  const location = useLocation();
  const { etkinlik } = location.state;
  console.log(etkinlik);



  /*useEffect(() => {
    const etkinlik = process.env.REACT_APP_etkinlik;
    fetch(etkinlik)
      .then((response) => response.json())
      .then((data) => {
        const foundEtkinlik = data.find((etk) => etk.etkinlikId === parseInt(etkinlikId));
        if (foundEtkinlik) {
          setetkinlik(foundEtkinlik);
        } else {
          console.error("Etkinlik bulunamadı!");
          setetkinlik({});        }
      })
      .catch((error) => console.error("Veri çekme hatası:", error));
  }, [etkinlikId]);
  */
  
  

  return (
    <div>

      
         <div class="columns is-vcentered">
  <div class="column is-one-third card-image-etkinlik">
    <div class="card-image ">
      <figure class="image is-4by3">
        <img
          src={etkinlik.gorsel}
          alt="Placeholder image"
        />
      </figure>
    </div>
  </div>

  <div class="column ">
    <div class="card card-etkinlik">
      <div class="card-content">
        <div class="content">
          <p>{etkinlik.duzenleyen}</p>
         <h1> {etkinlik.etkinlik}</h1>
          <p>Tarih: {etkinlik.tarih}</p>
          <p>Konum: {etkinlik.konum}</p>
          <p>Etkinlik Türü: {etkinlik.etkinlikTuru}</p>


        </div>
      </div>
    </div>

    <div class="card card-etkinlik-bilgisi">
  <div class="card-content">
    <div class="content">
     {etkinlik.aciklama}
    </div>
  </div>
  </div>
  
  </div>
</div>
    
        
       


  

      
    </div>
  )
}

export default EtkinlikBilgisi

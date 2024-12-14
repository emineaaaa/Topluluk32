import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const EtkinlikBilgisi = () => {


  const [etkinlikler, setEtkinlikler] = useState({});
  const { etkinlikId } = useParams(); // URL'deki :id parametresini alıyoruz

  useEffect(() => {
    const etkinlikler = process.env.REACT_APP_ETKINLIKLER;
    fetch(etkinlikler)
      .then((response) => response.json())
      .then((data) => {
        const foundEtkinlik = data.find((etk) => etk.etkinlikId === parseInt(etkinlikId));
        if (foundEtkinlik) {
          setEtkinlikler(foundEtkinlik);
        } else {
          console.error("Etkinlik bulunamadı!");
          setEtkinlikler({});        }
      })
      .catch((error) => console.error("Veri çekme hatası:", error));
  }, [etkinlikId]);
  
  

  return (
    <div>

      
         <div class="columns is-vcentered">
  <div class="column is-one-third card-image-etkinlik">
    <div class="card-image ">
      <figure class="image is-4by3">
        <img
          src={etkinlikler.gorsel}
          alt="Placeholder image"
        />
      </figure>
    </div>
  </div>

  <div class="column ">
    <div class="card card-etkinlik">
      <div class="card-content">
        <div class="content">
          <p>{etkinlikler.duzenleyen}</p>
         <h1> {etkinlikler.etkinlik}</h1>
          <p>Tarih: {etkinlikler.tarih}</p>
          <p>Konum: {etkinlikler.konum}</p>
          <p>Etkinlik Türü: {etkinlikler.etkinlikTuru}</p>


        </div>
      </div>
    </div>

    <div class="card card-etkinlik-bilgisi">
  <div class="card-content">
    <div class="content">
     {etkinlikler.aciklama}
    </div>
  </div>
  </div>
  
  </div>
</div>
    
        
       


  

      
    </div>
  )
}

export default EtkinlikBilgisi

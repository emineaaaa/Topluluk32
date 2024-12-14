import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ToplulukGelecekEtkCard from './ToplulukGelecekEtkCard'

const ToplulukBilgisi = () => {

  const [topluluklar, setTopluluklar]=useState([]);
  const {toplulukId}=useParams();


  useEffect(() => {
    const topluluklar = process.env.REACT_APP_TOPLULUKLAR;
    fetch(topluluklar)
      .then((response) => response.json())
      .then((data) => {
        const foundTopluluk = data.find((topl) => topl.toplulukId === parseInt(toplulukId));
        if (foundTopluluk) {
          setTopluluklar(foundTopluluk);
        } else {
          console.error("Etkinlik bulunamadı!");
          setTopluluklar({});        }
      })
      .catch((error) => console.error("Veri çekme hatası:", error));
  }, [toplulukId]);

  return (
    <div>
      
      <div class="columns is-vcentered ">
  <div class="column is-one-third card-image-topluluk ">
    <div class="card-image  ">
      <figure class="image is-4by3 topluluk-image ">
        <img
          src={topluluklar.logo}
          alt="Topluluk Logoso"
        />
      </figure>
    </div>
    
    <div class="card topluluk-aktiflik">
    <div class="card-content">
        <div class="content">
         <h6>Genel Aktiflik Sıralaması:</h6>
         <h6>{topluluklar.toplulukKategorisi} Aktiflik Sıralaması:</h6>
         <h6>Topluluk32 Aktiflik Puanı:</h6>

        </div>
      </div>
      </div>
    

  </div>

  <div class="column column-right">
    <div class="card card-etkinlik">
      <div class="card-content">
        <div class="content">
          <h1 >{topluluklar.toplulukAdi}</h1>
         <p > <strong>Topluluk Başkanı: </strong> {topluluklar.toplulukBaskani} <br />
           <strong>Tarih: </strong> {topluluklar.iletisim}</p>
          


        </div>
      </div>
    </div>

    
    <div class="content ">
     {topluluklar.hakkinda}
    </div>

    <div class="box ">
        Topluluğun Önümüzdeki Etkinliği
      </div>

    <ToplulukGelecekEtkCard/>
   

 
  
  </div>
</div>


      

    </div>
  )
}

export default ToplulukBilgisi

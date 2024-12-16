import React, { useState } from 'react'
import { useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import {  useNavigate } from 'react-router-dom';
import { AllButtons } from './AllButtons';



const YaklasanEtkinlikler = () => {
  const [etkinlikler, setEtkinlikler] = useState([]);
  const [sliceStart, setSliceStart] = useState(0); // Başlangıç indeksi
  const [sliceEnd, setSliceEnd] = useState(4); // Bitiş indeksi
  const navigate=useNavigate();


  useEffect(() => {
    const etkinlik=process.env.REACT_APP_ETKINLIKLER;
    fetch(etkinlik)
      .then(response => response.json()) 
      .then(data => {
        setEtkinlikler(data);
      })
      .catch(error => console.error("Veri çekme hatası:", error));
  }, []);
  

  const scrollLeft = () => {
    if(sliceStart!==0){
      setSliceStart(sliceStart-1)
    setSliceEnd(sliceEnd-1)
    }
    
   
  };
  
  const scrollRight = () => {
    if(sliceEnd!==etkinlikler.length){
      setSliceStart(sliceStart+1)
    setSliceEnd(sliceEnd+1)}
    
    
  };

  

  return (
  <div>
   
    <div class='card-display'>
    <button class="button button-container level-left-20px" onClick={scrollLeft}><FaArrowLeft />
</button>
    {etkinlikler.slice(sliceStart,sliceEnd).map((etkinlik, index) => (
        <div class="card yaklasan-card left-60px" key={index}>
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
        <div class="community-detail" >
         <button class="community-detail" onClick={() => navigate(`/toplulukdetay/${etkinlik.toplulukId}`)}> {etkinlik.duzenleyen}</button>
        </div>
        <div class="date-detail">
          {etkinlik.tarih}
        </div>
          
        </div>
        
      </div>
      )
      )}

      <button class="button button-container level-right left-60px" onClick={scrollRight}><FaArrowRight />
</button>
      
    </div>
    

  </div>
    
  )
}

export default YaklasanEtkinlikler

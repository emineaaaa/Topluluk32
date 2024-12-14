import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { TbWorldShare } from "react-icons/tb";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { FaLinkedin } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';



const ToplulukCards = () => {

    const [topluluklar, setTopluluklar]=useState([]);

    useEffect(()=>{
        const topluluk=process.env.REACT_APP_TOPLULUKLAR;
        fetch(topluluk)
        .then(response => response.json())
        .then(data=>{
            setTopluluklar(data);
        })
        .catch(error=> console.error("VEri çekme hatası:",error));
    },[]);

   const navigate=useNavigate();
      
   

  return (
    <div>

      
      <div class='page-container'>
        <div class="columns is-multiline">
  {topluluklar.map((topluluk, index) => (
    <div class="column is-one-third " key={index}>
      <div class="topl-box">
        <figure class="image is-custom-size">
          <img class="is-rounded " src= {topluluk.logo}/>
        </figure>
        <div class="topl-satir">
          <div class="topluluk-adi" onClick={() => navigate(`/toplulukdetay/${topluluk.toplulukId}`)}>
            <button class="topluluk-adi">{topluluk.toplulukAdi}</button></div>
        <div class="topluluk-icons">
          <button><TbWorldShare/></button>
          <button><RiTwitterXFill/></button>
          <button><FaInstagram/></button>
          <button><TbBrandYoutubeFilled/></button>
          <button><FaLinkedin/></button>

          </div>
          </div>
      </div>
    </div>
  ))}
</div>
</div>
      
</div>
    

  
  )
}

export default ToplulukCards

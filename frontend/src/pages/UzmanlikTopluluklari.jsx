import React, { useEffect, useState } from 'react'
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { TbBrandYoutubeFilled, TbWorldShare } from 'react-icons/tb';
import ToplulukKategoriBar from '../components/ToplulukKategoriBar';


const UzmanlikTopluluklari = () => {

  const [topluluklar, setTopluluklar]=useState([]);

    useEffect(()=>{
        const topluluk=process.env.REACT_APP_TOPLULUKLAR;
        fetch(topluluk)
        .then(response => response.json())
        .then(data=>{
            const filteredData=data.filter(item=> item.toplulukKategorisi== 'Uzmanlık Topluluğu')
            setTopluluklar(filteredData)
            
        })
        .catch(error=> console.error("VEri çekme hatası:",error));
    },[]);

  return (
    <div>
      
      <div>
        <ToplulukKategoriBar/>
        </div>

      <div class='page-container'>
        <div class="columns is-multiline">
  {topluluklar.map((topluluk, index) => (
    <div class="column is-one-third " key={index}>
      <div class=" topl-box">
        <figure class="image is-custom-size">
          <img class="is-rounded " src= {topluluk.logo}/>
        </figure>
        <div class="topl-satir">
          <div class="topluluk-adi">{topluluk.toplulukAdi}</div>
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

export default UzmanlikTopluluklari

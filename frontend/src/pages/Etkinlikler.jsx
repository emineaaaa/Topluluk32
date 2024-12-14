import React from 'react'
import GecmisEtkinlikler from '../components/GecmisEtkinlikler'
import ToplulukKategoriBar from '../components/ToplulukKategoriBar'
import YaklasanEtkinlikler from '../components/YaklasanEtkinlikler'

const Etkinlikler = () => {
  return (
    <div>
      <YaklasanEtkinlikler/>
      <GecmisEtkinlikler/>
      
    </div>
  )
}

export default Etkinlikler

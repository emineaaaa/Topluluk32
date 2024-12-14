import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AllButtons = () => {
    const navigate = useNavigate();



    return {
        handleContact: () => navigate('/contact'),
        handleEtkinlikler2: () => navigate('/etkinlikler'),
        handleTopluluklar: () => navigate('/topluluklar'),
        handleSporT: () => navigate('/spor-topluluklari'),
        handleKulturSanatT: () => navigate('/kultur-sanat-topluluklari'),
        handleUzmanlikT: () => navigate('/uzmanlik-topluluklari'),
        handleEtkinlikDetay : (etkinlikId) =>  navigate(`/etkinlik-detay/${etkinlikId}`),
        handleToplulukDetay : (toplulukId) =>  navigate(`/toplulukdetay/${toplulukId}`),
      
        handleAnaSayfa: ()=> navigate('/')
        
         
      
         
    };
};



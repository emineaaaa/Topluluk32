const express= require ('express');
const router= express.Router();

const { getEtkinlikByTopluluk, getEtkinlikByDate, getEtkinlikByGecmis, getEtkinlikByGelecek, getEtkinlikById, getEtkinlikByName, getTumEtkinlikler}=require('../controllers/etkinlikController');

router.get('/etkinlikler', getTumEtkinlikler);
router.get('/isimle/:etkinlik', getEtkinlikByName);
router.get('/topluluk-etk/:duzenleyen', getEtkinlikByTopluluk);
router.get('/etkinlik-tarih', getEtkinlikByDate);
router.get('/etk-gecmis', getEtkinlikByGecmis);
router.get('/etk-gelecek', getEtkinlikByGelecek);
router.get('/:etkinlikId', getEtkinlikById); // en sonda olmalı






module.exports=router;
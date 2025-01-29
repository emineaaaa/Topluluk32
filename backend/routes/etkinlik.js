const express= require ('express');
const router= express.Router();

const {getAllEtkinlikler ,etkinlikOnay, getEtkinlikByTopluluk, getEtkinlikByDate, getEtkinlikByGecmisGelecek}=require('../controllers/etkinlikController');

router.get('/topluluk-etk/:duzenleyen',getEtkinlikByTopluluk);
router.get('/etkinlik-tarih',getEtkinlikByDate);
router.get('/etk-gecmis-gelecek',getEtkinlikByGecmisGelecek);



module.exports=router;
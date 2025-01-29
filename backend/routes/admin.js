const express=require('express');   
const router= express.Router();

const { yoneticiEkle, toplulukOnay, toplulukSil, toplulukGuncelle, yoneticiGuncelle, etkinlikOnay, etkinlikGuncelle, etkinlikSil}=require('../controllers/adminController');

router.post('/kayit', yoneticiEkle);
router.post('/topluluk-onay', toplulukOnay);
router.delete('/topluluk-sil/:toplulukId', toplulukSil);
router.put('/topluluk-guncelle/:toplulukId', toplulukGuncelle);
router.put('/yonetici-guncelle/:yoneticiId', yoneticiGuncelle);
router.post('/etkinlik-onay', etkinlikOnay);
router.put('/etkinlik-guncelle/:etkinlikId', etkinlikGuncelle);
router.delete('/etkinlik-sil/:etkinlikId', etkinlikSil);


module.exports=router;

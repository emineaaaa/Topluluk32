const express=require('express');   
const router= express.Router();

const { yoneticiEkle, toplulukOnay}=require('../controllers/adminController');

router.post('/kayit', yoneticiEkle);
router.post('/topluluk-onay', toplulukOnay);


module.exports=router;

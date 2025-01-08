const express=require('express');   
const router= express.Router();

const {yoneticiKayitAdminEkrani, yoneticiSignUp, yoneticiLogin}=require('../controllers/yoneticiController');

router.post('/kayit', yoneticiSignUp);
router.post('/login', yoneticiLogin);

module.exports=router;
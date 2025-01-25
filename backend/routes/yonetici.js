const express=require('express');   
const router= express.Router();

const { yoneticiLogin}=require('../controllers/yoneticiController');

router.post('/login', yoneticiLogin);

module.exports=router;
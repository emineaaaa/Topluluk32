const express= require ('express');
const router= express.Router();

const {getAllEtkinlikler ,etkinlikOnay, getEtkinlikByTopluluk}=require('../controllers/etkinlikController');
const protectRoute = require('../middleware/protectRoute');

router.post('/etkinlik-onay',protectRoute, etkinlikOnay);
router.get('/etkinlikler',getAllEtkinlikler);
router.get('/etk/:duzenleyen',getEtkinlikByTopluluk);



module.exports=router;
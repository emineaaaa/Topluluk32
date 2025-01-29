const express= require ('express');
const router= express.Router();

const {getAllTopluluklar, toplulukOnay, getToplulukByKategori}=require('../controllers/toplulukController');

router.get('/topluluklar', getAllTopluluklar);
router.get('/topluluk-kategori/:toplulukKategorisi', getToplulukByKategori);


module.exports=router;
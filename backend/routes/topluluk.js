const express= require ('express');
const router= express.Router();

const {getAllTopluluklar, toplulukOnay, getToplulukByKategori, getToplulukById, getToplulukByName}=require('../controllers/toplulukController');

router.get('/topluluklar', getAllTopluluklar);
router.get('/topluluk-kategori/:toplulukKategorisi', getToplulukByKategori);
router.get('/isimle/:toplulukAdi', getToplulukByName);
router.get('/:toplulukId',getToplulukById);




module.exports=router;
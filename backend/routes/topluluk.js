const express= require ('express');
const router= express.Router();

const {getAllTopluluklar, toplulukOnay}=require('../controllers/toplulukController');
const protectRoute = require('../middleware/protectRoute');

router.get('/topluluklar', getAllTopluluklar);
router.post('/topluluk-onay',protectRoute, toplulukOnay);


module.exports=router;
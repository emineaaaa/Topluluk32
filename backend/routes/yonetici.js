const express = require('express')
const router = express.Router()

const {
  yoneticiLogin,
  istekEtkinlikGonder,
  sifreSifirlamaTalebi,
  sifreyiSifirla
} = require('../controllers/yoneticiController')

const protectRoute = require('../middleware/protectRoute')

router.post('/login', yoneticiLogin)
router.post('/etkinlik-gonder', protectRoute, istekEtkinlikGonder)
router.post('/sifre-sifirlama-talebi', protectRoute, sifreSifirlamaTalebi)
router.post('/sifreyi-sifirla/:token', protectRoute, sifreyiSifirla)

router.get('/me', protectRoute, (req, res) => {
  res.status(200).json(req.yonetici)
})

module.exports = router

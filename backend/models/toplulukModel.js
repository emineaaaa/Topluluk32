const mongoose = require('mongoose');


const toplulukSchema = new mongoose.Schema({
  
  toplulukAdi: {
    type: String,
    required: true,
  },
  hakkinda: {
    type: String,
    required: true,
  },
  toplulukBaskani: {
    type: String,
    required: true,
  },
  iletisim: {
    type: String,
    required: true,
  },
  gecmisEtkinlikleri: [{
    type: Number, // Etkinlik ID'leri
  }],
  logo: {
    type: String,
    required: true,
  },
  toplulukKategorisi: {
    type: String,
    required: true,
    enum: ['Uzmanlik', 'Kultur ve Sanat', 'Spor'],
  },
  uyeSayisi: {
    type: Number,
    required: true,
  },
});

// Modeli oluşturuyoruz
const Topluluk = mongoose.model('Topluluk', toplulukSchema);

module.exports = Topluluk;

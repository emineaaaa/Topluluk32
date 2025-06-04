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
    enum: ['Uzmanlik', 'Kultur ve Sanat', 'Spor', 'Sosyal Sorumluluk'],
  },
  uyeSayisi: {
    type: Number,
    required: true,
  },
  sosyalMedya: {
    web: {
      type: String,
      match: [/^https?:\/\/.+/, 'Geçerli bir URL giriniz']
    },
    x: {
      type: String,
      match: [/^https?:\/\/.+/, 'Geçerli bir URL giriniz']
    },
    instagram: {
      type: String,
      match: [/^https?:\/\/.+/, 'Geçerli bir URL giriniz']
    },
    youtube: {
      type: String,
      match: [/^https?:\/\/.+/, 'Geçerli bir URL giriniz']
    },
    linkedIn: {
      type: String,
      match: [/^https?:\/\/.+/, 'Geçerli bir URL giriniz']
    }
  }
});

// Modeli oluşturuyoruz
const Topluluk = mongoose.model('Topluluk', toplulukSchema);

module.exports = Topluluk;

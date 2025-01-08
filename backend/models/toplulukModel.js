const mongoose = require('mongoose');


const toplulukSchema = new mongoose.Schema({
  toplulukId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topluluk",
  },
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
  },
  uyeSayisi: {
    type: Number,
    required: true,
  },
});

// Modeli oluşturuyoruz
const Topluluk = mongoose.model('Topluluk', toplulukSchema);

module.exports = Topluluk;

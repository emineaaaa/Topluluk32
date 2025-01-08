const mongoose = require('mongoose');

const etkinlikSchema = new mongoose.Schema({
  etkinlikId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etkinlik",
  },
  toplulukId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topluluk",
  },
  tarih: {
    type: Date,
    required: true
  },
  duzenleyen: {
    type: String,
    required: true
  },
  etkinlik: {
    type: String,
    required: true
  },
  gorsel: {
    type: String,
  },
  aciklama: {
    type: String,
    required: true
  },
  konum: {
    type: String,
    required: true
  },
  etkinlikTuru: {
    type: String,
    required: true
  },
  etkinlikAyrintiFormu: {
    type: String,
    
  }
});

const Etkinlik = mongoose.model('Etkinlik', etkinlikSchema);

module.exports = Etkinlik;

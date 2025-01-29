const mongoose = require('mongoose');

const etkinlikSchema = new mongoose.Schema({
  
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
    required: false
  }
});

const Etkinlik = mongoose.model('Etkinlik', etkinlikSchema);

module.exports = Etkinlik;

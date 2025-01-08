const mongoose=require('mongoose');

const yoneticiSchema=new mongoose.Schema({
    yoneticiId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Yonetici",
      },
      yoneticiKullaniciAdi: {
        type: String,
        required: true,
      },
      yoneticiEmail: {
        type: String,
        required: true,
      },
      yoneticiSifre: {
        type: String,
        required: true,
      },
      yoneticiTopluluk: {
          type: String,
          required: true,
      },
      yoneticiRol: {
        type: String,
        required: true,
        enum:["yonetici","admin"]
      },

});

module.exports=mongoose.model("Yonetici",yoneticiSchema);
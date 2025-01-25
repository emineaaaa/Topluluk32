const Yonetici= require('../models/yoneticiModel');  
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie.js');




const yoneticiLogin= async(req,res)=>{
    try {
        const {yoneticiEmail, yoneticiSifre}= req.body;

    if(!yoneticiEmail) return res.status(400).json({ message: "Email bulunamadı." });

    const yonetici= await Yonetici.findOne({yoneticiEmail});
    console.log("kullanıcı bulundu:" ,yonetici);

    if(!yonetici) return res.status(400).json({ message: "Kullanıcı bulunamadı." });

    const isPasswordCorrect = await bcrypt.compare(yoneticiSifre, yonetici.yoneticiSifre);
    console.log("şifre doğru mu?:" ,isPasswordCorrect);

    if(!isPasswordCorrect) return res.status(400).json({ message: "Şifre yanlış." });


    const token = generateTokenAndSetCookie(yonetici._id, res);
  
      res.status(200).json({
        _id: yonetici._id,
        yoneticiKullaniciAdi: yonetici.yoneticiKullaniciAdi,
        yoneticiEmail: yonetici.yoneticiEmail,
        yoneticiTopluluk: yonetici.yoneticiTopluluk,
        yoneticiRol: yonetici.yoneticiRol,
        token // Token'ı yanıtla birlikte gönderiyoruz
      });


    }catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

module.exports={yoneticiLogin};
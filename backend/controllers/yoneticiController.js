const Yonetici= require('../models/yoneticiModel');  
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie.js');



const yoneticiSignUp= async(req,res)=>{
    try {
        const {yoneticiKullaniciAdi, yoneticiEmail, yoneticiSifre, yoneticiTopluluk, yoneticiRol}= req.body;
       
        const yonetici = await Yonetici.findOne({ yoneticiEmail });
        if (yonetici) {
            return res.status(400).json({error: "Bu e-posta adresi zaten kullanılıyor."});
        }
        if(yoneticiSifre.length<6){
            return res.status(400).json({ message: "Şifre en az 6 karakter olmalıdır" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(yoneticiSifre, salt);

        const newYonetici= new Yonetici({
            yoneticiKullaniciAdi,
            yoneticiEmail,
            yoneticiSifre: hashedPassword,
            yoneticiTopluluk,
            yoneticiRol
        });
        if (newYonetici) {
            generateTokenAndSetCookie(newYonetici._id, res);
            await newYonetici.save();

            res.status(201).json({
                _id: newYonetici._id,
                yoneticiKullaniciAdi: newYonetici.yoneticiKullaniciAdi,
                yoneticiEmail: newYonetici.yoneticiEmail,
                yoneticiTopluluk: newYonetici.yoneticiTopluluk,
                yoneticiRol: newYonetici.yoneticiRol
            });
           
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

        
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in yoneticiKayit: ", error.message);
    }

};



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

module.exports={yoneticiSignUp, yoneticiLogin};
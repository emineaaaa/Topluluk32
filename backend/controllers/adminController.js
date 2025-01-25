const Yonetici= require('../models/yoneticiModel');  
const Topluluk=require('../models/toplulukModel')
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie.js');





const yoneticiEkle= async(req,res)=>{
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
        }
       

        
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in yoneticiKayit: ", error.message);
    }
}


const toplulukOnay=async(req,res)=>{
    try {
        const id=req.yonetici._id;
        const {toplulukAdi, hakkinda, toplulukBaskani, iletisim, gecmisEtkinlikleri, logo, toplulukKategorisi, uyeSayisi}= req.body;
        const newTopluluk= new Topluluk({
            toplulukAdi,
            toplulukId:id,
            hakkinda,
            toplulukBaskani,
            iletisim,
            gecmisEtkinlikleri,
            logo,
            toplulukKategorisi,
            uyeSayisi
        });
        const savedTopluluk= await newTopluluk.save();
        res.status(201).json(savedTopluluk);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:"bağlanamadı."})
    }
}



const ToplulukSil=()=>{
    try {
        
    } catch (error) {
        
    }
}

module.exports={yoneticiEkle, toplulukOnay}
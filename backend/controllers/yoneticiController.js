const Yonetici= require('../models/yoneticiModel');  
const Etkinlik=require('../models/etkinlikModel')
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
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


const istekEtkinlikGonder=async(req,res)=>{
    try {
      const { tarih, duzenleyen, etkinlik,aciklama, konum, etkinlikTuru, etkinlikAyrintiFormu , etkinlikDurumu ,etkinlikAfis} = req.body;

    const newEtkinlik = new Etkinlik({
      tarih,
      duzenleyen,
      etkinlik,
      aciklama,
      konum,
      etkinlikTuru,
      etkinlikAyrintiFormu,
      etkinlikDurumu:"onay bekliyor",
      etkinlikAfis
  });

  const savedEtkinlik = await newEtkinlik.save();
  res.status(201).json(savedEtkinlik);

  console.log(error.message);
  } catch (error) {
  if (!res.headersSent) {
      res.status(500).json({ message: "bağlanamadı" });
  }
  console.log(error.message);
  }

}



const sifreSifirlamaTalebi = async (req, res) => {
    try {
        const { yoneticiEmail } = req.body;
        const yonetici = await Yonetici.findOne({ yoneticiEmail });

        if (!yonetici) {
            return res.status(400).json({ error: "Bu e-posta ile kayıtlı yönetici bulunamadı." });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        yonetici.sifreSifirlamaToken = resetToken;
        yonetici.sifreSifirlamaTokenGecerlilik = Date.now() + 3600000; // Token 1 saat geçerli

        await yonetici.save();

        // E-posta gönderme
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "emine0aydinli3@gmail.com",
                pass: "bgul vslc hkna tnth"  
            }
        });

        const resetUrl = `http://localhost:3000/sifreyi-sifirla/${resetToken}`;

        await transporter.sendMail({
            to: yoneticiEmail,
            subject: "Şifre Sıfırlama Talebi",
            text: `Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın: ${resetUrl}`
        });

        res.status(200).json({ message: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi." });

    } catch (error) {
        res.status(500).json({ error: "bağlanamadı" , details: error.message });
    }
};


const sifreyiSifirla = async (req, res) => {
  try {
      const { token } = req.params;
      const { yeniSifre } = req.body;

      const yonetici = await Yonetici.findOne({
          sifreSifirlamaToken: token,
          sifreSifirlamaTokenGecerlilik: { $gt: Date.now() } // Token geçerli mi?
      });

      if (!yonetici) {
          return res.status(400).json({ error: "Geçersiz veya süresi dolmuş token" });
      }

      if (yeniSifre.length < 6) {
          return res.status(400).json({ error: "Şifre en az 6 karakter olmalıdır." });
      }

      const salt = await bcrypt.genSalt(10);
      yonetici.yoneticiSifre = await bcrypt.hash(yeniSifre, salt);

      yonetici.sifreSifirlamaToken = undefined;
      yonetici.sifreSifirlamaTokenGecerlilik = undefined;

      await yonetici.save();

      res.status(200).json({ message: "Şifreniz başarıyla güncellendi." });

  } catch (error) {
      res.status(500).json({ error: "Sunucu hatası" });
  }
};



module.exports={yoneticiLogin, istekEtkinlikGonder, sifreSifirlamaTalebi, sifreyiSifirla};
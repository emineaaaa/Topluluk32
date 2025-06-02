const Yonetici= require('../models/yoneticiModel');  
const Topluluk=require('../models/toplulukModel')
const Etkinlik=require('../models/etkinlikModel')
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie.js');
const { default: mongoose } = require('mongoose');





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
            yoneticiRol,
            sifreSifirlamaToken: undefined,  // Yeni kayıtta token olmayacak
            sifreSifirlamaTokenGecerlilik: undefined
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
        const {toplulukAdi, hakkinda, toplulukBaskani, iletisim, gecmisEtkinlikleri, logo, toplulukKategorisi, uyeSayisi,sosyalMedya}= req.body;
        const newTopluluk= new Topluluk({
            toplulukAdi, 
            hakkinda,
            toplulukBaskani,
            iletisim,
            gecmisEtkinlikleri,
            logo,
            toplulukKategorisi,
            uyeSayisi,
            sosyalMedya
        });
        const savedTopluluk= await newTopluluk.save();
        res.status(201).json(savedTopluluk);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:"bağlanamadı."})
    }
}



const toplulukSil=async(req,res)=>{
    try {
        const toplulukId = req.params.toplulukId;
        const topluluk = await Topluluk.findByIdAndDelete(toplulukId);       
         if(!topluluk){
            res.status(404).json({error:"Hiç Topluluk Yok."})
        }
        res.status(200).json({message:"Topluluk Silindi"})

    } catch (error) {
        res.status(500).json({error:"bağlanamadı."})
    }
}

const toplulukGuncelle=async(req,res)=>{
    try {
        let {toplulukAdi, hakkinda, toplulukBaskani, iletisim, gecmisEtkinlikleri, logo, toplulukKategorisi, uyeSayisi,sosyalMedya}= req.body;
        let toplulukId = req.params.toplulukId;
        let topluluk = await Topluluk.findById(toplulukId);
         if(!topluluk){
            return res.status(404).json({error:"böyle bir topluluk yok."})
        }

        topluluk.toplulukAdi=toplulukAdi || topluluk.toplulukAdi;
        topluluk.hakkinda=hakkinda || topluluk.hakkinda;
        topluluk.toplulukBaskani=toplulukBaskani || topluluk.toplulukBaskani;
        topluluk.iletisim=iletisim || topluluk.iletisim;
        topluluk.gecmisEtkinlikleri=gecmisEtkinlikleri  || topluluk.gecmisEtkinlikleri;
        topluluk.logo=logo || topluluk.logo;
        topluluk.toplulukKategorisi=toplulukKategorisi || topluluk.toplulukKategorisi;
        topluluk.uyeSayisi=uyeSayisi || topluluk.uyeSayisi;
        
        // Sosyal medya opsiyonel olarak güncelle
        if (sosyalMedya !== undefined) {
            topluluk.sosyalMedya = sosyalMedya;
        }

        const updatedTopluluk= await topluluk.save();
        return res.status(200).json({ message: "Topluluk Güncellendi", updatedTopluluk });

    } catch (error) {
        console.error('Hata Detayı:', error);
        return res.status(500).json({ error: "Bağlantı hatası.", details: error.message });
    }
}

const yoneticiGuncelle=async(req,res)=>{
    try {
        let {yoneticiKullaniciAdi, yoneticiEmail, yoneticiTopluluk, yoneticiRol}= req.body;
        let yoneticiId = req.params.yoneticiId;
        let yonetici = await Yonetici.findById(yoneticiId);
         if(!yonetici){
            return res.status(404).json({error:"böyle bir yonetici yok."})
        }
        yonetici.yoneticiKullaniciAdi=yoneticiKullaniciAdi || yonetici.yoneticiKullaniciAdi;
        yonetici.yoneticiEmail=yoneticiEmail || yonetici.yoneticiEmail;
        yonetici.yoneticiTopluluk=yoneticiTopluluk || yonetici.yoneticiTopluluk;
        yonetici.yoneticiRol=yoneticiRol || yonetici.yoneticiRol;    

        const updatedYonetici= await yonetici.save();
        return res.status(200).json({ message: "Yonetici Güncellendi", updatedYonetici });

    } catch (error) {
        console.error('Hata Detayı:', error);
        return res.status(500).json({ error: "Bağlantı hatası.", details: error.message });
    }
}


const etkinlikOnay= async(req,res)=>{
    try {
        const { etkinlikId } = req.params;

        const etkinlik = await Etkinlik.findById(etkinlikId);
        if (!etkinlik) {
            return res.status(404).json({ error: 'Etkinlik bulunamadı' });
        }
        
        etkinlik.etkinlikDurumu = 'onaylandı';
        const updatedEtkinlik = await etkinlik.save();
        res.status(200).json({ message: 'Etkinlik onaylandı', etkinlik: updatedEtkinlik });
       
    
        } catch (error) {
            if (!res.headersSent) {
                res.status(500).json({ message: "bağlanamadı" });
            }
            console.log(error.message);
        }
        };


const etkinlikGuncelle=async(req,res)=>{
    try {
        let {tarih, duzenleyen, etkinlik,aciklama, konum, etkinlikTuru, etkinlikAyrintiFormu,etkinlikDurumu}= req.body;
        const etkinlikId = req.params.etkinlikId;
        let etk= await Etkinlik.findById(etkinlikId);
         if(!etk){
            return res.status(404).json({error:"böyle bir etkinlik yok."})
        }
        etk.tarih=tarih || etk.tarih;
        etk.duzenleyen=duzenleyen || etk.duzenleyen;
        etk.etkinlik=etkinlik || etk.etkinlik;
        etk.aciklama=aciklama || etk.aciklama;
        etk.konum=konum || etk.konum;
        etk.etkinlikTuru=etkinlikTuru || etk.etkinlikTuru;
        etk.etkinlikAyrintiFormu=etkinlikAyrintiFormu || etk.etkinlikAyrintiFormu;
        etk.etkinlikDurumu=etkinlikDurumu || etk.etkinlikDurumu;

        const updatedEtkinlik= await etk.save();
        return res.status(200).json({ message: "Etkinlik güncellendi", updatedEtkinlik });

    }

        catch (error) {
            console.error('Hata Detayı:', error);
            return res.status(500).json({ error: "Bağlantı hatası.", details: error.message });
        }
        
}

const etkinlikSil=async(req,res)=>{
    try {
        const etkinlikId = req.params.etkinlikId;
        const etkinlik = await Etkinlik.findByIdAndDelete(etkinlikId);       
         if(!etkinlik){
            res.status(404).json({error:"Hiç Etkinlik Yok."})
        }
        res.status(200).json({message:"Etkinlik Silindi"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Bağlanamadı" });
    }
};  




   
    

module.exports={yoneticiEkle, toplulukOnay, toplulukSil, toplulukGuncelle, yoneticiGuncelle, etkinlikOnay, etkinlikGuncelle, etkinlikSil};
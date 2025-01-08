const Etkinlik= require('../models/etkinlikModel');
const Yonetici = require('../models/yoneticiModel');

const getAllEtkinlikler=async(req,res)=>{
    try {
        const etkinlikler= await Etkinlik.find();

        if (!etkinlikler || etkinlikler.length===0){
            return res.status(404).json({error:"Hiç Etkinlik Yok."})
        }
        return res.status(200).json(topluluklar);
        
    } catch (error) {
        console.error( error.message);
        res.status(500).json({ error: "bağlanamadı " });
    }
};

const etkinlikOnay= async(req,res)=>{
    try {
        const id = req.yonetici._id;
        const { tarih, duzenleyen, etkinlik,aciklama, konum, etkinlikTuru, etkinlikAyrintiFormu } = req.body;
        const admin = await Yonetici.findById(id);
        if (id.yoneticiRol !== "admin" || id.yoneticiRol !== "yonetici") {
           res.status(404).json({ error: "Bu yonetici yetkisi yok" });
        }

      const newEtkinlik = new Etkinlik({
        etkinlikId: id,
        tarih,
        duzenleyen,
        etkinlik,
        aciklama,
        konum,
        etkinlikTuru,
        etkinlikAyrintiFormu
    });

    const savedEtkinlik = await newEtkinlik.save();
    res.status(201).json(savedEtkinlik);
} catch (error) {
    if (!res.headersSent) {
        res.status(500).json({ message: "bağlanamadı" });
    }
    console.log(error.message);
}
};

const getEtkinlikByTopluluk= async(req,res)=>{
    try {
       const toplulukAdi=req.params.duzenleyen;       
       const etkinlikler=await Etkinlik.findOne({duzenleyen: toplulukAdi}); 

       if(!etkinlikler){
        return res.status(404).json({error:"Hiç Etkinlik Yok."})
       }
       res.status(200).json(etkinlikler);
    } catch (error) {
        return res.status(500).json({error:"bağlanamadı."})
    }
}




module.exports={getAllEtkinlikler, etkinlikOnay, getEtkinlikByTopluluk}
const Etkinlik= require('../models/etkinlikModel');


const getTumEtkinlikler = async (req, res) => {
    try {
      const etkinlikler = await Etkinlik.find().sort({ tarih: -1 });
  
      if (!etkinlikler || etkinlikler.length === 0) {
        return res.status(404).json({ error: "Veritabanında hiç etkinlik bulunamadı." });
      }
  
      res.status(200).json(etkinlikler);
    } catch (error) {
      console.error("Etkinlikleri alırken hata:", error.message);
      res.status(500).json({ error: "Etkinlikler alınamadı." });
    }
  };


const getEtkinlikByTopluluk= async(req,res)=>{
    try {
       const toplulukAdi=req.params.duzenleyen;        
       const etkinlikler=await Etkinlik.find({duzenleyen: toplulukAdi} && {etkinlikDurumu:"onaylandı"}).sort({tarih:-1}); 

       if(!etkinlikler){
        return res.status(404).json({error:"Hiç Etkinlik Yok."})
       }
       
       res.status(200).json(etkinlikler);
    } catch (error) {
        return res.status(500).json({error:"bağlanamadı."})
    }
}


const getEtkinlikByDate = async (req, res) => {
    try {
        const query = { etkinlikDurumu: "onaylandı" };
        const etkinlikler = await Etkinlik.find(query).sort({ tarih: -1 }); 
             
        if (!etkinlikler || etkinlikler.length === 0) {
            return res.status(404).json({ error: "Hiç Etkinlik Yok." });
        }

        return res.status(200).json(etkinlikler);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Bağlanamadı" });
    }
};


const getEtkinlikByGecmis = async (req, res) => {
    try {
        const bugun = new Date();
        bugun.setHours(0, 0, 0, 0); //saati sıfırladık

      

        //gecmis
        const gecmisEtkinlikler = await Etkinlik.find({ tarih: { $lt: bugun } }&& {etkinlikDurumu:"onaylandı"})
            .sort({ tarih: -1 }); 

        return res.status(200).json({
            gecmisEtkinlikler
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Bağlanamadı" });
    }
};

const getEtkinlikByGelecek =async(req,res)=>{
    try {
        const bugun = new Date();
        bugun.setHours(0, 0, 0, 0); //saati sıfırladık

        const gelecekEtkinlikler = await Etkinlik.find({ tarih: { $gte: bugun } }&& {etkinlikDurumu:"onaylandı"})
            .sort({ tarih: 1 });
        return res.status(200).json(gelecekEtkinlikler);
    } catch (error) {
        return res.status(500).json({error:"bağlanamadı."})
    }
};




const getEtkinlikById=async(req, res)=>{
    try{
        const etkinlik=await Etkinlik.findById(req.params.etkinlikId);
    if(!etkinlik){
        return res.status(404).json({error:"Böyle Bir Etkinlik Yok." || "Hiç Etkinlik Yok."})
    }
    return res.status(200).json(etkinlik);
    
    }catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "bağlanamadı" });
    }
}


const getEtkinlikByName=async(req, res)=>{
    const etkinlikAdi=req.params.etkinlik;
    try{
        const etkinlik=await Etkinlik.find({etkinlik: etkinlikAdi});
    if(!etkinlik){
        return res.status(404).json({error:"Böyle Bir Etkinlik Yok."})
    }
    return res.status(200).json(etkinlik);
    
    }catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "bağlanamadı" });
    }
}


module.exports={ getTumEtkinlikler, getEtkinlikByTopluluk, getEtkinlikByDate, getEtkinlikByGecmis, getEtkinlikByGelecek, getEtkinlikById, getEtkinlikByName}
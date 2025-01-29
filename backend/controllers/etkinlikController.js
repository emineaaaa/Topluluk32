const Etkinlik= require('../models/etkinlikModel');





const getEtkinlikByTopluluk= async(req,res)=>{
    try {
       const toplulukAdi=req.params.duzenleyen;        
       const etkinlikler=await Etkinlik.find({duzenleyen: toplulukAdi}); 

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
        const tarih = Etkinlik.tarih; 
        const etkinlikler = await Etkinlik.find(tarih)
            .sort({ tarih: 1 }); 
        if (!etkinlikler || etkinlikler.length === 0) {
            return res.status(404).json({ error: "Hiç Etkinlik Yok." });
        }

        return res.status(200).json(etkinlikler);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Bağlanamadı" });
    }
};


const getEtkinlikByGecmisGelecek = async (req, res) => {
    try {
        const bugun = new Date();
        bugun.setHours(0, 0, 0, 0); //saati sıfırladık

       //gelecek
        const gelecekEtkinlikler = await Etkinlik.find({ tarih: { $gte: bugun } })
            .sort({ tarih: 1 });

        //gecmis
        const gecmisEtkinlikler = await Etkinlik.find({ tarih: { $lt: bugun } })
            .sort({ tarih: -1 }); 

        return res.status(200).json({
            gelecekEtkinlikler,
            gecmisEtkinlikler
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Bağlanamadı" });
    }
};





module.exports={ getEtkinlikByTopluluk, getEtkinlikByDate, getEtkinlikByGecmisGelecek}
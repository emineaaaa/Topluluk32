const Topluluk= require('../models/toplulukModel')

const getAllTopluluklar=async(req,res)=>{
    try {
        const topluluklar= await Topluluk.find();

        if (!topluluklar || topluluklar.length===0){
            return res.status(404).json({error:"Hiç Topluluk Yok."})
        }
        return res.status(200).json(topluluklar);
        
    } catch (error) {
        console.error( error.message);
        res.status(500).json({ error: "bağlanamadı " });
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
module.exports={getAllTopluluklar, toplulukOnay}
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const YoneticiEtkinlikİstek = () => {
  const navigate = useNavigate();
  const [yonetici, setYonetici] = useState({});
  const [form, setForm] = useState({
    tarih: '',
    etkinlik: '',
    aciklama: '',
    konum: '',
    etkinlikTuru: ''
  });

  useEffect(() => {
    const yoneticiURL = process.env.REACT_APP_YONETICI_ME;
    const token = localStorage.getItem("token");

    fetch(yoneticiURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) throw new Error("Yetkisiz erişim");
        return response.json();
      })
      .then(data => setYonetici(data))
      .catch(error => console.error("Veri çekme hatası:", error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const etkinlikURL = process.env.REACT_APP_ETKINLIK_GONDER;

    const requestBody = {
      tarih: form.tarih ? new Date(form.tarih).toISOString() : '',
      duzenleyen: yonetici?.yoneticiTopluluk || '',
      etkinlik: form.etkinlik,
      aciklama: form.aciklama,
      konum: form.konum,
      etkinlikTuru: form.etkinlikTuru
    };

    try {
      const response = await fetch(etkinlikURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) throw new Error("Etkinlik gönderilemedi");

      const data = await response.json();
      console.log("Etkinlik başarıyla gönderildi:", data);
      navigate("/admin");
    } catch (error) {
      console.error("Gönderim hatası:", error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Etkinlik Talep Formu</h2>
      {["tarih", "etkinlik", "aciklama", "konum", "etkinlikTuru"].map((field) => (
        <div className="field" key={field}>
          <label>{field[0].toUpperCase() + field.slice(1)}:</label>
          <input
            className="input"
            type={field === "tarih" ? "datetime-local" : "text"}
            name={field}
            value={form[field]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button className="button is-link" onClick={handleSubmit}>Etkinlik İsteği Gönder</button>
    </div>
  );
};

export default YoneticiEtkinlikİstek;

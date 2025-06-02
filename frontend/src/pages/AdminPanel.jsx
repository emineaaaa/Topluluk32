import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [yonetici, setYonetici] = useState(null);
  const [etkinlikler, setEtkinlikler] = useState([]);
  const [topluluklar, setTopluluklar] = useState([]);
  const [activeTab, setActiveTab] = useState('etkinlik'); // etkinlik veya topluluk
  const [guncelleModal, setGuncelleModal] = useState(false);
  const [guncellenecekEtkinlik, setGuncellenecekEtkinlik] = useState(null);
  const [guncellenecekTopluluk, setGuncellenecekTopluluk] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchYonetici = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const response = await fetch(process.env.REACT_APP_YONETICI_ME, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data.yoneticiRol !== "admin") return navigate("/admin");

        setYonetici(data);
        fetchEtkinlikler();
        fetchTopluluklar();
      } catch {
        navigate("/login");
      }
    };

    const fetchEtkinlikler = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_ADMIN_ETKINLIKLER);
        const data = await response.json();
        setEtkinlikler(data);
      } catch (err) {
        console.error("Etkinlikler alınamadı:", err);
      }
    };

    const fetchTopluluklar = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_ADMIN_TOPLULUKLAR);
        console.log(response);
        
        const data = await response.json();
        setTopluluklar(data);
      } catch (err) {
        console.error("Topluluklar alınamadı:", err);
      }
    };

    fetchYonetici();
  }, [navigate]);

  // Etkinlik işlemleri
  const handleOnayDurumu = async (id, mevcutDurum) => {
    const token = localStorage.getItem("token");
    const yeniDurum = mevcutDurum === "onaylandı" ? "onay bekliyor" : "onaylandı";
    const url =
      mevcutDurum === "onaylandı"
        ? `${process.env.REACT_APP_ADMIN_ETKINLIK_GUNCELLE}/${id}`
        : `${process.env.REACT_APP_ADMIN_ETKINLIK_ONAY}/${id}`;

    const method = mevcutDurum === "onaylandı" ? "PUT" : "POST";
    const body = mevcutDurum === "onaylandı" ? JSON.stringify({ etkinlikDurumu: yeniDurum }) : null;

    try {
      await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body
      });

      setEtkinlikler(prev =>
        prev.map(etk => etk._id === id ? { ...etk, etkinlikDurumu: yeniDurum } : etk)
      );
    } catch (err) {
      console.error("Durum güncelleme hatası:", err);
    }
  };

  const handleEtkinlikSil = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${process.env.REACT_APP_ADMIN_ETKINLIK_SIL}/${id}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setEtkinlikler(prev => prev.filter(etk => etk._id !== id));
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  const handleEtkinlikGuncelle = (etkinlik) => {
    setGuncellenecekEtkinlik(etkinlik);
    setGuncellenecekTopluluk(null);
    setForm(etkinlik);
    setGuncelleModal(true);
  };

  // Topluluk işlemleri
  const handleToplulukSil = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${process.env.REACT_APP_ADMIN_TOPLULUK_SIL}/${id}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setTopluluklar(prev => prev.filter(tlk => tlk._id !== id));
    } catch (err) {
      console.error("Topluluk silme hatası:", err);
    }
  };

  const handleToplulukGuncelle = (topluluk) => {
    setGuncellenecekTopluluk(topluluk);
    setGuncellenecekEtkinlik(null);
    setForm(topluluk);
    setGuncelleModal(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      if (guncellenecekEtkinlik) {
        await fetch(`${process.env.REACT_APP_ADMIN_ETKINLIK_GUNCELLE}/${guncellenecekEtkinlik._id}`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        });

        setEtkinlikler(prev =>
          prev.map(etk => etk._id === guncellenecekEtkinlik._id ? { ...etk, ...form } : etk)
        );
      } else if (guncellenecekTopluluk) {
        await fetch(`${process.env.REACT_APP_ADMIN_TOPLULUK_GUNCELLE}/${guncellenecekTopluluk._id}`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        });

        setTopluluklar(prev =>
          prev.map(tlk => tlk._id === guncellenecekTopluluk._id ? { ...tlk, ...form } : tlk)
        );
      }

      setGuncelleModal(false);
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  };

  return (
    <div style={{ backgroundColor: "#eef1f4", minHeight: "100vh", padding: "2rem" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", color: "#1d3557", marginBottom: "2rem" }}>
        🎯 Admin Yönetim Paneli
      </h2>

      {/* Tab Menü */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <button
          onClick={() => setActiveTab('etkinlik')}
          style={{
            ...tabBtnStyle,
            backgroundColor: activeTab === 'etkinlik' ? "#1d3557" : "#fff",
            color: activeTab === 'etkinlik' ? "#fff" : "#1d3557"
          }}
        >
          📅 Etkinlikler
        </button>
        <button
          onClick={() => setActiveTab('topluluk')}
          style={{
            ...tabBtnStyle,
            backgroundColor: activeTab === 'topluluk' ? "#1d3557" : "#fff",
            color: activeTab === 'topluluk' ? "#fff" : "#1d3557"
          }}
        >
          👥 Topluluklar
        </button>
      </div>

      {/* Etkinlik Paneli */}
      {activeTab === 'etkinlik' && (
        <div>
          <h3 style={{ textAlign: "center", fontSize: "1.5rem", color: "#1d3557", marginBottom: "1.5rem" }}>
            📅 Etkinlik Yönetimi
          </h3>
          {etkinlikler.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "1.5rem" }}>
              {etkinlikler.map(etkinlik => (
                <div key={etkinlik._id} style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)"
                }}>
                  <h3 style={{ fontWeight: "600", fontSize: "1.3rem" }}>
                    📌 {etkinlik.etkinlik}
                  </h3>
                  <ul style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                    <li><strong>📅 Tarih:</strong> {new Date(etkinlik.tarih).toLocaleDateString("tr-TR")}</li>
                    <li><strong>📍 Konum:</strong> {etkinlik.konum}</li>
                    <li><strong>👥 Düzenleyen:</strong> {etkinlik.duzenleyen}</li>
                    <li><strong>📚 Tür:</strong> {etkinlik.etkinlikTuru}</li>
                    <li><strong>📝 Açıklama:</strong> {etkinlik.aciklama}</li>
                    <li><strong>⚙️ Durum:</strong> {etkinlik.etkinlikDurumu}</li>
                  </ul>
                  <div style={{ marginTop: "1.2rem", display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => handleOnayDurumu(etkinlik._id, etkinlik.etkinlikDurumu)}
                      style={btnStyle(etkinlik.etkinlikDurumu === "onaylandı" ? "#6c757d" : "#2a9d8f")}
                    >
                      {etkinlik.etkinlikDurumu === "onaylandı" ? "❌ Onayı İptal Et" : "✅ Onayla"}
                    </button>
                    <button onClick={() => handleEtkinlikSil(etkinlik._id)} style={btnStyle("#e63946")}>🗑 Sil</button>
                    <button onClick={() => handleEtkinlikGuncelle(etkinlik)} style={btnStyle("#f4a261")}>✏️ Güncelle</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "#555", marginTop: "2rem" }}>
              Henüz hiçbir etkinlik talebi alınmadı.
            </p>
          )}
        </div>
      )}

      {/* Topluluk Paneli */}
      {activeTab === 'topluluk' && (
        <div>
          <h3 style={{ textAlign: "center", fontSize: "1.5rem", color: "#1d3557", marginBottom: "1.5rem" }}>
            👥 Topluluk Yönetimi
          </h3>
          {topluluklar.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "1.5rem" }}>
              {topluluklar.map(topluluk => (
                <div key={topluluk._id} style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)"
                }}>
                  <h3 style={{ fontWeight: "600", fontSize: "1.3rem" }}>
                    👥 {topluluk.toplulukAdi}
                  </h3>
                  <ul style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                    <li><strong>👤 Başkan:</strong> {topluluk.toplulukBaskani}</li>
                    <li><strong>📧 İletişim:</strong> {topluluk.iletisim}</li>
                    <li><strong>📂 Kategori:</strong> {topluluk.toplulukKategorisi}</li>
                    <li><strong>👥 Üye Sayısı:</strong> {topluluk.uyeSayisi}</li>
                    <li><strong>📝 Hakkında:</strong> {topluluk.hakkinda?.substring(0, 100)}...</li>
                  </ul>
                  <div style={{ marginTop: "1.2rem", display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => handleToplulukSil(topluluk._id)} style={btnStyle("#e63946")}>🗑 Sil</button>
                    <button onClick={() => handleToplulukGuncelle(topluluk)} style={btnStyle("#f4a261")}>✏️ Güncelle</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "#555", marginTop: "2rem" }}>
              Henüz hiçbir topluluk bulunmuyor.
            </p>
          )}
        </div>
      )}

      {/* Güncelleme Modal */}
      {guncelleModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3 style={{ marginBottom: "1rem" }}>
              {guncellenecekEtkinlik ? "📝 Etkinlik Güncelle" : "📝 Topluluk Güncelle"}
            </h3>
            {guncellenecekEtkinlik ? (
              // Etkinlik güncelleme formu
              ["etkinlik", "tarih", "konum", "duzenleyen", "etkinlikTuru", "aciklama", "etkinlikDurumu"].map(field => (
                <div key={field} style={{ marginBottom: "0.8rem" }}>
                  <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.3rem" }}>
                    {field === "etkinlik" ? "Etkinlik Adı" :
                     field === "tarih" ? "Tarih" :
                     field === "konum" ? "Konum" :
                     field === "duzenleyen" ? "Düzenleyen" :
                     field === "etkinlikTuru" ? "Etkinlik Türü" :
                     field === "aciklama" ? "Açıklama" :
                     "Etkinlik Durumu"}
                  </label>
                  {field === "tarih" ? (
                    <input
                      type="date"
                      name={field}
                      value={form[field] ? new Date(form[field]).toISOString().split('T')[0] : ""}
                      onChange={handleFormChange}
                      style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  ) : field === "aciklama" ? (
                    <textarea
                      name={field}
                      value={form[field] || ""}
                      onChange={handleFormChange}
                      rows={3}
                      style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  ) : field === "etkinlikDurumu" ? (
                    <select
                      name={field}
                      value={form[field] || ""}
                      onChange={handleFormChange}
                      style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
                    >
                      <option value="onay bekliyor">Onay Bekliyor</option>
                      <option value="onaylandı">Onaylandı</option>
                    </select>
                  ) : (
                    <input
                      name={field}
                      value={form[field] || ""}
                      onChange={handleFormChange}
                      style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  )}
                </div>
              ))
            ) : (
              // Topluluk güncelleme formu
              ["toplulukAdi", "toplulukBaskani", "iletisim", "toplulukKategorisi", "uyeSayisi", "hakkinda"].map(field => (
                <div key={field} style={{ marginBottom: "0.8rem" }}>
                  <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.3rem" }}>
                    {field === "toplulukAdi" ? "Topluluk Adı" :
                     field === "toplulukBaskani" ? "Topluluk Başkanı" :
                     field === "iletisim" ? "İletişim" :
                     field === "toplulukKategorisi" ? "Kategori" :
                     field === "uyeSayisi" ? "Üye Sayısı" :
                     "Hakkında"}
                  </label>
                  {field === "hakkinda" ? (
                    <textarea
                      name={field}
                      value={form[field] || ""}
                      onChange={handleFormChange}
                      rows={4}
                      style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  ) : field === "uyeSayisi" ? (
                    <input
                      type="number"
                      name={field}
                      value={form[field] || ""}
                      onChange={handleFormChange}
                      style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  ) : field === "toplulukKategorisi" ? (
                    <select
                      name={field}
                      value={form[field] || ""}
                      onChange={handleFormChange}
                      style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
                    >
                      <option value="Uzmanlik">Uzmanlık Topluluğu</option>
                      <option value="Kultur-Sanat">Kültür-Sanat Topluluğu</option>
                      <option value="Spor">Spor Topluluğu</option>
                    </select>
                  ) : (
                    <input
                      name={field}
                      value={form[field] || ""}
                      onChange={handleFormChange}
                      style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  )}
                </div>
              ))
            )}
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem" }}>
              <button onClick={handleFormSubmit} style={btnStyle("#198754")}>💾 Kaydet</button>
              <button onClick={() => setGuncelleModal(false)} style={btnStyle("#6c757d")}>❌ Kapat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const tabBtnStyle = {
  padding: "1rem 2rem",
  border: "2px solid #1d3557",
  borderRadius: "12px",
  fontWeight: "bold",
  cursor: "pointer",
  marginRight: "1rem",
  fontSize: "1.1rem",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
};

const btnStyle = (bgColor) => ({
  padding: "0.6rem 1rem",
  border: "none",
  borderRadius: "8px",
  backgroundColor: bgColor,
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  flex: 1,
  transition: "all 0.3s ease"
});

const modalStyle = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "10px",
  minWidth: "400px",
  maxHeight: "80vh",
  overflowY: "auto"
};

export default AdminPanel;

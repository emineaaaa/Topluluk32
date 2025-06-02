import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [yonetici, setYonetici] = useState(null);
  const [etkinlikler, setEtkinlikler] = useState([]);
  const [guncelleModal, setGuncelleModal] = useState(false);
  const [guncellenecekEtkinlik, setGuncellenecekEtkinlik] = useState(null);
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

    fetchYonetici();
  }, [navigate]);

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

  const handleSil = async (id) => {
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

  const handleGuncelle = (etkinlik) => {
    setGuncellenecekEtkinlik(etkinlik);
    setForm(etkinlik);
    setGuncelleModal(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
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

      setGuncelleModal(false);
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  };

  return (
    <div style={{ backgroundColor: "#eef1f4", minHeight: "100vh", padding: "2rem" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", color: "#1d3557" }}>
        🎯 Etkinlik Yönetim Paneli
      </h2>

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
                <button onClick={() => handleSil(etkinlik._id)} style={btnStyle("#e63946")}>🗑 Sil</button>
                <button onClick={() => handleGuncelle(etkinlik)} style={btnStyle("#f4a261")}>✏️ Güncelle</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#555", marginTop: "2rem" }}>
          Henüz hiçbir etkinlik talebi alınmadı.
        </p>
      )}

      {guncelleModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3 style={{ marginBottom: "1rem" }}>📝 Etkinlik Güncelle</h3>
            {["etkinlik", "tarih", "konum", "duzenleyen", "etkinlikTuru", "aciklama", "etkinlikDurumu"].map(field => (
              <div key={field} style={{ marginBottom: "0.8rem" }}>
                <label>{field}</label>
                <input
                  name={field}
                  value={form[field] || ""}
                  onChange={handleFormChange}
                  style={{ width: "100%", padding: "0.5rem", marginTop: "0.2rem" }}
                />
              </div>
            ))}
            <button onClick={handleFormSubmit} style={btnStyle("#198754")}>💾 Kaydet</button>
            <button onClick={() => setGuncelleModal(false)} style={btnStyle("#6c757d")}>Kapat</button>
          </div>
        </div>
      )}
    </div>
  );
};

const btnStyle = (bgColor) => ({
  padding: "0.6rem 1rem",
  border: "none",
  borderRadius: "8px",
  backgroundColor: bgColor,
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  flex: 1
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
  minWidth: "400px"
};

export default AdminPanel;

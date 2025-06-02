import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/yonetici/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          yoneticiEmail: email,
          yoneticiSifre: sifre,
        }),
      });

      if (!response.ok) {
        throw new Error("Giriş başarısız");
      }

      const data = await response.json();
      const { token, yoneticiRol } = data;

      // Token'ı süreli olarak sakla (örneğin 1 saat)
      const expiration = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem("token", token);
      localStorage.setItem("token_exp", expiration);
      console.log(yoneticiRol);
      // Rol bazlı yönlendirme
      if (yoneticiRol === "yonetici") {
        navigate("/etkinlik-talep");
      } else if (yoneticiRol === "admin") {
        navigate("/admin");
      } else {
        alert("Bilinmeyen rol!");
      }

    } catch (err) {
      console.error(err);
      alert("Giriş bilgileri hatalı!");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Topluluk Girişi</h2>
      <div className="field">
        <label>Email:</label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Şifre:</label>
        <input
          className="input"
          type="password"
          value={sifre}
          onChange={(e) => setSifre(e.target.value)}
        />
      </div>
      <button className="button is-primary" onClick={handleLogin}>
        Giriş Yap
      </button>
    </div>
  );
};

export default LoginPage;

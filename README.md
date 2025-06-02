# 🎓 Üniversite Topluluk ve Etkinlik Yönetim Sistemi

Modern ve kullanıcı dostu bir üniversite topluluk ve etkinlik yönetim platformu. Bu sistem, öğrenci topluluklarının etkinliklerini organize etmelerine ve yönetmelerine olanak sağlar.

## 📋 İçindekiler

- [✨ Özellikler](#-özellikler)
- [🛠️ Teknolojiler](#️-teknolojiler)
- [📁 Proje Yapısı](#-proje-yapısı)
- [🚀 Kurulum](#-kurulum)
- [🔧 Konfigürasyon](#-konfigürasyon)
- [📖 API Dokümantasyonu](#-api-dokümantasyonu)
- [👥 Kullanıcı Rolleri](#-kullanıcı-rolleri)
- [🎯 Kullanım](#-kullanım)
- [🔒 Güvenlik](#-güvenlik)
- [📱 Responsive Tasarım](#-responsive-tasarım)

## ✨ Özellikler

### 🎪 Etkinlik Yönetimi
- ✅ Etkinlik oluşturma ve düzenleme
- ✅ Etkinlik onay sistemi
- ✅ Tarih ve konum yönetimi
- ✅ Etkinlik kategorilendirme
- ✅ Yaklaşan ve geçmiş etkinlik görüntüleme

### 👥 Topluluk Yönetimi
- ✅ Topluluk profilleri
- ✅ Kategori bazlı topluluk sınıflandırması
  - 🔬 Uzmanlık Toplulukları
  - 🎨 Kültür-Sanat Toplulukları  
  - ⚽ Spor Toplulukları
- ✅ Sosyal medya entegrasyonu
- ✅ Üye sayısı takibi

### 🛡️ Admin Paneli
- ✅ Çift panelli yönetim sistemi (Etkinlik/Topluluk)
- ✅ Tab menü ile kolay geçiş
- ✅ Etkinlik onay/red işlemleri
- ✅ Topluluk CRUD işlemleri
- ✅ Gerçek zamanlı veri güncelleme

### 🔐 Güvenlik ve Yetkilendirme
- ✅ JWT tabanlı kimlik doğrulama
- ✅ Rol bazlı erişim kontrolü
- ✅ Şifre hashleme (bcrypt)
- ✅ Protected routes
- ✅ Şifre sıfırlama sistemi

## 🛠️ Teknolojiler

### Frontend
- **React 18.3.1** - Modern UI kütüphanesi
- **React Router DOM 6.27.0** - Sayfa yönlendirme
- **React Icons 5.3.0** - İkon kütüphanesi
- **SASS 1.80.4** - CSS önişlemci
- **CSS3** - Styling ve animasyonlar

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 4.21.2** - Web framework
- **MongoDB** - NoSQL veritabanı
- **Mongoose 8.9.3** - MongoDB ODM
- **JWT** - Token tabanlı kimlik doğrulama
- **bcryptjs 2.4.3** - Şifre hashleme
- **CORS 2.8.5** - Cross-origin kaynak paylaşımı
- **Multer** - Dosya yükleme
- **Cloudinary** - Medya yönetimi

## 📁 Proje Yapısı

```
bitirme/
├── 📁 frontend/
│   ├── 📁 public/
│   │   ├── index.html
│   │   └── topluluklar.json
│   └── 📁 src/
│       ├── 📁 components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── AnaSayfaCards.jsx
│       │   ├── YaklasanEtkinlikler.jsx
│       │   ├── ToplulukCards.jsx
│       │   ├── ToplulukBilgisi.jsx
│       │   ├── GecmisEtkinlikler.jsx
│       │   ├── ContactForm.jsx
│       │   └── PrivateRoute.jsx
│       ├── 📁 pages/
│       │   ├── AnaSayfa.jsx
│       │   ├── AdminPanel.jsx
│       │   ├── LoginPage.jsx
│       │   ├── Etkinlikler.jsx
│       │   ├── Topluluklar.jsx
│       │   ├── UzmanlikTopluluklari.jsx
│       │   ├── KulturSanatTopluluklari.jsx
│       │   ├── SporTopluluklari.jsx
│       │   ├── ToplulukDetay.jsx
│       │   ├── EtkinlikDetay.jsx
│       │   ├── YoneticiEtkinlikİstek.jsx
│       │   └── Contact.jsx
│       ├── App.jsx
│       ├── App.css
│       └── index.js
├── 📁 backend/
│   ├── 📁 controllers/
│   │   ├── adminController.js
│   │   ├── yoneticiController.js
│   │   ├── toplulukController.js
│   │   └── etkinlikController.js
│   ├── 📁 models/
│   │   ├── yoneticiModel.js
│   │   ├── toplulukModel.js
│   │   └── etkinlikModel.js
│   ├── 📁 routes/
│   │   ├── admin.js
│   │   ├── yonetici.js
│   │   ├── topluluk.js
│   │   └── etkinlik.js
│   ├── 📁 middleware/
│   │   ├── protectRoute.js
│   │   └── protectRouteAdmin.js
│   ├── 📁 utils/
│   │   └── generateTokenAndSetCookie.js
│   ├── server.js
│   ├── connectToMongoDB.js
│   └── package.json
└── README.md
```

## 🚀 Kurulum

### Ön Gereksinimler
- Node.js (v14 veya üzeri)
- MongoDB (yerel veya MongoDB Atlas)
- Git

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd bitirme
```

### 2. Backend Kurulumu
```bash
cd backend
npm install
```

### 3. Frontend Kurulumu
```bash
cd ../frontend
npm install
```

### 4. Environment Variables Ayarlayın
Backend için `.env` dosyası oluşturun:
```env
# backend/.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/topluluk-etkinlik
JWT_SECRET=your-super-secret-jwt-key
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
```

Frontend için `.env` dosyası oluşturun:
```env
# frontend/.env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_YONETICI_ME=http://localhost:5000/yonetici/me
REACT_APP_ADMIN_ETKINLIKLER=http://localhost:5000/etkinlik/etkinlikler
REACT_APP_ADMIN_ETKINLIK_ONAY=http://localhost:5000/admin/etkinlik-onay
REACT_APP_ADMIN_ETKINLIK_GUNCELLE=http://localhost:5000/admin/etkinlik-guncelle
REACT_APP_ADMIN_ETKINLIK_SIL=http://localhost:5000/admin/etkinlik-sil
REACT_APP_TOPLULUKLAR=http://localhost:5000/topluluk/topluluklar
REACT_APP_TOPLULUK_KATEGORI=http://localhost:5000/topluluk/topluluk-kategori
REACT_APP_TOPLULUK_NAME=http://localhost:5000/topluluk/isimle
```

### 5. Projeyi Çalıştırın

Backend'i başlatın:
```bash
cd backend
npm start
```

Frontend'i başlatın (yeni terminal):
```bash
cd frontend
npm start
```

🎉 Uygulama şu adreslerde çalışacak:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 🔧 Konfigürasyon

### MongoDB Bağlantısı
MongoDB bağlantı string'inizi `.env` dosyasında güncelleyin:
```env
MONGO_URI=mongodb://localhost:27017/topluluk-etkinlik
# veya MongoDB Atlas için:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/topluluk-etkinlik
```

### Email Konfigürasyonu
Şifre sıfırlama için Gmail SMTP ayarları:
```env
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password  # Gmail uygulama şifresi
```

## 📖 API Dokümantasyonu

### 🔐 Kimlik Doğrulama Endpoints
```
POST /yonetici/login          # Kullanıcı girişi
GET  /yonetici/me             # Kullanıcı profili
POST /yonetici/sifre-sifirlama-talebi  # Şifre sıfırlama talebi
POST /yonetici/sifreyi-sifirla/:token  # Şifre sıfırlama
```

### 🎪 Etkinlik Endpoints
```
GET  /etkinlik/etkinlikler    # Tüm etkinlikler
POST /yonetici/etkinlik-gonder # Etkinlik talebi gönder
GET  /etkinlik/topluluk-etk/:duzenleyen # Topluluk etkinlikleri
```

### 👥 Topluluk Endpoints
```
GET  /topluluk/topluluklar    # Tüm topluluklar
GET  /topluluk/topluluk-kategori/:kategori # Kategoriye göre topluluklar
GET  /topluluk/:toplulukId    # Topluluk detayı
GET  /topluluk/isimle/:toplulukAdi # İsimle topluluk arama
```

### 🛡️ Admin Endpoints
```
POST   /admin/kayit           # Admin kaydı
POST   /admin/topluluk-onay   # Topluluk onayı
DELETE /admin/topluluk-sil/:id # Topluluk silme
PUT    /admin/topluluk-guncelle/:id # Topluluk güncelleme
POST   /admin/etkinlik-onay/:id # Etkinlik onayı
PUT    /admin/etkinlik-guncelle/:id # Etkinlik güncelleme
DELETE /admin/etkinlik-sil/:id # Etkinlik silme
```

## 👥 Kullanıcı Rolleri

### 🏛️ Admin
- ✅ Tüm etkinlikleri görüntüleme
- ✅ Etkinlik onay/red işlemleri
- ✅ Topluluk yönetimi (CRUD)
- ✅ Sistem genelinde tam yetki

### 👤 Yönetici
- ✅ Kendi topluluk etkinliklerini yönetme
- ✅ Etkinlik talebi gönderme
- ✅ Profil yönetimi

## 🎯 Kullanım

### 🏠 Ana Sayfa
- Yaklaşan etkinlikleri görüntüleme
- Topluluk kartları
- Hızlı navigasyon

### 🎪 Etkinlik Yönetimi
1. **Etkinlik Oluşturma**: Yönetici panelinden etkinlik talebi gönderin
2. **Onay Süreci**: Admin tarafından etkinlik onaylanır
3. **Görüntüleme**: Onaylanan etkinlikler ana sayfada görünür

### 👥 Topluluk Keşfi
1. **Kategori Seçimi**: Uzmanlık, Kültür-Sanat, Spor
2. **Topluluk Detayı**: Hakkında, iletişim, etkinlikler
3. **Sosyal Medya**: Bağlantılar ve takip

### 🛡️ Admin Paneli
1. **Giriş**: Admin hesabıyla `/login` sayfasından giriş yapın
2. **Panel Seçimi**: Etkinlik veya Topluluk paneli seçin
3. **Yönetim**: CRUD işlemlerini gerçekleştirin

## 🔒 Güvenlik

### 🛡️ Kimlik Doğrulama
- JWT tokenları ile stateless authentication
- HttpOnly cookies kullanımı
- Token expiration yönetimi

### 🔐 Şifre Güvenliği
- bcrypt ile şifre hashleme
- Minimum 6 karakter şifre zorunluluğu
- Güvenli şifre sıfırlama sistemi

### 🚪 Erişim Kontrolü
- Protected routes ile sayfa koruması
- Middleware bazlı yetkilendirme
- Role-based access control (RBAC)

### 🌐 CORS Güvenliği
- Origin bazlı erişim kontrolü
- Development/Production ayarları

## 📱 Responsive Tasarım

- 📱 **Mobile First**: Mobil öncelikli tasarım
- 💻 **Desktop Optimized**: Masaüstü optimize edilmiş arayüz
- 🎨 **Modern UI/UX**: Clean ve kullanıcı dostu tasarım
- ⚡ **Fast Loading**: Optimize edilmiş performans

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Proje ile ilgili sorularınız için:
- 📧 Email: your-email@example.com
- 🐛 Issues: GitHub Issues sayfası

---

⭐ **Projeyi beğendiyseniz yıldızlamayı unutmayın!**

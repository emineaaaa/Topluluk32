import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";


const AnaSayfaCards = () => {



  return (
    <div className="columns is-centered ana-cards">
      {/* Sol Taraf  */}
      <div className="column is-half">
      <div
        className="card anasayfa-cards"
        style={{
          backgroundImage: `url('/sdu2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparan siyah katman
          color: "white",
        }}
      >
        <div className="card-content">
          <div className="content">
            <h2 className="title is-4 " >
                Süleyman Demirel Üniversitesi Hakkında</h2>
            <p>
              Süleyman Demirel Üniversitesi hakkında detaylı bilgi almak ve SDÜ'nün
              resmi web sitesini ziyaret etmek için aşağıdaki bağlantıya tıklayabilirsiniz.
            </p>
            <a
              href="https://www.sdu.edu.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="button is-primary is-light"
              style={{ marginBottom: "1rem" }}
            >
              Resmi Web Sitesi
            </a>
            <div className="social-icons">
              <a
                href="https://www.facebook.com/sdu"
                target="_blank"
                rel="noopener noreferrer"
                className="icon"
              >
                <FaFacebook size={24} color="white" />
              </a>
              <a
                href="https://www.linkedin.com/sdu"
                target="_blank"
                rel="noopener noreferrer"
                className="icon"
              >
                <FaLinkedin size={24} color="white" />
              </a>
              <a
                href="https://www.twitter.com/sdu"
                target="_blank"
                rel="noopener noreferrer"
                className="icon"
              >
                <FaTwitter size={24} color="white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Sağ Taraf  */}
      <div className="column is-half">
        <div className="columns is-multiline">
          <div className="column is-half">
            <div className="card anasayfa-cards2">
              <div className="card-content">
                <div className="content">
                  Topluluk32 Hakkında
                </div>
              </div>
            </div>
          </div>
         

          
          <div className="column is-half">
            <div class="ana-etk-tag">
               <button class="tag is-medium">+ Etkinlik Gönder</button>
          </div>
  <div className="card anasayfa-cards2">
    <div className="card-content">
      <div className="content">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="media">
            <div className="media-left">
              <p className="has-text-grey">12/12/2024</p>
            </div>
            <div className="media-content">
              <p className="has-text-weight-medium">Topluluk Adı</p>
              <p className="has-text-weight-bold">Etkinlik Adı</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>




        </div>
      </div>
    </div>
  );
};

export default AnaSayfaCards;

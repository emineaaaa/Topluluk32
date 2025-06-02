import React from 'react'

const ContactForm = () => {
  return (
    <form
      action="https://formspree.io/f/mvgropry"
      method="POST"
      className="contact-form"
    >
      <div className="field">
        <label className="label">İsim Soyisim:</label>
        <div className="control">
          <input className="input" type="text" name="name" required placeholder="Ad Soyad girin" />
        </div>
      </div>

      <div className="field">
        <label className="label">Email:</label>
        <div className="control">
          <input className="input" type="email" name="email" required placeholder="E-posta adresinizi girin" />
        </div>
      </div>

      <div className="field">
        <label className="label">Konu:</label>
        <div className="control">
          <input className="input" type="text" name="subject" placeholder="Konu girin" />
        </div>
      </div>

      <div className="field">
        <label className="label">Mesajınız:</label>
        <div className="control">
          <textarea className="textarea" name="message" required placeholder="Mesajınızı girin" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button type="submit" className="button is-link sendButtonColor">
            Gönder
          </button>
        </div>
      </div>
    </form>
  );
}

export default ContactForm;

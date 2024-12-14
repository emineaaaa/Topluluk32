import React, { useState } from 'react'

const ContactForm = () => {

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Email formatını doğrula
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(emailValue));
  };




  return (
    <div class='contact-form'>
      <div class="field">
  <label class="label">İsim Soyisim:</label>
  <div class="control">
    <input class="input" type="text" placeholder="ad soyad girin"/>
  </div>
</div>


    <div className="field">
      <label className="label">Email:</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className={`input ${isValidEmail ? "" : "is-danger"}`}
          type="email"
          placeholder="E-posta adresinizi girin"
          value={email}
          onChange={handleEmailChange}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
        {!isValidEmail && (
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        )}
      </div>
      {!isValidEmail && (
        <p className="help is-danger">Geçersiz mail</p>
      )}
    </div>
  

    <div class="field">
  <label class="label">Konu:</label>
  <div class="control">
    <input class="input" type="text" placeholder="Konu girin"/>
  </div>
</div>


<div class="field">
  <label class="label">Mesajınız:</label>
  <div class="control">
    <textarea class="textarea" placeholder="Mesajınızı girin"></textarea>
  </div>
</div>




<div class="field is-grouped">
  <div class="control">
    <button class="button is-link sendButtonColor">Gönder</button>
  </div>
  
</div>
    </div>
  )
}

export default ContactForm

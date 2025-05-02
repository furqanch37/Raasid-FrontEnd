import React, { useState } from 'react';
import GreenLeafImg from '../../Assets/Images/all-sections/two/vecteezy_ai-generated-3d-green-leaf-isolated-on-transparent-background_36743863 1.png';
import Location from '../../Assets/Images/contact/location.svg';
import Mail from '../../Assets/Images/contact/mail.svg';
import Phone from '../../Assets/Images/contact/phone.svg';
import { baseUrl } from '../../const/url.const';
import { useToast } from '../../ToastContext/ToastContext';

const Contact = () => {
   const { showToast } = useToast();
   
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    city: '',
    contact: '',
  });
  const [buttonText, setButtonText] = useState('Send');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const phoneRegex = /^92[0-9]{10}$/; // Must start with 92 and be 12 digits long
    if (!phoneRegex.test(formData.contact)) {
      showToast({ message: "Please enter a valid phone number in format: 923XXXXXXXXX", status: "error" });
      return;
    }
  
    setButtonText('Sending...');
  
    try {
      const response = await fetch(`${baseUrl}/api/contacts/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setButtonText('Sent Successfully');
        setFormData({ name: '', email: '', message: '', city: '', contact: '' });
        showToast({ message: "Message Sent successfully!", status: "success" });
      } else {
        showToast({ message: "Failed to send message!", status: "error" });
      }
    } catch (error) {
      showToast({ message: "Something went wrong!", status: "error" });
    } finally {
      setTimeout(() => setButtonText('Send'), 2000);
    }
  };
  
  return (
    <div className="contact-main-div display-flex">
      <div className="contact-map">
      <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.2497776423496!2d73.17623977570713!3d33.5020665733818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfec05c6453253%3A0xc6ee08c0a8e75b8!2sF5QW%2BGHH%2C%20Rawat%2C%2045900%2C%20Pakistan!5e0!3m2!1sen!2s!4v1711351500000!5m2!1sen!2s"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="contact-map"
></iframe>

      </div>
      <div className="contact-inputs-wrap display-flex">
        <div className="contact-input-div-one display-flex">
          <h1>Write a Message</h1>
          <p>We’re always here to help you!</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-input-tags display-flex">
              {['name', 'email', 'city','contact', 'message'].map((field, index) => (
                <div className="contact-input-group" key={index}>
                 <input
  type={field === 'email' ? 'email' : field === 'contact' ? 'tel' : 'text'}
  name={field}
  placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
  value={formData[field]}
  onChange={handleChange}
  required={field !== 'city'}
/>

                </div>
              ))}
            </div>
            <center>
              <button type="submit">{buttonText}</button>
            </center>
          </form>
        </div>
        <div className="contact-input-div-two display-flex">
          <img src={GreenLeafImg} alt="Green Leaf" className="contact-one" />
          <h2>Get in Touch</h2>
          <div className="contact-icons-wrapper">
            {[{ icon: Phone, label: 'Phone Number', value: '+92 370 2333125' },
              { icon: Mail, label: 'Email Address', value: 'info@raasid.com' },
              { icon: Location, label: 'Location', value: 'Rawat Technology Park, Islamabad, Pakistan' }].map((item, index) => (
              <div className="contact-icons-div display-flex" key={index}>
                <div className="contact-icon display-flex">
                  <img src={item.icon} alt={item.label} />
                </div>
                <div className="contact-icon-desc">
                  <h6>{item.label}</h6>
                  <h4 style={{maxWidth:'250px', lineHeight:'1.4'}}>{item.value}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

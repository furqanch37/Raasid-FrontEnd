import React from 'react';
import NewsletterImg from '../../Assets/Images/all-sections/six/newsletter.svg';
import SendIcon from '../../Assets/Images/all-sections/six/send-icon.svg';
import FallingOranges from '../../Assets/Images/all-sections/six/falling-oranges.png';

const Newsletter = () => {
  return (
    <div className="newsLetter">
      <img src={NewsletterImg} alt="Newsletter" />
      <h1>Subscribe to Newsletter</h1>
      <div className="inputForNewsletter">
        <input type="text" placeholder="Email Address" />
        <div className="submit-btn">
          <img src={SendIcon} alt="Send" />
        </div>
      </div>
      <img
        src={FallingOranges}
        alt="Falling Oranges"
        className="falling-oranges-newsletter"
      />
    </div>
  );
};

export default Newsletter;

import FacebookIcon from '../../Assets/Images/header/icons/facebook.svg';
import InstaIcon from '../../Assets/Images/header/icons/insta.svg';
import LinkedInIcon from '../../Assets/Images/header/icons/linkedIn.svg';
import MailIcon from '../../Assets/Images/header/icons/mail.svg';
import PhoneIcon from '../../Assets/Images/header/icons/phone.svg';
import TwitterIcon from '../../Assets/Images/header/icons/twitter.svg';

const Topbar = () => {
  return (
    <div className="top-header">
      <div className="one">
        <div className="icons">
          <a
            href="https://web.facebook.com/RaasidOfficial/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={FacebookIcon} alt="Facebook" />
          </a>
          <a
            href="https://www.linkedin.com/company/raasid"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={LinkedInIcon} alt="LinkedIn" />
          </a>
          <a
            href="https://www.instagram.com/raasidofficial/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={InstaIcon} alt="Instagram" />
          </a>
      
        </div>
        <p>Welcome to Raasid!</p>
      </div>
      <div className="one">
        <div className="contact">
          <img src={PhoneIcon} alt="Phone" />
          <p>+92 370 2333125</p>
        </div>
        <div className="contact">
          <img src={MailIcon} alt="Mail" />
          <p>info@raasid.com</p>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

import { Link } from 'react-router-dom';
import './style.css';
import ArrowIcon from '../../Assets/Images/footericons/arrow-filled.svg';
import EllipseIcon from '../../Assets/Images/footericons/Ellipse 10.png';
import Facebook from '../../Assets/Images/footericons/footer-social-icons/facebook.png';
import Insta from '../../Assets/Images/footericons/footer-social-icons/insta.png';
import LeftImage from '../../Assets/Images/footericons/left-image.svg';
import LineIcon from '../../Assets/Images/footericons/Line 7.svg';
import LinkedIn from '../../Assets/Images/footericons/footer-social-icons/linkedin.png';
import LocationIcon from '../../Assets/Images/footericons/Group 21.png';
import MailIcon from '../../Assets/Images/footericons/Group 23.png';
import PhoneIcon from '../../Assets/Images/footericons/Group 22.png';
import RaasidLogo from '../../Assets/Images/footericons/RaasidLogo.svg';
import RightImage from '../../Assets/Images/footericons/right-image.svg';
import SocialIcons from '../../Assets/Images/footericons/Group 19.png';

const Footer = () => {
  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <img src={LeftImage} alt="Spices" className="spices-left" />
        <div className="footer-left">
          <div className="footer-div">
            <img
              src={RaasidLogo}
              width="220"
              height="152"
              alt="Raasid Logo"
              className="footer-logo"
            />
            <p className="follow-text">Follow us on social media</p>
            <div className="social-icons">
              <div className="social-img-container display-flex">
                <a
                  href="https://web.facebook.com/RaasidOfficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={Facebook} alt="Social Media" />
                </a>
              </div>
              <div className="social-img-container display-flex">
                <a
                  href="https://www.instagram.com/raasidofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={Insta} alt="Social Media" />
                </a>
              </div>
              <div className="social-img-container display-flex">
                <a
                  href="https://www.linkedin.com/company/raasid"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={LinkedIn} alt="Social Media" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section (Explore) */}
        <div className="footer-middle">
          <h3>
            Explore <img src={LineIcon} alt="Line" />
          </h3>
          <ul>
            <li className="nav-options">
              <Link to="/" onClick={handleScrollTop}>
                <img src={ArrowIcon} alt="Arrow" />
                Home
              </Link>
            </li>
            <li className="nav-options">
              <Link to="/about" onClick={handleScrollTop}>
                <img src={ArrowIcon} alt="Arrow" />
                About
              </Link>
            </li>
            <li className="nav-options">
              <Link to="/products?category=all" onClick={handleScrollTop}>
                <img src={ArrowIcon} alt="Arrow" />
                Shop
              </Link>
            </li>
           {/*
            <li className="nav-options">
              <Link to="/blog" onClick={handleScrollTop}>
                <img src={ArrowIcon} alt="Arrow" />
                Blog
              </Link>
            </li>
           */}
            <li className="nav-options">
              <Link to="/contact" onClick={handleScrollTop}>
                <img src={ArrowIcon} alt="Arrow" />
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section (Contact) */}
        <div className="footer-right">
          <h3>
            Contact <img src={LineIcon} alt="Line" />
          </h3>
          <ul>
            <li style={{ zIndex: '9999999999999999' }}>
              <img src={LocationIcon} alt="Location" />
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Rawat+Technology+Park,+Islamabad,+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit", zIndex: '9999999999999999' }}
              >
                Rawat Technology Park, <br /> Islamabad, Pakistan
              </a>
            </li>
            <li>
              <img src={PhoneIcon} alt="Phone" /> +92 370 2333125
            </li>
            <li>
              <img src={MailIcon} alt="Mail" /> info@raasid.com
            </li>
          </ul>
          <img src={RightImage} alt="Spices" className="spices-right" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="circle">
          <Link to="/privacy-policy" onClick={handleScrollTop}>
            <img src={EllipseIcon} width="10" height="10" alt="Ellipse" />
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" onClick={handleScrollTop}>
            <img src={EllipseIcon} width="10" height="10" alt="Ellipse" />
            Terms of Service
          </Link>
        </div>
        <p className="copyright">© 2025 Raasid</p>
      </div>
    </footer>
  );
};

export default Footer;

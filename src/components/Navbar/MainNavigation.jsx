import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoIcon from "../../Assets/Images/header/icons/logo.svg";
import CartIcon from "../../Assets/Images/header/icons/cart.svg";
import { useCart } from "../../CartContext/CartContext";
import SearchComponent from "./SearchComponent";
import { FaUser } from "react-icons/fa";
import { useUser } from "../../UserContext/UserContext";
import { useToast } from "../../ToastContext/ToastContext";

const MainNavigation = () => {
  const { cart } = useCart();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuActive, setMenuActive] = useState(false);
  const { showToast } = useToast();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(true);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuActive(!isMenuActive);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowSearch(window.innerWidth > 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Listen for clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = () => {
    setShowMenu(false);
  };

  const handleLogout = () => {
    logout();
    showToast({
      message: "Logged out successfully!",
      status: "success",
    });
    setTimeout(() => {
      navigate(`/`);
    }, 0);
    handleMenuClick();
  };

  // Helper function to truncate text by characters (not spaces)
  const truncateTextByChars = (text, maxChars = 12) => {
    return text.length > maxChars ? text.slice(0, maxChars) + "..." : text;
  };

  return (
    <>
      <div className="mobile-header">
       <Link to="/"> <img src={LogoIcon} alt="Logo" /></Link>
        <div className="display-flex" style={{ gap: "10px" }}>
          <SearchComponent />
          <div className="hamburger-menu" onClick={toggleMenu}>
            {isMenuActive ? <span>&#10006;</span> : <span>&#9776;</span>}
          </div>
        </div>
      </div>

      <div className={`main-header ${isMenuActive ? "active" : ""}`}>
        <Link to="/">
          <img src={LogoIcon} className="logoImgInHeader" alt="Logo" />
        </Link>
        <div className="two">
          <Link
            to="/"
            className={`anchorlink ${location.pathname === "/" ? "active" : ""}`}
            onClick={() => setMenuActive(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`anchorlink ${location.pathname === "/about" ? "active" : ""}`}
            onClick={() => setMenuActive(false)}
          >
            About
          </Link>
          <Link
            to="/products?category=all"
            className={`anchorlink ${
              location.pathname === "/products" ||
              location.pathname === "/cart" ||
              location.pathname === "/product-details" ||
              location.pathname === "/checkout"
                ? "active"
                : ""
            }`}
            onClick={() => setMenuActive(false)}
          >
            Shop
          </Link>
         {/*
          <Link
            to="/blog"
            className={`anchorlink ${
              location.pathname === "/blog" || location.pathname === "/blog-details"
                ? "active"
                : ""
            }`}
            onClick={() => setMenuActive(false)}
          >
            Blog
          </Link>
         */}
          <Link
            to="/contact"
            className={`anchorlink ${location.pathname === "/contact" ? "active" : ""}`}
            onClick={() => setMenuActive(false)}
          >
            Contact
          </Link>
        </div>
        <div className="two">
          {showSearch && <SearchComponent />}
          <div className="nav-user">
            {user?.isAuthenticated ? (
              <div className="user-dropdown">
                {/* User Initials with Hover Effect */}
                <div
                  className="user-initials"
                  onClick={() => setShowMenu(!showMenu)}
                  title={user.name} // Shows full name on hover
                >
                  {user.email.charAt(0).toUpperCase()}
                </div>

                {showMenu && (
                  <div className="dropdown-menu" ref={menuRef}>
                    <p className="user-name">
                      {truncateTextByChars(user.email)}
                    </p>
                    <Link to="/profile" className="dropdown-item" onClick={handleMenuClick}>
                      Profile
                    </Link>
                    <Link to="/orders-history" className="dropdown-item" onClick={handleMenuClick}>
                      Orders
                    </Link>
                    <Link className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <FaUser size={24} color="#047244" />
              </Link>
            )}
          </div>

          <Link to="/cart" onClick={() => setMenuActive(false)} className="toRelativeLink">
            <img src={CartIcon} className="cartHeader" alt="Cart" />
            {cart.length > 0 && (
              <span className="absoluteCartNumber display-flex">{cart.length}</span>
            )}
          </Link>
          <Link
            to="/products?category=all"
            className="shop-now-btn"
            onClick={() => setMenuActive(false)}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainNavigation;

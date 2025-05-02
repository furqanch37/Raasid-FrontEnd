// ProfileSection.jsx
import React, { useEffect, useState } from 'react';
import "./style.css";  // Your existing CSS
import Arrow from "../../../Assets/Images/profile/arrow.png";
import Cart from "../../../Assets/Images/profile/cart.png";
import Order from "../../../Assets/Images/profile/order.png";
import Setting from "../../../Assets/Images/profile/setting.png";
import Mic from "../../../Assets/Images/profile/mic.png";
import Bin from "../../../Assets/Images/profile/bin.png";
import cardIcon from "../../../Assets/Images/checkout/card.svg";
import jazzcashIcon from "../../../Assets/Images/checkout/jazzcash.svg";
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../../UserContext/UserContext';
import { baseUrl } from '../../../const/url.const';
import SettingsModal from "./settingModel"; // <-- Import the new modal component

// A simple card component to reuse
const ProfileCard = ({ image, title, description, onClick }) => (
  <div className='profile-card display-flex' onClick={onClick} style={{ cursor: "pointer" }}>
    <img src={image} alt={title} />
    <div className='profile-card-desc'>
      <h3>
        {title} <img src={Arrow} alt="arrow" />
      </h3>
      <p>{description}</p>
    </div>
  </div>
);

// Reusable table component
const Table = ({ headers, data }) => (
  <table className="order-table">
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const ProfileSection = () => {
  const navigate = useNavigate();
  const { user } = useUser();
console.log(user);
  // --- State ---
  const [orders, setOrders] = useState([]);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [productPrices, setProductPrices] = useState({});

  // Settings Modal
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editInfo, setEditInfo] = useState({
    name: "",
    contact: "",
    company: "",
    address: "",
    city: ""
  });

  // --- Fetch Orders ---
  useEffect(() => {
    fetch(`${baseUrl}/api/order`)
      .then(response => response.json())
      .then(data => {
        const userOrders = data.filter(order => order.email === user.email);
        // Sort orders by creation date (desc) and take last 3
        setOrders(
          userOrders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)
        );
      })
      .catch(error => console.error("Error fetching orders:", error));
  }, [user?.email]);

  useEffect(() => {
    fetch(`${baseUrl}/api/personalInfo`)
      .then(res => res.json())
      .then(data => {
        const userData = data.find(item => item.userId === user.id) || {};
  console.log(userData);
        setPersonalInfo({
          name: userData.name || "Not Specified",
          email: user.email, 
          contact: userData.contact || "Not Specified",
          company: userData.company || "Not Specified",
          address: userData.address || "Not Specified",
          city: userData.city || "Not Specified"
        });
      })
      .catch(error => console.error("Error fetching personal info:", error));
  }, [user?.id]); // Dependency updated to user.id
  

  // --- Fetch Product Prices (Optional) ---
  useEffect(() => {
    if (orders.length > 0) {
      const fetchProductPrices = async () => {
        try {
          const productPriceMap = {};
          for (const order of orders) {
            for (const product of order.products) {
              // Avoid duplicate fetch calls for the same product
              if (!productPriceMap[product.productId]) {
                const response = await fetch(`${baseUrl}/api/products/${product.productId}`);
                const productData = await response.json();
                productPriceMap[product.productId] = productData.price;
              }
            }
          }
          setProductPrices(productPriceMap);
        } catch (error) {
          console.error("Error fetching product prices:", error);
        }
      };
      fetchProductPrices();
    }
  }, [orders]);

  // --- Handle "Settings" Click or Navigation ---
  const handleCardClick = (card) => {
    if (card.title === "Settings") {
      // 1) Open modal
      setIsSettingsModalOpen(true);
      // 2) Pre-fill editInfo with existing personal info
      if (personalInfo) {
        setEditInfo({
          name: personalInfo.name,
          contact: personalInfo.contact,
          company: personalInfo.company,
          address: personalInfo.address,
          city: personalInfo.city
        });
      }
    } else if (card.route) {
      navigate(card.route);
    }
  };

  // --- Handle Save Changes (PUT request) ---
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      // Example: If your user ID is "2" or dynamic:
      const updateUrl = `${baseUrl}/api/personalInfo/${user.id}`;
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editInfo)
      });
      if (response.ok) {
        // Update local personal info
        setPersonalInfo(prev => ({ ...prev, ...editInfo }));
        // Close modal
        setIsSettingsModalOpen(false);
        console.log(response);
      } else {
        console.error("Failed to update personal info");
      }
    } catch (error) {
      console.error("Error updating personal info:", error);
    }
  };

  // Cards Data
  const cardsData = [
    {
      image: Cart,
      title: "Shopping Cart",
      description: "View items in your shopping cart.",
      route: "/cart"
    },
    {
      image: Order,
      title: "Your Orders",
      description: "Track, return, or buy products again.",
      route: "/orders-history"
    },
    {
      image: Setting,
      title: "Settings",
      description: "Edit your account information."
      // No route => open modal
    },
    {
      image: Mic,
      title: "Customer Services",
      description: "Get help regarding your purchase and account."
    }
  ];

  const paymentHeaders = ["Payment Method", "Number", "Ex. Date", "Action"];
  const paymentData = [
    [
      <div className='display-flex' style={{ gap: '15px' }}>
        <img src={cardIcon} alt="card" /> Card
      </div>,
      "*****12345",
      "22-9",
      <img src={Bin} alt="bin" />
    ],
    [
      <div className='display-flex' style={{ gap: '15px' }}>
        <img src={jazzcashIcon} alt="card" /> Jazzcash
      </div>,
      "*****12345",
      "22-9",
      <img src={Bin} alt="bin" />
    ]
  ];

  const ordersHeaders = ["No of Items", "Total Amount", "Status", "Ship to", "Actions"];
  const ordersData = orders.map(order => {
    const lastStatus = order.status.length
      ? order.status[order.status.length - 1].state
      : "Pending";

    const statusClassMap = {
      "Delivered": "delivered",
      "Shipped": "shipped",
      "Order Created": "pending"
    };

    return [
      order.products.reduce((acc, product) => acc + product.quantity, 0),
      `Rs ${
        order.products.reduce((total, item) => total + item.price * item.quantity, 0)
        + order.shippingFee
      }`,
      <span className={`status ${statusClassMap[lastStatus] || "pending"}`}>
        {lastStatus === "Delivered" ? "✔" : lastStatus === "Shipped" ? "🚚" : "⏳"} {lastStatus}
      </span>,
      order.address.length > 5 ? `${order.address.substring(0, 10)}...` : order.address,
      <Link to={`/orders-history?orderId=${order.id}`} key={order.id}>
        <button className="view-order-btn">View Order</button>
      </Link>
    ];
  });

  return (
    <div className='profile-wrapper display-flex'>
      
      {/* Cards Section */}
      <div className='profile-card-wrap display-flex'>
        {cardsData.map((card, index) => (
          <ProfileCard
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>

      {/* Orders & Personal Info Section */}
      <div className='orders-and-personal-info display-flex'>
        
        {/* Orders Overview */}
        <div className='orders-overview-section'>
          <div className='overview-card'>
            <div className='overview-card-title display-flex'>
              <h2>Orders Overview</h2>
              <Link className='overview-link' to="/orders-history">View All Orders</Link>
            </div>
            <div className='overview-card-details'>
              <Table headers={ordersHeaders} data={ordersData} />
            </div>
          </div>

          {/* Payment Methods 
          <div className='overview-card'>
            <div className='overview-card-title display-flex'>
              <h2>Payment Methods</h2>
              <Link className='overview-link'>Add Card</Link>
            </div>
            <div className='overview-card-details'>
              <Table headers={paymentHeaders} data={paymentData} />
            </div>
          </div>*/}
        </div>

        {/* Personal Information */}
        <div className="personal-info-section">
          <h2>Personal Information</h2>
          {personalInfo ? (
            <div className="personal-info">
              <div className="personal-info-row">
                <div className="title display-flex">
                  {personalInfo.name ? personalInfo.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div className="title-details">
                  <h3>{personalInfo.name}</h3>
                  <h4 className="email">{personalInfo.email}</h4>
                  <p>{personalInfo.contact}</p>
                </div>
              </div>
              {["name", "email", "address", "company", "city"].map((field, index) => (
                <div key={index} className="personal-info-row">
                  <h5>{field.charAt(0).toUpperCase() + field.slice(1)}:</h5>
                  <h6>{personalInfo[field]}</h6>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading personal information...</p>
          )}
        </div>
      </div>

      {/* Settings Modal (separate component) */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        editInfo={editInfo}
        setEditInfo={setEditInfo}
        handleSaveChanges={handleSaveChanges}
      />
    </div>
  );
};

export default ProfileSection;

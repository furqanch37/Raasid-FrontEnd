import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import DownArrow from "../../../Assets/Images/ordershistory/down_arrow.png";
import UpArrow from "../../../Assets/Images/ordershistory/up_arrow.png";
import Copy from "../../../Assets/Images/ordershistory/copy.png";
import Delivered from "../../../Assets/Images/ordershistory/delivered.png";
import RightArrow from "../../../Assets/Images/all-sections/five/right.svg";
import Biryani from "../../../Assets/Images/ordershistory/biryani.png";
import "./style.css";
import { baseUrl } from "../../../const/url.const";
import { useUser } from "../../../UserContext/UserContext";

const Index = () => {
  const { user } = useUser();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Orders");
  const [expandedOrders, setExpandedOrders] = useState({});
  const scrollRefs = useRef({});
  const [dragState, setDragState] = useState({});
  const [personalInfoId, setPersonalInfoId] = useState(null);
  // State for the timeframe dropdown
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("All");

  // Toggle the timeframe dropdown
  const handleTimeframeClick = () => {
    setIsTimeframeOpen((prev) => !prev);
  };

  // Handle a timeframe selection
  const handleTimeframeSelect = (label) => {
    setSelectedTimeframe(label);
    setIsTimeframeOpen(false);
  };

  const [feedbackStatus, setFeedbackStatus] = useState({}); 
  const [showPopup, setShowPopup] = useState({});
  const [rating, setRating] = useState({});
  const [comment, setComment] = useState({});



  const fetchPersonalInfo = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/personalinfo`);
      const data = await response.json();
  
      const matchedInfo = data.find((entry) => entry.userId === user.id);
  
      if (matchedInfo) {
        setPersonalInfoId(matchedInfo.id); 
      }
    } catch (error) {
      console.error("Error fetching personal info:", error);
    }
  };
  
  useEffect(() => {
    if (user?.id) {
      fetchPersonalInfo();
    }
  }, [user?.id]);






  useEffect(() => {
    checkFeedbackStatus();
  }, []);
  

  const checkFeedbackStatus = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/testimonials`);
      const feedbacks = await response.json();
  
      const feedbackMap = {};
      feedbacks.forEach((f) => {
        if (f.user_id === user.id) {
          feedbackMap[f.product_id] = true;
        }
      });
  
      setFeedbackStatus(feedbackMap);
    } catch (error) {
      console.error("Error checking feedback status:", error);
    }
  };

  const submitFeedback = async (productId) => {
    if (!comment[productId]?.trim()) {
      alert("Please enter a comment before submitting.");
      return;
    }
  
    try {
      const response = await fetch(`${baseUrl}/api/testimonials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          product_id: productId,
          personal_info_id: personalInfoId,
          rating: rating[productId],
          comment: comment[productId].trim(),
        }),
      });
  
      if (response.ok) {
        alert("Feedback submitted successfully!");
        setShowPopup((prev) => ({ ...prev, [productId]: false })); // Close only this product's popup
        fetchUserOrders();
        checkFeedbackStatus();
      } else {
        alert("Error submitting feedback!");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };
  


  const openFeedbackPopup = (productId) => {
    setShowPopup((prev) => ({ ...prev, [productId]: true }));
    setRating((prev) => ({ ...prev, [productId]: 5 }));
    setComment((prev) => ({ ...prev, [productId]: "" }));
  };
  
  const fetchUserOrders = async () => {
    try {
      const params = new URLSearchParams(location.search);
      const orderId = params.get("orderId");
  
      const response = await fetch(`${baseUrl}/api/order`);
      const data = await response.json();
  
      let userOrders = data.filter((order) => order.email === user.email);
  
      // Filter by Order ID if provided
      if (orderId) {
        userOrders = userOrders.filter((order) => order.id === parseInt(orderId));
      }
  
      // Dynamically filter orders based on selectedTimeframe
      if (selectedTimeframe !== "All") {
        const months = parseInt(selectedTimeframe.split(" ")[1]); // Extracts number of months
        if (!isNaN(months)) {
          const pastDate = new Date();
          pastDate.setMonth(pastDate.getMonth() - months);
  
          userOrders = userOrders.filter((order) => new Date(order.createdAt) >= pastDate);
        }
      }
  
      // Sort orders by createdAt (newest first)
      userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      setOrders(userOrders);
      setFilteredOrders(userOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
    
  // Call the function inside useEffect
  useEffect(() => {
    fetchUserOrders();
  }, [user?.email, location.search]);
  

  const handleMouseDown = (e, orderId) => {
    e.preventDefault();
    if (e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") {
      return; // Allow interaction with select and textarea
    }
    setDragState((prev) => ({
      ...prev,
      [orderId]: {
        isDragging: true,
        startX: e.pageX,
        scrollLeft: scrollRefs.current[orderId]?.scrollLeft || 0,
      },
    }));
  };

  const handleMouseMove = (e, orderId) => {
    if (!dragState[orderId]?.isDragging) return;
    e.preventDefault();
    const moveX = (e.pageX - dragState[orderId].startX) * 1.5;
    if (scrollRefs.current[orderId]) {
      scrollRefs.current[orderId].scrollLeft = dragState[orderId].scrollLeft - moveX;
    }
  };

  const handleMouseUp = (orderId) => {
    setDragState((prev) => ({ ...prev, [orderId]: { isDragging: false } }));
  };

  const handleScrollRight = (orderId) => {
    if (scrollRefs.current[orderId]) {
      scrollRefs.current[orderId].scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const filterOrders = (status) => {
    setActiveFilter(status);
    if (status === "Orders") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status[order.status.length - 1].state === status));
    }
  };

  return (
    <div className="orders-history-wrapper display-flex">
      <div className="orders-history-navigation display-flex">
        <div className="orders-history-nav-sec-one display-flex">
          {["Orders", "Delivered", "Shipped", "Pending"].map((filter) => {
            const filterValue = filter === "Pending" ? "Order Created" : filter;
            return (
              <button
                key={filter}
                className={activeFilter === filterValue ? "active" : ""}
                onClick={() => filterOrders(filterValue)}
              >
                {filter}
              </button>
            );
          })}
        </div>
          <div
                 className="orders-history-nav-sec-two display-flex"
                 style={{ position: "relative", cursor:'pointer' }}
               >
                 <h1 onClick={handleTimeframeClick}>{selectedTimeframe}</h1>
                 <img
                   src={isTimeframeOpen ? UpArrow : DownArrow}
                   alt="timeframe arrow"
                   onClick={handleTimeframeClick}
                   style={{ cursor: "pointer" }}
                 />
       
                 {isTimeframeOpen && (
                   <div className="timeframe-dropdown">
                     {/* Always keep 'Past 3 Months' available */}
                     <div onClick={() => handleTimeframeSelect("Past 3 Months")}>
                       Past 3 Months
                     </div>
                     <div onClick={() => handleTimeframeSelect("Past 2 Months")}>
                       Past 2 Months
                     </div>
                     <div onClick={() => handleTimeframeSelect("Past 1 Month")}>
                       Past 1 Month
                     </div>
                   </div>
                 )}
               </div>
      </div>

      <div className="orders-history-main">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="order-details-wrapp active">
              <div className="order-detail-row-one display-flex">
                <h1>Order # {order.id}</h1>
                <h2>
                  Total Amount:{" "}
                  <span>
                    {order.products.reduce((total, product) => total + product.price * product.quantity, 0) +
                      order.shippingFee}{" "}
                    PKR
                  </span>
                </h2>
                <button>Track Package</button>
                <img
                  src={expandedOrders[order.id] ? UpArrow : DownArrow}
                  alt="toggle details"
                  className="open-order-details-btn"
                  onClick={() => toggleOrderDetails(order.id)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="order-detail-row-two display-flex">
                <button className="display-flex">
                  <img src={Delivered} alt="delivered" />
                  <span>{order.status[order.status.length - 1].state}</span>
                </button>
                <h3>
                  Order Placed on <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </h3>
                <h4>
                  <span className="list-dot"></span>
                  {order.products.length} Item(s)
                </h4>
                <h4>
                  <span className="list-dot"></span>Shipped to <span>{order.address}</span>
                </h4>
              </div>
           
              {expandedOrders[order.id] && (
                <div className="products-bought-wrapper display-flex">
                  <div
                    className="products-bought display-flex"
                    ref={(el) => (scrollRefs.current[order.id] = el)}
                    onMouseDown={(e) => handleMouseDown(e, order.id)}
                    onMouseMove={(e) => handleMouseMove(e, order.id)}
                    onMouseUp={() => handleMouseUp(order.id)}
                    onMouseLeave={() => handleMouseUp(order.id)}
                    style={{ cursor: dragState[order.id]?.isDragging ? "grabbing" : "grab", userSelect: "none" }}
                  >
                    {order.products.map((product, index) => (
                      <div key={index} className="product-bought-details display-flex">
                        <div className="product-bought-details-top-row display-flex">
                          <img
                            src={product.image ? `${baseUrl}/api/products/image/${product.image}` : Biryani}
                            alt="product"
                            draggable="false"
                          />
                          <div className="detailing">
                            <h1>{product.name}</h1>
                            <p>Qty: {product.quantity}</p>
                            <h2>PKR {product.price}</h2>
                          </div>
                          
                        
                

                        </div>
                    
                        <div className="product-bought-details-bottom-row display-flex">
     
      {order.status[order.status.length - 1].state === "Delivered" && (
      <button 
    onClick={() => openFeedbackPopup(product.productId)} 
    disabled={feedbackStatus[product.productId] || false} // Check feedback for this product
  >
    {feedbackStatus[product.productId] ? "Submitted Feedback" : "Feedback"}
  </button>)}

      {/* Feedback Popup */}
      {showPopup[product.productId] && (
  <div className="feedback-overlay">
    <div className="feedback-popup">
      <div className="feedback-content">
        <h2>Rate {product.name}</h2>

        <div className="rating-section">
          <span>Rating:</span>
          <select 
            value={rating[product.productId] || 5} // Default to 5
            onChange={(e) =>
              setRating((prev) => ({ ...prev, [product.productId]: e.target.value }))
            }
            onMouseDown={(e) => e.stopPropagation()} // Prevent parent div from interfering
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <textarea
          placeholder="Write your feedback..."
          value={comment[product.productId] || ""}
          onChange={(e) =>
            setComment((prev) => ({ ...prev, [product.productId]: e.target.value }))
          }
          style={{ zIndex: "9999999" }}
          onMouseDown={(e) => e.stopPropagation()} // Prevent drag interference
        />

        <button onClick={() => submitFeedback(product.productId)}>
          Submit
        </button>
        
        <button
          onClick={() =>
            setShowPopup((prev) => ({ ...prev, [product.productId]: false }))
          }
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

</div>
                      </div>
                    ))}
                  </div>
                  <img
                    src={RightArrow}
                    alt="right-arrow"
                    className="slide-bought-products"
                    onClick={() => handleScrollRight(order.id)}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Index;

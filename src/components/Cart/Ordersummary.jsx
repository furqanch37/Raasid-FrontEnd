import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext';
import './Ordersummary.css';
import { baseUrl } from '../../const/url.const';

const Ordersummary = () => {
  const location = useLocation();
  const { cart, updateCartItem } = useCart(); 
  const [shippingFee, setShippingFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customDescription, setCustomDescription] = useState("");

  // Get param from URL
  const shippingParam = new URLSearchParams(location.search).get("shipping");
  const calculateShipping = ["pakistanPost", "tcs"].includes(shippingParam);
  console.log("Shipping Param:", shippingParam);
  console.log("Should Calculate Shipping:", calculateShipping);

  const weightMap = {
    spices: 0.1,
    readytoeat: 0.3,
    fruitspreserves: 0.5,
    granolabars: 0.08,
    mres: 1.28,
  };

  const getProductWeight = (product) => {
    if (product.category === "granolabars" || product.category === "mres") {
      return product.name === "Nut Bars" ? 0.06 : weightMap[product.category];
    }
    return weightMap[product.category] || 0;
  };

  const grandTotalWithoutShipping = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const totalWeightGrams = cart.reduce((total, item) => {
    const weight = getProductWeight(item) * 1000;
    return total + weight * item.quantity;
  }, 0);

  useEffect(() => {
    console.log("useEffect Triggered with:", { calculateShipping, totalWeightGrams, shippingParam });

    if (!calculateShipping) {
      setShippingFee(0);
      setLoading(false);
      return;
    }

    setLoading(true);

    const fetchShippingFee = async () => {
      if (totalWeightGrams === 0) {
        setShippingFee(0);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/api/courier/pakPost/getTariff?weight=${totalWeightGrams}`);
        const fee = await response.json();

        if (!response.ok) throw new Error("Failed to fetch shipping fee");

        const adjustedFee = shippingParam === "tcs" ? fee + 15 : fee;
        console.log("Shipping Fee Fetched:", adjustedFee);
        setShippingFee(adjustedFee);
      } catch (error) {
        console.error("Error fetching shipping fee:", error);
        setShippingFee(0);
      } finally {
        setLoading(false);
      }
    };

    fetchShippingFee();
  }, [calculateShipping, totalWeightGrams, shippingParam]);

  const grandTotal = calculateShipping
    ? (parseFloat(grandTotalWithoutShipping) + (loading ? 0 : parseFloat(shippingFee))).toFixed(2)
    : grandTotalWithoutShipping;

  const openModal = (item) => {
    setSelectedItem(item);
    setCustomDescription(item.descriptionCustom || "");
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (!customDescription.trim()) {
      alert("Please enter a description.");
      return;
    }

    updateCartItem(selectedItem.id, customDescription);
    setModalOpen(false);
  };

  return (
    <div className="summary-wrapper">
      <div className="order-summary">
        <h3>ORDER SUMMARY</h3>

        {location.pathname === "/checkout" && (
          <table style={{ width: '100%' }}>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="item-details display-flex">
                      <div className="productDetailOne display-flex">
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          <span className="image-badge display-flex">
                            <strong>{item.quantity}</strong>
                          </span>
                          <img src={item.image} alt={item.name} style={{ width: '50px' }} />
                        </div>
                        <div className="item-min-div">
                          <p className="item-title">
                            {item.name} -{' '}
                            {item.category === "mres"
                              ? "One Day Meal"
                              : item.category}
                          </p>
                          <p className="item-quantity">{item.quantity} Item(s)</p>
                        </div>
                      </div>
                      <div className='secodPartSummary'>
                        <p className="item-price">
                          <span className="Currency">Rs</span>
                          <span className="Currency amount">{item.price}</span>
                        </p>
                        <button 
                          className='add-details' 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            e.preventDefault(); 
                            openModal(item); 
                          }}
                        >
                          {item.descriptionCustom ? "Desc Added" : "Add Details"}
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="summary-details">
          <p>Subtotal <span>{grandTotalWithoutShipping} PKR</span></p>
          {calculateShipping && (
            <p>Shipping Fee <span className="free">Rs {loading ? "Calculating..." : shippingFee}</span></p>
          )}
        </div>
        <hr />
        <p className="grand-total">Grand Total <span>{calculateShipping && loading ? "Calculating..." : `${grandTotal} PKR`}</span></p>

        {location.pathname === '/cart' && (
          <center>
            <Link to="/checkout">
              <button className="checkout">Check Out</button>
            </Link>
          </center>
        )}
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enter Custom Description for {selectedItem?.name}</h3>
            <input
              type="text"
              placeholder="Write custom description..."
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => setModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ordersummary;

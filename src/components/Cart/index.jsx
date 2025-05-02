import React from "react";
import rectangleIcon from "../../Assets/Images/SoppingCart/Rectangle 171.svg";
import deleteIcon from "../../Assets/Images/SoppingCart/Group 4.svg";
import Newsletter from "../Home/Newsletter";
import "./style.css";
import Ordersummary from "./Ordersummary";
import SectionHeading from "../Home/SectionHeading";
import { useCart } from "../../CartContext/CartContext";
import QuantitySelector from "../UI/QuantitySelector";
import { useToast } from "../../ToastContext/ToastContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
 const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart  } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  console.log(cart);
  const grandTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleClearCart = () => {
    clearCart();
    showToast({
      message: "Cart Cleared!",
      status: "success",
    });
  
    setTimeout(() => {
      navigate(`/products?category=all`);
    }, 2000); 
  };
  
  return (
    <section className="cart-section">
      <SectionHeading subtitle="Shopping Cart" />
      {cart.length > 0 && (
  <div className="clear-cart-wrapper">
    <button onClick={handleClearCart}>Clear Cart</button>
  </div>
)}
      {cart.length > 0 ? (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>ITEM</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="row-border">
                  <td className="item">
                    <img
                      src={rectangleIcon}
                      alt="rectangle"
                      style={{ width: '15px', height: '15px' }}
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-image"
                      style={{ width: "60px", objectFit: "cover", marginLeft: "10px" }}
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className="unit-price">
                    <span className="itemPrice">{item.price}</span> PKR
                  </td>
                  <td className="quantity">
                    <QuantitySelector
                      product={item}
                      cart={cart}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                    />
                  </td>

                  <td className="total-price">
                    {(item.price * item.quantity).toFixed(2)} PKR
                    <img
                      src={deleteIcon}
                      alt="delete"
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '10px',
                        cursor: 'pointer',
                      }}
                      onClick={() => removeFromCart(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Ordersummary calculateShipping={false} />
        </>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '18px', margin: '20px 0' }}>
          Your cart is empty.
        </p>
      )}

      <Newsletter />
    </section>
  );
};

export default Cart;

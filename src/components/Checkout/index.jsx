import React, { useEffect, useMemo, useState } from 'react';
import './style.css';
import Ordersummary from '../Cart/Ordersummary';
import SectionHeading from '../Home/SectionHeading';
import ShippingMethod from './ShippingMethod';
import PaymentMethod from './PaymentMethod';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../ToastContext/ToastContext';
import { useCart } from '../../CartContext/CartContext';
import Checkbox from './Checkbox';
import { baseUrl } from '../../const/url.const';
import { useUser } from '../../UserContext/UserContext';

const Checkout = () => {
  const { user } = useUser();
  const { cart, clearCart } = useCart();

  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!user) {
      console.log("User not logged in, redirecting to login");
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;


  const [formData, setFormData] = useState({
    email: '',
    subscribeNews: false,
    name: '',
    deliveryType: '',
    company: '',
    address: '',
    city: '',
    phone: '',
    saveInfo: false,
    addflyer: false,
    shippingMethod: '',
    paymentMethod: '',
    cardNumber: '',
    expirationDate: '',
    cvc: '',
    jazzcashPhone: '',
    products: cart,
  });
console.log(formData);const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  const newValue = type === 'checkbox' ? checked : value;

  setFormData((prev) => {
    const updatedForm = { ...prev, [name]: newValue };

    if (name === 'shippingMethod') {
      const url = new URL(window.location.href);
      url.searchParams.set('shipping', newValue);
      window.history.replaceState({}, '', url);

      // Now force React Router to notice it by navigating to same path
      navigate(`${url.pathname}${url.search}`, { replace: true });
    }

    return updatedForm;
  });
};

  const weightMap = {
    spices: 0.1,          // 100g = 0.1kg
    readytoeat: 0.3,      // 300g = 0.3kg
    fruitspreserves: 0.5, // 500g = 0.5kg
    granolabars: 0.08,    // Default 80g = 0.08kg
    mres: 1.28,           // 1280g = 1.28kg
  };
  
  const getProductWeight = (product) => {
    if (product.category === "granolabars" || product.category === "mres") {
      return product.name === "Nut Bars" ? 0.06 : weightMap[product.category];
    }
    return weightMap[product.category] || 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; 
    setLoading(true); 
    showToast({ message: "Order is processing...", status: "info" }); // Show immediate feedback
    const requiredFields = [
      { key: "name", message: "Name is required!" },
      { key: "address", message: "Address is required!" },
      { key: "city", message: "City is required!" },
      { key: "phone", message: "Phone number is required!" }
    ];
  
    
    const emptyField = requiredFields.find((field) => !formData[field.key]);
   
    const email = user?.isAuthenticated ? user.email : formData.email;
    if (!email) {
      showToast({ message: "Email is required!", status: "error" });
      return;
    }
    if (emptyField) {
      showToast({
        message: emptyField.message,
        status: "error",
      });
      return;
    }
  
    const totalWeightGrams = formData.products.reduce((total, item) => {
      const weight = getProductWeight(item) * 1000; // Convert kg to grams
      return total + weight * item.quantity;
    }, 0);
  
  
    try {
      const tariffResponse = await fetch(`${baseUrl}/api/courier/pakPost/getTariff?weight=${totalWeightGrams}`);
      let shippingFee = await tariffResponse.json();
  
      if (!tariffResponse.ok) {
        throw new Error("Failed to fetch shipping fee");
      }
  
      if (formData.shippingMethod === 'tcs') {
        shippingFee += 15;
      }
      const isTCS = formData.shippingMethod === 'tcs';
      const orderData = {
        email,
        name: formData.name,
        company: formData.company,
        address: formData.address,
        city: formData.city,
        contact: formData.phone,
        courierType: isTCS ? 1 : 2,
        products: cart.map((product) => ({
          productId: product.id,
          quantity: product.quantity,
          customDetails: product.descriptionCustom
        })),
        shippingFee 
      };
  
      console.log("Order Data:", orderData);
     
      const personalInfoData = {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        contact: formData.phone,
        company: formData.company,
        userId: user?.id || 1
      };
      const [orderResponse, personalInfoResponse] = await Promise.all([
        fetch(`${baseUrl}/api/order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData)
        }),
        fetch(`${baseUrl}/api/personalInfo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(personalInfoData)
        })
      ]);
  
      const orderResult = await orderResponse.json();
      const personalInfoResult = await personalInfoResponse.json();
  
      if (orderResponse.ok && personalInfoResponse.ok) {
        console.log("Order Response: ", orderResult);
        console.log("Personal Info Response: ", personalInfoResult);
        showToast({ message: "Order placed successfully!", status: "success" });
  
        clearCart();
  
        clearCart();
        navigate(`/products?category=all`);
      } else {
        showToast({
          message: "Failed to place order!",
          status: "error",
        });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      showToast({
        message: "An error occurred while placing the order!",
        status: "error",
      });
    }finally {
      setLoading(false); 
    }
  };
  
const calculateShipping = useMemo(() => {
  return ["pakistanPost", "tcs"].includes(formData.shippingMethod);
}, [formData.shippingMethod]);
  return (
    <section className="cart-section" style={{ paddingTop: '50px' }}>
      <SectionHeading subtitle="Checkout" />

      <form className="checkout-wrapper" onSubmit={handleSubmit}>
        <div className="checkout-section-one">
          <CheckoutInputGroup title="Contact Info">
          <input
  type="email"
  name="email"
  placeholder={user?.isAuthenticated ? user.email : "Email"}
  onChange={handleChange}
  value={user?.isAuthenticated ? user.email : formData.email}
  disabled={user?.isAuthenticated}
/>

            <Checkbox
  id="subscribeNews"
  name="subscribeNews"
  checked={formData.subscribeNews}
  onChange={handleChange}
  label="Send me News and Offers"
/>
          </CheckoutInputGroup>

          <CheckoutInputGroup title="Delivery">
            <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} />
            <input type="text" name="company" placeholder="Company" onChange={handleChange} value={formData.company} />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} value={formData.address} />
            <input type="text" name="city" placeholder="City" onChange={handleChange} value={formData.city} />
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} value={formData.phone} />
           
       {/*      <Checkbox
  id="saveInfo"
  name="saveInfo"
  checked={formData.saveInfo}
  onChange={handleChange}
  label="Save this information for the next time"
  
/>*/}

          </CheckoutInputGroup>

          <ShippingMethod formData={formData} handleChange={handleChange} />
    {/*       <CheckoutInputGroup title="Delivery Service">
  <select
    className="custom-shippingmethod"
    name="deliveryType"
    value={formData.deliveryType}
    onChange={handleChange}
  >
    <option>Select Delivery Service</option>
    <option value="Over Night">Over Night</option>
    <option value="Same Day">Same Day</option>
    <option value="1-day">1 Day</option>
    <option value="2-day">2 Days</option>
  </select>
</CheckoutInputGroup>*/}

          <PaymentMethod formData={formData} handleChange={handleChange} />

          <button type="submit" className="order-button" disabled={loading}>
  {loading ? "Processing..." : "Order Now"}
</button>
        </div>

        <div className="checkout-section-two">
        <Ordersummary style={{ marginTop: '0' }} calculateShipping={calculateShipping} />
        </div>
      </form>
    </section>
  );
};

const CheckoutInputGroup = ({ title, children }) => (
  <div className="input-group">
    <h2>{title}</h2>
    {children}
  </div>
);

export default Checkout;

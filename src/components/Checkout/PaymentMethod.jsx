import React from 'react';
import cardIcon from '../../Assets/Images/checkout/card.svg';
import jazzcashIcon from '../../Assets/Images/checkout/jazzcash.svg';

const paymentMethods = [
  { value: 'card', label: 'Card', icon: cardIcon },
  { value: 'jazzcash', label: 'JazzCash', icon: jazzcashIcon },
  { value: 'cod', label: 'Cash on Delivery (COD)' },
];

const PaymentMethod = ({ formData, handleChange }) => {
  return (
    <div className="input-group">
      <h2>Payment Method</h2>
      {paymentMethods.map((method, index) => (
        <div className="shippingmethod" key={method.value}>
          <div className="shippinginputformethod">
            <div className="custom-radio-container" style={{ width: "100%" }}>
              <input
                type="radio"
                name="paymentMethod"
                value={method.value}
                onChange={handleChange}
                checked={formData.paymentMethod === method.value}
                disabled={index !== 2} // Only enable COD, others "Coming Soon"
                className="custom-radio-input"
                id={`payment-${index}`}
              />
              <label htmlFor={`payment-${index}`} className="custom-radio-label">
                <span className="custom-radio"></span>
                <div className="space-between">
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    {method.icon && (
                      <img
                        src={method.icon}
                        alt={method.label}
                        style={{
                          position: "absolute",
                          top: index === 0 ? "-1px" : index === 1 ? "-7px" : "auto",
                          left: index === 0 ? "3px" : index === 1 ? "-5px" : "auto",
                        }}
                      />
                    )}
                     <span style={{ marginLeft: index === 0 ? "40px" : index === 1 ? "53px" : "0px" }}>
        {method.label}
      </span>
                  </div>
                  {index !== 2 && <span className="blink">(Coming Soon)</span>}
                </div>
              </label>
            </div>
          </div>

          {formData.paymentMethod === 'card' && method.value === 'card' && (
            <div className="creditcarddetails">
              <div className="creditcardinputfield">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 1234 1234 1234"
                  style={{ width: '90%' }}
                  onChange={handleChange}
                  value={formData.cardNumber}
                />
              </div>
              <div className="creditFlexed">
                <div className="creditcardinputfield">
                  <label>Expiration Date</label>
                  <input
                    type="text"
                    name="expirationDate"
                    placeholder="MM / YY"
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    value={formData.expirationDate}
                  />
                </div>
                <div className="creditcardinputfield">
                  <label>CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    value={formData.cvc}
                  />
                </div>
              </div>
            </div>
          )}

          {formData.paymentMethod === 'jazzcash' &&
            method.value === 'jazzcash' && (
              <div className="creditcarddetails">
                <div className="creditcardinputfield">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="jazzcashPhone"
                    placeholder="03XX-XXXXXXX"
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    value={formData.jazzcashPhone}
                  />
                </div>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default PaymentMethod;

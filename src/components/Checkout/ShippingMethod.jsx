import React from 'react';
import Checkbox from './Checkbox';

const shippingMethods = [
  { value: 'tcs', label: 'Tranzum Courier Service (TCS)' },
  { value: 'pakistanPost', label: 'Pakistan Post' },
];

const ShippingMethod = ({ formData, handleChange }) => {
  return (
    <div className="input-group">
      <h2>Shipping Method</h2>
      {shippingMethods.map((method, i) => (
  <div className="shippingmethod" key={method.value}>
    <div className="shippinginputformethod">
      <div className="custom-radio-container" style={{width:'100%'}}>
        <input
          type="radio"
          name="shippingMethod"
          value={method.value}
          onChange={handleChange}
          checked={formData.shippingMethod === method.value}
          className="custom-radio-input"
          id={`radio-${i}`}
        />
        <label htmlFor={`radio-${i}`} className="custom-radio-label " >
          <span className="custom-radio"></span>
       <div className="space-between">   {method.label} </div>
        </label>
      </div>
    </div>
  </div>
))}

{/*     <Checkbox
  id="addflyer"
  name="addflyer"
  checked={formData.addflyer}
  onChange={handleChange}
  label="Add Flyer"
/>
*/}
    </div>
  );
};

export default ShippingMethod;

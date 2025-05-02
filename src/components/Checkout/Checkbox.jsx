import React from 'react';

const Checkbox = ({ id, name, checked, onChange, label }) => {
  return (
    <div className="custom-checkbox-container">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="custom-checkbox"
      />
      <label htmlFor={id} className="custom-checkbox-label">
        <span className="custom-radio"></span>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;

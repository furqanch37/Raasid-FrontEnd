import React from "react";

const QuantitySelector = ({
  product,
  cart,
  handleAddToCart,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const cartItem = cart.find((item) => item.id === product.id);
  const isOutOfStock = product.price === 0;

  return (
    <div className="quantity">
      <button
        className="decrease"
        onClick={() => decreaseQuantity(product.id)}
        disabled={!cartItem || isOutOfStock} // Disable if not in cart
        style={{
          opacity: isOutOfStock ? 0.5 : 1,
          cursor: isOutOfStock ? "not-allowed" : "pointer",
        }}
      >
        -
      </button>
      <input type="text" value={cartItem?.quantity || 1} readOnly />
      <button
        className="increase"
        onClick={() => {
          if (cartItem) {
            increaseQuantity(product.id);
          } else {
            handleAddToCart(product);
            increaseQuantity(product.id);
          }
        }}
        disabled={isOutOfStock}
        style={{
          opacity: isOutOfStock ? 0.5 : 1,
          cursor: isOutOfStock ? "not-allowed" : "pointer",
        }}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;

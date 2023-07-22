import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
import "../styles/Cart.css"

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);

  const handleIncrement = (productId) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: productId });
  };

  const handleDecrement = (productId) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: productId });
  };

  const handleRemoveItem = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const calculateSubtotal = () => {
    return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Cart</h2>
      {state.cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {state.cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="item-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <div className="quantity-control">
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  <span className='quantity-number'>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                </div>
                <div className='remove-button-wrapper'>
                <button onClick={() => handleRemoveItem(item.id)} className='remove-button'>Remove</button>
                </div>
               
              </div>
            </div>
          ))}
          <div className="subtotal">
            <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
            <button onClick={handleClearCart}>Clear Cart</button>
            <button>Proceed to Checkout</button>
          </div>
          
        </div>
      )}
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default Cart;

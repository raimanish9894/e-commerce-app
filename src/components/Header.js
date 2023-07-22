import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
import { FaCartShopping} from "react-icons/fa6";
import "../styles/Header.css"

const Header = () => {
  const { state } = useContext(CartContext);
  const cartItemsCount = state.cartItems.length;

  return (
    <header>
      <h1>Code Gama</h1>
      <Link to="/cart" className="cart-icon">
        <FaCartShopping fontSize={32} color="black" />
        {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
      </Link>
    </header>
  );
};

export default Header;

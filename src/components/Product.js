import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../App";
import { Link } from "react-router-dom";
import "../styles/Product.css";

const Product = ({ product }) => {
  const { id, title, price, category, image } = product;
  const { state, dispatch } = useContext(CartContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    setIsAddedToCart(state.cartItems.some((item) => item.id === product.id));
  }, [state.cartItems, product.id]);

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      dispatch({ type: "ADD_TO_CART", payload: product });
    } else {
      dispatch({ type: "REMOVE_FROM_CART", payload: product.id });
    }
    setIsAddedToCart(!isAddedToCart);
  };

  const getButtonText = () => {
    return isAddedToCart ? "Remove from Cart" : "Add to Cart";
  };

  return (
    <div className={`product ${isAddedToCart ? "added-to-cart" : ""}`}>
      <Link
        style={{
          textDecoration: "none",
          color: "#000",
        }}
        to={`/product/${id}`}
      >
        <img src={image} alt={title} />
      </Link>

      <h3>{title}</h3>
      <p>Price: ${price}</p>
      <p>Category: {category}</p>
      <button onClick={handleAddToCart}>{getButtonText()}</button>
    </div>
  );
};

export default Product;

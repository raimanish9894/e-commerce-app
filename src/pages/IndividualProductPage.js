import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../App';
import '../styles/IndividualProductPage.css';

const IndividualProductPage = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const { state, dispatch } = useContext(CartContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setIsAddedToCart(state.cartItems.some(item => item.id === response.data.id));
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [productId, state.cartItems]);

  

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    } else {
      dispatch({ type: 'REMOVE_FROM_CART', payload: product.id });
    }
    setIsAddedToCart(!isAddedToCart);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { title, price, category, image, description } = product;

  return (
    <div className="product-page">
      <div className="product-info">
        <div className="product-image">
          <img src={image} alt={title} />
        </div>
        <div className="product-details">
          <h2>{title}</h2>
          <p className="price">Price: ${price}</p>
          <p className="category">Category: {category}</p>
          <p className="description">{description}</p>
          <button onClick={handleAddToCart}>
            {isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualProductPage;

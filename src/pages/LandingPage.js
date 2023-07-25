import React, { useState, useEffect} from "react";
import axios from "axios";
import Product from "../components/Product";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleFilterChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  };


  return (
    <div>
      <h2 className="page-title">Landing Page</h2>
      <div className="filter-container">
        <label htmlFor="category" className="filter">
          Filter by Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={handleFilterChange}
          className="dropdownWrapper"
        >
          <option value="All" className="dropdown-option">
            All
          </option>
          <option value="electronics" className="dropdown-option">
            Electronics
          </option>
          <option value="jewelery" className="dropdown-option">
            Jewelery
          </option>
          <option value="men's clothing" className="dropdown-option">
            Men's Clothing
          </option>
          <option value="women's clothing" className="dropdown-option">
            Women's Clothing
          </option>
        </select>
      </div>
      <div className="products-wrapper">
        <div className="products-container">
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

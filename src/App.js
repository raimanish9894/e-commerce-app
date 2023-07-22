import React, { useReducer, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import IndividualProductPage from "./pages/IndividualProductPage";
import Cart from "./components/Cart";

export const CartContext = createContext();

const initialState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <Router>
      <CartContext.Provider value={{ state, dispatch }}>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/product/:productId"
              element={<IndividualProductPage />}
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
      </CartContext.Provider>
    </Router>
  );
};

export default App;

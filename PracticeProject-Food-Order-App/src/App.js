import React, { useState } from "react";
import Cart from "./components/Cart/Cart.js";
import Header from "./components/Layout/Header.js";
import Meals from "./components/Meals/Meals.js";
import CartProvider from "./store/CartProvider.js";

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  function showCartHandler() {
    setIsCartVisible((currentState) => !currentState);
  }
  return (
    <CartProvider>
      {isCartVisible && <Cart onClick={showCartHandler} />}
      <Header onCartClick={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

import React, { Fragment, useState } from "react";
import Cart from "./components/Cart/Cart.js";
import Header from "./components/Layout/Header.js";
import Meals from "./components/Meals/Meals.js";

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  function showCartHandler() {
    setIsCartVisible((currentState) => !currentState);
  }
  return (
    <Fragment>
      {isCartVisible && <Cart onClick={showCartHandler} />}
      <Header onCartClick={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;

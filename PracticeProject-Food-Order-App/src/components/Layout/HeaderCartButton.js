import React, { useContext } from "react";

import CartIcon from "../Cart/CartIcon.js";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context.js";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const currentItemsAdded = cartCtx.items.reduce((a, b) => {
    return a + b.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{currentItemsAdded}</span>
    </button>
  );
};

export default HeaderCartButton;
